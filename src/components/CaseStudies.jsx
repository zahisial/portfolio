import { caseStudies } from '../data/caseStudies'

function CaseStudyCard({ cs, zIndex }) {
  return (
    <article className={`lg:sticky lg:top-24 mb-8 lg:mb-0`} style={{ zIndex }}>
      <div className="cs-card reveal">
        <div className="p-5 md:p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 md:gap-6 lg:gap-10">
          <div>
            <div className="mb-1 font-mono text-xs md:text-sm" style={{ color: 'var(--accent)' }}>
              CASE STUDY · {cs.num}
            </div>
            <h3 className="mb-1 font-serif text-2xl md:text-3xl lg:text-4xl">{cs.company}</h3>
            <div className="text-xs md:text-sm lg:text-base" style={{ color: 'var(--muted)' }}>{cs.desc}</div>
          </div>
          <div className="flex flex-wrap gap-1 items-start md:gap-2 lg:gap-3">
            {cs.tags.map(tag => (
              <span key={tag} className="px-2 py-1 font-mono text-xs rounded-full border md:px-3 md:py-1.5 md:text-sm"
                style={{ background: 'rgba(232,200,122,0.1)', color: 'var(--accent)', borderColor: 'rgba(232,200,122,0.2)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />

        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            { label: 'Challenge', dot: 'var(--dot-challenge)', items: cs.challenge },
            { label: 'Solution', dot: '#5ba4f5', items: cs.solution },
            { label: 'Outcome', dot: '#7de2c4', items: cs.outcome },
          ].map((col, i) => (
            <div key={col.label} className="p-4 md:p-6 lg:p-10"
              style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex gap-2 items-center mb-3 font-mono text-xs uppercase md:mb-4 md:text-sm" style={{ color: 'var(--text)' }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: col.dot }} />
                {col.label}
              </div>
              <ul className="pl-4 space-y-1 text-xs list-disc md:text-sm" style={{ color: 'var(--muted)' }}>
                {col.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 justify-between items-start px-4 py-3 border-t md:px-6 md:py-4 lg:px-10 lg:py-6 md:flex-row md:items-center"
          style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>
          <div className="flex flex-wrap gap-3 md:gap-6 lg:gap-8">
            {cs.metrics.map(([val, label]) => (
              <div key={label} className="metric">
                <span className="metric-val text-lg md:text-xl lg:text-2xl">{val}</span>
                <span className="metric-label">{label}</span>
              </div>
            ))}
          </div>
          {cs.link ? (
            <a href={cs.link} target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs no-underline transition-transform md:text-sm hover:translate-x-1"
              style={{ color: 'var(--accent)' }}>
              {cs.linkLabel}
            </a>
          ) : (
            <span className="font-mono text-xs opacity-60" style={{ color: 'var(--muted)' }}>Internal</span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function CaseStudies() {
  return (
    <section id="work" className="relative z-10 px-5 py-16 mx-auto max-w-6xl md:px-12 md:py-24">
      <div className="flex flex-col gap-2 items-start justify-between mb-12 md:flex-row md:items-end md:mb-16">
        <div>
          <div className="mb-1 font-mono text-xs tracking-wider uppercase md:mb-2 md:text-sm" style={{ color: 'rgba(232,200,122,0.8)' }}>
            Selected Work · 2024–2025
          </div>
          <h2 className="font-serif text-3xl font-normal md:text-5xl">Case Studies</h2>
        </div>
        <div className="font-serif text-3xl md:text-4xl" style={{ color: 'rgba(232,200,122,0.3)' }}>03</div>
      </div>

      <div className="relative">
        {caseStudies.map((cs, i) => (
          <CaseStudyCard key={cs.num} cs={cs} zIndex={10 + i * 10} />
        ))}
      </div>
    </section>
  )
}
