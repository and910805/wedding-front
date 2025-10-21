import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Story from './pages/Story'
import GalleryPage from './pages/GalleryPage'
import SeatingPage from './pages/SeatingPage'
import { ThemeProvider } from './theme/ThemeContext'

export default function App(){
  return (
    <ThemeProvider>
      <div className="font-serif text-stone-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/seating" element={<SeatingPage />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
