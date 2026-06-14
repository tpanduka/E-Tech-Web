import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Body parsing middleware
  app.use(express.json());

  // Initialize Gemini API client safely using process.env.GEMINI_API_KEY
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log('Gemini API Client successfully initialized on the server.');
    } catch (e) {
      console.error('Failed to initialize Gemini API Client:', e);
    }
  } else {
    console.warn('GEMINI_API_KEY is missing from environment. Chatbot will run in fallback advisor mode.');
  }

  // Server-side AI chat router proxying user prompts safely
  app.post('/api/compliance-chat', async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Missing or malformed messages history array.' });
      }

      // If API client is not configured, reply with a helpful offline regulatory guide
      if (!ai) {
        console.warn('GEMINI_API_KEY is inactive. Servicing system with fallback offline policy responses.');
        const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
        let fallbackReply = 'Thank you for consulting the E-Tech Compliance Advisory. Currently, our live AI model is initializing. Under Sri Lanka PDPA Framework No. 9 of 2022 and CMMC 2.0 readiness assessments, please ensure all consumer records are encrypted at rest with robust multi-factor access protocols. Contact E-Tech Solutions Engineering Desk directly for custom technical drawings.';
        
        if (lastMessage.includes('pdpa') || lastMessage.includes('ශ්‍රී ලංකා')) {
          fallbackReply = 'Under the Sri Lanka Personal Data Protection Act, No. 9 of 2022 (PDPA), organizations must audit active data holdings, formulate system security policies (WISP), and encrypt user databases with TLS 1.3 standards. E-Tech Solutions provides thorough PDPA audits, gap discovery assessments, and staff awareness training to ensure total alignment.';
        } else if (lastMessage.includes('cmmc') || lastMessage.includes('nist')) {
          fallbackReply = 'CMMC 2.0 (Cybersecurity Maturity Model Certification) applies to all defense sector contractors. Level 2 demands complete compliance across 110 rigorous controls mapped to the 14 NIST SP 800-171 security domains. E-Tech Solutions assists with gap analysis, System Security Plan (SSP) compilation, and Plan of Action and Milestones (POA&M) creation.';
        }
        return res.json({ text: fallbackReply });
      }

      const systemInstruction = `You are the official E-Tech Solutions Compliance Officer & AI Assistant. 
      E-Tech Solutions is a leading Sri Lankan ICT and Cybersecurity firm. 
      Your purpose is to answer inquiries and assist clients on the Compliance Dashboard.
      
      You are an expert on:
      1. Sri Lanka Personal Data Protection Act (PDPA), No. 9 of 2022: Explain data mapping, gap assessments, privacy guidelines, audit checks, and TLS 1.3 secure configurations. Excellent local alignment is critical for Sri Lankan banks, financial firms, and corporations.
      2. CMMC 2.0 (Cybersecurity Maturity Model Certification) & NIST SP 800-171: Explain Level 1 (Foundational - 17 controls) and Level 2 (Advanced - 110 controls) readiness, System Security Plans (SSP), Plan of Action and Milestones (POA&M), ITAR compliance, and defense supply-chain security preparation.
      3. Enterprise ICT Integrations: Recommend pfSense firewalls, structured network segmentation, active vulnerability sweeps, and genuine Microsoft/Autodesk licenses to enforce proper compliance.
      
      Guidelines:
      - Be accurate, clear, and authoritative. Use markdown formatting to space out lists, criteria, or subpoints elegantly.
      - Keep responses professional, helpful, and concise. Avoid self-praise or referencing internal codebase/paths.
      - Answer in English or Sinhalese depending on the user's input/query.`;

      // Build conversation contextual prompt correctly
      const dialogueFlow = messages.map(m => {
        const actor = m.role === 'user' ? 'User' : 'Assistant';
        return `${actor}: ${m.content}`;
      });
      dialogueFlow.push('Assistant:');
      const contextualPrompt = dialogueFlow.join('\n');

      // Call Gemini 3.5 Flash Model safely
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contextualPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || 'I could not synthesize a compliance response. Please rephrase your query.';
      res.json({ text: responseText });
    } catch (err: any) {
      console.error('Compliance Chat Handler Error:', err);
      res.status(500).json({ error: 'Failed to generate compliance feedback. Please try again shortly or contact E-Tech directly.' });
    }
  });

  // Server-side environment setup for Vite development or standalone production build
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('Vite development server mounted as Express middleware.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static files mapped inside Express.');
  }

  app.listen(PORT, () => {
  console.log(`E-Tech Fullstack Server launched successfully on port ${PORT}`);
});
}

startServer().catch((error) => {
  console.error("Critical server bootstrap failure:", error);
});
