import { useEffect } from 'react'

export default function Lightbox({open, src, onClose, onNext, onPrev}){
  useEffect(()=>{
    if(!open) return

    function handleKeyDown(event){
      if(event.key === 'Escape'){
        onClose()
      } else if(event.key === 'ArrowRight'){
        onNext()
      } else if(event.key === 'ArrowLeft'){
        onPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return ()=>window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose, onNext, onPrev])

  if(!open || !src) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onNext}
    >
      <button
        type="button"
        onClick={(event)=>{
          event.stopPropagation()
          onClose()
        }}
        className="absolute right-6 top-6 rounded-full border border-white/30 bg-black/40 px-3 py-2 text-sm font-sans tracking-wide text-white shadow-soft transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
        aria-label="關閉相簿放映"
      >
        關閉
      </button>

      <button
        type="button"
        onClick={(event)=>{
          event.stopPropagation()
          onPrev()
        }}
        className="absolute left-6 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 px-3 py-2 text-white shadow-soft transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 sm:flex"
        aria-label="上一張照片"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={(event)=>{
          event.stopPropagation()
          onNext()
        }}
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 px-3 py-2 text-white shadow-soft transition hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 sm:flex"
        aria-label="下一張照片"
      >
        ›
      </button>

      <figure
        className="max-h-full max-w-5xl text-center"
        onClick={(event)=>{
          event.stopPropagation()
          onNext()
        }}
      >
        <img
          src={src}
          alt="婚禮照片"
          className="mx-auto max-h-[80vh] w-auto max-w-full rounded-[28px] border border-white/20 bg-white/10 shadow-2xl"
        />
        <figcaption className="mt-6 font-sans text-sm text-rose-50/80">
          點擊畫面即可欣賞下一張照片，按 Esc 可離開放映。
        </figcaption>
      </figure>
    </div>
  )
}
