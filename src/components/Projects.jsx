import { useState, useEffect, useRef } from 'react'
import { webflowProjects, wordpressProjects, reactProjects, governmentProjects, ongoingProjects } from '../data/projects'

const FILTERS = [
  { key: 'webflow', label: 'Webflow' },
  { key: 'react', label: 'React' },
  { key: 'wordpress', label: 'WordPress' },
  { key: 'government', label: 'Government' },
  // { key: 'ongoing', label: 'Ongoing' },
]

const ACTIVE_STYLES = {
  webflow:    { background: 'rgb(20,110,245)',               color: '#fff',          borderColor: 'rgba(255,255,255,0.3)' },
  react:      { background: 'var(--accent3)',                color: 'var(--bg)',     borderColor: 'rgba(125,226,196,0.3)' },
  wordpress:  { background: 'var(--dot-challenge)',          color: 'var(--bg)',     borderColor: 'rgba(255,255,255,0.3)' },
  government: { background: 'var(--badge-government-color)', color: '#fff',          borderColor: 'rgba(255,255,255,0.3)' },
  ongoing:    { background: 'var(--ongoing-color)',          color: '#fff',          borderColor: 'rgba(251,191,36,0.3)' },
}

const BADGE_STYLES = {
  webflow:    { background: 'rgba(20,110,245,0.1)',   color: 'rgb(20,110,245)',               borderColor: 'rgba(20,110,245,0.25)' },
  wordpress:  { background: 'rgba(232,122,122,0.1)', color: 'var(--dot-challenge)',           borderColor: 'rgba(232,122,122,0.25)' },
  react:      { background: 'rgba(125,226,196,0.1)', color: 'var(--accent3)',                 borderColor: 'rgba(125,226,196,0.25)' },
  government: { background: 'rgba(192,132,252,0.26)',color: 'var(--badge-government-color)',  borderColor: 'rgba(192,132,252,0.25)' },
  ongoing:    { background: 'rgba(251,191,36,0.1)',  color: 'var(--ongoing-color)',           borderColor: 'rgba(251,191,36,0.25)' },
}

const DOT_COLORS = {
  webflow:    'rgb(20,110,245)',
  react:      'var(--accent3)',
  wordpress:  'var(--dot-challenge)',
  government: 'var(--badge-government-color)',
  ongoing:    'var(--ongoing-color)',
}

const GROUP_LABELS = {
  webflow:    'Webflow Projects',
  react:      'React · Next.js · Tailwind Projects',
  wordpress:  'WordPress Projects',
  government: 'Government & Enterprise Portals',
  ongoing:    'Ongoing Projects',
}

const BADGE_LABEL = {
  webflow:    () => 'Webflow',
  wordpress:  () => 'WordPress',
  react:      (p) => p.badge || 'React',
  government: (p) => p.badge || 'Liferay DXP',
  ongoing:    (p) => p.badge || 'In Progress',
}

const LINK_COLORS = {
  webflow:    'rgb(20,110,245)',
  react:      'var(--accent3)',
  wordpress:  'var(--dot-challenge)',
  government: 'var(--badge-government-color)',
  ongoing:    'var(--ongoing-color)',
}

const ALL_GROUPS = [
  { key: 'webflow',    projects: webflowProjects,    cols: 'md:grid-cols-2 lg:grid-cols-3' },
  { key: 'wordpress',  projects: wordpressProjects,  cols: 'md:grid-cols-2 lg:grid-cols-3' },
  { key: 'react',      projects: reactProjects,      cols: 'md:grid-cols-2 lg:grid-cols-3' },
  { key: 'government', projects: governmentProjects,  cols: 'md:grid-cols-2' },
  { key: 'ongoing',    projects: ongoingProjects,     cols: 'md:grid-cols-2 lg:grid-cols-3' },
]

function ProjectCard({ project, category }) {
  const bs = BADGE_STYLES[category]
  const lc = LINK_COLORS[category]
  const nc = DOT_COLORS[category]
  const bl = BADGE_LABEL[category](project)

  return (
    <div className="wf-card reveal" data-category={category}>
      <div className="flex justify-between items-start mb-4">
        <div className="font-mono text-sm" style={{ color: nc }}>{project.num}</div>
        <div className="font-mono text-sm px-2.5 py-1 rounded-full border" style={bs}>{bl}</div>
      </div>
      <div className="mb-1 font-serif text-xl">{project.title}</div>
      <div className="mb-2 text-sm" style={{ color: 'var(--muted)' }}>{project.domain}</div>
      <div className="mb-4 text-sm line-clamp-3" style={{ color: 'var(--muted)' }}>{project.desc}</div>
      <div className="flex flex-wrap gap-1 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="pill">{tag}</span>
        ))}
      </div>
      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer"
          className="mt-auto font-mono text-sm no-underline transition-transform hover:translate-x-1"
          style={{ color: lc }}>
          Visit →
        </a>
      ) : (
        <span className="mt-auto font-mono text-sm opacity-60 cursor-not-allowed" style={{ color: 'var(--muted)' }}>
          {category === 'government' ? 'Government Internal' : 'Private Client'}
        </span>
      )}
    </div>
  )
}

