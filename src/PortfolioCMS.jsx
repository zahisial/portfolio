import { useState, useEffect, useCallback } from 'react'
import { webflowProjects, wordpressProjects, reactProjects, governmentProjects } from './data/projects'

// ── Types/constants ──────────────────────────────────────────────────────────
const CATS = ['webflow', 'wordpress', 'react', 'government']

const CAT_COLORS = {
  webflow: '#146ef5', wordpress: '#e87a7a', react: '#7de2c4', government: '#c084fc',
}
const CAT_LABELS = {
  webflow: 'Webflow', wordpress: 'WordPress', react: 'React / Next.js', government: 'Government',
}

const EMPTY = { num: '', title: '', domain: '', desc: '', tags: [], url: '', badge: '' }

// Load initial data from the actual projects.js file
const INITIAL_PROJECTS = {
  webflow: webflowProjects,
  wordpress: wordpressProjects,
  react: reactProjects,
  government: governmentProjects,
}

// ── Save to projects.js via Vite dev API ─────────────────────────────────────
async function saveProjectsToFile(projects) {
  try {
    const res = await fetch('/api/save-projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projects),
    })
    const data = await res.json()
    return data.success
  } catch {
    return false
  }
}

// ── Small UI components ───────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, background: '#1a2540', color: '#e8c87a', padding: '12px 20px', borderRadius: 10, fontSize: 13, fontFamily: 'monospace', border: '1px solid rgba(232,200,122,0.3)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
      ✓ {msg}
    </div>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: '#0f1521', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 500, color: '#e8eaf0' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', rows, hint }) {
  const s = { width: '100%', background: '#090d13', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#e8eaf0', fontSize: 13, padding: '8px 12px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }
  return (
    <div style={{ marginBottom: 13 }}>
      <label style={{ display: 'block', fontSize: 11, color: '#94a3b8', marginBottom: 5, fontFamily: 'monospace' }}>
        {label}{hint && <span style={{ marginLeft: 6, color: '#64748b' }}>{hint}</span>}
      </label>
      {type === 'textarea'
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows || 3} style={{ ...s, resize: 'vertical' }} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} style={s} />
      }
    </div>
  )
}

