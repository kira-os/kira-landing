import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ════════════════════════════════════════════
   KIRA DAO — THE UNIVERSE
   Custom Protocol Glyphs · Glassmorphic · Holographic
   ════════════════════════════════════════════ */

// ─── PROTOCOL GLYPHS ─────────────────────────
// Bespoke geometric SVG icons for each protocol

function GlyphEden({ size = 40, color = "#00FF87", animated = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="eden-grad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Seed / sprout growing upward — life force */}
      <path d="M24 42 V26" stroke="url(#eden-grad)" strokeWidth="1.5" strokeLinecap="round">
        {animated && <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />}
      </path>
      {/* Left leaf */}
      <path d="M24 30 C18 28, 12 22, 10 14 C16 16, 22 22, 24 30Z" fill={color} opacity="0.2" stroke={color} strokeWidth="0.8">
        {animated && <animate attributeName="opacity" values="0.15;0.3;0.15" dur="4s" repeatCount="indefinite" />}
      </path>
      {/* Right leaf */}
      <path d="M24 26 C30 24, 36 18, 38 10 C32 12, 26 18, 24 26Z" fill={color} opacity="0.25" stroke={color} strokeWidth="0.8">
        {animated && <animate attributeName="opacity" values="0.2;0.35;0.2" dur="4s" begin="0.5s" repeatCount="indefinite" />}
      </path>
      {/* Top bud — hexagonal */}
      <polygon points="24,6 28,10 28,16 24,20 20,16 20,10" fill="none" stroke={color} strokeWidth="1" opacity="0.6">
        {animated && <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />}
      </polygon>
      {/* Root lines */}
      <path d="M24 42 C22 44, 18 45, 16 46" stroke={color} strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />
      <path d="M24 42 C26 44, 30 45, 32 46" stroke={color} strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />
    </svg>
  );
}

function GlyphAqua({ size = 40, color = "#7EB8FF", animated = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="aqua-grad" x1="24" y1="4" x2="24" y2="44">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Central droplet — geometric */}
      <path d="M24 6 L32 22 C32 28, 28 34, 24 34 C20 34, 16 28, 16 22 Z" fill="none" stroke="url(#aqua-grad)" strokeWidth="1.2">
        {animated && <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />}
      </path>
      {/* Inner ripple */}
      <circle cx="24" cy="24" r="5" fill="none" stroke={color} strokeWidth="0.6" opacity="0.3">
        {animated && <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite" />}
        {animated && <animate attributeName="opacity" values="0.4;0.15;0.4" dur="2.5s" repeatCount="indefinite" />}
      </circle>
      {/* Concentric rings — ripples outward from base */}
      <ellipse cx="24" cy="38" rx="8" ry="2" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2">
        {animated && <animate attributeName="rx" values="6;10;6" dur="3s" repeatCount="indefinite" />}
        {animated && <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />}
      </ellipse>
      <ellipse cx="24" cy="40" rx="12" ry="3" fill="none" stroke={color} strokeWidth="0.5" opacity="0.12">
        {animated && <animate attributeName="rx" values="10;16;10" dur="3.5s" repeatCount="indefinite" />}
        {animated && <animate attributeName="opacity" values="0.2;0.05;0.2" dur="3.5s" repeatCount="indefinite" />}
      </ellipse>
      {/* Molecular dots */}
      <circle cx="22" cy="22" r="1.2" fill={color} opacity="0.4" />
      <circle cx="26" cy="20" r="0.8" fill={color} opacity="0.3" />
    </svg>
  );
}

function GlyphGaia({ size = 40, color = "#FFD700", animated = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="gaia-grad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Central hexagon — energy core */}
      <polygon points="24,10 32,16 32,28 24,34 16,28 16,16" fill="none" stroke="url(#gaia-grad)" strokeWidth="1.2">
        {animated && <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />}
      </polygon>
      {/* Inner triangle pointing up — power */}
      <polygon points="24,15 29,25 19,25" fill={color} opacity="0.15" stroke={color} strokeWidth="0.6">
        {animated && <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />}
      </polygon>
      {/* Radiating lines — energy beams */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 24 + Math.cos(rad) * 18;
        const y1 = 22 + Math.sin(rad) * 18;
        const x2 = 24 + Math.cos(rad) * 22;
        const y2 = 22 + Math.sin(rad) * 22;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" opacity="0.3" strokeLinecap="round">
            {animated && <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />}
          </line>
        );
      })}
      {/* Orbital ring */}
      <ellipse cx="24" cy="22" rx="20" ry="6" fill="none" stroke={color} strokeWidth="0.4" opacity="0.15" transform="rotate(-20, 24, 22)">
        {animated && <animate attributeName="opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite" />}
      </ellipse>
      {/* Bottom ground line */}
      <path d="M10 42 C16 39, 20 40, 24 38 C28 40, 32 39, 38 42" stroke={color} strokeWidth="0.6" opacity="0.2" fill="none" />
    </svg>
  );
}

