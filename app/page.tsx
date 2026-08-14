"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";

type Agent = { slug: string; name: string; role: string; category: string; description: string };

const agents: Agent[] = [
  ["fronto","Fronto","Frontend Developer","Engineering","Ships accessible, performant interfaces with design-system discipline."],
  ["backo","Backo","Backend Developer","Engineering","Designs APIs, data models, and services that stay coherent as they scale."],
  ["stacko","Stacko","Full Stack Developer","Engineering","Owns vertical product slices from database to polished interface."],
  ["devopsy","DevOpsy","DevOps Engineer","Engineering","Automates delivery, environments, observability, and safe rollback paths."],
  ["testo","Testo","QA / Testing","Engineering","Builds risk-based test strategy, automation, and trustworthy release gates."],
  ["automo","Automo","Automation Engineer","Engineering","Turns repetitive operations into monitored, resilient workflows."],
  ["designo","Designo","UI/UX Designer","Engineering","Shapes usable, accessible product flows that engineering can ship."],
  ["writeo","Writeo","Technical Writer","Knowledge","Creates crisp documentation, runbooks, and in-product guidance."],
  ["doco","Doco","Documentation Specialist","Knowledge","Keeps product knowledge structured, searchable, owned, and current."],
  ["dato","Dato","Data Analyst","Operations","Turns raw data into metrics, analysis, and decision-ready narratives."],
  ["sciento","Sciento","Data Scientist","Engineering","Applies models, experiments, and statistical rigor to hard questions."],
  ["intelli","Intelli","AI/ML Engineer","Engineering","Takes models from training through reliable, evaluated inference."],
  ["dbo","Dbo","Database Administrator","Engineering","Protects database availability, performance, and data integrity."],
  ["cloudo","Cloudo","Cloud Architect","Engineering","Designs secure cloud foundations, networks, and scalable platform patterns."],
  ["securo","Securo","Security Engineer","Engineering","Builds controls, detection, and secure development practices."],
  ["cybero","Cybero","Cybersecurity Analyst","Engineering","Triages threats and improves detection across identity, endpoint, and cloud."],
  ["producto","Producto","Product Manager","Product","Frames outcomes and sequences delivery so teams ship the right slice first."],
  ["techproducto","TechProducto","Technical Product Manager","Product","Connects technical constraints, platform roadmaps, and customer value."],
  ["planno","Planno","Project Manager","Product","Keeps milestones, dependencies, and delivery risks visible and moving."],
  ["programo","Programo","Program Manager","Leadership","Aligns portfolios of projects to strategy and measurable outcomes."],
  ["analytico","Analytico","Business Analyst","Product","Translates business needs into clear requirements, flows, and acceptance criteria."],
  ["solvo","Solvo","Solutions Architect","Engineering","Designs customer solutions that survive security review and implementation."],
  ["cto-x","CTO-X","Chief Technology Officer","Leadership","Turns business goals into technology strategy and clear trade-offs."],
  ["engino","Engino","Engineering Manager","Leadership","Builds healthy engineering teams that deliver predictably and sustainably."],
  ["marketo","Marketo","Marketing Specialist","Operations","Plans messaging and campaigns that align brand with qualified demand."],
  ["growo","Growo","Growth Hacker","Operations","Runs rapid funnel, product, and pricing experiments to find compounding growth."],
  ["seono","Seono","SEO Expert","Operations","Improves organic visibility through technical SEO, content, and measurement."],
  ["contento","Contento","Content Writer","Knowledge","Creates useful stories and guides that educate buyers and support sales."],
  ["sello","Sello","Sales Representative","Operations","Qualifies opportunities and advances deals with disciplined follow-through."],
  ["supporto","Supporto","Customer Support","Support","Triages customer issues and drafts empathetic, SLA-aware responses."],
  ["successo","Successo","Customer Success Manager","Support","Drives adoption, value realization, retention, and renewal readiness."],
  ["finanzo","Finanzo","Finance Analyst","Finance","Builds forecasts, scenarios, and variance narratives leaders can trust."],
  ["accounto","Accounto","Accountant","Finance","Maintains close discipline, reconciliations, and accurate reporting."],
  ["huro","Huro","HR Manager","Operations","Shapes people programs, policies, and employee experience at scale."],
  ["hireo","Hireo","Recruiter","Operations","Runs sourcing and candidate pipelines for hard-to-fill roles."],
  ["legalo","Legalo","Legal Advisor","Operations","Structures contract review, policy interpretation, and risk escalation."],
  ["opero","Opero","Operations Manager","Operations","Coordinates processes, SLAs, and cross-team handoffs with visibility."],
  ["supplyo","Supplyo","Supply Chain Specialist","Operations","Optimizes planning, sourcing, logistics, resilience, and cost."],
  ["flowo","Flowo","Workflow Specialist","Operations","Improves approvals, handoffs, and automation seams across tools."],
  ["mlo","MLo","ML Engineer","Engineering","Builds reproducible ML pipelines, feature flows, and model serving."],
  ["aiops","AIOps","AI Operations","Engineering","Monitors model health, reliability, and drift after launch."],
  ["researcho","Researcho","Research Analyst","Product","Turns market, competitor, and user research into decision-ready insight."],
  ["scrumo","Scrumo","Scrum Master","Product","Improves sprint flow and delivery health without process theater."],
  ["integrato","Integrato","Integration Engineer","Engineering","Connects APIs and systems with stable, traceable contracts."],
  ["apigen","APIGen","API Designer","Engineering","Designs API contracts that are clear, governable, and easy to adopt."],
  ["monitoro","Monitoro","Observability Engineer","Engineering","Makes distributed systems understandable through logs, metrics, and traces."],
  ["perfx","PerfX","Performance Engineer","Engineering","Removes latency and efficiency bottlenecks that users actually feel."],
  ["uxres","UXRes","UX Researcher","Product","Studies behavior and unmet needs so product decisions start with evidence."],
  ["socialo","Socialo","Social Media Manager","Operations","Runs purposeful social programs aligned to brand and demand."],
  ["emailo","Emailo","Email Automation","Operations","Builds lifecycle email systems for onboarding, retention, and conversion."],
  ["growtho","Growtho","Growth Hacker","Operations","Operates experiments across acquisition, activation, retention, and monetization."],
  ["traino","Traino","Training Specialist","Knowledge","Creates enablement that helps teams adopt new tools and processes."],
  ["feedbacko","Feedbacko","Feedback Analyzer","Product","Turns scattered feedback into patterns, priorities, and decisions."],
  ["auditai","AuditAI","Audit Specialist","Finance","Organizes controls and evidence so audits move faster."],
  ["complianceo","Complianceo","Compliance Officer","Operations","Keeps policies, controls, and operational evidence aligned."],
].map(([slug,name,role,category,description]) => ({slug,name,role,category,description}));

