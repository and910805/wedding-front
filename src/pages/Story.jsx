import Section from '../components/Section'
import { AutoThemeTarget } from '../theme/ThemeContext'
import { storyEuro } from '../data/storyEuro'
import { storyTang } from '../data/storyTang'

function Timeline({items}){
  return (
    <ol className="space-y-6 md:space-y-10">
      {items.map((s, idx)=> (
        <li key={idx} className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
          <div>
            <h3 className="text-xl md:text-2xl">{s.title}</h3>
            <p className="font-sans text-stone-600 mt-1 text-sm md:text-base">{s.date} · {s.place}</p>
            <p className="mt-3 md:mt-4 leading-relaxed text-sm md:text-base">{s.text}</p>
          </div>
          <div><img src={s.photo} alt={s.title} className="rounded-xl md:rounded-2xl border border-stone-300/40 shadow-soft" /></div>
        </li>
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
