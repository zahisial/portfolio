import { useState, useEffect, useRef } from "react"

const CATS = ["webflow","wordpress","react","government"]
const CAT_COLORS = {
  webflow: "#146ef5", wordpress: "#e87a7a", react: "#7de2c4", government: "#c084fc"
}
const CAT_LABELS = {
  webflow: "Webflow", wordpress: "WordPress", react: "React / Next.js", government: "Government"
}

const DEFAULT_PROJECTS = {
  webflow: [
    {num:"01",title:"TecBrix",domain:"tecbrix.com",desc:"Corporate cloud & technology consulting website. Multi-section marketing site covering 20+ service pages.",tags:["Corporate","Multi-Service","Lead Gen"],url:"https://www.tecbrix.com"},
    {num:"02",title:"Al Ghurair Exchange",domain:"alghurairexchange.com",desc:"Full forex & financial services platform for one of UAE's most trusted exchange houses. Live currency ticker, real-time forex converter, branch locator.",tags:["Fintech","Bilingual RTL","Live Rates"],url:"https://www.alghurairexchange.com"},
    {num:"03",title:"Step-Up Immigration",domain:"stepupimmigration.com",desc:"Immigration consultancy website designed to guide prospective applicants through complex visa and residency pathways.",tags:["Consultancy","Lead Gen","UX Flows"],url:"https://stepupimmigration.com/"},
    {num:"04",title:"GoPortal",domain:"goportal.webflow.io",desc:"Portal product marketing website built on Webflow. Clean, conversion-focused layout showcasing the GoPortal platform's features.",tags:["SaaS Product","Portal","Marketing"],url:"https://goportal.webflow.io"},
    {num:"05",title:"GoPortal · Nursing",domain:"nursing.goportal.com",desc:"Programme recruitment microsite for MacEwan University's Post-Diploma Nursing Certificate.",tags:["Higher Ed","Canada","Healthcare"],url:"https://nursing.goportal.com"},
    {num:"06",title:"Quote-That",domain:"quote-that.webflow.io",desc:"Insurance or quoting platform marketing site. Interactive, feature-forward design.",tags:["Quoting Tool","Interactive","SaaS"],url:"https://quote-that.webflow.io"},
    {num:"07",title:"Protect-Connect",domain:"protect-connect.com",desc:"Insurance technology platform website with a focus on trust, clarity, and conversion.",tags:["InsurTech","Product Marketing","Live"],url:"https://www.protect-connect.com"},
    {num:"08",title:"MVK Education",domain:"mvk.edu.in",desc:"Education institution website built for an Indian academic brand. Course listings, admissions flows, faculty showcases.",tags:["Education","India","Admissions"],url:"https://mvk.edu.in"},
    {num:"09",title:"Sparx · Odoscope",domain:"sparx.odoscope.com",desc:"Subdomain product site for Sparx, part of the Odoscope ecosystem. Data-driven product marketing design.",tags:["Analytics","Data Product","SaaS"],url:"https://sparx.odoscope.com"},
    {num:"10",title:"Odoscope",domain:"odoscope.com",desc:"Main marketing site for Odoscope, a personalisation and analytics platform.",tags:["AI / Personalisation","Commerce","Live"],url:"https://www.odoscope.com"},
    {num:"11",title:"FitSpot",domain:"fitspot-wip.webflow.io",desc:"Fitness and wellness platform website with energetic visual language, membership flows, and class/trainer discovery.",tags:["Health & Fitness","Memberships","Mobile-First"],url:"https://fitspot-wip.webflow.io"},
    {num:"12",title:"Student Athletes",domain:"studentathletes.webflow.io",desc:"The #1 NIL & Life After Sports Hub — 600,000+ athlete and alumni profiles.",tags:["NIL Platform","Sports","Career Tools"],url:"https://studentathletes.webflow.io"},
    {num:"13",title:"Moksha",domain:"wip-site-moksha.webflow.io",desc:"Wellness and mindfulness brand site with a calm, refined visual aesthetic.",tags:["Wellness","Lifestyle","Brand"],url:"https://wip-site-moksha.webflow.io"},
    {num:"14",title:"Nel Pretech",domain:"nelpretech.com",desc:"Industrial CT scanning, 3D inspection, and reverse engineering services for manufacturing.",tags:["Industrial","Manufacturing","3D Scanning"],url:"https://www.nelpretech.com"},
    {num:"15",title:"Dualo",domain:"dualo.io",desc:"AI-powered research assistant for UX, CX, and marketing teams.",tags:["SaaS / AI","Research Tool","Enterprise"],url:"https://www.dualo.io"},
    {num:"16",title:"SimpleDeploy",domain:"simpledeploy.webflow.io",desc:"Full-service development agency specializing in MVPs and agile product development.",tags:["Development","MVP","Agile"],url:"https://simpledeploy.webflow.io"},
    {num:"17",title:"Sleep Habits",domain:"sleephabits.com",desc:"E-commerce brand selling melatonin-free sleep aids, mouth tape, and nasal strips.",tags:["E-Commerce","Health & Wellness","D2C Brand"],url:"https://sleephabits.com"},
    {num:"18",title:"Fidelco",domain:"fidelco.webflow.io",desc:"Smart home and commercial integration services. Bespoke solutions for lighting control, audio/video, home theaters.",tags:["Smart Home","Commercial AV","Home Theater"],url:"https://fidelco.webflow.io"},
  ],
  wordpress: [
    {num:"WP·01",title:"Yard Athletics",domain:"yardathletics.ca",desc:"Boutique strength & conditioning gym in Canada. Full WordPress site covering 8 service types, MindBody booking integration.",tags:["Fitness","E-Commerce","Booking","Canada"],url:"https://yardathletics.ca"},
    {num:"WP·02",title:"Edarat Group",domain:"edaratgroup.com",desc:"Enterprise cloud & data center consultancy for the MENA/GCC region. Full WordPress/Elementor build.",tags:["Enterprise","Cloud","MENA","Elementor"],url:"https://edaratgroup.com"},
    {num:"WP·03",title:"ManyGiggles",domain:"manygiggles.ca",desc:"AI-powered daycare & childcare management SaaS platform for Canada. WordPress marketing site.",tags:["SaaS / AI","Childcare","Canada","PIPEDA"],url:"https://lightslategray-bat-143962.hostingersite.com"},
    {num:"WP·04",title:"Your Office Partners",domain:"yourofficepartners.com",desc:"UAE business setup and professional services consultancy. WordPress site covering 7 service areas.",tags:["Business Setup","UAE / Dubai","Legal / Finance"],url:"https://yourofficepartners.com"},
    {num:"WP·05",title:"RealEyez360",domain:"realeyez360.com",desc:"Dubai-based real estate photography, videography, and Matterport 3D virtual tour platform.",tags:["Real Estate","Photography","Dubai / UAE","Matterport"],url:"https://realeyez360.com"},
    {num:"WP·06",title:"Dtec",domain:"dtec.ae",desc:"The largest technology entrepreneur campus in MENA, located in Dubai Digital Park.",tags:["Tech Hub","Dubai / MENA","Coworking","Startup"],url:"https://dtec.ae"},
  ],
  react: [
    {num:"RX·01",badge:"Next.js",title:"ViCA Global",domain:"crypto-wallet-web.vercel.app",desc:"Full-featured crypto exchange and wallet platform built with Next.js, Tailwind CSS, and Shadcn UI.",tags:["Crypto / FinTech","Next.js","Shadcn UI"],url:"https://crypto-wallet-web.vercel.app"},
    {num:"RX·02",badge:"React",title:"Cohrus",domain:"app.cohrus.com",desc:"Enterprise talent and HR web application built with React, Tailwind CSS, and Shadcn UI.",tags:["HR / Talent","React","Enterprise"],url:"https://app.cohrus.com"},
    {num:"RX·03",badge:"React",title:"Parccom",domain:"Parccom Platform",desc:"Enterprise web application built with React, Tailwind CSS, and Shadcn UI as part of the Design Plex client portfolio.",tags:["Enterprise App","React","Tailwind"],url:""},
    {num:"RX·04",badge:"Next.js",title:"PageSpeed",domain:"pagespeed.vercel.app",desc:"PageSpeed is a tool that helps you improve the speed of your website for all pages in one click.",tags:["Performance","Next.js","Tool"],url:"https://pagespeed.vercel.app"},
    {num:"RX·05",badge:"React · TypeScript",title:"Edarat DMS (Frontend Demo)",domain:"dms-demo-frontend-test.vercel.app",desc:"Enterprise document management system demo with role-based permissions. Built with React, TypeScript, Tailwind, and Vite.",tags:["DMS","Role-Based Access","TypeScript","Vite"],url:"https://dms-demo-frontend-test.vercel.app"},
  ],
  government: [
    {num:"GOV·01",badge:"Liferay DXP",title:"SEDD — Sharjah Economic Development Dept",domain:"sedd.ae",desc:"Government digital portal for the Sharjah Economic Development Department, UAE. Redesigned the full web portal across 230+ government services.",tags:["Government","UAE / Sharjah","Liferay DXP","Bilingual RTL","230+ Services"],url:"https://sedd.ae/en/web/sedd/home"},
    {num:"GOV·02",badge:"Android / UI",title:"MOHRE Kiosk — Ministry of HR & Emiratisation",domain:"UAE Dubai Government · Dubai",desc:"Complete UI design for the MOHRE Android kiosk support app — a UAE Dubai government project. Delivered at Digital Lab UAE (Dubai, 2019).",tags:["Government","Android / Kiosk","UAE Dubai","UX Design"],url:""},
  ]
}