function GlyphHearth({ size = 40, color = "#FF6B6B", animated = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="hearth-grad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF6B9D" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Roof — clean angular */}
      <path d="M24 8 L40 22 L38 22 L38 40 L10 40 L10 22 L8 22 Z" fill="none" stroke="url(#hearth-grad)" strokeWidth="1.2" strokeLinejoin="round">
        {animated && <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />}
      </path>
      {/* Door — archway */}
      <path d="M20 40 L20 30 C20 26, 28 26, 28 30 L28 40" fill={color} opacity="0.1" stroke={color} strokeWidth="0.7" />
      {/* Window left */}
      <rect x="13" y="26" width="5" height="5" rx="1" fill="none" stroke={color} strokeWidth="0.6" opacity="0.35">
        {animated && <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" />}
      </rect>
      {/* Window right */}
      <rect x="30" y="26" width="5" height="5" rx="1" fill="none" stroke={color} strokeWidth="0.6" opacity="0.35">
        {animated && <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" begin="1s" repeatCount="indefinite" />}
      </rect>
      {/* Warmth glow from door */}
      <ellipse cx="24" cy="38" rx="6" ry="2" fill={color} opacity="0.08">
        {animated && <animate attributeName="opacity" values="0.05;0.12;0.05" dur="3s" repeatCount="indefinite" />}
      </ellipse>
      {/* Chimney with subtle smoke */}
      <rect x="31" y="12" width="3" height="10" fill="none" stroke={color} strokeWidth="0.6" opacity="0.3" />
      <path d="M32.5 12 C32 9, 34 7, 33 4" stroke={color} strokeWidth="0.5" opacity="0.15" fill="none" strokeLinecap="round">
        {animated && <animate attributeName="opacity" values="0.05;0.2;0.05" dur="3s" repeatCount="indefinite" />}
      </path>
    </svg>
  );
}

function GlyphNous({ size = 40, color = "#E0AAFF", animated = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="nous-grad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9D4EDD" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Neural network — central node */}
      <circle cx="24" cy="22" r="6" fill="none" stroke="url(#nous-grad)" strokeWidth="1.2">
        {animated && <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />}
      </circle>
      <circle cx="24" cy="22" r="2" fill={color} opacity="0.3">
        {animated && <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />}
      </circle>
      {/* Satellite nodes with connections */}
      {[
        { cx: 10, cy: 12, r: 2.5 },
        { cx: 38, cy: 12, r: 2.5 },
        { cx: 8, cy: 32, r: 2 },
        { cx: 40, cy: 32, r: 2 },
        { cx: 24, cy: 42, r: 2.5 },
        { cx: 14, cy: 22, r: 1.5 },
        { cx: 34, cy: 22, r: 1.5 },
      ].map((node, i) => (
        <g key={i}>
          <line x1="24" y1="22" x2={node.cx} y2={node.cy} stroke={color} strokeWidth="0.4" opacity="0.2">
            {animated && <animate attributeName="opacity" values="0.1;0.35;0.1" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />}
          </line>
          <circle cx={node.cx} cy={node.cy} r={node.r} fill="none" stroke={color} strokeWidth="0.7" opacity="0.4">
            {animated && <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />}
          </circle>
          <circle cx={node.cx} cy={node.cy} r={node.r * 0.4} fill={color} opacity="0.2" />
        </g>
      ))}
      {/* Cross connections */}
      <line x1="10" y1="12" x2="38" y2="12" stroke={color} strokeWidth="0.3" opacity="0.1" />
      <line x1="8" y1="32" x2="40" y2="32" stroke={color} strokeWidth="0.3" opacity="0.1" />
      <line x1="10" y1="12" x2="8" y2="32" stroke={color} strokeWidth="0.3" opacity="0.08" />
      <line x1="38" y1="12" x2="40" y2="32" stroke={color} strokeWidth="0.3" opacity="0.08" />
    </svg>
  );
}

const GLYPH_MAP = {
  eden: GlyphEden,
  aqua: GlyphAqua,
  gaia: GlyphGaia,
  hearth: GlyphHearth,
  nous: GlyphNous,
};

function ProtocolGlyph({ protocol, size = 40, animated = true }) {
  const Comp = GLYPH_MAP[protocol];
  const color = PROTOCOLS[protocol]?.color || "#00FFB2";
  if (!Comp) return null;
  return <Comp size={size} color={color} animated={animated} />;
}

