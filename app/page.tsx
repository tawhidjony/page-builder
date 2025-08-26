"use client"

import { useMutation } from "@tanstack/react-query"
import { Suspense, useState } from "react"

export default function EditorPage() {
  const mutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: (data: any) => fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
  })
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: 0
  })
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const data = {
      name: user.name,
      email: user.email,
      age: user.email,
    }
    mutation.mutate(data)
  }
  return (
    <Suspense>
      <form className="flex flex-col gap-2 w-2xl mx-auto border p-4 rounded shadow-lg my-8">
        <input className="border rounded border-gray-200 p-2" type="text" name="name" placeholder="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <input className="border rounded border-gray-200 p-2" type="email" name="email" placeholder="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input className="border rounded border-gray-200 p-2" type="number" name="age" placeholder="age" value={user.age} onChange={(e) => setUser({ ...user, age: Number(e.target.value) })} />

        <button type="submit" className="bg-red-600 px-3 py-1 rounded" onClick={handleSubmit} >Submit</button>
      </form>
    </Suspense>
  )
}
