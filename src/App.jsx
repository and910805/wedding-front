import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FallingPetals from './components/FallingPetals'
import { ThemeProvider } from './theme/ThemeContext'

const Home = lazy(() => import('./pages/Home'))

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
          <Home />
        </Suspense>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