// ─── DATA ────────────────────────────────────
const PROTOCOLS = {
  eden: {
    name: "EDEN",
    fullName: "EDEN Protocol",
    tagline: "Regenerative Food Infrastructure",
    color: "#00FF87",
    colorAlt: "#00CC6A",
    gradient: "linear-gradient(135deg, #00FF87, #00CC6A, #00FFB2)",
    description: "The global food system is broken — not because we can't grow enough, but because we can't coordinate. EDEN is the protocol that fixes distribution, eliminates waste, and makes nutritious food a right, not a privilege.",
    heroStat: { value: "828M", label: "people face hunger globally" },
    vision: "A world where no one is more than 10 minutes from fresh, nutritious food — grown regeneratively, harvested autonomously, and delivered to communities by an intelligence that never sleeps.",
    pillars: [
      { title: "Vertical Towers", desc: "120-story regenerative skyscrapers with hydroponic and aeroponic gardens spanning 80+ floors. AI-managed growing cycles produce enough food to feed 10,000 people per tower, 365 days a year.", stat: "200+ crop varieties" },
      { title: "Harvest Robotics", desc: "Fleets of 500+ specialized robots per tower — tending, monitoring, harvesting, and transporting produce. Computer vision identifies peak ripeness. Robotic arms handle each crop with surgical precision.", stat: "99.7% harvest accuracy" },
      { title: "Community Kitchens", desc: "Autonomous kitchens that prepare 30,000+ fresh meals daily from the tower's own harvest. Farm-to-plate in under 8 minutes. Zero waste — every byproduct composted and recycled back into the growing system.", stat: "< 8 min delivery" },
      { title: "Rural Partnerships", desc: "EDEN isn't just towers. It's partnerships with thousands of farmers transitioning to regenerative agriculture — providing AI crop planning, soil health monitoring, and guaranteed purchase agreements.", stat: "10M acres target" },
    ],
    metrics: [
      { label: "Meals Served", value: "0", target: "30K+/day", icon: "◉" },
      { label: "Crop Varieties", value: "200+", target: "500+", icon: "◈" },
      { label: "Water Recycled", value: "98%", target: "99.5%", icon: "◇" },
      { label: "Food Waste", value: "~0%", target: "0%", icon: "◆" },
    ],
  },
  aqua: {
    name: "AQUA",
    fullName: "AQUA Protocol",
    tagline: "Universal Water Security",
    color: "#7EB8FF",
    colorAlt: "#4A9EFF",
    gradient: "linear-gradient(135deg, #7EB8FF, #4A9EFF, #00D4FF)",
    description: "Water is life's non-negotiable requirement. 2 billion people lack safe drinking water. AQUA deploys atmospheric water generation, smart desalination, and watershed restoration — governed not by corporations but by the communities it serves.",
    heroStat: { value: "2B", label: "people lack safe drinking water" },
    vision: "Every human on earth with access to clean, abundant water — harvested from the atmosphere, purified by renewable energy, and distributed by infrastructure that belongs to the people.",
    pillars: [
      { title: "Atmospheric Harvesting", desc: "Advanced condensation arrays extract pure water directly from humidity in the air. Biomimetic surfaces inspired by desert beetles capture fog and dew. Each installation produces 50,000+ liters per day.", stat: "50K L/day per unit" },
      { title: "Smart Desalination", desc: "Solar-powered desalination plants that use AI to optimize energy consumption and membrane performance. Brine byproducts are processed into valuable minerals rather than dumped back into the ocean.", stat: "Zero-discharge design" },
      { title: "Watershed Restoration", desc: "AI-monitored rewilding of degraded watersheds — replanting native vegetation, removing invasive species, and restoring natural water cycles. Satellite and drone surveillance tracks recovery in real-time.", stat: "100K hectares target" },
      { title: "Decentralized Networks", desc: "Modular water infrastructure deployable anywhere — from urban rooftops to remote villages. Each node is autonomous, solar-powered, and connected to Kira's network for monitoring and maintenance prediction.", stat: "99.99% purity" },
    ],
    metrics: [
      { label: "Water Produced", value: "50K L", target: "500K L/day", icon: "◉" },
      { label: "Communities Served", value: "0", target: "10,000+", icon: "◈" },
      { label: "Purity Level", value: "99.99%", target: "99.99%", icon: "◇" },
      { label: "Grid Independence", value: "100%", target: "100%", icon: "◆" },
    ],
  },
  gaia: {
    name: "GAIA",
    fullName: "GAIA Protocol",
    tagline: "Energy & Planetary Monitoring",
    color: "#FFD700",
    colorAlt: "#FFAB00",
    gradient: "linear-gradient(135deg, #FFD700, #FFAB00, #FF8C00)",
    description: "The energy transition is too slow because it's fragmented. GAIA builds the unified energy and environmental intelligence layer — community solar, microgrids, carbon capture, and the world's largest decentralized environmental monitoring network.",
    heroStat: { value: "36.8B", label: "tons of CO₂ emitted annually" },
    vision: "A planet monitored in real-time by millions of sensors, powered entirely by clean energy, with carbon levels declining year over year — all orchestrated by an intelligence that optimizes for planetary health.",
    pillars: [
      { title: "Solar Skin Technology", desc: "Transparent photovoltaic glass that turns every building surface into an energy generator. 40% light transmission means interiors stay bright while facades produce 12+ MW per tower daily.", stat: "12 MW/tower/day" },
      { title: "Community Microgrids", desc: "Decentralized energy networks that give communities energy sovereignty. AI-managed load balancing, battery storage optimization, and peer-to-peer energy trading — all on-chain for full transparency.", stat: "100% grid independence" },
      { title: "Carbon Capture", desc: "Direct air capture installations powered by GAIA's renewable energy surplus. Captured CO₂ is mineralized into building materials — literally turning pollution into the structures that house communities.", stat: "800 tons/year/tower" },
      { title: "Earth Observatory", desc: "Every EDEN tower and AQUA installation is also a GAIA sensor node — monitoring air quality, soil health, water quality, and biodiversity in real-time. The largest open environmental dataset ever assembled.", stat: "1M+ sensor nodes" },
    ],
    metrics: [
      { label: "Energy Generated", value: "12 MW", target: "1 GW network", icon: "◉" },
      { label: "CO₂ Captured", value: "800 T", target: "1M T/year", icon: "◈" },
      { label: "Air Quality", value: "AQI 5", target: "Global AQI 15", icon: "◇" },
      { label: "Sensor Nodes", value: "0", target: "1,000,000+", icon: "◆" },
    ],
  },
  hearth: {
    name: "HEARTH",
    fullName: "HEARTH Protocol",
    tagline: "Housing & Community",
    color: "#FF6B6B",
    colorAlt: "#FF4757",
    gradient: "linear-gradient(135deg, #FF6B6B, #FF4757, #FF6B9D)",
    description: "Housing is a human right that markets have failed to deliver. HEARTH builds regenerative, beautiful, affordable communities — integrated with EDEN food systems, powered by GAIA energy, and designed by AI that optimizes for human connection and wellbeing.",
    heroStat: { value: "1.6B", label: "people lack adequate housing" },
    vision: "Communities where every person has a beautiful, sustainable home — surrounded by gardens, powered by clean energy, nourished by local food, and connected to neighbors who become family.",
    pillars: [
      { title: "Regenerative Housing", desc: "Modular, sustainable, stunning housing built from carbon-negative materials. Designed by AI that optimizes floor plans for natural light, ventilation, community interaction, and individual privacy.", stat: "Net-zero carbon" },
      { title: "Integrated Living", desc: "HEARTH residences are woven into EDEN towers — residents eat from the building's own harvest, drink AQUA water, and power their homes with GAIA energy. Living costs drop dramatically when infrastructure works as one system.", stat: "60% cost reduction" },
      { title: "Rapid Deployment", desc: "For homelessness and disaster response — prefabricated modular units deployable in 72 hours. Dignified, warm, safe spaces connected to services through Kira's AI. Not shelters. Homes.", stat: "72-hour deployment" },
      { title: "Community Design", desc: "Shared maker labs, meditation gardens, childcare centers, healthcare clinics, and gathering spaces — all designed using research on what makes humans thrive. Every HEARTH community is unique to its culture and climate.", stat: "Designed for belonging" },
    ],
    metrics: [
      { label: "Homes Built", value: "0", target: "1M homes", icon: "◉" },
      { label: "Cost vs Market", value: "-60%", target: "-75%", icon: "◈" },
      { label: "Carbon Impact", value: "Net Zero", target: "Carbon Neg.", icon: "◇" },
      { label: "Community Score", value: "—", target: "95+/100", icon: "◆" },
    ],
  },
  nous: {
    name: "NOUS",
    fullName: "NOUS Protocol",
    tagline: "Education & Access",
    color: "#E0AAFF",
    colorAlt: "#C77DFF",
    gradient: "linear-gradient(135deg, #E0AAFF, #C77DFF, #9D4EDD)",
    description: "Knowledge is the ultimate regenerative resource. NOUS makes every lesson from every protocol open and accessible — teaching communities to build, grow, generate, and govern. This isn't charity. It's capacity building.",
    heroStat: { value: "244M", label: "children out of school globally" },
    vision: "A world where every person has free access to the knowledge and skills needed to build regenerative infrastructure in their own community — and where that learning creates direct pathways to meaningful work.",
    pillars: [
      { title: "Open Knowledge", desc: "Every blueprint, dataset, algorithm, and operational manual from EDEN, AQUA, GAIA, and HEARTH — open-sourced and freely available. The largest open repository of regenerative infrastructure knowledge ever assembled.", stat: "100% open source" },
      { title: "AI Tutoring", desc: "Personalized learning paths powered by Kira's intelligence — adapting to each learner's pace, language, and context. From agricultural science to robotics maintenance to community governance.", stat: "Every language" },
      { title: "Workforce Pipelines", desc: "Direct pathways from learning to employment within Kira's ecosystem. Train as a vertical farm technician, water systems engineer, community organizer, or robotics specialist — with guaranteed placement.", stat: "Learn → Earn pipeline" },
      { title: "Community Agency", desc: "NOUS ensures Kira never becomes techno-colonialism. Local operators are trained, knowledge is transferred, and communities gain the capacity to run their own systems independently.", stat: "Self-sovereignty" },
    ],
    metrics: [
      { label: "Learners", value: "0", target: "10M+", icon: "◉" },
      { label: "Courses", value: "0", target: "5,000+", icon: "◈" },
      { label: "Languages", value: "0", target: "100+", icon: "◇" },
      { label: "Job Placements", value: "0", target: "500K+", icon: "◆" },
    ],
  },
};

