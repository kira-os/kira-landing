import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  {
    id: "hero",
    title: "KIRA DAO",
    subtitle: "THE LIVING TOWER",
    description: "Autonomous regenerative arcologies that feed cities, harvest sunlight, and breathe life into urban landscapes.",
    accent: "#00FFB2",
    bg: "linear-gradient(180deg, #0A0A0F 0%, #0D1B2A 50%, #1B2838 100%)",
  },
  {
    id: "solar",
    title: "SOLAR SKIN",
    subtitle: "PHOTOVOLTAIC GLASS FACADES",
    description: "Every window is a transparent solar panel. The building's entire exterior is a living energy membrane — generating clean power from dawn to dusk while flooding interiors with natural light.",
    accent: "#FFD700",
    bg: "linear-gradient(180deg, #1B2838 0%, #2A1B0D 50%, #1A1205 100%)",
    stats: [
      { label: "Energy Generated", value: "12 MW", sub: "per tower / day" },
      { label: "Grid Independence", value: "100%", sub: "net-positive output" },
      { label: "Light Transmission", value: "40%", sub: "natural daylight" },
    ],
  },
  {
    id: "garden",
    title: "VERTICAL EDEN",
    subtitle: "AUTONOMOUS GROWING SYSTEMS",
    description: "Stacked hydroponic and aeroponic gardens spanning 80+ floors. AI-managed growing cycles optimize yield, nutrition, and seasonality — producing enough food to feed 10,000 people per tower.",
    accent: "#00FF87",
    bg: "linear-gradient(180deg, #1A1205 0%, #0D2A1B 50%, #0A1F0A 100%)",
    stats: [
      { label: "Crop Varieties", value: "200+", sub: "fruits, vegetables, herbs" },
      { label: "Harvest Cycles", value: "365", sub: "days per year" },
      { label: "Water Recycled", value: "98%", sub: "closed-loop system" },
    ],
  },
  {
    id: "robots",
    title: "HARVEST SWARM",
    subtitle: "AUTONOMOUS ROBOTICS",
    description: "Fleets of specialized robots tend, harvest, and transport produce through the tower. Computer vision identifies peak ripeness. Robotic arms handle each crop with precision — from delicate herbs to heavy root vegetables.",
    accent: "#00D4FF",
    bg: "linear-gradient(180deg, #0A1F0A 0%, #0D1B2A 50%, #0A0F1A 100%)",
    stats: [
      { label: "Robots per Tower", value: "500+", sub: "specialized units" },
      { label: "Harvest Accuracy", value: "99.7%", sub: "AI vision-guided" },
      { label: "Uptime", value: "24/7", sub: "autonomous operation" },
    ],
  },
  {
    id: "kitchen",
    title: "THE COMMONS",
    subtitle: "AUTONOMOUS FOOD KITCHENS",
    description: "Farm-to-plate in minutes. AI-orchestrated kitchens prepare fresh meals from the tower's own harvest. Autonomous delivery systems bring nutrition to every floor — and to the surrounding community.",
    accent: "#FF6B6B",
    bg: "linear-gradient(180deg, #0A0F1A 0%, #2A0D1B 50%, #1A0A0F 100%)",
    stats: [
      { label: "Meals per Day", value: "30K+", sub: "fresh from harvest" },
      { label: "Waste", value: "~0%", sub: "composted & recycled" },
      { label: "Delivery Time", value: "<8 min", sub: "any floor" },
    ],
  },
  {
    id: "water",
    title: "AQUA GENESIS",
    subtitle: "ATMOSPHERIC WATER HARVESTING",
    description: "Advanced condensation arrays extract pure water directly from the atmosphere. Combined with rainwater capture and greywater recycling, each tower is a self-contained water ecosystem.",
    accent: "#7EB8FF",
    bg: "linear-gradient(180deg, #1A0A0F 0%, #0D1A2A 50%, #0A1020 100%)",
    stats: [
      { label: "Water Harvested", value: "50K L", sub: "per day from air" },
      { label: "Purity", value: "99.99%", sub: "mineral-enriched" },
      { label: "Self-Sufficient", value: "100%", sub: "zero municipal draw" },
    ],
  },
  {
    id: "air",
    title: "BREATH",
    subtitle: "LIVING AIR PURIFICATION",
    description: "The vertical gardens aren't just food — they're the city's lungs. Bio-filtration systems and plant transpiration create pristine air quality throughout the tower and surrounding blocks.",
    accent: "#C4F0C5",
    bg: "linear-gradient(180deg, #0A1020 0%, #0F1A0F 50%, #0A120A 100%)",
    stats: [
      { label: "CO₂ Absorbed", value: "800 T", sub: "per year per tower" },
      { label: "Air Quality", value: "AQI 5", sub: "forest-level purity" },
      { label: "O₂ Output", value: "600 T", sub: "per year" },
    ],
  },
  {
    id: "vision",
    title: "THE NETWORK",
    subtitle: "ONE TOWER BECOMES MANY",
    description: "Kira DAO's mission: deploy regenerative towers in every major city. A decentralized network of living buildings, governed by the community, feeding millions, and healing the planet — one skyline at a time.",
    accent: "#E0AAFF",
    bg: "linear-gradient(180deg, #0A120A 0%, #1A0D2A 50%, #0F0A1A 100%)",
  },
];

