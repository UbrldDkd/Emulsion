import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navigation/Navbar.jsx'
import Home from './Components/Pages/Home.jsx'

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

       
        </Routes>
      </div>
    </div>
  )
}

export default App
