import { motion, useReducedMotion } from 'framer-motion'
import Section from '../components/Section'
import GalleryAuto from '../components/GalleryAuto'
import Seating from '../components/Seating'
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
            <h3 className="text-xl font-serif text-stone-900 md:text-2xl">{s.title}</h3>
            <p className="mt-1 font-sans text-sm text-stone-600 md:text-base">{s.date} · {s.place}</p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-stone-700 md:mt-4 md:text-base">{s.text}</p>
          </div>
          <motion.div
            className="rounded-2xl border border-stone-300/40 shadow-soft"
            animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
            transition={{
              duration: prefersReducedMotion ? 0 : 6,
              ease: 'easeInOut',
              repeat: prefersReducedMotion ? 0 : Infinity,
              repeatType: 'mirror',
              delay: prefersReducedMotion ? 0 : idx * 0.25,
            }}
          >
            <img src={s.photo} alt={s.title} className="h-full w-full rounded-2xl object-cover" />
          </motion.div>
        </motion.li>
      ))}
    </ol>
  )
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion()

  const poemText = `他們，
在某個不經意的午後相遇，
不是同班，
只是朋友的朋友，
在人群的邊緣，交換了一個微笑。

他來自不同的系，
她走過不同的樓，
卻總在某個轉角遇見彼此的身影，
像命運偷偷擺好的座標。

時間流過，
課表換了，季節也換了，
他們仍然記得那句輕輕的「嗨」，
像一顆種子，
在不知不覺間發芽。

多年以後，
他牽起她的手，
笑著說：「原來那天的風，
一直吹到今天。」

—
一場緣分的開花，
從青春的校園開始，
在愛裡長成永恆。`

  return (
    <main id="top">
      <AutoThemeTarget theme="euro" className="border-b border-rose-100/60 bg-gradient-to-br from-ivory via-white to-rose-50/70">
        <div className="container-xl flex flex-col items-center gap-10 px-6 py-14 text-center md:flex-row md:items-start md:justify-between md:py-20 md:text-left">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cinnabar/30 bg-white/70 px-4 py-2 font-sans text-xs uppercase tracking-[0.4em] text-cinnabar/80">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-cinnabar to-rose-400" aria-hidden="true"></span>
              Wedding Day
            </div>
            <div className="space-y-4">
              <div className="relative inline-block">
                <div className="absolute inset-x-0 -bottom-3 h-3 rounded-full bg-rose-100/70 blur-md" aria-hidden="true"></div>
                <h1 className="relative bg-gradient-to-r from-stone-900 via-cinnabar/80 to-stone-900 bg-clip-text text-2xl font-serif tracking-wide text-transparent md:text-4xl">
                  莊雨瑄 ＆ 趙國宏
                </h1>
              </div>
              <p className="font-sans text-sm leading-relaxed text-stone-600/90 md:text-base">
                滿載真摯與浪漫的婚禮網站，收藏我們相守的約定，也誠摯邀請您一同蒞臨見證。
              </p>
            </div>
            <div className="grid w-full gap-3 sm:grid-cols-2">
              <a
                href="https://wwwe789.my.canva.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cinnabar via-rose-500 to-pink-500 px-6 py-3 font-sans text-base font-medium text-white shadow-[0_25px_45px_-25px_rgba(225,89,71,0.75)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(225,89,71,0.75)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar/60 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50"
              >
                婚禮資訊
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">↗</span>
              </a>
              <a
                href="#gallery"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-cinnabar/40 bg-white/75 px-6 py-3 font-sans text-base font-medium text-cinnabar shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-cinnabar/60 hover:bg-white"
              >
                照片畫廊
                <span className="text-lg opacity-60 transition-all duration-300 group-hover:opacity-100" aria-hidden="true">➺</span>
              </a>
            </div>
          </div>
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-rose-100/70 bg-white/60 p-6 shadow-[0_35px_80px_-45px_rgba(244,114,182,0.6)]">
            <div className="absolute -top-10 -right-12 h-48 w-48 rounded-full bg-rose-100/60 blur-3xl" aria-hidden="true"></div>
            <div className="absolute inset-x-6 bottom-6 h-24 rounded-3xl bg-gradient-to-t from-rose-100/60 to-transparent" aria-hidden="true"></div>
            <div className="relative space-y-4 text-left">
              <p className="font-script text-4xl text-rose-400/80">Love in Bloom</p>
              <p className="font-sans text-sm text-stone-600 md:text-base">
                自相遇的那一天開始，我們便把最柔軟的心意捧在掌心，如今邀請您一同見證這份終身的約定。
              </p>
              <div className="rounded-2xl border border-rose-100/70 bg-white/80 p-4">
                <p className="font-sans text-sm text-stone-500">WEDDING DATE</p>
                <p className="mt-2 text-2xl font-serif text-stone-900">2025 · 11 · 30</p>
                <p className="mt-3 font-sans text-sm text-stone-600">
                  新娘莊雨瑄、新郎趙國宏，誠摯邀請您攜手走進我們的幸福時光。
                </p>
              </div>
            </div>
          </div>
        </div>
      </AutoThemeTarget>

      <motion.section
        id="story"
        className="relative overflow-hidden bg-rose-50/80 px-6 py-16 text-center"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: prefersReducedMotion ? 'linear' : [0.16, 1, 0.3, 1],
        }}
      >
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="font-script text-4xl text-cinnabar md:text-5xl">💍 Our Story</h2>
          <p className="whitespace-pre-line font-sans text-lg leading-8 text-stone-700 md:text-xl md:leading-9">
            {poemText}

          </p>
        </div>
      </motion.section>

      <div className="space-y-16 bg-gradient-to-b from-rose-50/70 via-white to-white pb-16">
        <AutoThemeTarget theme="tang" className="pt-10">
          <Section id="tang-story" title="唐風篇" subtitle="從緋衣起，天地為證">
            <Timeline items={storyTang} />
          </Section>
        </AutoThemeTarget>
        <AutoThemeTarget theme="euro">
          <Section id="euro-story" title="歐洲篇" subtitle="在風與光之間，相愛生根">
            <Timeline items={storyEuro} />
          </Section>
        </AutoThemeTarget>
      </div>

      <AutoThemeTarget theme="euro" className="bg-gradient-to-b from-white via-rose-50/60 to-white py-16">
        <section id="gallery" className="relative">
          <div className="container-xl">
            <div className="relative overflow-hidden rounded-3xl border border-rose-100/70 bg-white/85 shadow-[0_35px_90px_-45px_rgba(244,114,182,0.6)]">
              <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-rose-100/60 blur-3xl" aria-hidden="true"></div>
              <div className="absolute right-8 top-0 h-48 w-48 rounded-full bg-white/40 blur-3xl" aria-hidden="true"></div>
              <div className="relative z-10 px-6 py-12 md:px-12 md:py-16">
                <div className="mb-10 text-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-rose-200/70 bg-rose-50/70 px-4 py-1 font-sans text-sm tracking-[0.3em] text-rose-500/80">
                    Gallery
                  </span>
                  <h2 className="mt-4 text-3xl font-serif text-stone-900 md:text-4xl">與我們一同回味最美的瞬間</h2>
                </div>
                <GalleryAuto />
              </div>
            </div>
          </div>
        </section>
      </AutoThemeTarget>

      <AutoThemeTarget theme="tang" className="bg-gradient-to-b from-white via-ivory to-white py-16">
        <Section id="seating" title="座位表" subtitle="找到您的座位，今晚一起舉杯歡慶">
          <Seating />
        </Section>
      </AutoThemeTarget>

      <AutoThemeTarget theme="euro" className="bg-gradient-to-b from-white via-rose-50/50 to-ivory py-16">
        <Section
          id="creator"
          title="創作人聯絡資訊"
          subtitle="謝謝你走進莊雨瑄與趙國宏的故事，若也想讓自己的想像落地，歡迎隨時與我分享靈感。"
        >
          <div className="space-y-8 md:space-y-10">
            <div className="flex flex-col gap-3 text-left">
              <p className="font-sans text-sm text-stone-500 md:text-base">創作人</p>
              <p className="text-3xl font-serif text-stone-900 md:text-4xl">Eric</p>
              <p className="font-sans text-sm text-stone-600 md:text-base">
                沒有做不到的網站，只有想不出來的網站。
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="font-sans text-sm text-stone-500">Email</p>
                <a
                  href="mailto:goole910805@gmail.com"
                  className="mt-1 inline-flex items-center gap-2 font-sans text-base text-cinnabar transition hover:underline md:text-lg"
                >
                  goole910805@gmail.com
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div>
                <p className="font-sans text-sm text-stone-500">電話</p>
                <a
                  href="tel:0966632722"
                  className="mt-1 inline-flex items-center gap-2 font-sans text-base text-cinnabar transition hover:underline md:text-lg"
                >
                  0966-632-722
                  <span aria-hidden="true">☎</span>
                </a>
              </div>
            </div>
            <div>
              <p className="font-sans text-sm text-stone-500">作品集</p>
              <a
                href="https://and910805.github.io/eric_site/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 font-sans text-base text-cinnabar transition hover:underline md:text-lg"
              >
                https://and910805.github.io/eric_site/
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </Section>
      </AutoThemeTarget>
    </main>
  )
}
