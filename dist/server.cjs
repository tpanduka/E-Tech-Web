var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  let ai = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      ai = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      console.log("Gemini API Client successfully initialized on the server.");
    } catch (e) {
      console.error("Failed to initialize Gemini API Client:", e);
    }
  } else {
    console.warn("GEMINI_API_KEY is missing from environment. Chatbot will run in fallback advisor mode.");
  }
  app.post("/api/compliance-chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Missing or malformed messages history array." });
      }
      if (!ai) {
        console.warn("GEMINI_API_KEY is inactive. Servicing system with fallback offline policy responses.");
        const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
        let fallbackReply = "Thank you for consulting the E-Tech Compliance Advisory. Currently, our live AI model is initializing. Under Sri Lanka PDPA Framework No. 9 of 2022 and CMMC 2.0 readiness assessments, please ensure all consumer records are encrypted at rest with robust multi-factor access protocols. Contact E-Tech Solutions Engineering Desk directly for custom technical drawings.";
        if (lastMessage.includes("pdpa") || lastMessage.includes("\u0DC1\u0DCA\u200D\u0DBB\u0DD3 \u0DBD\u0D82\u0D9A\u0DCF")) {
          fallbackReply = "Under the Sri Lanka Personal Data Protection Act, No. 9 of 2022 (PDPA), organizations must audit active data holdings, formulate system security policies (WISP), and encrypt user databases with TLS 1.3 standards. E-Tech Solutions provides thorough PDPA audits, gap discovery assessments, and staff awareness training to ensure total alignment.";
        } else if (lastMessage.includes("cmmc") || lastMessage.includes("nist")) {
          fallbackReply = "CMMC 2.0 (Cybersecurity Maturity Model Certification) applies to all defense sector contractors. Level 2 demands complete compliance across 110 rigorous controls mapped to the 14 NIST SP 800-171 security domains. E-Tech Solutions assists with gap analysis, System Security Plan (SSP) compilation, and Plan of Action and Milestones (POA&M) creation.";
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
      const dialogueFlow = messages.map((m) => {
        const actor = m.role === "user" ? "User" : "Assistant";
        return `${actor}: ${m.content}`;
      });
      dialogueFlow.push("Assistant:");
      const contextualPrompt = dialogueFlow.join("\n");
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contextualPrompt,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });
      const responseText = response.text || "I could not synthesize a compliance response. Please rephrase your query.";
      res.json({ text: responseText });
    } catch (err) {
      console.error("Compliance Chat Handler Error:", err);
      res.status(500).json({ error: "Failed to generate compliance feedback. Please try again shortly or contact E-Tech directly." });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("Vite development server mounted as Express middleware.");
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
    console.log("Production static files mapped inside Express.");
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`E-Tech Fullstack Server launched successfully at http://localhost:${PORT}`);
  });
}
startServer().catch((error) => {
  console.error("Critical server bootstrap failure:", error);
});
//# sourceMappingURL=server.cjs.map
