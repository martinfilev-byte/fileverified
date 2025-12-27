"use client"

import { useState } from "react"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr("")
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) {
      setErr("Грешна парола.")
      return
    }
    window.location.href = "/admin"
  }

  return (
    <div className="max-w-md rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Admin вход</h1>
      <p className="mt-2 text-slate-600">Въведи паролата за админ панела.</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          type="password"
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Парола"
          required
        />
        {err && <div className="text-sm text-red-600">{err}</div>}
        <button className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700">
          Вход
        </button>
      </form>
    </div>
  )
}