const DEFAULT_SITE_TEXT = {
  heroLabel: "Zahid Sher Sial · UI/UX DESIGNER & FULL-STACK DEVELOPER",
  heroTitle: "I design experiences and build the code behind them.",
  heroSub: "Based in Lahore · Available worldwide · Specialist in digital transformation, cloud-product UI, and end-to-end web development for enterprise clients.",
  heroTags: ["UI / UX Design","React · Next.js","WordPress / Elementor","Cloud SaaS Products","Performance Optimisation","Figma · Prototyping","Bubble.io"],
  stats: [
    {val:"32+", label:"Projects Delivered"},
    {val:"16yr", label:"Industry Experience"},
    {val:"5", label:"Countries Worked In"},
    {val:"MENA", label:"Regional Expertise"},
  ],
  aboutLabel: "About Me",
  aboutTitle: "16 years of craft, delivered at scale.",
  aboutText1: "I'm Zahid — a UI/UX Designer and Front-End Developer based in Lahore, Pakistan, with deep roots across the UAE, UK, and Canada. I've shipped digital products for UAE government departments, global FinTech platforms, EdTech startups, and enterprise cloud brands.",
  aboutText2: "My work spans Webflow, WordPress, React, Next.js, Figma, and Tailwind — and I use AI tools like Claude and Cursor to deliver faster, better, and at a standard most agencies charge triple for.",
  ctaTitle: "Let's build something remarkable together.",
  ctaSub: "16 years of experience. Available globally. Response within 24 hours.",
  email: "shersials@gmail.com",
  whatsapp: "https://wa.me/923364199486",
  location: "Lahore, Pakistan · Available Worldwide",
  footerCopy: "© 2025 · UI/UX Designer & Developer",
}

