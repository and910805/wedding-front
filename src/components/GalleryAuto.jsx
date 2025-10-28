import { useState, useMemo, useEffect, useCallback } from 'react'
import { photosEuro } from '../data/photosEuro'
import { photosTang } from '../data/photosTang'
import Lightbox from './Lightbox'

export default function GalleryAuto() {
  // 合併所有圖片
  const items = useMemo(() => [...photosTang, ...photosEuro], [])
  const [activeIndex, setActiveIndex] = useState(null)
  const [loadedImages, setLoadedImages] = useState(new Set())
  
  // 確保組件卸載時恢復 body 滾動
  useEffect(() => {
    return () => {
      if (document?.body?.style?.overflow === 'hidden') {
        document.body.style.overflow = ''
      }
    }
  }, [])

  // 處理圖片載入錯誤
  const handleImageError = useCallback((e) => {
    e.target.style.display = 'none'
    const fallback = e.target.nextSibling
    if (fallback && fallback.style) {
      fallback.style.display = 'flex'
    }
  }, [])

  // 處理圖片載入成功
  const handleImageLoad = useCallback((src) => {
    setLoadedImages(prev => new Set(prev).add(src))
  }, [])

  // 進入放映模式
  const enterSlideshow = useCallback(() => {
    setActiveIndex(0)
  }, [])

  return (
    <div className="space-y-8 md:space-y-12">
      {/* 標題區域 */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <p className="text-rose-400/90 font-script text-3xl md:text-4xl tracking-wider">綻放的時光</p>
        <p className="font-sans text-base md:text-lg text-stone-600 leading-relaxed">
          光影中收藏的笑顏與擁抱，成為我們最真摯的婚禮記憶
        </p>

        {/* 放映模式按鈕 - 更明顯的設計 */}
        <div className="mt-6 md:mt-10 flex flex-col items-center">
          <button
            onClick={enterSlideshow}
            className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 text-lg md:text-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            進入放映模式
          </button>
          <p className="font-sans text-xs sm:text-sm md:text-base text-stone-500 mt-3 whitespace-nowrap">
            點擊上方按鈕以全螢幕幻燈片模式瀏覽所有照片，享受沉浸式的觀看體驗
          </p>
        </div>
      </div>

      {/* 圖片網格 - 移除點擊功能，只做展示 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
        {items.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="group relative overflow-hidden rounded-2xl border border-rose-100/70 bg-white/70 shadow-[0_18px_45px_-20px_rgba(244,63,94,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_-15px_rgba(244,63,94,0.45)]"
          >
            <div className="w-full aspect-[4/3] overflow-hidden bg-stone-50 flex items-center justify-center">
              {/* 低解析度預覽或載入動畫 */}
              {!loadedImages.has(src) && (
                <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
                  <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
                </div>
              )}
              
              <img
                src={src}
                alt={`婚禮照片 ${i + 1}`}
                className={`block w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  loadedImages.has(src) ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                onLoad={() => handleImageLoad(src)}
              />
              
              {/* 載入失敗時的替代顯示 */}
              <div 
                className="hidden w-full h-full items-center justify-center bg-stone-100 text-stone-400"
                style={{ display: 'none' }}
              >
                <div className="text-center">
                  <div className="text-xl mb-1">📷</div>
                  <div className="text-xs">載入失敗</div>
                </div>
              </div>
            </div>

            {/* Hover 效果 - 僅視覺效果，無功能 */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none"
              aria-hidden="true"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-rose-50/30 via-transparent to-rose-100/25 mix-blend-overlay" />
            </div>

            {/* 圖片編號 */}
            <div className="absolute top-1.5 right-1.5 bg-rose-500/80 text-white text-xs px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* 圖片總數顯示 */}
      <div className="text-center pt-6 border-t border-rose-100">
        <p className="font-sans text-stone-500 text-sm md:text-base">
          共 {items.length} 張精選照片，點擊上方「進入放映模式」按鈕即可瀏覽完整相簿
        </p>
      </div>

      {/* Lightbox 組件 */}
      <Lightbox
        open={activeIndex !== null}
        items={items}
        index={activeIndex ?? 0}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((i) => (i - 1 + items.length) % items.length)}
        onNext={() => setActiveIndex((i) => (i + 1) % items.length)}
      />
    </div>
  )
}