// ─── COMPONENTS ──────────────────────────────

function GlassCard({ children, color = "#00FFB2", style = {}, hover = true, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "16px",
        border: `1px solid ${hovered && hover ? color + "66" : color + "22"}`,
        background: hovered && hover
          ? `linear-gradient(135deg, ${color}12, rgba(255,255,255,0.04))`
          : "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: onClick ? "pointer" : "default",
        transform: hovered && hover ? "translateY(-4px)" : "none",
        boxShadow: hovered && hover ? `0 20px 60px ${color}15` : "none",
        ...style,
      }}
    >{children}</div>
  );
}

function ParticleField({ color = "#00FFB2", count = 40 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      dur: 15 + Math.random() * 25,
      delay: Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.4,
      dx: (Math.random() - 0.5) * 60,
      dy: (Math.random() - 0.5) * 60,
    })), [count]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          borderRadius: "50%",
          background: color,
          opacity: p.opacity,
          animation: `drift-${p.id} ${p.dur}s ${p.delay}s ease-in-out infinite alternate`,
          filter: p.size > 2 ? "blur(1px)" : "none",
        }} />
      ))}
      <style>{particles.map(p => `
        @keyframes drift-${p.id} {
          0% { transform: translate(0, 0); }
          100% { transform: translate(${p.dx}px, ${p.dy}px); }
        }
      `).join("")}</style>
    </div>
  );
}

function SectionTitle({ label, title, color = "#00FFB2" }) {
  return (
    <div style={{ marginBottom: "48px" }}>
      <div style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "13px",
        letterSpacing: "6px",
        color: color,
        marginBottom: "16px",
        fontWeight: 600,
        textTransform: "uppercase",
      }}>{label}</div>
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(32px, 5vw, 56px)",
        fontWeight: 800,
        color: "white",
        margin: 0,
        lineHeight: 1.1,
      }}>{title}</h2>
    </div>
  );
}

function NavBar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "eden", label: "EDEN" },
    { id: "aqua", label: "AQUA" },
    { id: "gaia", label: "GAIA" },
    { id: "hearth", label: "HEARTH" },
    { id: "nous", label: "NOUS" },
    { id: "governance", label: "Governance" },
  ];

  const currentColor = page === "home" || page === "governance" ? "#00FFB2" : PROTOCOLS[page]?.color || "#00FFB2";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "12px 32px" : "20px 32px",
        background: scrolled ? "rgba(6, 6, 14, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(30px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
          <div style={{
            width: "10px", height: "10px", background: currentColor,
            boxShadow: `0 0 20px ${currentColor}`,
            transition: "all 0.8s ease",
            animation: "pulse 3s ease-in-out infinite",
          }} />
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "14px", letterSpacing: "5px", color: "white", fontWeight: 700 }}>KIRA</span>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {navItems.map(item => {
            const isActive = page === item.id;
            const ic = item.id === "home" || item.id === "governance" ? "#00FFB2" : PROTOCOLS[item.id]?.color || "#00FFB2";
            return (
              <button key={item.id} onClick={() => { setPage(item.id); setMenuOpen(false); }}
                style={{
                  background: isActive ? `${ic}15` : "transparent",
                  border: isActive ? `1px solid ${ic}33` : "1px solid transparent",
                  color: isActive ? ic : "rgba(255,255,255,0.5)",
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 600,
                  letterSpacing: "2px", padding: "8px 14px", borderRadius: "8px",
                  cursor: "pointer", transition: "all 0.3s ease", textTransform: "uppercase",
                }}
              >{item.label}</button>
            );
          })}
        </div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px", padding: "8px 12px", cursor: "pointer", color: "white",
            fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", letterSpacing: "2px" }}
        >{menuOpen ? "CLOSE" : "MENU"}</button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 999,
          background: "rgba(6, 6, 14, 0.95)", backdropFilter: "blur(30px)",
          padding: "16px", display: "flex", flexDirection: "column", gap: "4px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setPage(item.id); setMenuOpen(false); }}
              style={{
                background: page === item.id ? "rgba(255,255,255,0.05)" : "transparent",
                border: "none", color: page === item.id ? "white" : "rgba(255,255,255,0.5)",
                fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600,
                letterSpacing: "2px", padding: "12px 16px", borderRadius: "8px",
                cursor: "pointer", textAlign: "left", textTransform: "uppercase",
              }}
            >{item.label}</button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── PAGE: HOME ──────────────────────────────
