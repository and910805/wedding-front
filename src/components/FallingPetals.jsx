import { useEffect } from "react";

export default function FallingPetals() {
  useEffect(() => {
    const container = document.createElement("div");
    container.className = "fixed inset-0 overflow-hidden pointer-events-none z-[1]";
    document.body.appendChild(container);

    const createPetal = () => {
      const petal = document.createElement("div");
      petal.className = "absolute w-4 h-4 bg-rose-200/80 rounded-full blur-sm animate-fall";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = 6 + Math.random() * 5 + "s";
      container.appendChild(petal);
      setTimeout(() => petal.remove(), 10000);
    };

    const interval = setInterval(createPetal, 400);
    return () => {
      clearInterval(interval);
      container.remove();
    };
  }, []);
  return null;
}
