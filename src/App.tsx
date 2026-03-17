import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { HeroSection3D } from './components/sections/HeroSection3D'
import { ProductsSection } from './components/sections/ProductsSection'
import { StorySection } from './components/sections/StorySection'
import { OrderSection } from './components/sections/OrderSection'
import { Footer } from './components/sections/Footer'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection3D />
      <ProductsSection />
      <StorySection />
      <OrderSection />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
