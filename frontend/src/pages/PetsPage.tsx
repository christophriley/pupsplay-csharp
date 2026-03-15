import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getPets, deletePet } from '../api/pets'
import type { Pet } from '../api/pets'

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      return
    }
    getPets()
      .then(setPets)
      .catch(() => setError('Failed to load pets.'))
  }, [navigate])

  async function handleDelete(id: number) {
    try {
      await deletePet(id)
      setPets(pets => pets.filter(p => p.id !== id))
    } catch {
      setError('Failed to delete pet.')
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h1>PupsPlay</h1>
      <h2>My Pets</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pets.length === 0 ? (
        <p>No pets yet.</p>
      ) : (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {pets.map(pet => (
            <li key={pet.id} style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{pet.name} — {pet.breed}, age {pet.age}</span>
              <button onClick={() => handleDelete(pet.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/pets/new">Add a pet</Link>
      {' · '}
      <Link to="/">Home</Link>
    </div>
  )
}