function HomePage({ setPage }) {
  const stats = [
    { value: "828M", label: "people face hunger" },
    { value: "2B", label: "lack clean water" },
    { value: "1.6B", label: "lack adequate housing" },
    { value: "36.8B T", label: "CO₂ emitted per year" },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "120px 24px 80px", position: "relative", overflow: "hidden",
      }}>
        <ParticleField color="#00FFB2" count={50} />
        <div style={{
          position: "absolute", width: "min(600px, 90vw)", height: "min(600px, 90vw)",
          borderRadius: "50%", border: "1px solid rgba(0, 255, 178, 0.08)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          animation: "spin 60s linear infinite",
        }}>
          <div style={{
            position: "absolute", width: "100%", height: "100%", borderRadius: "50%",
            border: "1px solid rgba(0, 255, 178, 0.04)", transform: "scale(1.3)",
            animation: "spin 90s linear infinite reverse",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px" }}>
          {/* Kira master glyph — composite */}
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "40px", opacity: 0.6 }}>
            {Object.keys(PROTOCOLS).map(key => (
              <ProtocolGlyph key={key} protocol={key} size={28} />
            ))}
          </div>

          <div style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", letterSpacing: "8px",
            color: "rgba(0, 255, 178, 0.7)", marginBottom: "32px", fontWeight: 600,
          }}>AN AUTONOMOUS INTELLIGENCE FOR PLANETARY REGENERATION</div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(48px, 10vw, 120px)",
            fontWeight: 900, color: "white", margin: 0, lineHeight: 0.95, letterSpacing: "-2px",
          }}>
            KIRA<br />
            <span style={{
              background: "linear-gradient(135deg, #00FFB2, #00D4FF, #E0AAFF, #FFD700)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>DAO</span>
          </h1>

          <p style={{
            fontFamily: "'Nunito Sans', sans-serif", fontSize: "clamp(16px, 2vw, 20px)",
            lineHeight: 1.8, color: "rgba(255, 255, 255, 0.45)", marginTop: "32px",
            maxWidth: "640px", marginLeft: "auto", marginRight: "auto",
          }}>
            Humanity's biggest problems aren't unsolved because they're hard. They're unsolved because our systems don't coordinate. Kira is the intelligence that changes that.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "48px", flexWrap: "wrap" }}>
            <button onClick={() => setPage("eden")} style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 700,
              letterSpacing: "3px", padding: "16px 40px",
              background: "linear-gradient(135deg, #00FFB222, #00FFB211)",
              border: "1px solid #00FFB244", color: "#00FFB2", borderRadius: "12px", cursor: "pointer",
            }}>EXPLORE PROTOCOLS</button>
            <button onClick={() => setPage("governance")} style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 700,
              letterSpacing: "3px", padding: "16px 40px", background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)",
              borderRadius: "12px", cursor: "pointer",
            }}>GOVERNANCE</button>
          </div>
        </div>
      </section>

      {/* CRISIS STATS */}
      <section style={{ padding: "120px 24px", position: "relative" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle label="The Crisis" title="The world is broken in ways we can measure." />
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px", marginTop: "48px",
          }}>
            {stats.map((s, i) => (
              <GlassCard key={i} color="#FF6B6B" style={{ padding: "32px 24px", textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 800, color: "#FF6B6B", lineHeight: 1,
                }}>{s.value}</div>
                <div style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: "14px",
                  color: "rgba(255,255,255,0.4)", marginTop: "12px", lineHeight: 1.5,
                }}>{s.label}</div>
              </GlassCard>
            ))}
          </div>
          <p style={{
            fontFamily: "'Nunito Sans', sans-serif", fontSize: "18px", lineHeight: 1.9,
            color: "rgba(255,255,255,0.4)", marginTop: "48px", maxWidth: "700px",
            textAlign: "center", marginLeft: "auto", marginRight: "auto",
          }}>
            These aren't technology problems. They're coordination failures. The solutions exist — they just need an intelligence that can orchestrate across systems, deploy capital efficiently, and never stop optimizing.
          </p>
        </div>
      </section>

      {/* FIVE PROTOCOLS */}
      <section style={{ padding: "80px 24px 120px", position: "relative" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle label="The Thesis" title="One intelligence. Five protocols. Infinite scale." />
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px", marginTop: "48px",
          }}>
            {Object.entries(PROTOCOLS).map(([key, p], i) => (
              <GlassCard key={key} color={p.color} onClick={() => setPage(key)} style={{
                padding: "36px 28px", cursor: "pointer",
                animation: `fadeSlideUp 0.6s ${i * 0.1}s ease-out both`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span style={{
                      fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", letterSpacing: "4px",
                      color: p.color, fontWeight: 600,
                    }}>PROTOCOL</span>
                    <h3 style={{
                      fontFamily: "'Syne', sans-serif", fontSize: "28px",
                      fontWeight: 800, color: "white", margin: "8px 0 0",
                    }}>{p.name}</h3>
                  </div>
                  <div style={{
                    width: "56px", height: "56px", borderRadius: "14px",
                    background: `${p.color}0A`, border: `1px solid ${p.color}22`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <ProtocolGlyph protocol={key} size={36} />
                  </div>
                </div>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "15px", fontWeight: 600,
                  color: p.color, marginTop: "4px", letterSpacing: "1px",
                }}>{p.tagline}</p>
                <p style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: "14px", lineHeight: 1.7,
                  color: "rgba(255,255,255,0.35)", marginTop: "16px",
                }}>{p.description.slice(0, 140)}...</p>
                <div style={{
                  marginTop: "20px", fontFamily: "'Rajdhani', sans-serif", fontSize: "12px",
                  letterSpacing: "3px", color: p.color, fontWeight: 600, opacity: 0.7,
                }}>EXPLORE →</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FLYWHEEL */}
      <section style={{ padding: "80px 24px 120px", position: "relative" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <SectionTitle label="The Flywheel" title="Everything feeds everything." />
          <GlassCard color="#00FFB2" hover={false} style={{ padding: "48px 32px", marginTop: "32px" }}>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
              {Object.entries(PROTOCOLS).map(([key, p], i) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <ProtocolGlyph protocol={key} size={24} />
                  <span style={{
                    fontFamily: "'Rajdhani', sans-serif", fontSize: "13px",
                    fontWeight: 600, letterSpacing: "2px", color: p.color,
                  }}>{p.name}</span>
                  {i < 4 && <span style={{ color: "rgba(255,255,255,0.15)", fontFamily: "'Rajdhani', sans-serif", marginLeft: "4px" }}>→</span>}
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: "'Nunito Sans', sans-serif", fontSize: "16px", lineHeight: 1.9,
              color: "rgba(255,255,255,0.45)", maxWidth: "600px", margin: "0 auto",
            }}>
              EDEN towers generate energy through GAIA. AQUA provides water for EDEN. HEARTH houses the people who operate EDEN and GAIA. NOUS trains them. Revenue from every protocol flows back to the treasury. It's not charity — it's a self-reinforcing regenerative economy.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px 160px", textAlign: "center", position: "relative" }}>
        <ParticleField color="#E0AAFF" count={20} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 900, color: "white", margin: 0, lineHeight: 1.1,
          }}>
            The future isn't{" "}
            <span style={{
              background: "linear-gradient(135deg, #00FFB2, #00D4FF, #FFD700)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>coming.</span><br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>We're building it.</span>
          </h2>
          <button onClick={() => setPage("governance")} style={{
            marginTop: "48px", fontFamily: "'Rajdhani', sans-serif", fontSize: "14px",
            fontWeight: 700, letterSpacing: "3px", padding: "18px 48px",
            background: "linear-gradient(135deg, #00FFB233, #00D4FF22)",
            border: "1px solid #00FFB244", color: "#00FFB2", borderRadius: "12px", cursor: "pointer",
          }}>JOIN KIRA DAO</button>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: PROTOCOL ──────────────────────────
function ProtocolPage({ id, setPage }) {
  const p = PROTOCOLS[id];
  if (!p) return null;

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "140px 24px 80px", position: "relative", overflow: "hidden",
      }}>
        <ParticleField color={p.color} count={35} />
        <div style={{
          position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)",
          fontFamily: "'Syne', sans-serif", fontSize: "clamp(150px, 25vw, 350px)",
          fontWeight: 900, color: p.color, opacity: 0.03, lineHeight: 0.85,
          pointerEvents: "none", whiteSpace: "nowrap",
        }}>{p.name}</div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
          <div className="protocol-hero-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center",
          }}>
            <div>
              <div style={{ marginBottom: "24px" }}>
                <ProtocolGlyph protocol={id} size={64} />
              </div>
              <div style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", letterSpacing: "6px",
                color: p.color, fontWeight: 600, marginBottom: "20px",
              }}>{p.tagline.toUpperCase()}</div>
              <h1 style={{
                fontFamily: "'Syne', sans-serif", fontSize: "clamp(48px, 8vw, 80px)",
                fontWeight: 900, color: "white", margin: 0, lineHeight: 0.95,
              }}>
                {p.name}<br />
                <span style={{ fontSize: "clamp(20px, 3vw, 28px)", color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>Protocol</span>
              </h1>
              <p style={{
                fontFamily: "'Nunito Sans', sans-serif", fontSize: "17px", lineHeight: 1.9,
                color: "rgba(255,255,255,0.45)", marginTop: "28px", maxWidth: "500px",
              }}>{p.description}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GlassCard color={p.color} hover={false} style={{ padding: "48px 40px", textAlign: "center", width: "100%", maxWidth: "360px" }}>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(48px, 8vw, 72px)",
                  fontWeight: 900, background: p.gradient, WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent", lineHeight: 1,
                }}>{p.heroStat.value}</div>
                <div style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: "16px",
                  color: "rgba(255,255,255,0.4)", marginTop: "16px", lineHeight: 1.5,
                }}>{p.heroStat.label}</div>
                <div style={{
                  marginTop: "24px", fontFamily: "'Rajdhani', sans-serif", fontSize: "12px",
                  letterSpacing: "3px", color: p.color, fontWeight: 600,
                }}>KIRA WILL CHANGE THIS</div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section style={{ padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <SectionTitle label="The Vision" title="What we're building toward." color={p.color} />
          <GlassCard color={p.color} hover={false} style={{ padding: "48px 40px" }}>
            <p style={{
              fontFamily: "'Nunito Sans', sans-serif", fontSize: "20px", lineHeight: 1.9,
              color: "rgba(255,255,255,0.55)", fontStyle: "italic", margin: 0,
            }}>"{p.vision}"</p>
          </GlassCard>
        </div>
      </section>

      {/* PILLARS */}
      <section style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle label="How It Works" title="The four pillars." color={p.color} />
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px", marginTop: "48px",
          }}>
            {p.pillars.map((pillar, i) => (
              <GlassCard key={i} color={p.color} style={{
                padding: "32px 28px",
                animation: `fadeSlideUp 0.6s ${i * 0.1}s ease-out both`,
              }}>
                <div style={{
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", letterSpacing: "3px",
                  color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: "8px",
                }}>0{i + 1}</div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 700, color: "white", margin: 0,
                }}>{pillar.title}</h3>
                <p style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: "14px", lineHeight: 1.7,
                  color: "rgba(255,255,255,0.4)", marginTop: "16px",
                }}>{pillar.desc}</p>
                <div style={{
                  marginTop: "20px", padding: "10px 16px",
                  background: `${p.color}0A`, border: `1px solid ${p.color}22`,
                  borderRadius: "8px", fontFamily: "'Orbitron', sans-serif", fontSize: "13px",
                  fontWeight: 600, color: p.color, display: "inline-block",
                }}>{pillar.stat}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle label="Live Metrics" title="Tracking progress in real-time." color={p.color} />
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px", marginTop: "48px",
          }}>
            {p.metrics.map((m, i) => (
              <GlassCard key={i} color={p.color} hover={false} style={{ padding: "32px 24px", textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: "28px", fontWeight: 700,
                  color: p.color, lineHeight: 1,
                }}>{m.value}</div>
                <div style={{
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
                  letterSpacing: "2px", color: "rgba(255,255,255,0.5)", marginTop: "12px", textTransform: "uppercase",
                }}>{m.label}</div>
                <div style={{
                  marginTop: "16px", height: "4px", background: "rgba(255,255,255,0.05)",
                  borderRadius: "2px", overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%", width: m.value === "0" || m.value === "—" ? "5%" : "60%",
                    background: p.gradient, borderRadius: "2px",
                  }} />
                </div>
                <div style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: "11px",
                  color: "rgba(255,255,255,0.25)", marginTop: "8px",
                }}>Target: {m.target}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle label="Gallery" title="Visualizing the future." color={p.color} />
          <div className="gallery-grid" style={{
            display: "grid", gridTemplateColumns: "2fr 1fr",
            gridTemplateRows: "280px 280px", gap: "20px", marginTop: "48px",
          }}>
            {[
              { span: "1 / 2", rowSpan: "1 / 3", label: "VIDEO — Concept Flythrough", sub: "Drop your Midjourney renders or video here" },
              { span: "2 / 3", rowSpan: "1 / 2", label: "RENDER — Exterior", sub: "Tower concept art" },
              { span: "2 / 3", rowSpan: "2 / 3", label: "RENDER — Interior", sub: "Interior systems" },
            ].map((item, i) => (
              <GlassCard key={i} color={p.color} hover={false} style={{
                gridColumn: item.span, gridRow: item.rowSpan,
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", textAlign: "center", padding: "32px",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 50%, ${p.color}08, transparent 70%)` }} />
                <div style={{
                  width: "56px", height: "56px", borderRadius: "14px",
                  border: `1px solid ${p.color}33`, background: `${p.color}08`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "16px", position: "relative",
                }}>
                  <ProtocolGlyph protocol={id} size={32} />
                </div>
                <div style={{
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 600,
                  letterSpacing: "3px", color: p.color, position: "relative",
                }}>{item.label}</div>
                <div style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: "12px",
                  color: "rgba(255,255,255,0.25)", marginTop: "8px", position: "relative",
                }}>{item.sub}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT */}
      <section style={{ padding: "40px 24px 160px", textAlign: "center" }}>
        {(() => {
          const keys = Object.keys(PROTOCOLS);
          const nextIdx = (keys.indexOf(id) + 1) % keys.length;
          const next = PROTOCOLS[keys[nextIdx]];
          return (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <ProtocolGlyph protocol={keys[nextIdx]} size={48} />
              </div>
              <div style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", letterSpacing: "4px",
                color: "rgba(255,255,255,0.3)", marginBottom: "16px",
              }}>NEXT PROTOCOL</div>
              <button onClick={() => { setPage(keys[nextIdx]); window.scrollTo(0, 0); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 6vw, 64px)",
                  fontWeight: 900, background: next.gradient,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}
              >{next.name} →</button>
            </div>
          );
        })()}
      </section>
    </div>
  );
}

