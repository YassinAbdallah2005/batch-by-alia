import { Navbar } from './components/layout/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { ProductsSection } from './components/sections/ProductsSection'
import { StorySection } from './components/sections/StorySection'
import { OrderSection } from './components/sections/OrderSection'
import { Footer } from './components/sections/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <StorySection />
      <OrderSection />
      <Footer />
    </div>
  )
}

export default App
