import { useState, useCallback, useRef } from "react";

const PROFILE = {
  name: "Zahid Sher Sial",
  title: "Senior UI/UX Designer & Front-End Developer",
  years: "16+",
  linkedin: "https://www.linkedin.com/in/zahidshersial/",
  website: "https://shersial.com/",
  email: "zahidshersial@gmail.com",
  skills: [
    "Webflow", "React", "Next.js", "WordPress", "Figma", "Tailwind CSS",
    "TypeScript", "JavaScript", "HTML5", "CSS3", "Shadcn UI", "RTL/Arabic",
    "UI/UX Design", "CMS", "Elementor", "GSAP", "Node.js"
  ],
  highlights: [
    "16+ years UI/UX & front-end experience",
    "5+ years Webflow specialization (12+ client sites)",
    "React/Next.js enterprise apps (Cohrus, Vica Global, Parccom)",
    "Bilingual English/Arabic, RTL design expert",
    "UAE government portals (SEDD, MOHRE)",
    "Remote-first, async across US/UK/EU/GCC timezones",
    "WordPress/Elementor + server optimization",
    "Figma-to-code, design systems, WCAG accessibility"
  ]
};

const ROLES = [
  "Front-End Developer remote",
  "UI UX Designer remote",
  "WordPress Developer remote",
  "Webflow Developer remote"
];

const SEARCH_QUERIES = [
  "remote front-end developer jobs hiring now 2026",
  "remote Webflow developer job openings April 2026",
  "remote UI UX designer positions hiring worldwide 2026",
  "remote WordPress developer jobs international 2026"
];