function ProjectGroup({ group, isVisible }) {
  const { key, projects, cols } = group
  return (
    // Always in DOM — display toggled, matching original HTML exactly
    <div className="mb-12 wf-group" data-category={key} style={{ display: isVisible ? '' : 'none' }}>
      <div className="relative z-10 px-5 pt-8 pb-0 mx-auto max-w-6xl md:px-12 md:pt-12">
        <div className="flex gap-2 items-center mb-4 md:gap-3 md:mb-6">
          <span className="w-2 h-2 rounded-full md:w-3 md:h-3" style={{ background: DOT_COLORS[key] }} />
          <span className="font-mono text-xs md:text-sm" style={{ color: 'var(--text)' }}>{GROUP_LABELS[key]}</span>
        </div>
      </div>
      <div className={`grid grid-cols-1 gap-4 px-5 mx-auto mb-16 max-w-7xl md:px-12 md:mb-24 ${cols}`}>
        {projects.map(p => (
          <ProjectCard key={p.num} project={p} category={key} />
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('webflow')
  const timerRef        = useRef(null)
  const activeFilterRef = useRef('webflow')
  const hoverCount      = useRef(0)
  const paused          = useRef(false)

  useEffect(() => { activeFilterRef.current = activeFilter }, [activeFilter])

  // Re-trigger reveal animation when switching tabs
  useEffect(() => {
    const group = document.querySelector(`.wf-group[data-category="${activeFilter}"]`)
    if (!group) return
    const cards = group.querySelectorAll('.reveal')
    // Small delay to allow display:block to take effect
    requestAnimationFrame(() => {
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.07}s`
        card.classList.add('visible')
      })
    })
  }, [activeFilter])

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    const keys = FILTERS.map(f => f.key)
    timerRef.current = setInterval(() => {
      if (paused.current || document.hidden) return
      const next = (keys.indexOf(activeFilterRef.current) + 1) % keys.length
      setActiveFilter(keys[next])
    }, 5000)
  }

  useEffect(() => {
    startTimer()
    const onVis = () => { paused.current = document.hidden }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      clearInterval(timerRef.current)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const handleFilterClick = (key) => {
    setActiveFilter(key)
    startTimer()
  }

  const hoverIn  = () => { hoverCount.current++; paused.current = true }
  const hoverOut = () => {
    hoverCount.current = Math.max(0, hoverCount.current - 1)
    if (hoverCount.current === 0) paused.current = false
  }

  return (
    <div id="webflow">
      <div className="relative z-10 px-5 pt-16 pb-0 mx-auto max-w-6xl md:px-12 md:pt-24">

        {/* Filter bar */}
        <div
          className="filter-bar-container flex flex-wrap gap-2 justify-center mb-10 w-full md:gap-3 md:mb-12"
          onMouseEnter={hoverIn} onMouseLeave={hoverOut}
        >
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => handleFilterClick(f.key)}
              className="filter-btn w-full sm:w-[200px] px-5 py-2.5 font-mono text-sm rounded-full border transition-all duration-300 cursor-pointer"
              style={activeFilter === f.key ? ACTIVE_STYLES[f.key] : {}}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Heading */}
        <div className="flex justify-center items-end mb-12 md:mb-16">
          <div>
            <div className="mb-2 font-mono text-xs tracking-wider text-center uppercase md:text-sm"
              style={{ color: 'rgba(232,200,122,0.8)' }}>
              Development · 2025–2026
            </div>
            <h2 className="font-serif text-4xl font-normal md:text-5xl">
              <span className="font-serif text-3xl md:text-4xl" style={{ color: 'var(--accent)' }}>35+</span>{' '}Projects
            </h2>
          </div>
        </div>
      </div>

      {/* All groups always in DOM */}
      <div onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
        {ALL_GROUPS.map(g => (
          <ProjectGroup key={g.key} group={g} isVisible={activeFilter === g.key} />
        ))}
      </div>

      <div className="h-20" />
    </div>
  )
}