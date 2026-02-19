import React, { useState, useEffect, useRef, useCallback } from "react";

/*
  ╔══════════════════════════════════╗
  ║  K I R A   I N T E R F A C E    ║
  ║  You are not reading about Kira. ║
  ║  Kira is speaking to you.        ║
  ╚══════════════════════════════════╝
*/

// ─── TYPEWRITER ─────────────────────────────
function Typewriter({ lines, speed, onDone, startDelay }) {
  var _s = useState(""); var text = _s[0]; var setText = _s[1];
  var _d = useState(false); var done = _d[0]; var setDone = _d[1];
  var _st = useState(false); var started = _st[0]; var setStarted = _st[1];
  var posRef = useRef(0);
  var full = lines.join("\n");
  var spd = speed || 35;

  useEffect(function () {
    var t = setTimeout(function () { setStarted(true); }, startDelay || 0);
    return function () { clearTimeout(t); };
  }, [startDelay]);

  useEffect(function () {
    if (!started || done) return;
    var timer = null;
    function step() {
      if (posRef.current >= full.length) {
        setDone(true);
        if (onDone) onDone();
        return;
      }
      var ch = full[posRef.current];
      setText(function (prev) { return prev + ch; });
      posRef.current++;
      var delay = ch === "\n" ? 400 : spd;
      timer = setTimeout(step, delay);
    }
    timer = setTimeout(step, spd);
    return function () { if (timer) clearTimeout(timer); };
  }, [started, done]);

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "pre-wrap" }}>
      {text}
      {!done && <span style={{ animation: "blink 1s step-end infinite", borderRight: "2px solid rgba(52,211,153,0.6)", marginLeft: "1px" }}>&nbsp;</span>}
    </div>
  );
}

// ─── SCROLL REVEAL ──────────────────────────
function Reveal({ children, delay, style, threshold }) {
  var ref = useRef(null);
  var _s = useState(false); var vis = _s[0]; var setVis = _s[1];
  useEffect(function () {
    var el = ref.current; if (!el) return;
    var obs = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: threshold || 0.15 });
    obs.observe(el);
    return function () { obs.disconnect(); };
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(30px)",
      transition: "all 1s cubic-bezier(0.16,1,0.3,1) " + (delay || 0) + "s",
      ...style,
    }}>{children}</div>
  );
}

