import { useEffect, useState } from "react";

export default function Countdown({ targetISO }) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(targetISO).getTime();
    const id = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setLeft({ d, h, m, s });
    }, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return (
    <div className="mt-6 max-w-md mx-auto grid grid-cols-4 gap-3 text-center">
      {["Días", "Hs", "Min", "Seg"].map((lbl, i) => {
        const val = [left.d, left.h, left.m, left.s][i];
        return (
          <div key={lbl} className="rounded-2xl bg-white/10 border border-white/10 p-4">
            <div className="text-4xl font-extrabold leading-none">{String(val).padStart(2,"0")}</div>
            <div className="mt-1 text-xs tracking-wide text-blue-200">{lbl}</div>
          </div>
        );
      })}
    </div>
  );
}
