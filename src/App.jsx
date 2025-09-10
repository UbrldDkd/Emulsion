import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navigation/Navbar.jsx'
import Home from './Components/Pages/Home.jsx'
import Discover from './Components/Pages/Discover.jsx'
import Artists from './Components/Pages/Artists.jsx'

import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="h-screen overflow-hidden">
      
      <div className={isHomePage ? "h-full" : "h-[calc(100vh-88px)] overflow-y-auto"}>
        
        <Navbar />

        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/discover" element={ <Discover />} />
          <Route path="/artists" element={ <Artists />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
