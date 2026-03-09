import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import Results from './pages/Results'
import EditPartner from './pages/EditPartner'
import PartnerProfile from './pages/PartnerProfile'
import { initData, getUser } from './utils/storage'

function Protected({ children }) {
  return getUser() ? children : <Navigate to="/" replace />
}

export default function App() {
  useEffect(() => { initData() }, [])

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home"              element={<Protected><Home /></Protected>} />
        <Route path="/results"           element={<Protected><Results /></Protected>} />
        <Route path="/partner/:id"       element={<Protected><PartnerProfile /></Protected>} />
        <Route path="/partner/:id/edit"  element={<Protected><EditPartner /></Protected>} />
      </Routes>
    </HashRouter>
  )
}
