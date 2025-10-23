import { useEffect, useRef, useState } from 'react'

/* ---- 圖示（免套件） ---- */
const IconX = ({ className = 'h-5 w-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const IconChevronLeft = ({ className = 'h-6 w-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const IconChevronRight = ({ className = 'h-6 w-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function Lightbox({ open, items = [], index = 0, onClose, onPrev, onNext }) {
  const viewportRef = useRef(null)
  const startXRef = useRef(null)

  const [natural, setNatural] = useState({ w: 0, h: 0 })
  const [scale, setScale] = useState(1)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef({ dx: 0, dy: 0 })
  const pinchRef = useRef({ dist: 0, scale: 1, center: { x: 0, y: 0 } })

  useEffect(() => { setScale(1); setTx(0); setTy(0) }, [open, index])

  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, onPrev, onNext])

  if (!open || !items.length) return null

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

  const getBaseSize = () => {
    const vp = viewportRef.current?.getBoundingClientRect()
    if (!vp || !natural.w || !natural.h) return { w: 0, h: 0 }
    const rImg = natural.w / natural.h
    const rVp = vp.width / vp.height
    if (rVp < rImg) {
      const w = vp.width
      return { w, h: w / rImg }
    } else {
      const h = vp.height
      return { w: h * rImg, h }
    }
  }
  const getPanBounds = (s) => {
    const vp = viewportRef.current?.getBoundingClientRect()
    const base = getBaseSize()
    if (!vp || !base.w || !base.h) return { maxX: 0, maxY: 0 }
    return {
      maxX: Math.max(0, (base.w * s - vp.width) / 2),
      maxY: Math.max(0, (base.h * s - vp.height) / 2),
    }
  }
  const applyPanClamp = (nx, ny, s) => {
    const { maxX, maxY } = getPanBounds(s)
    return { x: clamp(nx, -maxX, maxX), y: clamp(ny, -maxY, maxY) }
  }

  const zoomAt = (clientX, clientY, nextScale) => {
    const rect = viewportRef.current.getBoundingClientRect()
    const s0 = scale
    const s1 = clamp(nextScale, 1, 5)
    const f = s1 / s0
    const dx = clientX - (rect.left + rect.width / 2)
    const dy = clientY - (rect.top + rect.height / 2)
    let nx = tx - dx * (f - 1)
    let ny = ty - dy * (f - 1)
    const clamped = applyPanClamp(nx, ny, s1)
    setScale(s1); setTx(clamped.x); setTy(clamped.y)
  }

  // ✅ 手機：未放大時允許「上下捲動整個放映層」
  const onWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault()
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12
      zoomAt(e.clientX, e.clientY, scale * factor)
    } else if (scale > 1) {
      e.preventDefault()
      const nx = tx - e.deltaX
      const ny = ty - e.deltaY
      const clamped = applyPanClamp(nx, ny, scale)
      setTx(clamped.x); setTy(clamped.y)
    }
  }

  const onDoubleClick = (e) => {
    e.stopPropagation()
    zoomAt(e.clientX, e.clientY, scale > 1 ? 1 : 2)
  }

  const onMouseDown = (e) => {
    if (scale <= 1) return
    e.preventDefault()
    setDragging(true)
    dragRef.current = { dx: e.clientX - tx, dy: e.clientY - ty }
  }
  const onMouseMove = (e) => {
    if (!dragging) return
    const nx = e.clientX - dragRef.current.dx
    const ny = e.clientY - dragRef.current.dy
    const clamped = applyPanClamp(nx, ny, scale)
    setTx(clamped.x); setTy(clamped.y)
  }
  const stopDrag = () => setDragging(false)

  // 觸控：雙指縮放、單指拖曳；未放大可左右滑換圖
  const dist2 = (t1, t2) => Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY)
  const center2 = (t1, t2) => ({ x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 })
  const onTouchStart = (e) => {
    if (e.touches.length === 1) startXRef.current = e.touches[0].clientX
    else if (e.touches.length === 2) {
      e.preventDefault()
      const [t1, t2] = e.touches
      pinchRef.current = { dist: dist2(t1, t2), scale, center: center2(t1, t2) }
    }
  }
  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const [t1, t2] = e.touches
      const d = dist2(t1, t2)
      const { dist, scale: s0, center } = pinchRef.current
      zoomAt(center.x, center.y, clamp((d / dist) * s0, 1, 5))
    } else if (e.touches.length === 1 && scale > 1) {
      e.preventDefault()
      const t = e.touches[0]
      if (!dragging) {
        setDragging(true)
        dragRef.current = { dx: t.clientX - tx, dy: t.clientY - ty }
      } else {
        const nx = t.clientX - dragRef.current.dx
        const ny = t.clientY - dragRef.current.dy
        const clamped = applyPanClamp(nx, ny, scale)
        setTx(clamped.x); setTy(clamped.y)
      }
    }
  }
  const onTouchEnd = (e) => {
    setDragging(false)
    if (e.changedTouches?.length === 1 && scale === 1) {
      const endX = e.changedTouches[0].clientX
      const delta = endX - (startXRef.current ?? endX)
      if (delta > 40) onPrev?.()
      else if (delta < -40) onNext?.()
    }
  }

  const handleOverlayClick = () => onNext?.()

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm overflow-y-auto overscroll-contain"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      {/* 手機：更靠上（pt-3），且可整層上下捲動；桌機維持原來視覺 */}
      <div className="min-h-[100svh] flex items-start justify-center px-3 sm:px-6 pt-3 sm:pt-8 pb-8 sm:pb-10">
        <div
          ref={viewportRef}
          className="relative w-[92vw] max-w-[92vw] max-h-[88svh] sm:max-h-[86svh] md:h-[84vh] flex items-center justify-center touch-none select-none"
          onClick={(e) => { if (scale > 1) e.stopPropagation() }}
          onWheel={onWheel}
          onDoubleClick={onDoubleClick}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: 'none' }}
        >
          <img
            src={items[index]}
            alt={`照片 ${index + 1} / ${items.length}`}
            className="block max-w-full max-h-full object-contain"
            draggable={false}
            onLoad={(e) => {
              const el = e.currentTarget
              setNatural({ w: el.naturalWidth, h: el.naturalHeight })
            }}
            style={
              scale === 1
                ? { transition: 'transform 80ms ease-out' }
                : {
                    transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
                    transformOrigin: '50% 50%',
                    transition: dragging ? 'none' : 'transform 80ms ease-out',
                    cursor: dragging ? 'grabbing' : 'grab',
                  }
            }
          />

          {/* 關閉 */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose?.() }}
            className="absolute top-2 right-2 rounded-full bg-white/90 hover:bg-white shadow-md p-2"
            aria-label="關閉"
          >
            <IconX className="h-5 w-5" />
          </button>

          {/* 左右切換（手機也顯示） */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev?.() }}
            className="flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-md p-3 active:scale-95"
            aria-label="上一張"
            style={{ touchAction: 'manipulation' }}
          >
            <IconChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext?.() }}
            className="flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-md p-3 active:scale-95"
            aria-label="下一張"
            style={{ touchAction: 'manipulation' }}
          >
            <IconChevronRight className="h-6 w-6" />
          </button>

          {/* 比例 + 重置（放大後顯示） */}
          {scale > 1 && (
            <div className="absolute right-0 bottom-0 m-2 flex items-center gap-2 text-xs">
              <span className="rounded bg-black/60 text-white px-2 py-1">{Math.round(scale * 100)}%</span>
              <button
                onClick={(e) => { e.stopPropagation(); setScale(1); setTx(0); setTy(0) }}
                className="rounded bg-white/80 hover:bg-white text-stone-700 px-2 py-1 shadow"
              >
                重置
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 提示 */}
      <div className="sticky bottom-3 w-full flex justify-center px-4 sm:px-6">
        <div className="text-white/80 text-xs sm:text-sm px-3 py-1 rounded-full bg-black/30">
          未放大：上下滑可捲動畫面；雙擊或 Ctrl+滾輪放大，放大後可拖曳與雙指縮放
        </div>
      </div>
    </div>
  )
}
