import { useEffect, useRef, useState, useCallback } from 'react'

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

  // 工具函數 - 必須在條件返回之前定義
  const clamp = useCallback((v, a, b) => Math.max(a, Math.min(b, v)), [])

  // 計算適合視窗的基礎尺寸
  const getBaseSize = useCallback(() => {
    const vp = viewportRef.current?.getBoundingClientRect()
    if (!vp || !natural.w || !natural.h) return { w: 0, h: 0 }
    
    const rImg = natural.w / natural.h
    const rVp = vp.width / vp.height
    
    const maxWidth = vp.width * 0.75
    const maxHeight = vp.height * 0.75
    
    if (rVp < rImg) {
      const w = Math.min(vp.width, maxWidth)
      return { w, h: w / rImg }
    } else {
      const h = Math.min(vp.height, maxHeight)
      return { w: h * rImg, h }
    }
  }, [natural])

  const getPanBounds = useCallback((s) => {
    const vp = viewportRef.current?.getBoundingClientRect()
    const base = getBaseSize()
    if (!vp || !base.w || !base.h) return { maxX: 0, maxY: 0 }
    return {
      maxX: Math.max(0, (base.w * s - vp.width) / 2),
      maxY: Math.max(0, (base.h * s - vp.height) / 2),
    }
  }, [getBaseSize])

  const applyPanClamp = useCallback((nx, ny, s) => {
    const { maxX, maxY } = getPanBounds(s)
    return { x: clamp(nx, -maxX, maxX), y: clamp(ny, -maxY, maxY) }
  }, [getPanBounds, clamp])

  const zoomAt = useCallback((clientX, clientY, nextScale) => {
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
  }, [scale, tx, ty, applyPanClamp, clamp])

  // 滾輪行為
  const onWheel = useCallback((e) => {
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
  }, [scale, tx, ty, zoomAt, applyPanClamp])

  const onDoubleClick = useCallback((e) => {
    e.stopPropagation()
    zoomAt(e.clientX, e.clientY, scale > 1 ? 1 : 2)
  }, [scale, zoomAt])

  // 滑鼠拖曳
  const onMouseDown = useCallback((e) => {
    if (scale <= 1) return
    e.preventDefault()
    setDragging(true)
    dragRef.current = { dx: e.clientX - tx, dy: e.clientY - ty }
  }, [scale, tx, ty])
  
  const onMouseMove = useCallback((e) => {
    if (!dragging) return
    const nx = e.clientX - dragRef.current.dx
    const ny = e.clientY - dragRef.current.dy
    const clamped = applyPanClamp(nx, ny, scale)
    setTx(clamped.x); setTy(clamped.y)
  }, [dragging, scale, applyPanClamp])
  
  const stopDrag = useCallback(() => setDragging(false), [])

  // 觸控事件處理
  const dist2 = useCallback((t1, t2) => Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY), [])
  const center2 = useCallback((t1, t2) => ({ x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 }), [])
  
  const onTouchStart = useCallback((e) => {
    if (e.touches.length === 1) startXRef.current = e.touches[0].clientX
    else if (e.touches.length === 2) {
      e.preventDefault()
      const [t1, t2] = e.touches
      pinchRef.current = { dist: dist2(t1, t2), scale, center: center2(t1, t2) }
    }
  }, [scale, dist2, center2])
  
  const onTouchMove = useCallback((e) => {
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
  }, [scale, dragging, tx, ty, dist2, zoomAt, clamp, applyPanClamp])
  
  const onTouchEnd = useCallback((e) => {
    setDragging(false)
    if (e.changedTouches?.length === 1 && scale === 1) {
      const endX = e.changedTouches[0].clientX
      const delta = endX - (startXRef.current ?? endX)
      if (delta > 40) onPrev?.()
      else if (delta < -40) onNext?.()
    }
  }, [scale, onPrev, onNext])

  // 手機版：點擊背景關閉，點擊圖片不觸發任何操作
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose?.()
    }
  }, [onClose])

  // 手機版：點擊圖片區域不觸發任何操作
  const handleImageClick = useCallback((e) => {
    e.stopPropagation()
  }, [])

  // 重置狀態當開啟或索引改變時
  useEffect(() => { 
    setScale(1); 
    setTx(0); 
    setTy(0) 
  }, [open, index])

  // 鍵盤事件和 body overflow 控制
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

  // 預載入相鄰圖片
  useEffect(() => {
    if (!open) return
    
    const preloadImages = () => {
      const indicesToPreload = [
        index,
        (index - 1 + items.length) % items.length,
        (index + 1) % items.length
      ]
      
      indicesToPreload.forEach(i => {
        const img = new Image()
        img.src = items[i]
      })
    }
    
    preloadImages()
  }, [open, index, items])

  // 條件返回必須在所有 Hooks 之後
  if (!open || !items.length) return null

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md overflow-y-auto overscroll-contain"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      {/* 主要容器 - 手機版優化 */}
      <div className="min-h-[100svh] flex items-center justify-center p-3 sm:p-4 md:p-6">
        <div
          ref={viewportRef}
          className="relative w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[90svh] flex items-center justify-center touch-none select-none"
          onClick={handleImageClick}
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
                ? { 
                    transition: 'transform 150ms ease-out',
                    maxWidth: '90vw',
                    maxHeight: '80svh'
                  }
                : {
                    transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
                    transformOrigin: '50% 50%',
                    transition: dragging ? 'none' : 'transform 150ms ease-out',
                    cursor: dragging ? 'grabbing' : 'grab',
                  }
            }
          />

          {/* 關閉按鈕 - 手機版更大更容易點擊 */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose?.() }}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 rounded-full bg-black/70 hover:bg-black/90 text-white shadow-lg p-2.5 sm:p-3 z-10 transition-all duration-200 hover:scale-105 backdrop-blur-sm touch-manipulation"
            aria-label="關閉"
          >
            <IconX className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* 左右切換按鈕 - 手機版更大 */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onPrev?.() }}
                className="flex items-center justify-center absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/70 hover:bg-black/90 text-white shadow-lg p-3 sm:p-4 active:scale-95 z-10 transition-all duration-200 hover:scale-105 backdrop-blur-sm touch-manipulation"
                aria-label="上一張"
              >
                <IconChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNext?.() }}
                className="flex items-center justify-center absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/70 hover:bg-black/90 text-white shadow-lg p-3 sm:p-4 active:scale-95 z-10 transition-all duration-200 hover:scale-105 backdrop-blur-sm touch-manipulation"
                aria-label="下一張"
              >
                <IconChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            </>
          )}

          {/* 比例顯示和重置按鈕 */}
          {scale > 1 && (
            <div className="absolute right-0 bottom-0 m-3 sm:m-4 flex items-center gap-2 text-sm z-10">
              <span className="rounded bg-black/70 text-white px-3 py-1.5 backdrop-blur-sm">{Math.round(scale * 100)}%</span>
              <button
                onClick={(e) => { e.stopPropagation(); setScale(1); setTx(0); setTy(0) }}
                className="rounded bg-white/90 hover:bg-white text-stone-700 px-3 py-1.5 shadow transition-colors duration-200 touch-manipulation"
              >
                重置
              </button>
            </div>
          )}

          {/* 照片計數器 */}
          {items.length > 1 && (
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 rounded-full bg-black/70 text-white px-3 py-1.5 text-sm sm:text-base z-10 backdrop-blur-sm">
              {index + 1} / {items.length}
            </div>
          )}
        </div>
      </div>

      {/* 操作提示 - 手機版簡化 */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pointer-events-none">
        <div className="text-white/90 text-xs sm:text-sm px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-center border border-white/10">
          {scale === 1 ? (
            <>點擊背景關閉 • 左右按鈕切換照片</>
          ) : (
            <>拖曳移動 • 雙擊縮放</>
          )}
        </div>
      </div>
    </div>
  )
}