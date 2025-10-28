import { motion, useReducedMotion } from 'framer-motion'
import Section from '../components/Section'
import { AutoThemeTarget } from '../theme/ThemeContext'
import { storyEuro } from '../data/storyEuro'
import { storyTang } from '../data/storyTang'

function Timeline({items}){
  const prefersReducedMotion = useReducedMotion()

  return (
    <ol className="space-y-6 md:space-y-10">
      {items.map((s, idx)=> (
        <motion.li
          key={idx}
          className="grid items-center gap-4 md:grid-cols-2 md:gap-8"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.56,
            ease: prefersReducedMotion ? 'linear' : [0.16, 1, 0.3, 1],
            delay: prefersReducedMotion ? 0 : idx * 0.08,
          }}
        >
          <div>
            <h3 className="text-xl md:text-2xl font-serif">{s.title}</h3>
            <p className="font-sans text-stone-600 mt-1 text-sm md:text-base">{s.date} · {s.place}</p>
            <p className="mt-3 md:mt-4 font-sans leading-relaxed text-sm md:text-base">{s.text}</p>
          </div>
          <motion.div
            className="rounded-xl border border-stone-300/40 shadow-soft md:rounded-2xl"
            animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
            transition={{
              duration: prefersReducedMotion ? 0 : 6,
              ease: 'easeInOut',
              repeat: prefersReducedMotion ? 0 : Infinity,
              repeatType: 'mirror',
              delay: prefersReducedMotion ? 0 : idx * 0.25,
            }}
          >
            <img src={s.photo} alt={s.title} className="h-full w-full rounded-xl object-cover md:rounded-2xl" />
          </motion.div>
        </motion.li>
      ))}
    </ol>
  )
}

export default function Story(){
  return (
    <main>
      <AutoThemeTarget theme="tang" className="min-h-[70vh]">
        <Section title="唐風篇" subtitle="從緋衣起，天地為證">
          <Timeline items={storyTang} />
        </Section>
      </AutoThemeTarget>
      <AutoThemeTarget theme="euro" className="min-h-[70vh]">
        <Section title="歐洲篇" subtitle="在風與光之間，相愛生根">
          <Timeline items={storyEuro} />
        </Section>
      </AutoThemeTarget>
    </main>
  )
}
