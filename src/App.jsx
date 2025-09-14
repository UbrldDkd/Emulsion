import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navigation/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Components/Pages/Home.jsx'
import Discover from './Pages/Discover.jsx'
import Artists from './Pages/Artists.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import Privacy from './Pages/Privacy.jsx'
import Terms from './Pages/Terms.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  return (
    <ThemeProvider>
      <div className="relative overflow-x-hidden">
        {isHomePage ? (
          <>
            <Routes>
              <Route path="/" element={ <Home />} />
            </Routes>
            <div className="absolute top-0 left-0 right-0 z-50">
              <Navbar />
            </div>
          </>
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/discover" element={ <Discover />} />
              <Route path="/artists" element={ <Artists />} />
              <Route path="/about" element={ <About />} />
              <Route path="/contact" element={ <Contact />} />
              <Route path="/privacy" element={ <Privacy />} />
              <Route path="/terms" element={ <Terms />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
