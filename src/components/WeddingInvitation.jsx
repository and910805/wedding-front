import { useMemo } from 'react'

const floralPatternSvg = `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="petalGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f6dce3" />
      <stop offset="100%" stop-color="#f0c9cf" />
    </linearGradient>
    <linearGradient id="leafGradient" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#b4c7b5" />
      <stop offset="100%" stop-color="#d8e3d0" />
    </linearGradient>
    <g id="floral">
      <path d="M60 200c0-25 18-48 42-56-8 18-4 40 10 54s36 18 54 10c-8 24-31 42-56 42-28 0-50-22-50-50z" fill="url(#petalGradient)" opacity="0.35" />
      <path d="M340 200c0 25-18 48-42 56 8-18 4-40-10-54s-36-18-54-10c8-24 31-42 56-42 28 0 50 22 50 50z" fill="url(#petalGradient)" opacity="0.35" />
      <path d="M200 60c25 0 48 18 56 42-18-8-40-4-54 10s-18 36-10 54c-24-8-42-31-42-56 0-28 22-50 50-50z" fill="url(#petalGradient)" opacity="0.25" />
      <path d="M200 340c-25 0-48-18-56-42 18 8 40 4 54-10s18-36 10-54c24 8 42 31 42 56 0 28-22 50-50 50z" fill="url(#petalGradient)" opacity="0.25" />
      <path d="M200 90c-12 20-34 32-57 31 9-12 24-20 41-22-15-9-34-11-51-6 10-17 28-28 48-28 8 0 15 1 19 3z" fill="url(#leafGradient)" opacity="0.3" />
      <path d="M200 310c12-20 34-32 57-31-9 12-24 20-41 22 15 9 34 11 51 6-10 17-28 28-48 28-8 0-15-1-19-3z" fill="url(#leafGradient)" opacity="0.3" />
    </g>
  </defs>
  <rect width="400" height="400" fill="none" />
  <use href="#floral" />
  <use href="#floral" transform="rotate(90 200 200)" />
</svg>`

export default function WeddingInvitation(){
  const backgroundImage = useMemo(() => `url("data:image/svg+xml,${encodeURIComponent(floralPatternSvg)}")`, [])

  return (
    <section className="container-xl my-12 md:my-16">
      <div className="relative overflow-hidden rounded-[40px] border-2 border-cinnabar/25 bg-ivory/95 shadow-soft">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{ backgroundImage, backgroundSize: '320px', backgroundPosition: 'center' }}
        />
        <div className="relative px-6 py-10 md:px-14 md:py-16">
          <p className="text-center text-xs md:text-sm font-serif tracking-[0.4em] uppercase text-cinnabar/80">Wedding Invitation</p>
          <h2 className="mt-4 text-center font-serif text-4xl md:text-5xl text-cinnabar">趙國宏 ＆ 莊雨瑄</h2>
          <p className="mt-3 text-center text-2xl md:text-3xl text-cinnabar/90 font-script">We are getting married!</p>

          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
            <div className="space-y-6">
              <div className="rounded-3xl border border-cinnabar/15 bg-white/70 p-6">
                <h3 className="text-lg md:text-xl font-serif text-cinnabar">新人</h3>
                <p className="mt-2 text-2xl font-serif text-stone-800">趙國宏 ＆ 莊雨瑄</p>
                <p className="mt-2 text-lg text-stone-600 font-serif">攜手步向人生新章節，誠摯邀請您共享喜悅。</p>
              </div>
              <div className="rounded-3xl border border-cinnabar/15 bg-white/70 p-6 space-y-4">
                <div>
                  <h3 className="text-lg md:text-xl font-serif text-cinnabar">男方父母</h3>
                  <p className="mt-1 text-base md:text-lg font-serif text-stone-700">趙坤德、廖品淳</p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-serif text-cinnabar">女方父母</h3>
                  <p className="mt-1 text-base md:text-lg font-serif text-stone-700">莊全立、吳美賢</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-cinnabar/15 bg-white/70 p-6">
                <h3 className="text-lg md:text-xl font-serif text-cinnabar">第一場・台中</h3>
                <ul className="mt-3 space-y-2 text-base md:text-lg font-serif text-stone-700">
                  <li><span className="inline-block w-16 text-cinnabar/80">日期</span>114/11/29（星期六）</li>
                  <li><span className="inline-block w-16 text-cinnabar/80">時間</span>中午 12:00（需再確認是否為 12:30）</li>
                  <li><span className="inline-block w-16 text-cinnabar/80">地點</span>臻愛花園飯店</li>
                  <li><span className="inline-block w-16 text-cinnabar/80">地址</span>台中市烏日區高鐵路三段 168 號</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-cinnabar/15 bg-white/70 p-6">
                <h3 className="text-lg md:text-xl font-serif text-cinnabar">第二場・嘉義</h3>
                <ul className="mt-3 space-y-2 text-base md:text-lg font-serif text-stone-700">
                  <li><span className="inline-block w-16 text-cinnabar/80">日期</span>114/11/30（星期日）</li>
                  <li><span className="inline-block w-16 text-cinnabar/80">時間</span>12:00 入席</li>
                  <li><span className="inline-block w-16 text-cinnabar/80">地點</span>晶饌會館</li>
                  <li><span className="inline-block w-16 text-cinnabar/80">地址</span>嘉義市西區友忠路 508 號</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg md:text-xl text-cinnabar/80 font-serif tracking-[0.3em] uppercase">Eternal Love</p>
            <p className="mt-3 text-xl md:text-2xl text-stone-700 font-script">We sincerely invite you to celebrate with us</p>
          </div>
        </div>
      </div>
    </section>
  )
}
