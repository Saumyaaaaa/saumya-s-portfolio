import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const TABS = ['About', 'Projects', 'Experience', 'Skills', 'Education', 'Messages']

function Input({ label, value, onChange, type = 'text', multi = false, placeholder = '' }: any) {
  const style: any = { width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', fontFamily: 'inherit', background: '#fff', color: '#111' }
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' }}>{label}</label>}
      {multi
        ? <textarea style={{ ...style, minHeight: 80, resize: 'vertical' }} value={value || ''} onChange={(e: any) => onChange(e.target.value)} placeholder={placeholder} />
        : <input style={style} type={type} value={value || ''} onChange={(e: any) => onChange(e.target.value)} placeholder={placeholder} />}
    </div>
  )
}

function Btn({ children, onClick, variant = 'primary', small = false, disabled = false }: any) {
  const base: any = { border: 'none', borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: small ? 13 : 14, padding: small ? '6px 14px' : '9px 20px', opacity: disabled ? 0.5 : 1, transition: 'all .15s' }
  const v: any = {
    primary: { ...base, background: '#6366f1', color: '#fff' },
    danger: { ...base, background: '#ef4444', color: '#fff' },
    ghost: { ...base, background: 'transparent', color: '#6366f1', border: '1px solid #6366f1' },
  }
  return <button style={v[variant]} onClick={onClick} disabled={disabled}>{children}</button>
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ background: '#fff', padding: 36, borderRadius: 16, border: '1px solid #e5e7eb', width: 380, boxShadow: '0 4px 24px #0001' }}>
        <h2 style={{ margin: '0 0 6px', fontSize: 22, color: '#111' }}>Portfolio Admin</h2>
        <p style={{ margin: '0 0 24px', color: '#6b7280', fontSize: 14 }}>Sign in to manage your content</p>
        <Input label="Email" type="email" value={email} onChange={setEmail} />
        <Input label="Password" type="password" value={password} onChange={setPassword} />
        {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <Btn onClick={handleLogin} disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</Btn>
        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 16 }}>
          First time? Supabase → Authentication → Users → Add User
        </p>
      </div>
    </div>
  )
}

function AboutTab() {
  const [data, setData] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.from('about').select('*').single().then(({ data }) => data && setData(data))
  }, [])

  async function save() {
    setSaving(true)
    const { id, ...rest } = data
    if (id) await supabase.from('about').update(rest).eq('id', id)
    else await supabase.from('about').insert([rest])
    setSaving(false); setMsg('✓ Saved!')
    setTimeout(() => setMsg(''), 2500)
  }

  const f = (label: string, key: string, opts: any = {}) => (
    <Input key={key} label={label} value={data[key]} onChange={(v: string) => setData((d: any) => ({ ...d, [key]: v }))} {...opts} />
  )

  return (
    <div>
      <h3 style={{ margin: '0 0 20px', color: '#111' }}>About You</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          {f('Full Name', 'name', { placeholder: 'Saumya Neupane' })}
          {f('Email', 'email', { type: 'email' })}
          {f('Location', 'location', { placeholder: 'Kathmandu, Nepal' })}
          {f('GitHub URL', 'github_url')}
        </div>
        <div>
          {f('Tagline', 'tagline', { placeholder: 'QA Analyst & AI Aspirant' })}
          {f('LinkedIn URL', 'linkedin_url')}
          {f('Profile Image URL', 'profile_image_url', { placeholder: 'https://...' })}
          {f('Resume PDF URL', 'resume_url', { placeholder: 'https://...' })}
        </div>
      </div>
      {f('Bio', 'bio', { multi: true, placeholder: 'Write a short bio about yourself...' })}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Btn onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Btn>
        {msg && <span style={{ color: '#10b981', fontWeight: 600 }}>{msg}</span>}
      </div>
    </div>
  )
}