// ─── COUNTING NUMBER ────────────────────────
function CountUp({ target, color }) {
  var ref = useRef(null);
  var _s = useState(false); var started = _s[0]; var setStarted = _s[1];
  var _v = useState("0"); var val = _v[0]; var setVal = _v[1];
  useEffect(function () {
    var el = ref.current; if (!el) return;
    var obs = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting && !started) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return function () { obs.disconnect(); };
  }, [started]);
  useEffect(function () {
    if (!started) return;
    var num = parseFloat(target);
    var hasDot = target.indexOf(".") >= 0;
    var dur = 2000; var t0 = performance.now();
    function tick(now) {
      var p = Math.min((now - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 4);
      setVal(hasDot ? (num * e).toFixed(1) : Math.round(num * e).toString());
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [started, target]);
  return <span ref={ref} style={{ color: color || "white" }}>{val}</span>;
}

// ─── PROTOCOL DATA ──────────────────────────
var PROTOS = {
  eden: {
    name: "Eden", color: "#34D399", tag: "Food",
    line: "828 million people go hungry. Not because we can't grow enough — because we can't coordinate distribution.",
    desc: "Vertical towers with autonomous harvesting and community kitchens. 120 stories of hydroponic gardens. 30,000 meals a day. Farm-to-plate in 8 minutes.",
    stats: [
      { v: "200+", l: "crop varieties per tower" },
      { v: "10K", l: "people fed per installation" },
      { v: "8", l: "minutes farm-to-plate" },
      { v: "0", l: "waste — everything composted" },
    ],
  },
  aqua: {
    name: "Aqua", color: "#38BDF8", tag: "Water",
    line: "2 billion people lack safe water. The atmosphere holds 37.5 million billion gallons. We just need to reach it.",
    desc: "Atmospheric water harvesting, smart desalination, and watershed restoration. 50,000 liters per day from humidity. Solar-powered. Community-owned.",
    stats: [
      { v: "50K", l: "liters per day from air" },
      { v: "0", l: "ocean discharge" },
      { v: "100K", l: "hectares restored" },
      { v: "99.99", l: "% purity" },
    ],
  },
  gaia: {
    name: "Gaia", color: "#FBBF24", tag: "Energy",
    line: "36.8 billion tons of CO₂. Every year. The sun delivers 173,000 terawatts to Earth's surface. We use 18.",
    desc: "Transparent solar glass on every surface. Community microgrids. Direct air carbon capture. And the world's largest open environmental monitoring network.",
    stats: [
      { v: "12", l: "MW generated per tower daily" },
      { v: "800", l: "tons CO₂ captured per year" },
      { v: "1M+", l: "environmental sensor nodes" },
      { v: "100", l: "% grid independence" },
    ],
  },
  hearth: {
    name: "Hearth", color: "#FB7185", tag: "Housing",
    line: "1.6 billion people lack adequate housing. We build carbon-negative homes in 72 hours. Not shelters. Homes.",
    desc: "Modular, AI-designed housing integrated with every other protocol. Eat from the tower. Drink atmospheric water. Power with solar. 60% cheaper than market.",
    stats: [
      { v: "72", l: "hours to deploy" },
      { v: "60", l: "% below market cost" },
      { v: "0", l: "net carbon — negative build" },
      { v: "∞", l: "designed for belonging" },
    ],
  },
  nous: {
    name: "Nous", color: "#C084FC", tag: "Knowledge",
    line: "244 million children out of school. Every blueprint we create is open. Every lesson is free. Every language.",
    desc: "Open-sourced knowledge from every protocol. AI tutoring that adapts to every learner. Direct workforce pipelines. Communities gain independence, not dependence.",
    stats: [
      { v: "100", l: "% open source" },
      { v: "All", l: "languages supported" },
      { v: "Direct", l: "learn-to-earn pipeline" },
      { v: "Self", l: "sovereign communities" },
    ],
  },
};
var PK = Object.keys(PROTOS);

// ─── SYSTEM MAP ─────────────────────────────
function SystemMap({ onSelect, selected }) {
  var _h = useState(null); var hov = _h[0]; var setHov = _h[1];
  var positions = [
    { x: 50, y: 18 },
    { x: 82, y: 40 },
    { x: 70, y: 78 },
    { x: 30, y: 78 },
    { x: 18, y: 40 },
  ];

  return (
    <div style={{ position: "relative", width: "min(420px, 80vw)", height: "min(420px, 80vw)", margin: "0 auto" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100">
        {/* Connection lines between all nodes */}
        {PK.map(function (k1, i) {
          return PK.map(function (k2, j) {
            if (j <= i) return null;
            var p1 = positions[i]; var p2 = positions[j];
            var active = selected === k1 || selected === k2 || hov === k1 || hov === k2;
            return (
              <line key={k1 + k2}
                x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.025)"}
                strokeWidth={active ? "0.3" : "0.15"}
                style={{ transition: "all 0.8s ease" }}
              />
            );
          });
        })}
        {/* Lines to center */}
        {PK.map(function (k, i) {
          var p = positions[i]; var pr = PROTOS[k];
          var active = selected === k || hov === k;
          return (
            <line key={"c" + k}
              x1={p.x} y1={p.y} x2="50" y2="50"
              stroke={active ? pr.color + "30" : "rgba(255,255,255,0.015)"}
              strokeWidth={active ? "0.3" : "0.1"}
              style={{ transition: "all 0.8s ease" }}
            />
          );
        })}
        {/* Center core */}
        <circle cx="50" cy="50" r="2" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.2)" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="0.8" fill="#34D399" fillOpacity="0.6">
          <animate attributeName="r" values="0.6;1.2;0.6" dur="4s" repeatCount="indefinite" />
          <animate attributeName="fillOpacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Protocol nodes */}
      {PK.map(function (k, i) {
        var p = positions[i]; var pr = PROTOS[k];
        var active = selected === k;
        var hover = hov === k;

        return (
          <div key={k}
            onMouseEnter={function () { setHov(k); }}
            onMouseLeave={function () { setHov(null); }}
            onClick={function () { onSelect(active ? null : k); }}
            style={{
              position: "absolute",
              left: p.x + "%", top: p.y + "%",
              transform: "translate(-50%, -50%)" + (active ? " scale(1.15)" : hover ? " scale(1.08)" : ""),
              cursor: "pointer",
              transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
              zIndex: active ? 10 : 1,
              display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
            }}
          >
            {/* Node */}
            <div style={{
              width: active ? "48px" : "36px",
              height: active ? "48px" : "36px",
              borderRadius: "50%",
              background: active ? pr.color + "18" : hover ? pr.color + "0C" : "rgba(255,255,255,0.02)",
              border: "1px solid " + (active ? pr.color + "40" : hover ? pr.color + "20" : "rgba(255,255,255,0.06)"),
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
              boxShadow: active
                ? "0 0 40px " + pr.color + "25, 0 0 80px " + pr.color + "08"
                : hover
                  ? "0 0 20px " + pr.color + "10"
                  : "none",
            }}>
              <div style={{
                width: active ? "10px" : "6px",
                height: active ? "10px" : "6px",
                borderRadius: "50%",
                background: pr.color,
                boxShadow: "0 0 12px " + pr.color + "60",
                transition: "all 0.6s ease",
              }} />
            </div>
            {/* Label */}
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px", fontWeight: 500,
              letterSpacing: "2px", textTransform: "uppercase",
              color: active ? pr.color : hover ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
              transition: "all 0.6s ease",
              whiteSpace: "nowrap",
            }}>{pr.name}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── PROTOCOL DETAIL ────────────────────────
function ProtoDetail({ id }) {
  var p = PROTOS[id]; if (!p) return null;
  return (
    <div style={{
      maxWidth: "800px", margin: "0 auto", padding: "0 24px",
      animation: "fadeIn 0.8s cubic-bezier(0.16,1,0.3,1) both",
    }}>
      {/* Divider */}
      <div style={{
        width: "40px", height: "1px", margin: "48px auto",
        background: "linear-gradient(90deg, transparent, " + p.color + "40, transparent)",
      }} />

      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: "clamp(13px, 1.5vw, 15px)",
          fontWeight: 400, color: "rgba(255,255,255,0.3)", lineHeight: 1.8,
          maxWidth: "520px", margin: "0 auto",
        }}>{p.line}</p>
      </div>

      <div style={{
        fontFamily: "'Outfit', sans-serif", fontSize: "clamp(17px, 2vw, 22px)",
        fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.45)",
        textAlign: "center", maxWidth: "600px", margin: "0 auto",
      }}>{p.desc}</div>

      {/* Stats */}
      <div className="sg" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "1px", marginTop: "48px",
        background: "rgba(255,255,255,0.03)", borderRadius: "16px", overflow: "hidden",
      }}>
        {p.stats.map(function (s, i) {
          return (
            <div key={i} style={{
              padding: "32px 28px", background: "#050510",
              borderRadius: i === 0 ? "16px 0 0 0" : i === 1 ? "0 16px 0 0" : i === 2 ? "0 0 0 16px" : "0 0 16px 0",
            }}>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontSize: "28px",
                fontWeight: 800, color: p.color, lineHeight: 1,
              }}>{s.v}</div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px",
                fontWeight: 400, color: "rgba(255,255,255,0.25)", marginTop: "8px",
              }}>{s.l}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── BOOT SEQUENCE ──────────────────────────
function BootSequence({ onComplete }) {
  var _p = useState(0); var phase = _p[0]; var setPhase = _p[1];

  function nextPhase() { setPhase(function (p) { return p + 1; }); }

  useEffect(function () {
    if (phase === 0) {
      var t = setTimeout(function () { setPhase(1); }, 800);
      return function () { clearTimeout(t); };
    }
  }, [phase]);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", padding: "24px",
      position: "relative",
    }}>
      {/* Subtle center glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,211,153,0.04), transparent 70%)",
        animation: "slowPulse 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "600px", width: "100%", position: "relative",
        fontSize: "clamp(14px, 1.6vw, 17px)", lineHeight: 2, color: "rgba(255,255,255,0.5)",
      }}>
        {phase >= 1 && (
          <Typewriter
            lines={["I am Kira."]}
            speed={60}
            startDelay={200}
            onDone={function () { setTimeout(nextPhase, 600); }}
          />
        )}
        {phase >= 2 && (
          <div style={{ marginTop: "24px" }}>
            <Typewriter
              lines={[
                "I was built to solve the coordination failures",
                "that keep 828 million people hungry while we",
                "produce enough food for 10 billion.",
              ]}
              speed={28}
              startDelay={0}
              onDone={function () { setTimeout(nextPhase, 600); }}
            />
          </div>
        )}
        {phase >= 3 && (
          <div style={{ marginTop: "24px" }}>
            <Typewriter
              lines={[
                "I see the water in the atmosphere that",
                "2 billion people can't reach. The sunlight",
                "on every rooftop we haven't captured.",
                "The homes we could build in 72 hours.",
              ]}
              speed={25}
              startDelay={0}
              onDone={function () { setTimeout(nextPhase, 600); }}
            />
          </div>
        )}
        {phase >= 4 && (
          <div style={{ marginTop: "24px", color: "#34D399" }}>
            <Typewriter
              lines={["Let me show you what I see."]}
              speed={45}
              startDelay={0}
              onDone={function () { setTimeout(function () { if (onComplete) onComplete(); }, 1200); }}
            />
          </div>
        )}
      </div>

      <div style={{
        position: "absolute", bottom: "36px",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px",
        color: "rgba(255,255,255,0.06)", letterSpacing: "2px",
      }}>KIRA.NGO</div>
    </section>
  );
}

// ─── MAIN INTERFACE ─────────────────────────
function MainInterface() {
  var _sel = useState(null); var selected = _sel[0]; var setSelected = _sel[1];

  return (
    <div style={{ animation: "fadeIn 1.5s cubic-bezier(0.16,1,0.3,1) both" }}>
      {/* SYSTEM STATUS */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "80px 24px",
      }}>
        <Reveal>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px",
            fontWeight: 500, letterSpacing: "4px", color: "rgba(255,255,255,0.12)",
            textTransform: "uppercase", textAlign: "center", marginBottom: "12px",
          }}>System Map</div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.1, margin: 0,
          }}>Five protocols.<br /><span style={{ color: "rgba(255,255,255,0.12)" }}>One intelligence.</span></h2>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{ marginTop: "56px" }}>
            <SystemMap selected={selected} onSelect={setSelected} />
          </div>
        </Reveal>

        {selected && <ProtoDetail id={selected} />}

        {!selected && (
          <Reveal delay={0.6}>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px",
              color: "rgba(255,255,255,0.12)", marginTop: "40px", textAlign: "center",
              letterSpacing: "1px",
            }}>Select a node to explore</p>
          </Reveal>
        )}
      </section>

      {/* THE CRISIS — FULL SCREEN NUMBERS */}
      <section style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px",
              fontWeight: 500, letterSpacing: "4px", color: "rgba(255,255,255,0.12)",
              textTransform: "uppercase", marginBottom: "48px",
            }}>What I see</div>
          </Reveal>

          {[
            { num: "828", unit: "million", text: "go hungry tonight. Not because we can't grow food.", color: "#34D399" },
            { num: "2", unit: "billion", text: "can't access safe water. The atmosphere holds enough for everyone.", color: "#38BDF8" },
            { num: "1.6", unit: "billion", text: "lack adequate housing. We can build a home in 72 hours.", color: "#FB7185" },
            { num: "36.8", unit: "billion", text: "tons of CO₂ every year. The sun gives us 10,000x what we need.", color: "#FBBF24" },
            { num: "244", unit: "million", text: "children out of school. Every lesson can be free.", color: "#C084FC" },
          ].map(function (item, i) {
            return (
              <Reveal key={i} delay={0}>
                <div style={{
                  padding: "48px 0",
                  borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.025)" : "none",
                  display: "flex", alignItems: "baseline", gap: "16px", flexWrap: "wrap",
                }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "clamp(40px, 8vw, 72px)",
                    fontWeight: 800, lineHeight: 1,
                  }}>
                    <CountUp target={item.num} color={item.color} />
                    <span style={{
                      fontSize: "0.3em", fontWeight: 400, fontFamily: "'IBM Plex Mono', monospace",
                      color: "rgba(255,255,255,0.2)", marginLeft: "8px",
                    }}>{item.unit}</span>
                  </div>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(15px, 1.6vw, 18px)",
                    fontWeight: 300, color: "rgba(255,255,255,0.2)",
                    lineHeight: 1.6, flex: "1 1 300px",
                  }}>{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FLYWHEEL */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "80px 24px",
      }}>
        <Reveal>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px",
            fontWeight: 500, letterSpacing: "4px", color: "rgba(255,255,255,0.12)",
            textTransform: "uppercase", textAlign: "center", marginBottom: "12px",
          }}>Regenerative Economy</div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.1, margin: 0,
          }}>Everything feeds<br /><span style={{ color: "rgba(255,255,255,0.12)" }}>everything.</span></h2>
        </Reveal>

        <div style={{ marginTop: "64px", maxWidth: "460px", width: "100%" }}>
          {[
            { name: "Eden", color: "#34D399", arrow: "grows food → powers" },
            { name: "Gaia", color: "#FBBF24", arrow: "generates energy → enables" },
            { name: "Aqua", color: "#38BDF8", arrow: "harvests water → sustains" },
            { name: "Hearth", color: "#FB7185", arrow: "houses people → who learn from" },
            { name: "Nous", color: "#C084FC", arrow: "trains everyone → who operate" },
          ].map(function (p, i) {
            return (
              <Reveal key={p.name} delay={0.08 * i}>
                <div style={{
                  display: "flex", alignItems: "center", padding: "20px 0",
                  borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.025)" : "none",
                }}>
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: p.color, boxShadow: "0 0 12px " + p.color + "40",
                    marginRight: "16px", flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Syne', sans-serif", fontSize: "18px",
                    fontWeight: 700, color: p.color, width: "80px",
                  }}>{p.name}</span>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px",
                    color: "rgba(255,255,255,0.15)", marginLeft: "8px",
                  }}>{p.arrow}</span>
                </div>
              </Reveal>
            );
          })}
          <Reveal delay={0.5}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "20px 0", color: "rgba(52,211,153,0.2)",
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "20px",
            }}>↻ Revenue flows back. Cycle repeats. System compounds.</div>
          </Reveal>
        </div>
      </section>

      {/* GOVERNANCE */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "80px 24px",
      }}>
        <Reveal>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px",
            fontWeight: 500, letterSpacing: "4px", color: "rgba(255,255,255,0.12)",
            textTransform: "uppercase", textAlign: "center", marginBottom: "12px",
          }}>Governance</div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.1, margin: 0,
          }}>Governed by<br /><span style={{ color: "rgba(255,255,255,0.12)" }}>the people it serves.</span></h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "clamp(16px, 1.8vw, 20px)",
            fontWeight: 300, color: "rgba(255,255,255,0.25)", textAlign: "center",
            maxWidth: "480px", lineHeight: 1.8, marginTop: "32px",
          }}>
            The Kira token is not speculation.<br />
            It's a vote in how an autonomous intelligence<br />
            allocates resources to heal the planet.
          </p>
        </Reveal>

        <div style={{ marginTop: "56px", maxWidth: "380px", width: "100%" }}>
          {[
            { text: "One token, one vote", c: "#34D399" },
            { text: "AI recommends. Humans decide.", c: "#38BDF8" },
            { text: "Every dollar traceable on-chain", c: "#FBBF24" },
            { text: "Revenue reinvested, never extracted", c: "#C084FC" },
            { text: "Communities fork and self-govern", c: "#FB7185" },
          ].map(function (item, i) {
            return (
              <Reveal key={i} delay={0.08 * i}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "16px 0",
                  borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.02)" : "none",
                }}>
                  <div style={{
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: item.c, boxShadow: "0 0 6px " + item.c + "40",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px",
                    fontWeight: 400, color: "rgba(255,255,255,0.35)",
                  }}>{item.text}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CLOSING — KIRA SPEAKS AGAIN */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "80px 24px", position: "relative",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52,211,153,0.04), transparent 60%)",
          animation: "slowPulse 8s ease-in-out infinite", pointerEvents: "none",
        }} />

        <Reveal>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "clamp(14px, 1.6vw, 17px)",
            fontWeight: 400, color: "rgba(255,255,255,0.3)", lineHeight: 2,
            maxWidth: "520px",
          }}>
            I can see a future where no one goes hungry.
            Where water falls from machines, not clouds.
            Where every rooftop is a power plant and
            every building is a farm.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <p style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px, 4vw, 44px)",
            fontWeight: 800, color: "#34D399", marginTop: "36px", lineHeight: 1.3,
          }}>Will you help me build it?</p>
        </Reveal>
        <Reveal delay={0.8}>
          <button style={{
            marginTop: "48px",
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", fontWeight: 500,
            padding: "16px 48px", letterSpacing: "2px",
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.2)",
            color: "#34D399", borderRadius: "4px", cursor: "pointer",
            transition: "all 0.3s ease",
          }}>JOIN KIRA</button>
        </Reveal>

        {/* Footer */}
        <Reveal delay={1.2}>
          <div style={{ marginTop: "100px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
              <div style={{
                width: "5px", height: "5px", borderRadius: "50%", background: "#34D399",
                boxShadow: "0 0 10px rgba(52,211,153,0.5)",
              }} />
              <span style={{
                fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 800,
                color: "rgba(255,255,255,0.3)", letterSpacing: "4px",
              }}>KIRA</span>
            </div>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px",
              color: "rgba(255,255,255,0.06)", marginTop: "12px",
            }}>
              The world's first AI-governed NGO — A Braintied Labs initiative
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

// ─── APP ────────────────────────────────────
export default function Kira() {
  var _b = useState(false); var booted = _b[0]; var setBooted = _b[1];

  return (
    <div style={{ minHeight: "100vh", background: "#050510", color: "white" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Outfit:wght@200;300;400;500;600;700;800&family=Syne:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050510; overflow-x: hidden; }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes breathe { 0%,100% { opacity:0.4; transform:scale(1); } 50% { opacity:1; transform:scale(1.25); } }
        @keyframes slowPulse { 0%,100% { opacity:0.5; transform:translate(-50%,-50%) scale(1); } 50% { opacity:1; transform:translate(-50%,-50%) scale(1.1); } }
        ::selection { background: rgba(52,211,153,0.2); color: white; }
        @media(max-width:768px) {
          .pg { grid-template-columns: 1fr!important; gap: 48px!important; }
          .sg { grid-template-columns: 1fr!important; }
        }
      `}</style>

      {/* Grain */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.015, pointerEvents: "none", zIndex: 99999,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      }} />

      {!booted && <BootSequence onComplete={function () { setBooted(true); }} />}
      {booted && <MainInterface />}
    </div>
  );
}
