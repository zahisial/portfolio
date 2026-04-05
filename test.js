(() => {
  // src/components/Testimonials.jsx
  function Testimonials() {
    const testimonials = [
      {
        text: "Zahid is a hard-worker and a team player. I trusted him to get the job done on projects with strict deadlines, and he delivered every time. He has shown remarkable growth adding new skills and embracing new technologies.",
        name: "Rizwan Ahmed Khan",
        title: "Founder, Mentor, Investor"
      },
      {
        text: "I know Zahid Sial since 2012 \u2013 he is very competent.",
        name: "Hammad Uppal",
        title: "Solution Architect, Applied AI & Industrial Systems"
      },
      {
        text: "M. Zahid is a good worker, detail oriented, and produces good benefits to the company.",
        name: "Muhammad Sufian",
        title: "Front End Developer"
      },
      {
        text: "I recommend Mr. Zahid for his good job and character at work.",
        name: "Alexis Anduyan",
        title: "Architect at Wireframe Architects"
      },
      {
        text: "Zahid is very competent and a pleasure to work with. He delivers quality work on time.",
        name: "Lathief Tayyil",
        title: "Sales Supervisor"
      }
    ];
    const loopedTestimonials = [...testimonials, ...testimonials];
    return /* @__PURE__ */ React.createElement("section", { className: "px-5 py-16 md:px-12 md:py-24 overflow-hidden", style: { background: "var(--surface)" } }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto max-w-6xl" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-12" }, /* @__PURE__ */ React.createElement("div", { className: "font-mono text-xs uppercase tracking-wider mb-2", style: { color: "var(--accent)" } }, "Client Love"), /* @__PURE__ */ React.createElement("h2", { className: "font-serif text-3xl md:text-4xl" }, "What colleagues & clients say")), /* @__PURE__ */ React.createElement("div", { className: "relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "marquee-track flex gap-6 animate-marquee" }, loopedTestimonials.map((t, i) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: i,
        className: "w-80 md:w-96 flex-shrink-0 p-6 rounded-xl border",
        style: { background: "var(--card)", borderColor: "rgba(255,255,255,0.1)" }
      },
      /* @__PURE__ */ React.createElement("div", { className: "text-4xl mb-3", style: { color: "var(--accent)" } }, "\u201C"),
      /* @__PURE__ */ React.createElement("p", { className: "text-sm mb-4 line-clamp-4", style: { color: "var(--muted)" } }, t.text),
      /* @__PURE__ */ React.createElement("div", { className: "font-semibold text-sm" }, t.name),
      /* @__PURE__ */ React.createElement("div", { className: "text-xs", style: { color: "var(--muted)" } }, t.title)
    ))))), /* @__PURE__ */ React.createElement("style", null, `
          .marquee-track {
            animation: scroll 30s linear infinite;
            width: max-content;
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          /* Pause on hover */
          .marquee-track:hover {
            animation-play-state: paused;
          }
          @media (max-width: 768px) {
            .marquee-track {
              animation-duration: 20s;
            }
          }
        `));
  }
})();