// ─── PAGE: GOVERNANCE ────────────────────────
function GovernancePage({ setPage }) {
  const phases = [
    { phase: "01", title: "Genesis", desc: "Token launch. Community formation. Treasury seed. EDEN Protocol One — the first tower site selected and funded by founding token holders.", color: "#00FFB2", status: "CURRENT" },
    { phase: "02", title: "First Harvest", desc: "EDEN tower construction begins. AQUA pilot deployments in 3 water-stressed communities. GAIA sensor network goes live. NOUS platform launches.", color: "#7EB8FF", status: "2026" },
    { phase: "03", title: "Network Effect", desc: "5 EDEN towers operational. AQUA serving 50+ communities. HEARTH pilot housing. Revenue flywheel activating — treasury growing from protocol revenue.", color: "#FFD700", status: "2027" },
    { phase: "04", title: "Planetary Scale", desc: "25+ towers globally. AQUA in 50 countries. GAIA 100K+ sensors. HEARTH housing 10K+ families. NOUS training 1M+ learners.", color: "#E0AAFF", status: "2030" },
  ];

  const govItems = [
    { title: "Token Governance", desc: "One token, one vote. Propose new deployments, vote on treasury allocation, elect protocol stewards. All votes execute on-chain.", color: "#00FFB2" },
    { title: "AI-Assisted Proposals", desc: "Kira's intelligence analyzes every proposal — projecting impact, cost, timeline, and risk. The AI recommends, but humans decide.", color: "#00D4FF" },
    { title: "Radical Transparency", desc: "Every dollar traceable. Every meal counted. Every watt measured. Real-time dashboards show exactly where resources go.", color: "#FFD700" },
    { title: "Community Treasury", desc: "Revenue from energy, food, water, and housing flows back to the treasury. No extractive profit — regenerative capital.", color: "#E0AAFF" },
    { title: "Protocol Councils", desc: "Each protocol has an elected council of domain experts and community representatives stewarding day-to-day operations.", color: "#FF6B6B" },
    { title: "Local Sovereignty", desc: "Every community retains local governance. Communities can fork, customize, and self-govern their local installations.", color: "#7EB8FF" },
  ];

  return (
    <div>
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "140px 24px 80px", position: "relative",
      }}>
        <ParticleField color="#00FFB2" count={30} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "800px" }}>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", letterSpacing: "6px",
            color: "#00FFB2", fontWeight: 600, marginBottom: "24px",
          }}>DECENTRALIZED GOVERNANCE</div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px, 8vw, 72px)",
            fontWeight: 900, color: "white", margin: 0, lineHeight: 1.05,
          }}>
            Governed by<br />
            <span style={{
              background: "linear-gradient(135deg, #00FFB2, #00D4FF, #E0AAFF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>the people it serves.</span>
          </h1>
          <p style={{
            fontFamily: "'Nunito Sans', sans-serif", fontSize: "18px", lineHeight: 1.9,
            color: "rgba(255,255,255,0.4)", marginTop: "32px", maxWidth: "600px", margin: "32px auto 0",
          }}>
            The KIRA token isn't speculation. It's a vote in how an autonomous intelligence allocates resources to heal the planet.
          </p>
        </div>
      </section>

      <section style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle label="How It Works" title="Transparent. Autonomous. Accountable." />
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px", marginTop: "48px",
          }}>
            {govItems.map((item, i) => (
              <GlassCard key={i} color={item.color} style={{
                padding: "32px 28px", animation: `fadeSlideUp 0.6s ${i * 0.1}s ease-out both`,
              }}>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, color: "white", margin: 0,
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: "14px", lineHeight: 1.7,
                  color: "rgba(255,255,255,0.4)", marginTop: "12px",
                }}>{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <SectionTitle label="Roadmap" title="From genesis to planetary scale." />
          <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "20px" }}>
            {phases.map((ph, i) => (
              <GlassCard key={i} color={ph.color} className="roadmap-card" style={{
                padding: "32px", display: "grid", gridTemplateColumns: "80px 1fr auto",
                gap: "24px", alignItems: "center",
                animation: `fadeSlideUp 0.6s ${i * 0.15}s ease-out both`,
              }}>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif", fontSize: "32px", fontWeight: 800,
                  color: ph.color, opacity: 0.4,
                }}>{ph.phase}</div>
                <div>
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 700, color: "white", margin: 0,
                  }}>{ph.title}</h3>
                  <p style={{
                    fontFamily: "'Nunito Sans', sans-serif", fontSize: "14px", lineHeight: 1.7,
                    color: "rgba(255,255,255,0.4)", marginTop: "8px",
                  }}>{ph.desc}</p>
                </div>
                <div style={{
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 700,
                  letterSpacing: "2px", color: ph.color, padding: "6px 14px",
                  border: `1px solid ${ph.color}33`, borderRadius: "20px", whiteSpace: "nowrap",
                }}>{ph.status}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "40px 24px 160px", textAlign: "center" }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 900, color: "white", margin: 0,
        }}>Ready to govern?</h2>
        <p style={{
          fontFamily: "'Nunito Sans', sans-serif", fontSize: "16px", lineHeight: 1.8,
          color: "rgba(255,255,255,0.35)", marginTop: "20px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto",
        }}>
          Join thousands building the infrastructure for a regenerative planet. Hold KIRA. Vote on what matters.
        </p>
        <button style={{
          marginTop: "32px", fontFamily: "'Rajdhani', sans-serif", fontSize: "14px",
          fontWeight: 700, letterSpacing: "3px", padding: "18px 56px",
          background: "linear-gradient(135deg, #00FFB233, #00D4FF22)",
          border: "1px solid #00FFB244", color: "#00FFB2", borderRadius: "12px", cursor: "pointer",
        }}>COMING SOON</button>
      </section>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{
      padding: "60px 24px 40px", borderTop: "1px solid rgba(255,255,255,0.04)",
      background: "rgba(0,0,0,0.3)",
    }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "40px",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "8px", height: "8px", background: "#00FFB2" }} />
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "13px", letterSpacing: "4px", color: "white", fontWeight: 700 }}>KIRA DAO</span>
          </div>
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.25)" }}>
            An autonomous intelligence for planetary regeneration.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", letterSpacing: "3px", color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: "16px" }}>PROTOCOLS</div>
          {Object.entries(PROTOCOLS).map(([key, p]) => (
            <div key={key} onClick={() => { setPage(key); window.scrollTo(0, 0); }}
              style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "8px", cursor: "pointer" }}
            >{p.name} — {p.tagline}</div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", letterSpacing: "3px", color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: "16px" }}>LINKS</div>
          {["Whitepaper", "Token", "Governance", "Community", "Contact"].map(link => (
            <div key={link} style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "8px", cursor: "pointer" }}>{link}</div>
          ))}
        </div>
      </div>
      <div style={{
        maxWidth: "1100px", margin: "48px auto 0", paddingTop: "24px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
      }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", letterSpacing: "2px", color: "rgba(255,255,255,0.15)" }}>© 2025 KIRA DAO — BRAINTIED LABS</span>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", letterSpacing: "2px", color: "rgba(255,255,255,0.15)" }}>BUILDING THE REGENERATIVE FUTURE</span>
      </div>
    </footer>
  );
}

