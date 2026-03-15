import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPet } from '../api/pets'

export default function AddPetPage() {
  const [name, setName] = useState('')
  const [breed, setBreed] = useState('')
  const [age, setAge] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      await createPet({ name, breed, age: parseInt(age) })
      navigate('/pets')
    } catch {
      setError('Failed to add pet.')
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h1>PupsPlay</h1>
      <h2>Add a Pet</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Breed" value={breed} onChange={e => setBreed(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required min={0} />
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        <button type="submit">Add Pet</button>
      </form>
    </div>
  )
}