export default function JobScanner() {
  const [jobs, setJobs] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [scanPhase, setScanPhase] = useState("");
  const [error, setError] = useState(null);
  const [coldMessages, setColdMessages] = useState({});
  const [generatingMsg, setGeneratingMsg] = useState(null);
  const [expandedJob, setExpandedJob] = useState(null);
  const abortRef = useRef(null);

  const scanJobs = useCallback(async () => {
    setScanning(true);
    setError(null);
    setJobs([]);
    setColdMessages({});

    try {
      setScanPhase("Searching job portals...");

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{
            role: "user",
            content: `You are a job search agent. Search the web for CURRENT remote job openings (posted in the last 7-14 days) for these roles:
1. Front-End Developer (remote)
2. UI/UX Designer (remote)
3. Webflow Developer (remote)
4. WordPress Developer (remote)

Search globally — any company hiring remotely worldwide.

After searching, return ONLY a valid JSON array (no markdown, no backticks, no preamble) of 8-15 real job postings you found. Each object must have:
{
  "title": "exact job title",
  "company": "company name",
  "location": "Remote / Remote (US) / etc",
  "url": "direct link to the job posting or careers page",
  "source": "LinkedIn / Indeed / company site / etc",
  "posted": "approximate date or 'Recent'",
  "description": "2-3 sentence summary of role requirements",
  "skills": ["skill1", "skill2", "skill3"],
  "match_score": 0-100 score based on how well it matches this profile:
    - 16+ years UI/UX & front-end
    - Webflow, React, Next.js, WordPress, Figma, Tailwind, TypeScript
    - Bilingual English/Arabic, RTL design
    - UAE government & enterprise experience
    - Remote-first async work style
}

Sort by match_score descending. Only include REAL postings with real URLs. Return ONLY the JSON array.`
          }]
        })
      });

      const data = await response.json();

      setScanPhase("Parsing results...");

      const textBlocks = data.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "";

      let parsed = [];
      try {
        const clean = textBlocks.replace(/```json|```/g, "").trim();
        const match = clean.match(/\[[\s\S]*\]/);
        if (match) parsed = JSON.parse(match[0]);
      } catch (e) {
        console.error("Parse error:", e, textBlocks);
      }

      if (parsed.length === 0) {
        setError("No jobs found in this scan. Try again — web search results vary.");
      } else {
        setJobs(parsed.sort((a, b) => (b.match_score || 0) - (a.match_score || 0)));
      }

      setScanPhase("");
    } catch (err) {
      setError("Scan failed: " + err.message);
    } finally {
      setScanning(false);
    }
  }, []);

  const generateColdMessage = useCallback(async (job, index) => {
    setGeneratingMsg(index);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Write a SHORT, punchy cold recruiter message (LinkedIn InMail style) for this job:

Job: ${job.title} at ${job.company}
Required skills: ${(job.skills || []).join(", ")}
Description: ${job.description}

From this candidate:
- Zahid Sher Sial, 16+ yrs UI/UX & Front-End
- Webflow expert (12+ sites: Juke Audio, Al Ghurair Exchange, Edarat Group)
- React/Next.js enterprise apps (Cohrus, Vica Global)
- WordPress/Elementor + server optimization
- Bilingual English/Arabic, RTL design
- UAE government portals (SEDD Sharjah, MOHRE)
- Portfolio: shersial.com | LinkedIn: linkedin.com/in/zahidshersial

Return ONLY the message text. Keep it under 150 words. Be human, direct, specific to the role. Mention 2-3 concrete achievements relevant to THIS role. No fluff.`
          }]
        })
      });
      const data = await response.json();
      const msg = data.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || "Could not generate message.";
      setColdMessages(prev => ({ ...prev, [index]: msg }));
    } catch (err) {
      setColdMessages(prev => ({ ...prev, [index]: "Error generating message: " + err.message }));
    } finally {
      setGeneratingMsg(null);
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const scoreColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#eab308";
    return "#94a3b8";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e2e2e8",
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      padding: "0"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1a0a2e 50%, #0f172a 100%)",
        borderBottom: "1px solid rgba(139,92,246,0.2)",
        padding: "28px 24px 24px"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: scanning ? "#eab308" : "#22c55e",
              boxShadow: scanning ? "0 0 8px #eab308" : "0 0 8px #22c55e",
              animation: scanning ? "pulse 1s infinite" : "none"
            }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#8b5cf6", letterSpacing: 2, textTransform: "uppercase" }}>
              Job Scanner v1.0
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.5px" }}>
            Remote Job Radar
          </h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
            AI-powered scan • Front-End / UI-UX / Webflow / WordPress • Worldwide Remote
          </p>

          <button
            onClick={scanJobs}
            disabled={scanning}
            style={{
              marginTop: 18,
              padding: "12px 32px",
              background: scanning ? "rgba(139,92,246,0.15)" : "linear-gradient(135deg, #7c3aed, #6d28d9)",
              color: scanning ? "#8b5cf6" : "#fff",
              border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: scanning ? "wait" : "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s"
            }}
          >
            {scanning ? `⏳ ${scanPhase || "Scanning..."}` : "🔍 Scan Jobs Now"}
          </button>
        </div>
      </div>

      {/* Profile Bar */}
      <div style={{
        background: "rgba(139,92,246,0.06)",
        borderBottom: "1px solid rgba(139,92,246,0.1)",
        padding: "12px 24px"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, fontSize: 12 }}>
          <span style={{ color: "#8b5cf6", fontWeight: 600 }}>{PROFILE.name}</span>
          <span style={{ color: "#475569" }}>•</span>
          <span style={{ color: "#94a3b8" }}>{PROFILE.years} yrs exp</span>
          <span style={{ color: "#475569" }}>•</span>
          <a href={PROFILE.website} target="_blank" rel="noreferrer" style={{ color: "#60a5fa", textDecoration: "none" }}>Portfolio</a>
          <span style={{ color: "#475569" }}>•</span>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" style={{ color: "#60a5fa", textDecoration: "none" }}>LinkedIn</a>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 24px 40px" }}>

        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#f87171"
          }}>
            {error}
          </div>
        )}

        {jobs.length > 0 && (
          <div style={{ marginBottom: 16, fontSize: 12, color: "#64748b" }}>
            Found <strong style={{ color: "#8b5cf6" }}>{jobs.length}</strong> matching positions
          </div>
        )}

        {/* Job Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {jobs.map((job, i) => {
            const expanded = expandedJob === i;
            const hasMsg = coldMessages[i];
            return (
              <div key={i} style={{
                background: "rgba(15,23,42,0.8)",
                border: `1px solid ${(job.match_score || 0) >= 80 ? "rgba(34,197,94,0.25)" : "rgba(51,65,85,0.5)"}`,
                borderRadius: 10,
                overflow: "hidden",
                transition: "all 0.2s"
              }}>
                {/* Main row */}
                <div
                  style={{ padding: "16px 18px", cursor: "pointer" }}
                  onClick={() => setExpandedJob(expanded ? null : i)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "#f1f5f9" }}>{job.title}</h3>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                          background: `${scoreColor(job.match_score)}22`,
                          color: scoreColor(job.match_score),
                          fontFamily: "'Space Mono', monospace"
                        }}>
                          {job.match_score}% match
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: "#94a3b8", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ fontWeight: 500, color: "#cbd5e1" }}>{job.company}</span>
                        <span style={{ color: "#334155" }}>•</span>
                        <span>{job.location}</span>
                        {job.source && <>
                          <span style={{ color: "#334155" }}>•</span>
                          <span style={{ fontSize: 11, color: "#64748b" }}>{job.source}</span>
                        </>}
                      </div>
                    </div>
                    <span style={{ fontSize: 18, color: "#475569", transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "none" }}>▾</span>
                  </div>

                  {/* Skill tags */}
                  {job.skills && job.skills.length > 0 && (
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 10 }}>
                      {job.skills.slice(0, 6).map((s, si) => (
                        <span key={si} style={{
                          fontSize: 10, padding: "2px 8px", borderRadius: 4,
                          background: PROFILE.skills.some(ps => ps.toLowerCase() === s.toLowerCase()) ? "rgba(139,92,246,0.15)" : "rgba(51,65,85,0.4)",
                          color: PROFILE.skills.some(ps => ps.toLowerCase() === s.toLowerCase()) ? "#a78bfa" : "#64748b",
                          border: PROFILE.skills.some(ps => ps.toLowerCase() === s.toLowerCase()) ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent"
                        }}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expanded content */}
                {expanded && (
                  <div style={{ borderTop: "1px solid rgba(51,65,85,0.3)", padding: "16px 18px" }}>
                    {job.description && (
                      <p style={{ fontSize: 13, lineHeight: 1.6, color: "#94a3b8", margin: "0 0 14px" }}>{job.description}</p>
                    )}

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                      {job.url && (
                        <a href={job.url} target="_blank" rel="noreferrer" style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          padding: "8px 16px", borderRadius: 6,
                          background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                          color: "#fff", fontSize: 12, fontWeight: 600,
                          textDecoration: "none", fontFamily: "inherit"
                        }}>
                          🔗 Apply Now
                        </a>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); generateColdMessage(job, i); }}
                        disabled={generatingMsg === i}
                        style={{
                          padding: "8px 16px", borderRadius: 6,
                          background: generatingMsg === i ? "rgba(34,197,94,0.1)" : "rgba(34,197,94,0.15)",
                          color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)",
                          fontSize: 12, fontWeight: 600, cursor: generatingMsg === i ? "wait" : "pointer",
                          fontFamily: "inherit"
                        }}
                      >
                        {generatingMsg === i ? "✍️ Writing..." : "✉️ Generate Cold Message"}
                      </button>
                    </div>

                    {/* Cold message */}
                    {hasMsg && (
                      <div style={{
                        background: "rgba(34,197,94,0.05)",
                        border: "1px solid rgba(34,197,94,0.15)",
                        borderRadius: 8, padding: 14
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#22c55e", textTransform: "uppercase", letterSpacing: 1 }}>
                            Cold Recruiter Message
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); copyText(hasMsg); }}
                            style={{
                              padding: "4px 10px", borderRadius: 4, background: "rgba(34,197,94,0.15)",
                              color: "#22c55e", border: "none", fontSize: 11, cursor: "pointer", fontFamily: "inherit"
                            }}
                          >
                            📋 Copy
                          </button>
                        </div>
                        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#cbd5e1", margin: 0, whiteSpace: "pre-wrap" }}>
                          {hasMsg}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {!scanning && jobs.length === 0 && !error && (
          <div style={{
            textAlign: "center", padding: "60px 20px", color: "#475569"
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🛰️</div>
            <p style={{ fontSize: 14, margin: "0 0 4px" }}>Hit <strong style={{ color: "#8b5cf6" }}>Scan Jobs Now</strong> to search</p>
            <p style={{ fontSize: 12 }}>Scans LinkedIn, Indeed, company sites & more via AI web search</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        * { box-sizing: border-box; }
        a:hover { opacity: 0.85; }
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