function FloatingParticle({ color, delay, size, x }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        bottom: "-20px",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: color,
        opacity: 0,
        filter: `blur(${size > 4 ? 2 : 0}px)`,
        animation: `floatUp 8s ${delay}s ease-in-out infinite`,
      }}
    />
  );
}

function TowerSVG({ accent, section }) {
  const isHero = section === "hero";
  const isNetwork = section === "vision";

  if (isNetwork) {
    return (
      <svg viewBox="0 0 600 500" style={{ width: "100%", maxWidth: 600, height: "auto" }}>
        {[
          { cx: 300, cy: 180, s: 1 },
          { cx: 140, cy: 320, s: 0.7 },
          { cx: 460, cy: 320, s: 0.7 },
          { cx: 80, cy: 180, s: 0.5 },
          { cx: 520, cy: 180, s: 0.5 },
        ].map((t, i) => (
          <g key={i} style={{ animation: `fadeSlideUp 1s ${i * 0.15}s ease-out both` }}>
            <line
              x1={300}
              y1={180}
              x2={t.cx}
              y2={t.cy}
              stroke={accent}
              strokeWidth="1"
              opacity="0.3"
              strokeDasharray="4,4"
            />
            <rect
              x={t.cx - 15 * t.s}
              y={t.cy - 60 * t.s}
              width={30 * t.s}
              height={60 * t.s}
              fill="none"
              stroke={accent}
              strokeWidth="1.5"
              opacity="0.8"
            />
            {[...Array(Math.floor(4 * t.s))].map((_, j) => (
              <rect
                key={j}
                x={t.cx - 12 * t.s}
                y={t.cy - 55 * t.s + j * 14 * t.s}
                width={24 * t.s}
                height={8 * t.s}
                fill={accent}
                opacity="0.15"
              />
            ))}
            <circle cx={t.cx} cy={t.cy - 65 * t.s} r={4 * t.s} fill={accent} opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 300 500" style={{ width: "100%", maxWidth: 300, height: "auto" }}>
      <defs>
        <linearGradient id={`tg-${section}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
        </linearGradient>
        <filter id={`glow-${section}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Tower body */}
      <rect x="115" y="40" width="70" height="420" fill={`url(#tg-${section})`} stroke={accent} strokeWidth="1" opacity="0.8" />
      
      {/* Tower crown */}
      <polygon points="115,40 150,10 185,40" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.9" />
      <line x1="150" y1="10" x2="150" y2="0" stroke={accent} strokeWidth="1" opacity="0.5" />

      {/* Floor lines & windows */}
      {[...Array(28)].map((_, i) => {
        const y = 50 + i * 15;
        const isSolar = section === "solar";
        const isGarden = section === "garden" || section === "air";
        const isRobot = section === "robots";
        const isKitchen = section === "kitchen";
        const isWater = section === "water";

        return (
          <g key={i} style={{ animation: `fadeSlideUp 0.5s ${i * 0.03}s ease-out both` }}>
            <line x1="117" y1={y} x2="183" y2={y} stroke={accent} strokeWidth="0.3" opacity="0.4" />
            
            {/* Window panels */}
            {[0, 1, 2, 3].map((w) => {
              let fill = accent;
              let opacity = 0.08 + Math.random() * 0.12;
              
              if (isSolar) {
                opacity = 0.15 + Math.sin(i * 0.5 + w) * 0.15;
              } else if (isGarden && i % 3 !== 0) {
                fill = "#00FF87";
                opacity = 0.1 + Math.random() * 0.2;
              } else if (isRobot && (i === 8 || i === 16 || i === 24)) {
                fill = "#00D4FF";
                opacity = 0.4;
              } else if (isKitchen && i > 20) {
                fill = "#FF6B6B";
                opacity = 0.2 + Math.random() * 0.15;
              } else if (isWater) {
                fill = "#7EB8FF";
                opacity = 0.05 + (i / 28) * 0.2;
              }

              return (
                <rect
                  key={w}
                  x={120 + w * 15}
                  y={y + 2}
                  width={12}
                  height={11}
                  fill={fill}
                  opacity={opacity}
                  rx="1"
                />
              );
            })}
          </g>
        );
      })}

      {/* Section-specific details */}
      {section === "solar" && (
        <>
          {[...Array(6)].map((_, i) => (
            <line
              key={i}
              x1={100 + i * 20}
              y1={20 + i * 5}
              x2={120 + i * 15}
              y2={50 + i * 10}
              stroke="#FFD700"
              strokeWidth="0.5"
              opacity="0.3"
              strokeDasharray="2,3"
            >
              <animate attributeName="opacity" values="0.1;0.5;0.1" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </line>
          ))}
        </>
      )}

      {section === "garden" && (
        <>
          {[...Array(8)].map((_, i) => (
            <g key={i}>
              <circle cx={105 + Math.random() * 5} cy={80 + i * 50} r={3 + Math.random() * 4} fill="#00FF87" opacity="0.2" />
              <circle cx={192 + Math.random() * 5} cy={100 + i * 50} r={2 + Math.random() * 3} fill="#00FF87" opacity="0.15" />
            </g>
          ))}
        </>
      )}

      {section === "water" && (
        <>
          {[...Array(5)].map((_, i) => (
            <circle key={i} cx={150} cy={60 + i * 90} r={40} fill="none" stroke="#7EB8FF" strokeWidth="0.5" opacity="0.2">
              <animate attributeName="r" values="35;45;35" dur={`${3 + i}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur={`${3 + i}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </>
      )}

      {/* Ground */}
      <line x1="60" y1="460" x2="240" y2="460" stroke={accent} strokeWidth="0.5" opacity="0.3" />
      {[...Array(5)].map((_, i) => (
        <rect key={i} x={70 + i * 30} y={462} width={20} height={4} fill={accent} opacity="0.08" rx="2" />
      ))}
    </svg>
  );
}

function StatCard({ label, value, sub, accent, delay }) {
  return (
    <div
      style={{
        padding: "24px 20px",
        background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
        border: `1px solid ${accent}22`,
        borderRadius: "2px",
        textAlign: "center",
        animation: `fadeSlideUp 0.8s ${delay}s ease-out both`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "32px",
          fontWeight: 700,
          color: accent,
          letterSpacing: "2px",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          color: "rgba(255,255,255,0.8)",
          marginTop: "10px",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px",
          color: "rgba(255,255,255,0.35)",
          marginTop: "6px",
          letterSpacing: "1px",
        }}
      >
        {sub}
      </div>
    </div>
  );
}

export default function KiraDAOVisionBoard() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const y = containerRef.current.scrollTop;
      setScrollY(y);
      const sectionHeight = containerRef.current.scrollHeight / SECTIONS.length;
      const idx = Math.min(Math.floor(y / sectionHeight + 0.4), SECTIONS.length - 1);
      setActiveSection(idx);
    };

    const el = containerRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const current = SECTIONS[activeSection];

  return (
    <div style={{ width: "100%", height: "100vh", background: "#0A0A0F", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');

        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(0); }
          20% { opacity: 0.6; }
          80% { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-500px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        .vision-scroll::-webkit-scrollbar { width: 0; }
        .vision-scroll { scrollbar-width: none; }
        
        .nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          background: transparent;
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 0;
        }
        .nav-dot:hover {
          border-color: rgba(255,255,255,0.8);
          transform: scale(1.3);
        }
        .nav-dot.active {
          background: white;
          border-color: white;
          box-shadow: 0 0 12px rgba(255,255,255,0.5);
        }
      `}</style>

      {/* Animated background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: current.bg,
          transition: "background 1.5s ease",
          zIndex: 0,
        }}
      />

      {/* Scanline effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
        {[...Array(15)].map((_, i) => (
          <FloatingParticle
            key={i}
            color={current.accent}
            delay={i * 0.6}
            size={2 + Math.random() * 4}
            x={Math.random() * 100}
          />
        ))}
      </div>

      {/* Navigation dots */}
      <div
        style={{
          position: "absolute",
          right: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          zIndex: 20,
        }}
      >
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            className={`nav-dot ${i === activeSection ? "active" : ""}`}
            onClick={() => {
              if (!containerRef.current) return;
              const sectionHeight = containerRef.current.scrollHeight / SECTIONS.length;
              containerRef.current.scrollTo({ top: sectionHeight * i, behavior: "smooth" });
            }}
            title={s.title}
          />
        ))}
      </div>

      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              background: current.accent,
              transition: "background 0.8s ease",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "12px",
              letterSpacing: "4px",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 600,
            }}
          >
            KIRA DAO
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "2px",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          REGENERATIVE ARCOLOGY INITIATIVE
        </span>
      </div>

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className="vision-scroll"
        style={{
          position: "absolute",
          inset: 0,
          overflowY: "auto",
          zIndex: 10,
          scrollSnapType: "y mandatory",
        }}
      >
        {SECTIONS.map((section, idx) => (
          <div
            key={section.id}
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 80px 60px 48px",
              scrollSnapAlign: "start",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: idx === 0 || section.id === "vision" ? "1fr" : "1fr 1fr",
                gap: "60px",
                maxWidth: "1100px",
                width: "100%",
                alignItems: "center",
              }}
            >
              {/* Text side */}
              <div style={{ textAlign: idx === 0 || section.id === "vision" ? "center" : "left" }}>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    color: section.accent,
                    letterSpacing: "6px",
                    marginBottom: "16px",
                    opacity: 0.8,
                  }}
                >
                  {section.subtitle}
                </div>
                <h1
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: idx === 0 ? "72px" : "48px",
                    fontWeight: 800,
                    color: "white",
                    margin: 0,
                    lineHeight: 1.05,
                    letterSpacing: "-1px",
                  }}
                >
                  {section.title}
                </h1>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: "24px",
                    maxWidth: idx === 0 || section.id === "vision" ? "600px" : "none",
                    marginLeft: idx === 0 || section.id === "vision" ? "auto" : 0,
                    marginRight: idx === 0 || section.id === "vision" ? "auto" : 0,
                  }}
                >
                  {section.description}
                </p>

                {idx === 0 && (
                  <div
                    style={{
                      marginTop: "48px",
                      display: "flex",
                      gap: "32px",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {["SOLAR ENERGY", "VERTICAL FARMS", "ROBOTICS", "FOOD SYSTEMS", "WATER", "AIR"].map((tag, i) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          letterSpacing: "3px",
                          color: "rgba(255,255,255,0.3)",
                          padding: "8px 0",
                          borderBottom: "1px solid rgba(255,255,255,0.1)",
                          animation: `fadeSlideUp 0.6s ${0.5 + i * 0.1}s ease-out both`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {section.stats && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
                      marginTop: "40px",
                    }}
                  >
                    {section.stats.map((stat, i) => (
                      <StatCard key={i} {...stat} accent={section.accent} delay={0.3 + i * 0.15} />
                    ))}
                  </div>
                )}

                {section.id === "vision" && (
                  <div
                    style={{
                      marginTop: "40px",
                      padding: "24px 32px",
                      border: `1px solid ${section.accent}33`,
                      background: `${section.accent}08`,
                      maxWidth: "500px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "4px",
                        color: section.accent,
                        marginBottom: "12px",
                      }}
                    >
                      GOVERNED BY THE COMMUNITY
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.7,
                      }}
                    >
                      Token holders vote on tower locations, food programs, and resource allocation. 
                      Every decision transparent. Every meal traceable. Every watt accounted for.
                    </div>
                  </div>
                )}
              </div>

              {/* Visual side */}
              {idx !== 0 && section.id !== "vision" ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ animation: "breathe 6s ease-in-out infinite" }}>
                    <TowerSVG accent={section.accent} section={section.id} />
                  </div>
                </div>
              ) : section.id === "vision" ? (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "-20px" }}>
                  <TowerSVG accent={section.accent} section={section.id} />
                </div>
              ) : null}

              {idx === 0 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "40px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "3px",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    SCROLL TO EXPLORE
                  </span>
                  <div
                    style={{
                      width: "1px",
                      height: "40px",
                      background: "linear-gradient(180deg, rgba(255,255,255,0.3), transparent)",
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom status bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 20,
          background: "linear-gradient(0deg, rgba(10,10,15,0.8), transparent)",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            color: current.accent,
            letterSpacing: "3px",
            transition: "color 0.8s ease",
            opacity: 0.6,
          }}
        >
          {String(activeSection + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
        </span>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {SECTIONS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activeSection ? "32px" : "8px",
                height: "2px",
                background: i === activeSection ? current.accent : "rgba(255,255,255,0.15)",
                transition: "all 0.5s ease",
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "2px",
          }}
        >
          BRAINTIED LABS
        </span>
      </div>
    </div>
  );
}
