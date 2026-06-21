import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api, { MEDIA_URL } from '../../api/axios'
import { formatTanggal } from '../../utils/helpers'

// ── Tab Profil ────────────────────────────────────────────────
function TabProfil({ profil }) {
  if (!profil) return (
    <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-md rounded-3xl border border-slate-100 shadow-soft animate-pulse">
      <div className="w-16 h-16 bg-slate-200 rounded-full mb-4"></div>
      <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
      <div className="h-3 bg-slate-100 rounded w-24"></div>
    </div>
  )
  
  const items = [
    ['NIK', profil.nik || '-'],
    ['Tempat Lahir', profil.tempat_lahir || '-'],
    ['Tanggal Lahir', formatTanggal(profil.tanggal_lahir)],
    ['Jenis Kelamin', profil.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'],
    ['No. HP', profil.no_hp || '-'],
    ['Alamat', profil.alamat || '-'],
    ['Cabang Olahraga', profil.cabor_nama || '-'],
    ['Status Keanggotaan', profil.status],
  ]
  
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-soft relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 relative z-10 border-b border-slate-100 pb-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-rose-500/30 ring-4 ring-white">
          <span className="text-white font-black text-3xl">{profil.nama?.[0]}</span>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">{profil.nama}</h2>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
              {profil.cabor_nama}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${profil.status === 'aktif' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
              {profil.status}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 relative z-10">
        {items.map(([l, v]) => (
          <div key={l} className="group">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 group-hover:text-brand-500 transition-colors">{l}</p>
            <p className="text-sm font-semibold text-slate-800 bg-slate-50/50 px-3 py-2 rounded-xl border border-slate-100">{v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Tab Presensi Latihan ──────────────────────────────────────
function TabPresensi() {
  const [data, setData] = useState([])
  const [jadwal, setJadwal] = useState([])

  useEffect(() => {
    api.get('/atlet/presensi').then(r => setData(r.data.data)).catch(() => { })
    api.get('/atlet/jadwal-latihan').then(r => setJadwal(r.data.data)).catch(() => { })
  }, [])

  const statusColor = { 
    hadir: 'bg-emerald-50 text-emerald-700 border-emerald-100', 
    izin: 'bg-blue-50 text-blue-700 border-blue-100', 
    sakit: 'bg-amber-50 text-amber-700 border-amber-100', 
    alpha: 'bg-rose-50 text-rose-700 border-rose-100' 
  }
  const totalHadir = data.filter(d => d.status === 'hadir').length
  const percentage = data.length > 0 ? Math.round((totalHadir / data.length) * 100) : 0

  return (
    <div className="space-y-8">
      {/* Ringkasan */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-soft relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Ringkasan Kehadiran</h3>
            <p className="text-sm text-slate-500 mt-1">Tingkat keaktifan partisipasi program latihan</p>
          </div>
          <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black text-xl shadow-sm border
            ${percentage >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
              percentage >= 50 ? 'bg-amber-50 text-amber-700 border-amber-100' : 
              'bg-rose-50 text-rose-700 border-rose-100'}`}>
            <span>{percentage}%</span>
          </div>
        </div>
        
        <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${
            percentage >= 80 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-brand-500'
          }`} style={{ width: `${percentage}%` }}></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Latihan', value: data.length, color: 'bg-blue-50/55 text-blue-700 border-blue-100' },
            { label: 'Kehadiran', value: totalHadir, color: 'bg-emerald-50/55 text-emerald-700 border-emerald-100' },
            { label: 'Absen / Izin', value: data.length - totalHadir, color: 'bg-rose-50/55 text-rose-700 border-rose-100' },
          ].map(s => (
            <div key={s.label} className={`p-4 border rounded-2xl text-center bg-gradient-to-br from-white to-slate-50/30 ${s.color} shadow-sm`}>
              <p className="text-3xl font-black">{s.value}</p>
              <p className="text-xs font-bold uppercase tracking-wider opacity-85 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Jadwal mendatang */}
      {jadwal.filter(j => j.tanggal >= new Date().toISOString().split('T')[0]).length > 0 && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-soft">
          <h3 className="font-extrabold text-slate-900 text-lg mb-4 ml-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span>
            Jadwal Latihan Mendatang
          </h3>
          <div className="grid gap-3">
            {jadwal.filter(j => j.tanggal >= new Date().toISOString().split('T')[0]).slice(0, 3).map(j => (
              <div key={j.id} className="flex items-center gap-4 p-4 bg-slate-50/60 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-colors duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/10">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-extrabold text-slate-800 leading-snug">{j.judul}</p>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    📅 {formatTanggal(j.tanggal)} <span className="mx-1.5">•</span> 👤 Coach: <span className="text-indigo-600 font-bold">{j.pelatih_nama}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Riwayat presensi */}
      <div>
        <h3 className="font-extrabold text-slate-900 text-lg mb-4 ml-1 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          Riwayat Presensi Latihan
        </h3>
        <div className="card table-wrapper">
          <table className="tbl">
            <thead>
              <tr>
                <th>Sesi Latihan</th>
                <th>Tanggal</th>
                <th>Pelatih</th>
                <th>Status Kehadiran</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-12 text-gray-400">Belum ada riwayat presensi.</td></tr>
              ) : (
                data.map(d => (
                  <tr key={d.id}>
                    <td className="font-bold text-slate-800">{d.latihan_judul}</td>
                    <td className="text-slate-600 font-medium">{formatTanggal(d.tanggal)}</td>
                    <td className="text-slate-500 font-medium">{d.pelatih_nama || '-'}</td>
                    <td>
                      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${statusColor[d.status] || 'bg-gray-100 text-gray-700'}`}>
                        {d.status === 'hadir' ? '✓ Hadir' : d.status === 'izin' ? '✉ Izin' : d.status === 'sakit' ? '⚕ Sakit' : '✕ Alpha'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Tab Prestasi Saya ─────────────────────────────────────────
function TabPrestasi() {
  const [data, setData] = useState([])
  useEffect(() => { api.get('/atlet/prestasi').then(r => setData(r.data.data)).catch(() => { }) }, [])

  const medaliColor = { 
    emas: 'from-amber-400 to-yellow-600 text-white shadow-amber-500/25', 
    perak: 'from-slate-300 to-slate-500 text-white shadow-slate-500/25', 
    perunggu: 'from-orange-400 to-amber-700 text-white shadow-orange-500/25' 
  }
  
  const labelMedali = { emas: 'Emas', perak: 'Perak', perunggu: 'Perunggu' }

  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-12 text-center border border-slate-100 shadow-soft">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🏆</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Belum Ada Prestasi</h3>
          <p className="text-slate-500 text-sm">Terus berlatih dan tunjukkan performa terbaikmu!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map(p => (
            <div key={p.id} className="bg-white/80 backdrop-blur-xl p-5 rounded-3xl border border-slate-100 shadow-soft hover:shadow-md transition-all duration-300 flex items-start gap-4 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-50 to-slate-100/50 rounded-full blur-xl -mr-8 -mt-8 pointer-events-none"></div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${medaliColor[p.medali] || 'from-slate-100 to-slate-200 text-slate-600'} flex flex-col items-center justify-center flex-shrink-0 shadow-lg`}>
                <span className="text-2xl leading-none">{p.medali === 'emas' ? '🥇' : p.medali === 'perak' ? '🥈' : '🥉'}</span>
                <span className="text-[8px] font-black uppercase tracking-wider mt-0.5">{labelMedali[p.medali]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-slate-800 text-base leading-snug group-hover:text-brand-600 transition-colors">{p.nama_kejuaraan}</p>
                <p className="text-sm font-semibold text-slate-500 mt-1">{p.nomor_lomba} <span className="mx-1 text-slate-300">•</span> {p.hasil}</p>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full uppercase tracking-wider">{p.tahun}</span>
                  <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full uppercase tracking-wider">{p.grade}</span>
                  {p.lokasi && <span className="text-xs font-medium text-slate-400 flex items-center gap-1">📍 {p.lokasi}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Tab Sertifikat & Piagam ───────────────────────────────────
function TabSertifikat({ role }) {
  const [list, setList]     = useState([])
  const [file, setFile]     = useState(null)
  const [form, setForm]     = useState({ judul: '', tipe: 'kejuaraan', keterangan: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => { loadList() }, [])

  async function loadList() {
    try {
      const r = await api.get(`/${role}/sertifikat`)
      setList(r.data.data)
    } catch {}
  }

  async function handleUpload() {
    if (!file || !form.judul) return alert('File dan judul wajib diisi.')
    setLoading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('judul', form.judul)
    fd.append('tipe', form.tipe)
    fd.append('keterangan', form.keterangan)
    try {
      await api.post(`/${role}/sertifikat`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setFile(null); setForm({ judul: '', tipe: 'kejuaraan', keterangan: '' })
      loadList()
    } catch (err) { alert(err.response?.data?.message || 'Upload gagal.') }
    setLoading(false)
  }

  async function hapus(id) {
    if (!confirm('Hapus sertifikat ini?')) return
    await api.delete(`/${role}/sertifikat/${id}`)
    loadList()
  }

  const isImage = url => /\.(jpg|jpeg|png|webp)$/i.test(url)

  return (
    <div className="space-y-8">
      {/* Form upload */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-soft">
        <h3 className="font-extrabold text-slate-900 text-lg mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Sertifikat / Piagam Kejuaraan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Judul Dokumen *</label>
            <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none" value={form.judul} onChange={e => setForm(f=>({...f,judul:e.target.value}))} placeholder="Contoh: Juara 1 Lari 100m Kejurnas 2024" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tipe Dokumen</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all appearance-none outline-none" value={form.tipe} onChange={e => setForm(f=>({...f,tipe:e.target.value}))}>
              <option value="kejuaraan">Kejuaraan</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">File (JPG/PNG/PDF) *</label>
            <input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 transition-all cursor-pointer outline-none"
              onChange={e => setFile(e.target.files[0])} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Keterangan Tambahan</label>
            <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none" value={form.keterangan} onChange={e => setForm(f=>({...f,keterangan:e.target.value}))} placeholder="Opsional" />
          </div>
        </div>
        <button className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0" onClick={handleUpload} disabled={loading}>
          {loading ? 'Mengupload...' : 'Simpan Dokumen'}
        </button>
      </div>

      {/* List sertifikat */}
      <div>
        <h3 className="font-extrabold text-slate-900 text-lg mb-4 ml-1">Koleksi Piagam & Sertifikat</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {list.length === 0 ? (
            <div className="col-span-full bg-white/50 backdrop-blur-sm rounded-2xl text-center text-slate-400 py-12 border border-slate-100 border-dashed">Belum ada dokumen tersimpan.</div>
          ) : list.map(s => (
            <div key={s.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-soft transition-all group">
              <div className="relative h-40 bg-slate-100 overflow-hidden">
                {isImage(s.file_url) ? (
                  <img src={`${MEDIA_URL}${s.file_url}`} alt={s.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400">
                    <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dokumen PDF</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">{s.tipe}</div>
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-slate-900 mb-4 line-clamp-2 leading-snug">{s.judul}</p>
                <div className="flex gap-2 mt-auto">
                  <a href={`${MEDIA_URL}${s.file_url}`} target="_blank" rel="noreferrer"
                    className="flex-1 text-xs font-bold text-center py-2 bg-brand-50 text-brand-600 hover:bg-brand-100 rounded-lg transition-colors">
                    Lihat
                  </a>
                  <button onClick={() => hapus(s.id)}
                    className="flex-1 text-xs font-bold text-center py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Dashboard Utama Atlet ────────────────────────────────────
export default function AtletDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab]     = useState('profil')
  const [profil, setProfil] = useState(null)

  useEffect(() => {
    api.get('/atlet/me').then(r => setProfil(r.data.data)).catch(() => { })
  }, [])

  const tabs = [
    { id: 'profil',     label: 'Profil Saya', icon: '👤' },
    { id: 'presensi',   label: 'Presensi Latihan', icon: '📅' },
    { id: 'prestasi',   label: 'Prestasi Saya', icon: '🏆' },
    { id: 'sertifikat', label: 'Sertifikat & Piagam', icon: '🎓' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navbar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-brand-50 p-2 rounded-xl">
            <img src="/logo.png" alt="KONI" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" onError={e => e.target.style.display='none'} />
          </div>
          <div>
            <p className="font-extrabold text-slate-900 text-sm sm:text-base leading-none">Dashboard Atlet</p>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">KONI Banyumas</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-right">
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none">{user?.nama}</p>
              <p className="text-xs font-medium text-brand-600 mt-1">Atlet KONI</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-600">
              {user?.nama?.[0]}
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
          <button onClick={() => { logout(); navigate('/login') }}
            className="text-sm font-bold text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-xl transition-colors">
            Keluar
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Halo, <span className="text-brand-600">{profil?.nama?.split(' ')[0] || user?.nama}</span> 👋
          </h1>
          {profil?.cabor_nama && (
            <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Atlet {profil.cabor_nama} <span className="mx-1">•</span> Status Keanggotaan: <span className="capitalize font-bold text-slate-700">{profil.status}</span>
            </p>
          )}
        </div>

        {/* Custom Tabs */}
        <div className="flex gap-2 sm:gap-3 bg-slate-200/50 p-1.5 rounded-2xl mb-8 w-fit overflow-x-auto max-w-full hide-scrollbar">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${tab === t.id ? 'bg-white text-brand-700 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>
              <span className="text-lg">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {tab === 'profil'     && <TabProfil profil={profil} />}
          {tab === 'presensi'   && <TabPresensi />}
          {tab === 'prestasi'   && <TabPrestasi />}
          {tab === 'sertifikat' && <TabSertifikat role="atlet" />}
        </div>
      </div>
    </div>
  )
}

