import Section from '../components/Section'
import { useTheme } from '../theme/ThemeContext'

export default function CreatorContact(){
  const { theme } = useTheme()
  const highlight = theme === 'tang' ? 'text-cinnabar' : 'text-forest'

  return (
    <main className="pb-12">
      <Section
        title="創作人聯絡資訊"
        subtitle="謝謝你走進莊雨瑄與趙國宏的故事，若也想讓自己的想像落地，歡迎隨時與我分享靈感。"
      >
        <div className="space-y-6 md:space-y-8">
          <div>
            <p className="font-sans text-sm md:text-base text-stone-500">創作人</p>
            <p className="mt-1 text-2xl md:text-3xl font-serif tracking-wide">Eric</p>
            <p className="mt-2 font-sans text-stone-600">沒有做不到的網站，只有想不出來的網站。</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-sans text-sm text-stone-500">Email</p>
              <a
                href="mailto:goole910805@gmail.com"
                className={`mt-1 inline-flex items-center font-sans text-base md:text-lg hover:underline ${highlight}`}
              >
                goole910805@gmail.com
              </a>
            </div>
            <div>
              <p className="font-sans text-sm text-stone-500">電話</p>
              <a
                href="tel:0966632722"
                className={`mt-1 inline-flex items-center font-sans text-base md:text-lg hover:underline ${highlight}`}
              >
                0966-632-722
              </a>
            </div>
          </div>

          <div>
            <p className="font-sans text-sm text-stone-500">作品集</p>
            <a
              href="https://and910805.github.io/eric_site/"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1 inline-flex items-center gap-2 font-sans text-base md:text-lg hover:underline ${highlight}`}
            >
              https://and910805.github.io/eric_site/
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </Section>
    </main>
  )
}
