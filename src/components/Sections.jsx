export function TrustedBy() {
  return (
    <section className="py-8 px-5 text-center md:py-12 md:px-[5%]" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <p className="font-mono text-xs uppercase tracking-[2px] mb-6 md:text-sm md:mb-8" style={{ color: '#64748b' }}>
        Trusted by brands across UAE &amp; Globally
      </p>
      <div className="flex flex-wrap gap-6 justify-center md:gap-10" style={{ opacity: 0.6, filter: 'grayscale(1)' }}>
        {['UAE Government', 'Edarat', 'Al Ghurair', 'Toptal'].map(b => (
          <span key={b} className="text-base font-bold text-white md:text-lg">{b}</span>
        ))}
      </div>
    </section>
  )
}

export function Stats() {
  const stats = [
    { val: '32+', label: 'Projects Delivered' },
    { val: '16yr', label: 'Industry Experience' },
    { val: '5', label: 'Countries Worked In' },
    { val: 'MENA', label: 'Regional Expertise' },
  ]
  return (
    <div className="px-5 py-8 md:px-12 md:py-10" style={{ background: 'var(--surface)', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="grid grid-cols-2 gap-6 mx-auto max-w-6xl md:grid-cols-4 md:gap-8">
        {stats.map(s => (
          <div key={s.val}>
            <div className="font-serif text-3xl leading-none md:text-4xl" style={{ color: 'var(--accent)' }}>{s.val}</div>
            <div className="mt-1 font-mono text-xs uppercase md:mt-2 md:text-sm" style={{ color: 'var(--muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function About() {
  const certs = [
    { label: 'Certification', name: 'Front-End Development', issuer: 'Meta' },
    { label: 'Certification', name: 'Webflow Layouts', issuer: 'Webflow University' },
    { label: 'Certification', name: 'Adobe Certified Expert', issuer: 'Adobe · Site Power' },
    { label: 'Experience', name: 'Liferay DXP Developer', issuer: 'Udemy' },
  ]

  return (
    <div id="about" className="grid grid-cols-1 gap-10 px-5 py-16 items-center lg:grid-cols-2 lg:gap-20 lg:px-[5%] lg:py-24"
      style={{ background: 'var(--bg)', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div>
        <div className="reveal mb-3 font-mono text-xs tracking-wider uppercase md:mb-4 md:text-sm" style={{ color: 'var(--accent)' }}>
          About Me
        </div>
        <h2 className="reveal font-serif mb-4 md:mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)', color: 'var(--text)', lineHeight: 1.2 }}>
          16 years of craft,<br />delivered at scale.
        </h2>
        <p className="reveal text-base leading-relaxed mb-4 max-w-[540px] md:text-lg md:mb-5" style={{ color: 'var(--muted)' }}>
          I'm Zahid — a UI/UX Designer and Front-End Developer based in Lahore, Pakistan, with
          deep roots across the UAE, UK, and Canada. I've shipped digital products for UAE government
          departments, global FinTech platforms, EdTech startups, and enterprise cloud brands.
        </p>
        <p className="reveal text-base leading-relaxed mb-5 max-w-[540px] md:text-lg" style={{ color: 'var(--muted)' }}>
          My work spans Webflow, WordPress, React, Next.js, Figma, and Tailwind — and I use AI
          tools like Claude and Cursor to deliver faster, better, and at a standard most agencies
          charge triple for.
        </p>
        <div className="flex flex-wrap gap-3 mt-6 md:gap-4 md:mt-8">
          {[
            { href: 'mailto:shersials@gmail.com', label: 'Email', icon: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/> },
            { href: 'https://wa.me/923364199486', label: 'WhatsApp', icon: <path d="M12.031 2C6.51 2 2.032 6.48 2.032 12c0 2.19.71 4.23 1.92 5.89L2 22l4.23-1.89c1.55.95 3.4 1.51 5.39 1.51 5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18c-1.79 0-3.44-.57-4.79-1.54l-.34-.2-2.51 1.12.98-2.46-.21-.34c-1.1-1.51-1.77-3.31-1.77-5.2 0-4.62 3.76-8.38 8.38-8.38s8.38 3.76 8.38 8.38-3.76 8.38-8.38 8.38zm4.59-6.29c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.25-.66.81-.81.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.01-1.24-.74-.67-1.24-1.49-1.39-1.74-.15-.25-.02-.38.11-.5.12-.12.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.21-.5-.41-.43-.57-.44-.15 0-.31-.02-.48-.02-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.57.13.17 1.76 2.68 4.26 3.75 2.5 1.07 2.5.71 2.95.67.45-.04 1.45-.59 1.65-1.16.21-.57.21-1.05.15-1.16-.06-.11-.22-.17-.47-.3z"/> },
            { href: 'https://www.linkedin.com/in/zahidshersial', label: 'LinkedIn', icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> },
          ].map(btn => (
            <a key={btn.label} href={btn.href} target={btn.href.startsWith('http') ? '_blank' : undefined}
              className="px-3 py-1.5 font-mono text-xs no-underline rounded border transition-all duration-300 hover:-translate-y-0.5 md:px-4 md:py-2 md:text-sm flex items-center gap-2"
              style={{ color: 'var(--text)', background: 'var(--surface)', borderColor: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text)' }}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">{btn.icon}</svg>
              {btn.label}
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
        {certs.map(c => (
          <div key={c.name} className="cert-card reveal">
            <div className="mb-1 font-mono uppercase text-sm md:mb-2" style={{ color: 'var(--accent)', opacity: 0.8 }}>{c.label}</div>
            <div className="mb-1 font-sans text-sm font-semibold md:text-base" style={{ color: 'var(--text)' }}>{c.name}</div>
            <div className="font-sans text-xs md:text-sm" style={{ color: 'var(--muted)' }}>{c.issuer}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