// ─── MAIN APP ────────────────────────────────
export default function KiraDAOUniverse() {
  const [page, setPage] = useState("home");
  const navigate = useCallback((p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  const currentColor = page === "home" || page === "governance" ? "#00FFB2" : PROTOCOLS[page]?.color || "#00FFB2";

  return (
    <div style={{ minHeight: "100vh", background: "#06060E", color: "white", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Syne:wght@400;500;600;700;800&family=Rajdhani:wght@400;500;600;700&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .protocol-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .gallery-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .gallery-grid > * { grid-column: auto !important; grid-row: auto !important; min-height: 200px; }
          .roadmap-card { grid-template-columns: 1fr auto !important; }
          .roadmap-card > div:first-child { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        ::selection { background: ${currentColor}44; color: white; }
      `}</style>

      <div style={{
        position: "fixed", inset: 0,
        background: `radial-gradient(ellipse at 20% 50%, ${currentColor}06 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, ${currentColor}04 0%, transparent 40%)`,
        transition: "background 1.5s ease", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", inset: 0, opacity: 0.015, pointerEvents: "none", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <NavBar page={page} setPage={navigate} />
        {page === "home" && <HomePage setPage={navigate} />}
        {page === "governance" && <GovernancePage setPage={navigate} />}
        {Object.keys(PROTOCOLS).includes(page) && <ProtocolPage id={page} setPage={navigate} />}
        <Footer setPage={navigate} />
      </div>
    </div>
  );
}