const EMPTY_PROJECT = { num:"", title:"", domain:"", desc:"", tags:[], url:"", badge:"" }

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t) }, [])
  return (
    <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,background:"#1a2540",color:"#e8c87a",padding:"12px 20px",borderRadius:10,fontSize:13,fontFamily:"monospace",border:"1px solid rgba(232,200,122,0.3)",boxShadow:"0 4px 20px rgba(0,0,0,0.4)"}}>
      ✓ {msg}
    </div>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:"#0f1521",border:"1px solid rgba(255,255,255,0.12)",borderRadius:16,width:"100%",maxWidth:600,maxHeight:"90vh",overflowY:"auto",padding:24}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:17,fontWeight:500,color:"#e8eaf0"}}>{title}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",fontSize:20,cursor:"pointer",lineHeight:1}}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type="text", rows, hint }) {
  const s = {width:"100%",background:"#090d13",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,color:"#e8eaf0",fontSize:13,padding:"8px 12px",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}
  return (
    <div style={{marginBottom:14}}>
      <label style={{display:"block",fontSize:12,color:"#94a3b8",marginBottom:5,fontFamily:"monospace"}}>{label}{hint&&<span style={{marginLeft:6,color:"#64748b"}}>{hint}</span>}</label>
      {type==="textarea"
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows||3} style={{...s,resize:"vertical"}} />
        : <input type={type} value={value} onChange={e=>onChange(e.target.value)} style={s} />
      }
    </div>
  )
}

