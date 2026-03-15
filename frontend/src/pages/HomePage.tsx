import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login')
  }, [navigate])

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={{ maxWidth: 360, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h1>PupsPlay</h1>
      <p>You're logged in. Playdate scheduling coming soon!</p>
      <p><Link to="/pets">My Pets</Link></p>
      <button onClick={logout}>Log out</button>
    </div>
  )
}