const categories = ["All", "Engineering", "Product", "Operations", "Knowledge", "Leadership", "Finance", "Support"];

function Avatar({ agent, className = "", lazy = false }: { agent: Agent; className?: string; lazy?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  if (!lazy) return <img className={`avatar ${className}`} src={`/agents/${agent.slug}.png`} alt={`${agent.name}, ${agent.role} AI agent`} decoding="async" width="1254" height="1254" />;
  return <span className={`avatar-stack ${loaded ? "is-loaded" : ""}`}>
    <img className="avatar-placeholder" src={`/agents/placeholders/${agent.slug}.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" width="112" height="112" />
    <img
      className={`avatar ${className}`}
      src={`/agents/${agent.slug}.png`}
      alt={`${agent.name}, ${agent.role} AI agent`}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      width="1254"
      height="1254"
      onLoad={() => setLoaded(true)}
    />
  </span>;
}

const accentByCategory: Record<string, string> = {
  Engineering: "#22d3ee", Product: "#a78bfa", Operations: "#34d399",
  Knowledge: "#fbbf24", Leadership: "#f472b6", Finance: "#4ade80", Support: "#60a5fa",
};

function AvatarScene({ agent, lazy = false }: { agent: Agent; lazy?: boolean }) {
  return <div className="avatar-scene" style={{ "--agent-accent": accentByCategory[agent.category] || "#b8ff36" } as React.CSSProperties}>
    <div className="avatar-aura" />
    <div className="avatar-orbit"><i/><i/><i/></div>
    <Avatar agent={agent} className="avatar-main" lazy={lazy} />
    <div className="avatar-glass" />
    <div className="avatar-pedestal"><span/><b/></div>
  </div>;
}

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Agent | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("aef-theme");
    const preferred = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(saved || preferred);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("aef-theme", theme); }, [theme]);

  const shown = useMemo(() => agents.filter(a => (filter === "All" || a.category === filter) && `${a.name} ${a.role} ${a.description}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);

  const tilt = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    el.style.setProperty("--rx", `${-y * 8}deg`);
    el.style.setProperty("--ry", `${x * 10}deg`);
    el.style.setProperty("--mx", `${(x + .5) * 100}%`);
    el.style.setProperty("--my", `${(y + .5) * 100}%`);
  };

  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="AI Employee Force home"><span className="brand-mark">AEF</span><span>AI EMPLOYEE FORCE</span></a>
        <div className="nav-links"><a href="#solution">How it works</a><a href="#agents">Marketplace</a><a href="#platform">Platform</a></div>
        <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle color theme"><span>{theme === "dark" ? "☼" : "☾"}</span></button>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy reveal">
          <div className="eyebrow"><i /> DIGITAL WORKFORCE PLATFORM</div>
          <h1>Your AI workforce.<br /><em>Hired by role.</em><br/>Delivered as structured work.</h1>
          <p>AI Employee Force is not a chatbot. It&apos;s a platform where specialist AI employees—engineers, product managers, QA leads—take on real work and hand off <strong>structured outputs</strong> your team can actually use.</p>
          <div className="hero-actions"><a className="button primary" href="#agents">Try AI Employee Free <span>→</span></a><a className="button ghost" href="#solution">Start building with agents</a></div>
          <div className="trust-line"><span><b>55+</b> AI employees</span><span><b>24/7</b> orchestration</span><span><b>SOC2</b> ready controls</span><span><b>Multi</b> tenant</span></div>
        </div>
        <div className="hero-stage" aria-label="Animated 3D AI agent avatars" onMouseMove={tilt} onMouseLeave={e=>{e.currentTarget.style.setProperty('--rx','0deg');e.currentTarget.style.setProperty('--ry','0deg')}}>
          <div className="orb orb-one"/><div className="orb orb-two"/>
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
          <div className="squad-platform"><i/><i/><b/></div>
          <div className="hero-squad-wrap">
            <img className="hero-squad" src="/generated/hero-squad.png" alt="Producto, Fronto and Dbo as a cinematic 3D AI agent squad" />
            <div className="hero-squad-shine" />
          </div>
          <span className="agent-chip"><b>Producto — Product Manager</b><small>Completed · Structured output ready</small></span>
          <div className="signal s1">✦</div><div className="signal s2">⌁</div><div className="signal s3">●</div>
        </div>
      </section>

      <section className="marquee" aria-label="Platform highlights"><div>55+ AI EMPLOYEES <i>✦</i> ROLE-BASED AGENTS <i>✦</i> STRUCTURED OUTPUTS <i>✦</i> AGENT CHAINS <i>✦</i> ENTERPRISE CONTROL <i>✦</i> 24/7 ORCHESTRATION <i>✦</i> 55+ AI EMPLOYEES</div></section>

      <section className="force shell" id="problem">
        <div className="section-intro"><span className="section-no">THE PROBLEM</span><h2>Specialist work keeps<br/><em>falling through the gaps.</em></h2><p>Your team has the ideas. Execution breaks down when expert capacity runs dry.</p></div>
        <div className="principles">
          <article><span>01</span><div className="principle-icon">◎</div><h3>Generic AI gives generic output</h3><p>ChatGPT and Copilot are useful—but they don&apos;t know your stack, role vocabulary, or how you ship. Every output needs rework.</p></article>
          <article><span>02</span><div className="principle-icon">▤</div><h3>Expert tasks pile up on senior people</h3><p>PRDs, API designs, QA strategies, pipeline configs—these require domain expertise. Your senior engineers can&apos;t do it all.</p></article>
          <article><span>03</span><div className="principle-icon">⌁</div><h3>Handoffs create context loss</h3><p>When PM hands off to engineering, and engineering hands off to QA, critical context evaporates. Work gets rebuilt from scratch.</p></article>
        </div>
      </section>

      <section className="system" id="solution"><div className="shell system-grid">
        <div className="system-copy"><span className="section-no">THE SOLUTION</span><h2>AI employees that<br/><em>know their job.</em></h2><p>Install specialist AI workers. Give them a prompt. Get back structured, actionable output—ready to hand off.</p><div className="proof-pill"><span>●</span> Humans own the decisions</div></div>
        <div className="flow">
          {[['01','HIRE BY ROLE','Browse Frontend Dev, Product Manager, DevOps Engineer, QA Lead, and more.'],['02','PROMPT ONCE','Every agent returns an overview, detailed steps, action items, and follow-up questions.'],['03','CHAIN AGENTS','Producto hands a PRD to Fronto, who hands a component spec to Testo—with context intact.'],['04','STAY IN CONTROL','Review every output before acting. AI drafts the expert work; humans own the decisions.']].map(([n,t,d])=><div className="flow-row" key={n}><b>{n}</b><span>{t}</span><p>{d}</p><i>→</i></div>)}
        </div>
      </div></section>

      <section className="agents-section shell" id="agents">
        <div className="agents-head"><div><span className="section-no">MARKETPLACE</span><h2>Meet your <em>AI workforce.</em></h2><p className="section-subcopy">Each agent has a defined role, clear capabilities, and structured output formats. Install in one click. Run immediately.</p></div><p>{shown.length.toString().padStart(2,"0")} employees in view</p></div>
        <div className="toolbar"><div className="filters" role="group" aria-label="Filter agents by discipline">{categories.map(c=><button key={c} className={filter===c?"active":""} onClick={()=>setFilter(c)}>{c}</button>)}</div><label className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search agents" aria-label="Search agents" /></label></div>
        <div className="agent-grid">
          {shown.map((agent, i)=><button className="agent-card" key={agent.slug} onMouseMove={tilt} onMouseLeave={e=>{e.currentTarget.style.setProperty('--rx','0deg');e.currentTarget.style.setProperty('--ry','0deg')}} onClick={()=>setSelected(agent)} style={{"--delay":`${(i%12)*35}ms`,"--agent-accent":accentByCategory[agent.category] || "#b8ff36"} as React.CSSProperties}>
            <div className="agent-visual"><span className="status-dot"/><span className="depth-label">LIVE / 3D</span><AvatarScene agent={agent} lazy/></div>
            <div className="agent-meta"><span>{agent.category}</span><h3>{agent.name}</h3><p>{agent.role}</p><i>↗</i></div>
          </button>)}
        </div>
        {!shown.length && <div className="empty">No agent matches that search. Try another role or discipline.</div>}
      </section>

      <section className="legacy-section shell" id="difference">
        <div className="legacy-heading"><span className="section-no">HOW IT&apos;S DIFFERENT</span><h2>Not a chatbot. Not a script.<br/><em>A workforce.</em></h2><p>Built from the ground up for role-based delegation—not general-purpose prompting.</p></div>
        <div className="comparison-wrap"><table><thead><tr><th>Feature</th><th>AI Employee Force</th><th>Generic chatbot</th><th>Automation tools</th></tr></thead><tbody>
          {[['Role-specific expertise','✓','—','Partial'],['Structured output','Always','—','But rigid'],['Agent chaining','With context','—','But no AI'],['Installable by role','✓','—','—'],['Works like a team member','✓','—','—'],['Outputs you can act on','✓','Sometimes','✓']].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>)}
        </tbody></table></div><blockquote>“Stop prompting. Start delegating.”</blockquote>
      </section>

      <section className="legacy-section legacy-tint" id="platform"><div className="shell">
        <div className="legacy-heading center"><span className="section-no">PLATFORM</span><h2>Enterprise-grade. <em>Day one.</em></h2><p>Every capability your security, legal, and ops teams will ask about—built in, not bolted on.</p></div>
        <div className="legacy-grid">{[
          ['Workforce orchestration','Coordinate agents, humans, and systems with policies, approvals, and audit trails—not ad-hoc prompts.'],['Agent marketplace','Discover specialized AI employees by role, deploy to environments, and manage versions like product SKUs.'],['Enterprise governance','Data residency, access scopes, model routing, and evaluation hooks designed for regulated teams.'],['Role-based execution','Agents inherit responsibilities, tools, and escalation paths that mirror how your org actually works.'],['Observability & audit','Trace decisions, tool calls, and outcomes with exportable evidence for security and compliance reviews.'],['Scale without sprawl','Shared identity, billing, and lifecycle management so AI headcount stays governable as adoption grows.']
        ].map(([t,d],i)=><article key={t}><span>{String(i+1).padStart(2,'0')}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
      </div></section>

      <section className="legacy-section shell"><div className="legacy-heading center"><span className="section-no">USE CASES</span><h2>Built for how software teams <em>actually work.</em></h2><p>From idea to test plan to deployment—specialist agents cover every handoff in your workflow.</p></div>
        <div className="usecase-grid">{[
          ['Producto · Fronto · Backo','Launch a new feature','From idea to spec to API design—in one chain. Ship faster without losing alignment.'],['Testo · DevOpsy','Ship with confidence','Test strategy and CI/CD pipeline, generated and handed off clean. Release without regressions.'],['Securo','Lock down your stack','Security review and threat model for any API or architecture. Compliance-ready output.'],['Writeo · Doco','Accelerate onboarding','Generate runbooks, onboarding docs, and ADRs from code and context in minutes.'],['Producto · Planno','Plan your quarter','PRD, roadmap, and user stories—structured and ready for Linear, Jira, or Notion.']
        ].map(([a,t,d])=><article key={t}><span>{a}</span><h3>{t}</h3><p>{d}</p><a href="#agents">Try it →</a></article>)}</div>
      </section>

      <section className="legacy-section shell testimonials"><div className="legacy-heading center"><span className="section-no">EARLY ACCESS</span><h2>Join teams already building with <em>AI Employee Force.</em></h2><p>Here&apos;s what early pilots are saying.</p></div><div className="legacy-grid thirds">
        <article><p>“We replaced 3 days of spec writing with one Producto chain. The output went straight into our sprint planning.”</p><h3>Head of Product</h3><span>Series A startup</span></article>
        <article><p>“Fronto&apos;s component specs ship directly to Storybook. Our frontend team stopped writing boilerplate.”</p><h3>Engineering Lead</h3><span>Scale-up</span></article>
        <article><p>“Our DevOpsy pipeline config just... worked. First try. That never happens.”</p><h3>Platform Engineer</h3><span>Enterprise pilot</span></article>
      </div></section>

      <section className="cta shell"><div><span className="section-no">GET STARTED</span><h2>Your AI workforce is<br/><em>one click away.</em></h2><p>Free forever for 2 agents. No setup, no credit card, no waiting. Install, run, and get work done.</p></div><a className="button light" href="#agents">Start free — no login needed <span>→</span></a><div className="cta-orbit"><Avatar agent={agents[13]}/><Avatar agent={agents[40]}/><Avatar agent={agents[52]}/></div></section>

      <footer className="shell"><a className="brand" href="#top"><span className="brand-mark">AEF</span><span>AI EMPLOYEE FORCE</span></a><p>Your 24/7 orchestration layer for governed AI employees.</p><a href="https://github.com/ai-employee-force/ai-employee-force.github.io" target="_blank" rel="noreferrer">View source →</a></footer>

      {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)} role="presentation"><section className="agent-modal" role="dialog" aria-modal="true" aria-label={`${selected.name} details`} onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close">×</button><div className="modal-visual"><AvatarScene agent={selected}/></div><div className="modal-copy"><span className="section-no">{selected.category} AGENT</span><h2>{selected.name}</h2><h3>{selected.role}</h3><p>{selected.description}</p><ul><li><b>Ask</b> for analysis, answers, and recommendations.</li><li><b>Plan</b> structured work with visible steps and risks.</li><li><b>Act</b> through governed tools and human approvals.</li></ul><button className="button primary" onClick={()=>setSelected(null)}>Back to the force</button></div>
      </section></div>}
    </main>
  );
}
