import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PetsPage from './pages/PetsPage'
import AddPetPage from './pages/AddPetPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/pets" element={<PetsPage />} />
      <Route path="/pets/new" element={<AddPetPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
