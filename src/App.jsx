import { Routes, Route } from 'react-router-dom'
import PortfolioSite from './Portfolio.jsx'
import PortfolioCMS from './PortfolioCMS.jsx'
import JobScanner from './pages/index'; // adjust path

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<PortfolioCMS />} />
      <Route path="/*" element={<PortfolioSite />} />
      <Route path="/scanner" element={<JobScanner />} />
    </Routes>
  )
}
