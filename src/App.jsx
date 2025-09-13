import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navigation/Navbar.jsx'
import Home from './Components/Pages/Home.jsx'
import Discover from './Pages/Discover/Discover.jsx'
import Artists from './Components/Pages/Artists.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <ThemeProvider>
      <div className="relative">
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
            </Routes>
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
