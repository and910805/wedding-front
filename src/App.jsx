import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FallingPetals from './components/FallingPetals'
import { ThemeProvider } from './theme/ThemeContext'

const Home = lazy(() => import('./pages/Home'))
const Story = lazy(() => import('./pages/Story'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const SeatingPage = lazy(() => import('./pages/SeatingPage'))
const CreatorContact = lazy(() => import('./pages/CreatorContact'))

export default function App(){
  return (
    <ThemeProvider>
      <FallingPetals />
      <div className="relative z-10 font-sans text-stone-800">
        <Navbar />
        <Suspense
          fallback={(
            <div className="flex min-h-[60vh] items-center justify-center bg-rose-50/60 px-6 py-12 text-center">
              <p className="font-sans text-base tracking-[0.3em] text-cinnabar/70 md:text-lg">
                浪漫內容載入中，請稍候片刻⋯
              </p>
            </div>
          )}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/seating" element={<SeatingPage />} />
            <Route path="/creator" element={<CreatorContact />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
