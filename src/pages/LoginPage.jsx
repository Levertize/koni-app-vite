import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ROLE_REDIRECT = {
  admin:   '/admin/dashboard',
  pelatih: '/dashboard/pelatih',
  atlet:   '/dashboard/atlet',
  wasit:   '/dashboard/wasit',
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()

  const [form, setForm]         = useState({ username: '', password: '' })
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPass, setShowPass] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(form.username, form.password)

    if (result.success) {
      const from = location.state?.from?.pathname
      navigate(from || ROLE_REDIRECT[result.role] || '/', { replace: true })
    } else {
      setError(result.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 py-12 font-sans">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm mb-4">
            <img src="/logo_koni.png" alt="KONI Banyumas" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">KONI Kabupaten Banyumas</h1>
          <p className="text-slate-500 text-sm mt-1">Sistem Informasi Olahraga Terpadu</p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Masuk ke Portal</h2>

          {error && (
            <div className="flex items-start gap-2.5 p-3.5 mb-6 bg-rose-50 border border-rose-100 rounded-xl">
              <svg className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-xs font-medium text-rose-800 leading-normal">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Username</label>
              <input
                type="text"
                required
                autoFocus
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-normal text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all"
                placeholder="Masukkan username Anda"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-normal text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all"
                  placeholder="Masukkan password Anda"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors text-xs font-medium"
                >
                  {showPass ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-sm font-semibold rounded-xl transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75"></path></svg>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk ke Portal</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')} 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  )
}
