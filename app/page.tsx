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

function Avatar({ agent, className = "" }: { agent: Agent; className?: string }) {
  return <img className={`avatar ${className}`} src={`/agents/${agent.slug}.png`} alt={`${agent.name}, ${agent.role} AI agent`} />;
}

const accentByCategory: Record<string, string> = {
  Engineering: "#55e7ff", Product: "#b8ff36", Operations: "#ff8d3b",
  Knowledge: "#b98cff", Leadership: "#f2d46f", Finance: "#52e3a4", Support: "#ff69b4",
};

function AvatarScene({ agent }: { agent: Agent }) {
  return <div className="avatar-scene" style={{ "--agent-accent": accentByCategory[agent.category] || "#b8ff36" } as React.CSSProperties}>
    <div className="avatar-aura" />
    <div className="avatar-orbit"><i/><i/><i/></div>
    <Avatar agent={agent} className="avatar-main" />
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
    const saved = localStorage.getItem("oaf-theme");
    const preferred = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(saved || preferred);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("oaf-theme", theme); }, [theme]);

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
        <a className="brand" href="#top" aria-label="Org AI Force home"><span className="brand-mark">O</span><span>ORG AI FORCE</span></a>
        <div className="nav-links"><a href="#force">The force</a><a href="#system">How it works</a><a href="#agents">Agents</a></div>
        <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle color theme"><span>{theme === "dark" ? "☼" : "☾"}</span></button>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy reveal">
          <div className="eyebrow"><i /> YOUR ORGANIZATION, AUGMENTED</div>
          <h1>Meet the force<br />behind <em>better work.</em></h1>
          <p>55 specialized AI agents. One governed operating layer. Built to reason, collaborate, and make every team more capable.</p>
          <div className="hero-actions"><a className="button primary" href="#agents">Explore the force <span>↘</span></a><a className="button ghost" href="#system">See how it works</a></div>
          <div className="trust-line"><span><b>55</b> specialist agents</span><span><b>8</b> disciplines</span><span><b>1</b> governed system</span></div>
        </div>
        <div className="hero-stage" aria-label="Animated 3D AI agent avatars" onMouseMove={tilt} onMouseLeave={e=>{e.currentTarget.style.setProperty('--rx','0deg');e.currentTarget.style.setProperty('--ry','0deg')}}>
          <div className="orb orb-one"/><div className="orb orb-two"/>
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
          <div className="squad-platform"><i/><i/><b/></div>
          <div className="hero-squad-wrap">
            <img className="hero-squad" src="/generated/hero-squad.png" alt="Producto, Fronto and Dbo as a cinematic 3D AI agent squad" />
            <div className="hero-squad-shine" />
          </div>
          <span className="agent-chip"><b>3D agent force</b><small>Hover to explore the depth field</small></span>
          <div className="signal s1">✦</div><div className="signal s2">⌁</div><div className="signal s3">●</div>
        </div>
      </section>

      <section className="marquee" aria-label="Agent capability highlights"><div>ENGINEERING <i>✦</i> PRODUCT <i>✦</i> OPERATIONS <i>✦</i> KNOWLEDGE <i>✦</i> LEADERSHIP <i>✦</i> FINANCE <i>✦</i> SUPPORT <i>✦</i> ENGINEERING <i>✦</i> PRODUCT</div></section>

      <section className="force shell" id="force">
        <div className="section-intro"><span className="section-no">01 / THE FORCE</span><h2>Not another chatbot.<br/><em>A digital organization.</em></h2><p>Each agent is a focused specialist with a clear role, useful working context, and boundaries that make its work inspectable.</p></div>
        <div className="principles">
          <article><span>01</span><div className="principle-icon">◎</div><h3>Specialized intelligence</h3><p>Purpose-built roles—from architecture and security to research, support, finance, and growth.</p></article>
          <article><span>02</span><div className="principle-icon">⌘</div><h3>Governed execution</h3><p>Tool permissions, human approvals, and explicit Ask, Plan, and Act modes keep control visible.</p></article>
          <article><span>03</span><div className="principle-icon">↗</div><h3>Operationally honest</h3><p>Failures, degraded dependencies, and readiness signals remain visible—never disguised as success.</p></article>
        </div>
      </section>

      <section className="system" id="system"><div className="shell system-grid">
        <div className="system-copy"><span className="section-no">02 / OPERATING MODEL</span><h2>From intent<br/>to <em>trusted action.</em></h2><p>Org AI Force connects conversation to governed execution. Every step can be understood, reviewed, and improved.</p><div className="proof-pill"><span>●</span> Prototype architecture proof · Mock-safe by design</div></div>
        <div className="flow">
          {[['01','ASK','Bring a goal, issue, or decision.'],['02','GROUND','Retrieve approved organizational context.'],['03','PLAN','Make steps, tools, and risk visible.'],['04','APPROVE','Keep humans in control of sensitive action.'],['05','ACT','Execute within policy and capture evidence.'],['06','IMPROVE','Turn feedback into evaluations and stronger agents.']].map(([n,t,d])=><div className="flow-row" key={n}><b>{n}</b><span>{t}</span><p>{d}</p><i>→</i></div>)}
        </div>
      </div></section>

      <section className="agents-section shell" id="agents">
        <div className="agents-head"><div><span className="section-no">03 / AGENT DIRECTORY</span><h2>Find your <em>specialist.</em></h2></div><p>{shown.length.toString().padStart(2,"0")} agents in view</p></div>
        <div className="toolbar"><div className="filters" role="group" aria-label="Filter agents by discipline">{categories.map(c=><button key={c} className={filter===c?"active":""} onClick={()=>setFilter(c)}>{c}</button>)}</div><label className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search agents" aria-label="Search agents" /></label></div>
        <div className="agent-grid">
          {shown.map((agent, i)=><button className="agent-card" key={agent.slug} onMouseMove={tilt} onMouseLeave={e=>{e.currentTarget.style.setProperty('--rx','0deg');e.currentTarget.style.setProperty('--ry','0deg')}} onClick={()=>setSelected(agent)} style={{"--delay":`${(i%12)*35}ms`,"--agent-accent":accentByCategory[agent.category] || "#b8ff36"} as React.CSSProperties}>
            <div className="agent-visual"><span className="status-dot"/><span className="depth-label">LIVE / 3D</span><AvatarScene agent={agent}/></div>
            <div className="agent-meta"><span>{agent.category}</span><h3>{agent.name}</h3><p>{agent.role}</p><i>↗</i></div>
          </button>)}
        </div>
        {!shown.length && <div className="empty">No agent matches that search. Try another role or discipline.</div>}
      </section>

      <section className="cta shell"><div><span className="section-no">YOUR NEXT TEAMMATE IS READY</span><h2>Build with a force<br/>that <em>works as one.</em></h2></div><a className="button light" href="#agents">Meet all agents <span>↗</span></a><div className="cta-orbit"><Avatar agent={agents[13]}/><Avatar agent={agents[40]}/><Avatar agent={agents[52]}/></div></section>

      <footer className="shell"><a className="brand" href="#top"><span className="brand-mark">O</span><span>ORG AI FORCE</span></a><p>Enterprise agent operations, made visible.</p><a href="https://github.com/AnkitParekh007/org-ai-force" target="_blank" rel="noreferrer">View source ↗</a></footer>

      {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)} role="presentation"><section className="agent-modal" role="dialog" aria-modal="true" aria-label={`${selected.name} details`} onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close">×</button><div className="modal-visual"><AvatarScene agent={selected}/></div><div className="modal-copy"><span className="section-no">{selected.category} AGENT</span><h2>{selected.name}</h2><h3>{selected.role}</h3><p>{selected.description}</p><ul><li><b>Ask</b> for analysis, answers, and recommendations.</li><li><b>Plan</b> structured work with visible steps and risks.</li><li><b>Act</b> through governed tools and human approvals.</li></ul><button className="button primary" onClick={()=>setSelected(null)}>Back to the force</button></div>
      </section></div>}
    </main>
  );
}