function ProjectForm({ initial, onSave, onClose, category }) {
  const [p, setP] = useState({...EMPTY_PROJECT, ...initial})
  const set = k => v => setP(prev=>({...prev,[k]:v}))
  const showBadge = category==="react"||category==="government"

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Field label="Number (e.g. 19 or WP·07)" value={p.num} onChange={set("num")} />
        <Field label="Title" value={p.title} onChange={set("title")} />
      </div>
      <Field label="Domain / URL label" value={p.domain} onChange={set("domain")} />
      <Field label="Description" value={p.desc} onChange={set("desc")} type="textarea" rows={3} />
      <Field label="Tags" value={Array.isArray(p.tags)?p.tags.join(", "):p.tags} onChange={v=>set("tags")(v.split(",").map(t=>t.trim()).filter(Boolean))} hint="comma separated" />
      <Field label="Live URL" value={p.url} onChange={set("url")} hint="leave blank for Private Client" />
      {showBadge && <Field label="Badge label" value={p.badge||""} onChange={set("badge")} hint="e.g. Next.js, Liferay DXP" />}
      <div style={{display:"flex",gap:10,marginTop:8}}>
        <button onClick={()=>onSave(p)} style={{flex:1,padding:"10px 0",background:"#e8c87a",color:"#090d13",border:"none",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"monospace"}}>
          Save Project
        </button>
        <button onClick={onClose} style={{padding:"10px 20px",background:"transparent",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,fontSize:13,cursor:"pointer"}}>
          Cancel
        </button>
      </div>
    </div>
  )
}