function ListTab({ table, title, fields, empty }: any) {
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from(table).select('*').order('order_index', { ascending: true })
      .then(({ data }) => setItems(data || []))
  }, [table])

  async function save(item: any) {
    setSaving(true)
    const { id, ...rest } = item
    if (id) {
      const { data } = await supabase.from(table).update(rest).eq('id', id).select()
      setItems(i => i.map(x => x.id === id ? data![0] : x))
    } else {
      const { data } = await supabase.from(table).insert([rest]).select()
      setItems(i => [...i, data![0]])
    }
    setEditing(null); setSaving(false)
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this item?')) return
    await supabase.from(table).delete().eq('id', id)
    setItems(i => i.filter(x => x.id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ margin: 0, color: '#111' }}>{title}</h3>
        <Btn onClick={() => setEditing({ ...empty })}>+ Add New</Btn>
      </div>

      {items.length === 0 && (
        <p style={{ color: '#9ca3af', fontSize: 14, padding: '20px 0' }}>No items yet. Click "+ Add New" to start.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(item => (
          <div key={item.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#111' }}>{item[fields[0].key]}</div>
              {fields[1] && <div style={{ fontSize: 13, color: '#6b7280', marginTop: 3 }}>{item[fields[1].key]}</div>}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn small variant="ghost" onClick={() => setEditing({ ...item })}>Edit</Btn>
              <Btn small variant="danger" onClick={() => remove(item.id)}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: '#0007', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 560, maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px #0004' }}>
            <h4 style={{ margin: '0 0 20px', color: '#111' }}>{editing.id ? 'Edit' : 'Add'} {title.replace(/s$/, '')}</h4>
            {fields.map((f: any) => (
              <Input
                key={f.key}
                label={f.label}
                value={Array.isArray(editing[f.key]) ? editing[f.key].join(', ') : editing[f.key]}
                onChange={(v: string) => setEditing((e: any) => ({ ...e, [f.key]: f.isArray ? v.split(',').map((s: string) => s.trim()).filter(Boolean) : v }))}
                multi={f.multi}
                type={f.type || 'text'}
                placeholder={f.placeholder || ''}
              />
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <Btn onClick={() => save(editing)} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn>
              <Btn variant="ghost" onClick={() => setEditing(null)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MessagesTab() {
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setMessages(data || []))
  }, [])

  async function markRead(id: string) {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id)
    setMessages(m => m.map(x => x.id === id ? { ...x, is_read: true } : x))
  }

  return (
    <div>
      <h3 style={{ margin: '0 0 20px', color: '#111' }}>Contact Messages</h3>
      {messages.length === 0 && <p style={{ color: '#9ca3af', fontSize: 14 }}>No messages yet.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map(m => (
          <div key={m.id} style={{ background: m.is_read ? '#fff' : '#eff6ff', border: `1px solid ${m.is_read ? '#e5e7eb' : '#93c5fd'}`, borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>{m.name}</span>
                <span style={{ color: '#6b7280', fontSize: 13 }}>{m.email}</span>
                {!m.is_read && <span style={{ background: '#3b82f6', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>NEW</span>}
              </div>
              <span style={{ color: '#9ca3af', fontSize: 12 }}>{new Date(m.created_at).toLocaleDateString()}</span>
            </div>
            <p style={{ margin: '0 0 12px', fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{m.message}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href={`mailto:${m.email}`} style={{ textDecoration: 'none' }}><Btn small variant="ghost">Reply via Email</Btn></a>
              {!m.is_read && <Btn small variant="ghost" onClick={() => markRead(m.id)}>Mark as Read</Btn>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('About')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false) })
    supabase.auth.onAuthStateChange((_, s) => setSession(s))
  }, [])

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#9ca3af', fontSize: 16 }}>Loading…</div>
  if (!session) return <Login />

  const tabs: any = {
    About: <AboutTab />,
    Projects: <ListTab table="projects" title="Projects"
      empty={{ title: '', description: '', tech_stack: [], github_url: '', live_url: '', image_url: '', featured: false, order_index: 0 }}
      fields={[
        { key: 'title', label: 'Project Title', placeholder: 'e.g. QA Automation Framework' },
        { key: 'description', label: 'Description', multi: true },
        { key: 'tech_stack', label: 'Tech Stack (comma separated)', placeholder: 'React, Python, Selenium', isArray: true },
        { key: 'github_url', label: 'GitHub URL' },
        { key: 'live_url', label: 'Live Demo URL' },
        { key: 'image_url', label: 'Screenshot URL' },
        { key: 'order_index', label: 'Display Order (0 = first)', type: 'number' },
      ]} />,
    Experience: <ListTab table="experience" title="Experience"
      empty={{ company: '', role: '', start_date: '', end_date: '', description: '', order_index: 0 }}
      fields={[
        { key: 'company', label: 'Company Name' },
        { key: 'role', label: 'Your Role / Title' },
        { key: 'start_date', label: 'Start Date', placeholder: 'e.g. Jan 2023' },
        { key: 'end_date', label: 'End Date (leave blank if current)', placeholder: 'e.g. Present' },
        { key: 'description', label: 'What you did there', multi: true },
        { key: 'order_index', label: 'Display Order', type: 'number' },
      ]} />,
    Skills: <ListTab table="skills" title="Skills"
      empty={{ name: '', category: '', proficiency: 3, order_index: 0 }}
      fields={[
        { key: 'name', label: 'Skill Name', placeholder: 'e.g. Selenium' },
        { key: 'category', label: 'Category', placeholder: 'QA / AI-ML / Tools / Languages' },
        { key: 'proficiency', label: 'Proficiency 1-5', type: 'number' },
        { key: 'order_index', label: 'Display Order', type: 'number' },
      ]} />,
    Education: <ListTab table="education" title="Education"
      empty={{ institution: '', degree: '', field_of_study: '', start_year: '', end_year: '', description: '', order_index: 0 }}
      fields={[
        { key: 'institution', label: 'University / School' },
        { key: 'degree', label: 'Degree', placeholder: 'e.g. BSc Computer Science' },
        { key: 'field_of_study', label: 'Field of Study' },
        { key: 'start_year', label: 'Start Year', type: 'number' },
        { key: 'end_year', label: 'End Year', type: 'number' },
        { key: 'description', label: 'Notes', multi: true },
      ]} />,
    Messages: <MessagesTab />,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontWeight: 800, fontSize: 17, color: '#111' }}>Portfolio CMS</span>
          <span style={{ background: '#d1fae5', color: '#065f46', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>ADMIN</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="/" target="_blank" style={{ fontSize: 13, color: '#6366f1', textDecoration: 'none', fontWeight: 500 }}>View Portfolio →</a>
          <Btn small variant="ghost" onClick={() => supabase.auth.signOut()}>Log Out</Btn>
        </div>
      </div>

      <div style={{ display: 'flex', maxWidth: 1100, margin: '32px auto', padding: '0 24px', gap: 28 }}>
        <div style={{ width: 170, flexShrink: 0 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: tab === t ? 700 : 400, background: tab === t ? '#ede9fe' : 'transparent', color: tab === t ? '#6366f1' : '#374151', marginBottom: 2 }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: 32, minHeight: 500 }}>
          {tabs[tab]}
        </div>
      </div>
    </div>
  )
}
