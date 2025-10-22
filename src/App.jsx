import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Story from './pages/Story'
import GalleryPage from './pages/GalleryPage'
import SeatingPage from './pages/SeatingPage'
import CreatorContact from './pages/CreatorContact'
import FallingPetals from './components/FallingPetals'
import { ThemeProvider } from './theme/ThemeContext'

export default function App(){
  return (
    <ThemeProvider>
      <FallingPetals />
      <div className="relative z-10 font-sans text-stone-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/seating" element={<SeatingPage />} />
          <Route path="/creator" element={<CreatorContact />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
