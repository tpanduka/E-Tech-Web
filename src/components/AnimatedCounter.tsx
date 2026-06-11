import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'motion/react';

interface AnimatedCounterProps {
  id?: string;
  end: number;
  duration?: number; // in seconds
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({ id, end, duration = 2.0, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration: duration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setCount(Math.round(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, end, duration]);

  return (
    <span id={id} ref={ref} className="font-mono tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}