function ProjectCard({ project, category, onEdit, onDelete }) {
  const color = CAT_COLORS[category]
  const [confirm, setConfirm] = useState(false)
  return (
    <div style={{background:"#131c2b",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:16,display:"flex",flexDirection:"column",gap:8,position:"relative"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <span style={{fontFamily:"monospace",fontSize:11,color}}>{project.num}</span>
        {project.badge && <span style={{fontFamily:"monospace",fontSize:10,padding:"2px 8px",borderRadius:99,background:`${color}18`,color,border:`1px solid ${color}30`}}>{project.badge}</span>}
      </div>
      <div style={{fontFamily:"Georgia,serif",fontSize:15,color:"#e8eaf0",fontWeight:400}}>{project.title}</div>
      <div style={{fontSize:11,color:"#5ba4f5",fontFamily:"monospace"}}>{project.domain}</div>
      <div style={{fontSize:12,color:"#64748b",lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{project.desc}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:2}}>
        {(project.tags||[]).map(t=>(
          <span key={t} style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#94a3b8",fontFamily:"monospace"}}>{t}</span>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginTop:4}}>
        <button onClick={()=>onEdit(project)} style={{flex:1,padding:"6px 0",background:"rgba(232,200,122,0.1)",color:"#e8c87a",border:"1px solid rgba(232,200,122,0.2)",borderRadius:6,fontSize:11,cursor:"pointer",fontFamily:"monospace"}}>
          ✎ Edit
        </button>
        {confirm
          ? <button onClick={()=>onDelete(project)} style={{flex:1,padding:"6px 0",background:"rgba(232,122,122,0.2)",color:"#e87a7a",border:"1px solid rgba(232,122,122,0.3)",borderRadius:6,fontSize:11,cursor:"pointer",fontFamily:"monospace"}}>
              Confirm Delete?
            </button>
          : <button onClick={()=>setConfirm(true)} style={{flex:1,padding:"6px 0",background:"transparent",color:"#64748b",border:"1px solid rgba(255,255,255,0.08)",borderRadius:6,fontSize:11,cursor:"pointer",fontFamily:"monospace"}}>
              ✕ Delete
            </button>
        }
      </div>
    </div>
  )
}

function SiteTextEditor({ siteText, onChange }) {
  const set = k => v => onChange({...siteText,[k]:v})
  const setStatVal = (i,k) => v => {
    const stats=[...siteText.stats]; stats[i]={...stats[i],[k]:v}; onChange({...siteText,stats})
  }
  const setHeroTag = (i,v) => {
    const tags=[...siteText.heroTags]; tags[i]=v; onChange({...siteText,heroTags:tags})
  }
  const addHeroTag = () => onChange({...siteText,heroTags:[...siteText.heroTags,"New Tag"]})
  const removeHeroTag = i => { const tags=siteText.heroTags.filter((_,j)=>j!==i); onChange({...siteText,heroTags:tags}) }

  const sec = (label) => <div style={{fontSize:11,fontFamily:"monospace",color:"#e8c87a",letterSpacing:2,textTransform:"uppercase",marginBottom:12,marginTop:24,paddingBottom:6,borderBottom:"1px solid rgba(232,200,122,0.15)"}}>{label}</div>

  return (
    <div style={{maxWidth:640}}>
      {sec("Hero Section")}
      <Field label="Hero label (mono top text)" value={siteText.heroLabel} onChange={set("heroLabel")} />
      <Field label="Hero title" value={siteText.heroTitle} onChange={set("heroTitle")} type="textarea" rows={2} />
      <Field label="Hero subtitle" value={siteText.heroSub} onChange={set("heroSub")} type="textarea" rows={2} />
      <div style={{marginBottom:14}}>
        <label style={{display:"block",fontSize:12,color:"#94a3b8",marginBottom:8,fontFamily:"monospace"}}>Hero skill tags</label>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {siteText.heroTags.map((tag,i)=>(
            <div key={i} style={{display:"flex",gap:6,alignItems:"center"}}>
              <input value={tag} onChange={e=>setHeroTag(i,e.target.value)}
                style={{flex:1,background:"#090d13",border:"1px solid rgba(255,255,255,0.12)",borderRadius:6,color:"#e8eaf0",fontSize:12,padding:"6px 10px",outline:"none",fontFamily:"monospace"}}/>
              <button onClick={()=>removeHeroTag(i)} style={{padding:"4px 10px",background:"transparent",color:"#e87a7a",border:"1px solid rgba(232,122,122,0.2)",borderRadius:6,fontSize:12,cursor:"pointer"}}>✕</button>
            </div>
          ))}
          <button onClick={addHeroTag} style={{alignSelf:"flex-start",padding:"5px 14px",background:"rgba(232,200,122,0.08)",color:"#e8c87a",border:"1px solid rgba(232,200,122,0.2)",borderRadius:6,fontSize:11,cursor:"pointer",fontFamily:"monospace"}}>+ Add Tag</button>
        </div>
      </div>

      {sec("Stats Bar")}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {siteText.stats.map((s,i)=>(
          <div key={i} style={{background:"#090d13",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,padding:12}}>
            <input value={s.val} onChange={e=>setStatVal(i,"val")(e.target.value)}
              placeholder="Value"
              style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid rgba(255,255,255,0.1)",color:"#e8c87a",fontSize:18,fontFamily:"Georgia,serif",outline:"none",marginBottom:6,paddingBottom:4,boxSizing:"border-box"}}/>
            <input value={s.label} onChange={e=>setStatVal(i,"label")(e.target.value)}
              placeholder="Label"
              style={{width:"100%",background:"transparent",border:"none",color:"#94a3b8",fontSize:11,fontFamily:"monospace",outline:"none",textTransform:"uppercase",boxSizing:"border-box"}}/>
          </div>
        ))}
      </div>

      {sec("About Section")}
      <Field label="About label (small mono text)" value={siteText.aboutLabel} onChange={set("aboutLabel")} />
      <Field label="About title" value={siteText.aboutTitle} onChange={set("aboutTitle")} type="textarea" rows={2} />
      <Field label="About paragraph 1" value={siteText.aboutText1} onChange={set("aboutText1")} type="textarea" rows={3} />
      <Field label="About paragraph 2" value={siteText.aboutText2} onChange={set("aboutText2")} type="textarea" rows={3} />

      {sec("Contact / CTA")}
      <Field label="CTA headline" value={siteText.ctaTitle} onChange={set("ctaTitle")} />
      <Field label="CTA sub-text" value={siteText.ctaSub} onChange={set("ctaSub")} />
      <Field label="Email address" value={siteText.email} onChange={set("email")} type="email" />
      <Field label="WhatsApp URL" value={siteText.whatsapp} onChange={set("whatsapp")} />
      <Field label="Location text" value={siteText.location} onChange={set("location")} />

      {sec("Footer")}
      <Field label="Footer copyright text" value={siteText.footerCopy} onChange={set("footerCopy")} />
    </div>
  )
}

function ExportPanel({ projects, siteText }) {
  const [copied, setCopied] = useState("")
  const gen = (cat) => {
    const items = projects[cat].map(p=>{
      const keys = ["num","title","domain","desc","tags","url","badge"].filter(k=>p[k]!=null&&p[k]!=="")
      const lines = keys.map(k=>{
        const v = Array.isArray(p[k]) ? JSON.stringify(p[k]) : JSON.stringify(p[k])
        return `  ${k}: ${v}`
      })
      return `{\n${lines.join(",\n")}\n}`
    }).join(",\n")
    return `export const ${cat}Projects = [\n${items}\n]`
  }
  const full = CATS.map(gen).join("\n\n")
  const copy = (text, label) => {
    navigator.clipboard.writeText(text).then(()=>{ setCopied(label); setTimeout(()=>setCopied(""),2000) })
  }

  return (
    <div>
      <p style={{fontSize:13,color:"#94a3b8",marginBottom:16,lineHeight:1.6}}>
        Copy the generated code and paste it into <code style={{background:"#131c2b",padding:"2px 6px",borderRadius:4,color:"#e8c87a",fontSize:12}}>src/data/projects.js</code> in your Vite project to apply all changes.
      </p>
      {CATS.map(cat=>(
        <div key={cat} style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <span style={{fontFamily:"monospace",fontSize:12,color:CAT_COLORS[cat]}}>{CAT_LABELS[cat]}</span>
            <button onClick={()=>copy(gen(cat), cat)}
              style={{padding:"4px 14px",background:copied===cat?"rgba(125,226,196,0.15)":"rgba(232,200,122,0.1)",color:copied===cat?"#7de2c4":"#e8c87a",border:`1px solid ${copied===cat?"rgba(125,226,196,0.3)":"rgba(232,200,122,0.2)"}`,borderRadius:6,fontSize:11,cursor:"pointer",fontFamily:"monospace"}}>
              {copied===cat?"✓ Copied!":"Copy"}
            </button>
          </div>
          <pre style={{background:"#090d13",border:"1px solid rgba(255,255,255,0.06)",borderRadius:8,padding:12,fontSize:10,color:"#64748b",overflow:"auto",maxHeight:120,margin:0,lineHeight:1.5}}>
            {gen(cat).slice(0,300)}...
          </pre>
        </div>
      ))}
      <button onClick={()=>copy(full,"all")}
        style={{width:"100%",padding:"12px 0",background:copied==="all"?"rgba(125,226,196,0.15)":"rgba(232,200,122,0.1)",color:copied==="all"?"#7de2c4":"#e8c87a",border:`1px solid ${copied==="all"?"rgba(125,226,196,0.3)":"rgba(232,200,122,0.2)"}`,borderRadius:8,fontSize:13,cursor:"pointer",fontFamily:"monospace",marginTop:4}}>
        {copied==="all" ? "✓ All Copied!" : "Copy All — projects.js"}
      </button>
    </div>
  )
}

export default function App() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS)
  const [siteText, setSiteText] = useState(DEFAULT_SITE_TEXT)
  const [activeSection, setActiveSection] = useState("projects")
  const [activeCat, setActiveCat] = useState("webflow")
  const [modal, setModal] = useState(null) // {mode:"add"|"edit", project, index}
  const [toast, setToast] = useState(null)
  const [loaded, setLoaded] = useState(false)

  // Load from storage
  useEffect(() => {
    (async () => {
      try {
        const r1 = await window.storage.get("cms-projects")
        if (r1) setProjects(JSON.parse(r1.value))
        const r2 = await window.storage.get("cms-sitetext")
        if (r2) setSiteText(JSON.parse(r2.value))
      } catch(e) {}
      setLoaded(true)
    })()
  }, [])

  const saveProjects = async (p) => {
    setProjects(p)
    try { await window.storage.set("cms-projects", JSON.stringify(p)) } catch(e) {}
    setToast("Projects saved")
  }

  const saveSiteText = async (t) => {
    setSiteText(t)
    try { await window.storage.set("cms-sitetext", JSON.stringify(t)) } catch(e) {}
    setToast("Site text saved")
  }

  const handleSaveProject = (p) => {
    const updated = {...projects}
    if (modal.mode === "add") {
      updated[activeCat] = [...updated[activeCat], p]
    } else {
      updated[activeCat] = updated[activeCat].map((x,i)=>i===modal.index?p:x)
    }
    saveProjects(updated)
    setModal(null)
  }

  const handleDelete = (project) => {
    const updated = {...projects, [activeCat]: projects[activeCat].filter(p=>p!==project)}
    saveProjects(updated)
    setToast("Project deleted")
  }

  const nav = [
    {key:"projects", label:"Projects", icon:"⊞"},
    {key:"sitetext", label:"Site Text", icon:"✎"},
    {key:"export", label:"Export Code", icon:"↗"},
  ]

  if (!loaded) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:200,color:"#94a3b8",fontFamily:"monospace",fontSize:13}}>Loading CMS…</div>

  return (
    <div style={{minHeight:"100vh",background:"#090d13",color:"#e8eaf0",fontFamily:"'DM Sans',system-ui,sans-serif",display:"flex",flexDirection:"column"}}>
      {/* Header */}
      <div style={{padding:"14px 20px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(15,21,33,0.95)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:28,height:28,borderRadius:8,background:"rgba(232,200,122,0.15)",border:"1px solid rgba(232,200,122,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>⬡</div>
          <div>
            <div style={{fontSize:13,fontWeight:500,color:"#e8eaf0"}}>Portfolio CMS</div>
            <div style={{fontSize:10,color:"#64748b",fontFamily:"monospace"}}>Zahid Sher Sial</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          {nav.map(n=>(
            <button key={n.key} onClick={()=>setActiveSection(n.key)}
              style={{padding:"6px 14px",background:activeSection===n.key?"rgba(232,200,122,0.12)":"transparent",color:activeSection===n.key?"#e8c87a":"#94a3b8",border:`1px solid ${activeSection===n.key?"rgba(232,200,122,0.25)":"rgba(255,255,255,0.08)"}`,borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"monospace",display:"flex",alignItems:"center",gap:6}}>
              {n.icon} {n.label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{flex:1,padding:20,maxWidth:1200,width:"100%",boxSizing:"border-box",margin:"0 auto"}}>

        {/* PROJECTS SECTION */}
        {activeSection === "projects" && (
          <div>
            {/* Category tabs + count */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{display:"flex",gap:6}}>
                {CATS.map(cat=>(
                  <button key={cat} onClick={()=>setActiveCat(cat)}
                    style={{padding:"6px 16px",background:activeCat===cat?`${CAT_COLORS[cat]}18`:"transparent",color:activeCat===cat?CAT_COLORS[cat]:"#94a3b8",border:`1px solid ${activeCat===cat?`${CAT_COLORS[cat]}40`:"rgba(255,255,255,0.08)"}`,borderRadius:99,fontSize:12,cursor:"pointer",fontFamily:"monospace",display:"flex",alignItems:"center",gap:6}}>
                    {CAT_LABELS[cat]}
                    <span style={{background:"rgba(255,255,255,0.06)",borderRadius:99,padding:"1px 6px",fontSize:10}}>{projects[cat].length}</span>
                  </button>
                ))}
              </div>
              <button onClick={()=>setModal({mode:"add",project:{...EMPTY_PROJECT},index:null})}
                style={{padding:"8px 18px",background:"rgba(232,200,122,0.12)",color:"#e8c87a",border:"1px solid rgba(232,200,122,0.25)",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"monospace",display:"flex",alignItems:"center",gap:6}}>
                + Add Project
              </button>
            </div>

            {/* Cards grid */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
              {projects[activeCat].map((p,i)=>(
                <ProjectCard key={i} project={p} category={activeCat}
                  onEdit={(proj)=>setModal({mode:"edit",project:{...proj},index:i})}
                  onDelete={(proj)=>handleDelete(proj)} />
              ))}
              {projects[activeCat].length===0&&(
                <div style={{gridColumn:"1/-1",textAlign:"center",padding:48,color:"#64748b",fontSize:13,fontFamily:"monospace"}}>
                  No projects yet. Click "+ Add Project" to add one.
                </div>
              )}
            </div>
          </div>
        )}

        {/* SITE TEXT SECTION */}
        {activeSection === "sitetext" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h2 style={{margin:0,fontSize:16,fontWeight:500,color:"#e8eaf0"}}>Edit site-wide text</h2>
              <button onClick={()=>saveSiteText(siteText)}
                style={{padding:"8px 20px",background:"rgba(232,200,122,0.12)",color:"#e8c87a",border:"1px solid rgba(232,200,122,0.25)",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:"monospace"}}>
                Save All Changes
              </button>
            </div>
            <SiteTextEditor siteText={siteText} onChange={setSiteText} />
            <div style={{marginTop:24}}>
              <button onClick={()=>saveSiteText(siteText)}
                style={{width:"100%",padding:"12px 0",background:"rgba(232,200,122,0.12)",color:"#e8c87a",border:"1px solid rgba(232,200,122,0.25)",borderRadius:8,fontSize:13,cursor:"pointer",fontFamily:"monospace"}}>
                Save All Site Text
              </button>
            </div>
          </div>
        )}

        {/* EXPORT SECTION */}
        {activeSection === "export" && (
          <div style={{maxWidth:640}}>
            <h2 style={{margin:"0 0 8px",fontSize:16,fontWeight:500}}>Export to projects.js</h2>
            <ExportPanel projects={projects} siteText={siteText} />
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <Modal title={modal.mode==="add"?"Add New Project":"Edit Project"} onClose={()=>setModal(null)}>
          <ProjectForm initial={modal.project} onSave={handleSaveProject} onClose={()=>setModal(null)} category={activeCat} />
        </Modal>
      )}

      {/* Toast */}
      {toast && <Toast msg={toast} onDone={()=>setToast(null)} />}
    </div>
  )
}
