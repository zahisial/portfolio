export default function Hero() {
  const tags = ['UI / UX Design', 'React · Next.js', 'WordPress / Elementor', 'Cloud SaaS Products', 'Performance Optimisation', 'Figma · Prototyping', 'Bubble.io']

  return (
    <div className="flex relative z-10 flex-col justify-center px-5 pt-32 pb-16 mx-auto max-w-6xl min-h-screen md:px-12 md:pt-40 md:pb-20">
      <div className="hero-label font-mono text-sm tracking-widest mb-6 md:mb-8"
        style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Zahid Sher Sial · UI/UX DESIGNER &amp; FULL-STACK DEVELOPER
      </div>

      <h1 className="font-serif mb-6" style={{ fontSize: 'clamp(40px,7vw,96px)', lineHeight: 1.05, color: 'var(--text)' }}>
        I design <em className="not-italic" style={{ color: 'var(--accent)' }}>experiences</em><br />
        and build the code<br />behind them.
      </h1>

      <p className="text-base mb-8 md:text-lg md:mb-12 max-w-[540px]" style={{ color: 'var(--muted)' }}>
        Based in Lahore · Available worldwide · Specialist in digital transformation,
        cloud-product UI, and end-to-end web development for enterprise clients.
      </p>
      <div className="flex gap-4 mt-6 mb-6">
        <a href="#contact" className="px-6 py-3 font-semibold rounded-full bg-accent text-bg">Start a Project →</a>
        <a href="#work" className="px-6 py-3 font-semibold rounded-full border border-muted text-muted hover:text-accent">View Work</a>
      </div>
      <div className="flex flex-wrap gap-2 mb-8 md:gap-3 md:mb-12">
        {tags.map(tag => (
          <span key={tag} className="pill">{tag}</span>
        ))}
      </div>
    </div>
  )
}
