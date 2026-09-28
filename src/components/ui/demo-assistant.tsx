'use client';
import { useState, useEffect } from 'react';

const answers = [
  { question: '¿Cómo personalizo la plantilla?', answer: 'Cambia identidad y enlaces en src/config/site.ts; reemplaza los datos de proyectos y artículos en src/content; ajusta colores en src/app/globals.css.' },
  { question: '¿Este asistente utiliza IA?', answer: 'No. Esta es una demostración local con preguntas y respuestas predefinidas. No recopila datos ni envía mensajes a servidores externos.' },
  { question: '¿Puedo desplegarla en Vercel?', answer: 'Sí. Crea tu propio repositorio, configura las variables públicas y comprueba lint, typecheck, test y build antes de publicar.' }
];
export function DemoAssistant() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  return <div className="fixed bottom-5 right-5 z-40 max-w-[calc(100vw-2.5rem)]">
    {open && <section aria-label="Asistente de demostración" className="mb-3 w-[340px] max-w-full overflow-hidden rounded-3xl border border-[#dcded8] bg-white shadow-2xl">
      <div className="flex items-start justify-between gap-4 bg-[#171923] p-5 text-white"><div><div className="eyebrow text-[#b6f264]">Demo · Sin IA</div><h2 className="mt-2 text-xl font-bold">¿Necesitas orientación?</h2></div><button type="button" aria-label="Cerrar asistente" onClick={() => setOpen(false)} className="p-1 text-lg">✕</button></div>
      <div className="p-5"><p className="mb-4 text-sm leading-6 text-[#52545b]">Esta demostración responde preguntas frecuentes sobre la plantilla.</p>
        {answers.map((entry, index) => <div key={entry.question} className="border-t border-[#e9e9e5] py-3"><button type="button" className="flex w-full items-start justify-between gap-3 text-left text-sm font-bold" aria-expanded={active === index} onClick={() => setActive(active === index ? null : index)}>{entry.question}<span aria-hidden="true">{active === index ? '−' : '+'}</span></button>{active === index && <p className="mt-3 text-sm leading-6 text-[#52545b]">{entry.answer}</p>}</div>)}
      </div>
    </section>}
    <button type="button" onClick={() => setOpen((previous) => !previous)} aria-expanded={open} aria-label={open ? 'Cerrar asistente de demostración' : 'Abrir asistente de demostración'} className="ml-auto flex items-center gap-2 rounded-full bg-[#b6f264] px-5 py-4 text-sm font-bold text-[#171923] shadow-xl hover:bg-[#c8fa8c]"><span aria-hidden="true">✳</span> Asistente <span className="rounded-full border border-black/30 px-2 py-[2px] text-[10px]">DEMO</span></button>
  </div>;
}
