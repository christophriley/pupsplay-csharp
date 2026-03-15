const BASE = '/api/pets'

export interface Pet {
  id: number
  ownerId: number
  name: string
  breed: string
  age: number
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
}

export async function getPets(): Promise<Pet[]> {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error('Failed to load pets.')
  return res.json()
}

export async function createPet(data: Omit<Pet, 'id' | 'ownerId'>): Promise<Pet> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create pet.')
  return res.json()
}

export async function deletePet(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Failed to delete pet.')
}
