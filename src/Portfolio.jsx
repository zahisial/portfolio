import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { TrustedBy, Stats, About } from './components/Sections'
import CaseStudies from './components/CaseStudies'
import Projects from './components/Projects'
import { Services, Contact, Footer } from './components/ContactFooter'
import Testimonials from './components/Testimonails'

export default function PortfolioSite() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })

    const observe = () => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    }
    observe()
    const timer = setTimeout(observe, 500)
    return () => { observer.disconnect(); clearTimeout(timer) }
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <div className="grid-bg" />
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <TrustedBy />
        <Stats />
        <About />
        <Testimonials />   {/* Add this line */}
        <CaseStudies />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <button
        className={`back-to-top${showBackToTop ? ' visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >↑</button>
      <div className="block fixed right-4 bottom-4 z-50 md:hidden">
        <a href="https://wa.me/923364199486" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 2C6.51 2 2.032 6.48 2.032 12c0 2.19.71 4.23 1.92 5.89L2 22l4.23-1.89c1.55.95 3.4 1.51 5.39 1.51 5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18c-1.79 0-3.44-.57-4.79-1.54l-.34-.2-2.51 1.12.98-2.46-.21-.34c-1.1-1.51-1.77-3.31-1.77-5.2 0-4.62 3.76-8.38 8.38-8.38s8.38 3.76 8.38 8.38-3.76 8.38-8.38 8.38z"/>
          </svg>
        </a>
      </div>
    </>
  )
}
