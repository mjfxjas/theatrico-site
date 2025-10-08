import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Film from './pages/Film.jsx'
import People from './pages/People.jsx'
import TivoliProposal from './pages/TivoliProposal.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/film" element={<Film />} />
      <Route path="/people" element={<People />} />
      <Route path="/tivoli-proposal" element={<TivoliProposal />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