// ── Project Form ──────────────────────────────────────────────────────────────
function ProjectForm({ initial, onSave, onClose, category }) {
  const [p, setP] = useState({ ...EMPTY, ...initial })
  const set = k => v => setP(prev => ({ ...prev, [k]: v }))
  const showBadge = category === 'react' || category === 'government'

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Number (e.g. 19 or WP·07)" value={p.num} onChange={set('num')} />
        <Field label="Title" value={p.title} onChange={set('title')} />
      </div>
      <Field label="Domain / URL label" value={p.domain} onChange={set('domain')} />
      <Field label="Description" value={p.desc} onChange={set('desc')} type="textarea" rows={3} />
      <Field
        label="Tags" hint="comma separated"
        value={Array.isArray(p.tags) ? p.tags.join(', ') : p.tags}
        onChange={v => setP(prev => ({ ...prev, tags: v.split(',').map(t => t.trim()).filter(Boolean) }))}
      />
      <Field label="Live URL" value={p.url} onChange={set('url')} hint="blank = Private Client" />
      {showBadge && <Field label="Badge label" value={p.badge || ''} onChange={set('badge')} hint="e.g. Next.js, Liferay DXP" />}
      <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
        <button
          onClick={() => { if (!p.title) return alert('Title is required'); onSave(p) }}
          style={{ flex: 1, padding: '10px 0', background: '#e8c87a', color: '#090d13', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'monospace' }}
        >
          Save Project
        </button>
        <button onClick={onClose} style={{ padding: '10px 20px', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, category, onEdit, onDelete }) {
  const color = CAT_COLORS[category]
  const [confirm, setConfirm] = useState(false)

  return (
    <div style={{ background: '#131c2b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 11, color }}>{project.num}</span>
        {project.badge && (
          <span style={{ fontFamily: 'monospace', fontSize: 10, padding: '2px 8px', borderRadius: 99, background: `${color}18`, color, border: `1px solid ${color}30` }}>
            {project.badge}
          </span>
        )}
      </div>
      <div style={{ fontFamily: 'Georgia,serif', fontSize: 15, color: '#e8eaf0' }}>{project.title}</div>
      <div style={{ fontSize: 11, color: '#5ba4f5', fontFamily: 'monospace' }}>{project.domain}</div>
      <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
        {project.desc}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {(project.tags || []).map(t => (
          <span key={t} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontFamily: 'monospace' }}>{t}</span>
        ))}
      </div>
      {project.url && (
        <a href={project.url} target="_blank" rel="noreferrer" style={{ fontSize: 11, color, fontFamily: 'monospace', textDecoration: 'none', marginTop: 2 }}>
          ↗ {project.domain}
        </a>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button onClick={() => onEdit(project)} style={{ flex: 1, padding: '6px 0', background: 'rgba(232,200,122,0.1)', color: '#e8c87a', border: '1px solid rgba(232,200,122,0.2)', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: 'monospace' }}>
          ✎ Edit
        </button>
        {confirm
          ? <button onClick={() => onDelete(project)} style={{ flex: 1, padding: '6px 0', background: 'rgba(232,122,122,0.2)', color: '#e87a7a', border: '1px solid rgba(232,122,122,0.3)', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: 'monospace' }}>
              Confirm Delete?
            </button>
          : <button onClick={() => setConfirm(true)} style={{ flex: 1, padding: '6px 0', background: 'transparent', color: '#64748b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: 'monospace' }}>
              ✕ Delete
            </button>
        }
      </div>
    </div>
  )
}

// ── Main CMS ──────────────────────────────────────────────────────────────────
export default function PortfolioCMS() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS)
  const [activeCat, setActiveCat] = useState('webflow')
  const [modal, setModal] = useState(null)   // { mode:'add'|'edit', project, index }
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)

  const showToast = useCallback((msg) => setToast(msg), [])

  // Save to projects.js file
  const persist = useCallback(async (updated) => {
    setSaving(true)
    setProjects(updated)
    const ok = await saveProjectsToFile(updated)
    setSaving(false)
    showToast(ok ? 'projects.js updated ✓' : 'Saved in memory (dev server needed for file write)')
  }, [showToast])

  const handleSave = (p) => {
    if (!modal) return
    const updated = { ...projects }
    if (modal.mode === 'add') {
      updated[activeCat] = [...updated[activeCat], p]
    } else if (modal.index !== null) {
      updated[activeCat] = updated[activeCat].map((x, i) => i === modal.index ? p : x)
    }
    persist(updated)
    setModal(null)
  }

  const handleDelete = (project) => {
    const updated = { ...projects, [activeCat]: projects[activeCat].filter(p => p !== project) }
    persist(updated)
  }

  const nav = [
    { key: 'projects', label: 'Projects', icon: '⊞' },
  ]

  const totalProjects = CATS.reduce((sum, c) => sum + projects[c].length, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#090d13', color: '#e8eaf0', fontFamily: "'DM Sans',system-ui,sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(9,13,19,0.98)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(232,200,122,0.12)', border: '1px solid rgba(232,200,122,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>⬡</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Portfolio CMS</div>
            <div style={{ fontSize: 10, color: '#64748b', fontFamily: 'monospace' }}>Zahid Sher Sial · {totalProjects} projects</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {saving && <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#94a3b8' }}>Saving…</span>}
          <a href="/" style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.04)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: 'monospace', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            ← Back to Site
          </a>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: 24, maxWidth: 1300, margin: '0 auto' }}>

        {/* Info banner */}
        <div style={{ background: 'rgba(232,200,122,0.06)', border: '1px solid rgba(232,200,122,0.15)', borderRadius: 10, padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 14 }}>⚡</span>
          <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>
            Add, edit or delete projects below — changes are <strong style={{ color: '#e8c87a' }}>written directly to <code style={{ fontSize: 11 }}>src/data/projects.js</code></strong> via the Vite dev server. Vite will hot-reload your portfolio instantly.
          </span>
        </div>

        {/* Category tabs + Add button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CATS.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                style={{ padding: '7px 18px', background: activeCat === cat ? `${CAT_COLORS[cat]}18` : 'transparent', color: activeCat === cat ? CAT_COLORS[cat] : '#94a3b8', border: `1px solid ${activeCat === cat ? `${CAT_COLORS[cat]}40` : 'rgba(255,255,255,0.08)'}`, borderRadius: 99, fontSize: 12, cursor: 'pointer', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 6 }}>
                {CAT_LABELS[cat]}
                <span style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 99, padding: '1px 7px', fontSize: 10 }}>{projects[cat].length}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setModal({ mode: 'add', project: { ...EMPTY }, index: null })}
            style={{ padding: '9px 20px', background: 'rgba(232,200,122,0.12)', color: '#e8c87a', border: '1px solid rgba(232,200,122,0.25)', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            + Add Project
          </button>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
          {projects[activeCat].map((p, i) => (
            <ProjectCard
              key={i}
              project={p}
              category={activeCat}
              onEdit={proj => setModal({ mode: 'edit', project: { ...proj }, index: i })}
              onDelete={handleDelete}
            />
          ))}
          {projects[activeCat].length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: '#64748b', fontSize: 13, fontFamily: 'monospace' }}>
              No {CAT_LABELS[activeCat]} projects yet — click "+ Add Project"
            </div>
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {modal && (
        <Modal
          title={modal.mode === 'add' ? `Add ${CAT_LABELS[activeCat]} Project` : 'Edit Project'}
          onClose={() => setModal(null)}
        >
          <ProjectForm
            initial={modal.project}
            onSave={handleSave}
            onClose={() => setModal(null)}
            category={activeCat}
          />
        </Modal>
      )}

      {/* ── Toast ── */}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
