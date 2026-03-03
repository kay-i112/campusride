import { useState } from "react";

// ─── Icons (inline SVG helpers) ───────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const BusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="22" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><line x1="1" y1="10" x2="23" y2="10"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>
  </svg>
);

// ─── COLOR PALETTE ─────────────────────────────────────────────────────────────
const colors = {
  primary: "#1E3A8A",
  primaryLight: "#2563EB",
  secondary: "#10B981",
  accent: "#F97316",
  bg: "#F9FAFB",
  dark: "#111827",
  card: "#FFFFFF",
  border: "#E5E7EB",
  muted: "#6B7280",
  danger: "#EF4444",
};

// ─── DEMO DATA ─────────────────────────────────────────────────────────────────
const demoStudents = [
  { id: 1, name: "Alex Johnson", email: "alex@uni.edu", balance: 18.50, route: "Painesville", status: "Active" },
  { id: 2, name: "Maria Garcia", email: "maria@uni.edu", balance: 6.00, route: "Broadville", status: "Active" },
  { id: 3, name: "James Lee", email: "james@uni.edu", balance: 0.00, route: "Baton Rougeville", status: "Inactive" },
  { id: 4, name: "Sophie Brown", email: "sophie@uni.edu", balance: 22.00, route: "Painesville", status: "Active" },
  { id: 5, name: "Omar Khalid", email: "omar@uni.edu", balance: 14.50, route: "Broadville", status: "Active" },
];

const demoTransactions = [
  { id: 1, date: "2025-03-01", type: "Ride", route: "Painesville → Campus", amount: -2.50 },
  { id: 2, date: "2025-03-01", type: "Recharge", route: "—", amount: +10.00 },
  { id: 3, date: "2025-02-28", type: "Ride", route: "Campus → Painesville", amount: -2.50 },
  { id: 4, date: "2025-02-27", type: "Ride", route: "Painesville → Campus", amount: -2.50 },
  { id: 5, date: "2025-02-26", type: "Recharge", route: "—", amount: +5.00 },
];

const routes = [
  { city: "Painesville", times: ["6:30 AM", "7:00 AM", "7:30 AM"], price: 2.50, seats: 40, status: "On Time" },
  { city: "Broadville", times: ["6:45 AM", "7:15 AM", "7:45 AM"], price: 3.00, seats: 35, status: "On Time" },
  { city: "Baton Rougeville", times: ["6:30 AM", "7:00 AM"], price: 3.50, seats: 30, status: "5 min delay" },
];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

const Navbar = ({ page, setPage, user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{ background: colors.primary, color: "#fff", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(30,58,138,0.3)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
          <div style={{ background: colors.accent, borderRadius: 8, padding: "5px 8px", display: "flex" }}><BusIcon /></div>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>Campus<span style={{ color: colors.accent }}>Ride</span></span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {["home","about","routes","pricing"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ background: page === p ? "rgba(255,255,255,0.15)" : "transparent", color: "#fff", border: "none", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 500, fontSize: 14, textTransform: "capitalize" }}>
              {p}
            </button>
          ))}
          {user ? (
            <button onClick={() => setPage(user.role === "admin" ? "admin" : "dashboard")} style={{ background: colors.secondary, color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
              Dashboard
            </button>
          ) : (
            <>
              <button onClick={() => setPage("login")} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 500, fontSize: 14 }}>Login</button>
              <button onClick={() => setPage("register")} style={{ background: colors.accent, color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ setPage }) => (
  <footer style={{ background: colors.dark, color: "#9CA3AF", padding: "48px 24px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ background: colors.accent, borderRadius: 6, padding: "4px 6px" }}><BusIcon /></div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>Campus<span style={{ color: colors.accent }}>Ride</span></span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7 }}>Smart transportation for university students. Safe, affordable, and always on time.</p>
        </div>
        <div>
          <p style={{ color: "#fff", fontWeight: 600, marginBottom: 12 }}>Company</p>
          {["About", "Routes", "Pricing"].map(l => <p key={l} style={{ fontSize: 14, marginBottom: 8, cursor: "pointer" }} onClick={() => setPage(l.toLowerCase())}>{l}</p>)}
        </div>
        <div>
          <p style={{ color: "#fff", fontWeight: 600, marginBottom: 12 }}>Legal</p>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => <p key={l} style={{ fontSize: 14, marginBottom: 8, cursor: "pointer" }}>{l}</p>)}
        </div>
        <div>
          <p style={{ color: "#fff", fontWeight: 600, marginBottom: 12 }}>Contact</p>
          <p style={{ fontSize: 14, marginBottom: 8 }}>support@campusride.edu</p>
          <p style={{ fontSize: 14, marginBottom: 8 }}>+1 (555) 123-4567</p>
          <p style={{ fontSize: 14 }}>Mon–Fri, 7AM–6PM</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #374151", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 13 }}>© 2025 CampusRide. All rights reserved.</p>
        <p style={{ fontSize: 13 }}>Built for students, by students.</p>
      </div>
    </div>
  </footer>
);

const Badge = ({ children, color = colors.secondary }) => (
  <span style={{ background: color + "20", color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{children}</span>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background: colors.card, borderRadius: 16, border: `1px solid ${colors.border}`, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", ...style }}>{children}</div>
);

const Btn = ({ children, onClick, variant = "primary", style = {}, size = "md" }) => {
  const bg = variant === "primary" ? colors.primary : variant === "accent" ? colors.accent : variant === "secondary" ? colors.secondary : variant === "danger" ? colors.danger : "transparent";
  const pad = size === "sm" ? "7px 14px" : size === "lg" ? "14px 32px" : "10px 20px";
  return (
    <button onClick={onClick} style={{ background: bg, color: variant === "outline" ? colors.primary : "#fff", border: variant === "outline" ? `2px solid ${colors.primary}` : "none", padding: pad, borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: size === "sm" ? 13 : size === "lg" ? 17 : 15, transition: "opacity 0.2s", ...style }}
      onMouseEnter={e => e.target.style.opacity = "0.88"} onMouseLeave={e => e.target.style.opacity = "1"}>
      {children}
    </button>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = ({ setPage }) => {
  const steps = [
    { n: "01", title: "Register Online", desc: "Create your student account in minutes using your university email." },
    { n: "02", title: "Get Your Card", desc: "Purchase a $5 transport card at any campus kiosk or online." },
    { n: "03", title: "Recharge Anytime", desc: "Top up your card balance online — $5, $10, or $20 weekly plans." },
    { n: "04", title: "Ride & Scan", desc: "Tap your card at boarding to deduct the fare automatically." },
  ];
  const features = [
    { icon: "🔒", title: "Safe & Verified", desc: "All drivers are background-checked and certified." },
    { icon: "⏱️", title: "Always On Time", desc: "Real-time tracking and delay notifications." },
    { icon: "💳", title: "Easy Payments", desc: "Prepaid card system — no cash needed." },
    { icon: "📍", title: "Multiple Routes", desc: "Coverage across 3+ cities with expanding routes." },
    { icon: "📱", title: "Mobile Ready", desc: "Access your dashboard from any device." },
    { icon: "🎓", title: "Student First", desc: "Built exclusively for university students." },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, #1e40af 50%, #1d4ed8 100%)`, color: "#fff", padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(249,115,22,0.1)" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)", borderRadius: 30, padding: "6px 18px", marginBottom: 24, fontSize: 13, fontWeight: 600, color: "#6EE7B7" }}>
            🚌 University Transport System
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: -1 }}>
            Smart Transport for<br /><span style={{ color: colors.accent }}>University Students</span>
          </h1>
          <p style={{ fontSize: 18, opacity: 0.85, lineHeight: 1.7, marginBottom: 40, maxWidth: 520, margin: "0 auto 40px" }}>
            Affordable, reliable, and digital-first transportation connecting students to campus — every single day.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => setPage("register")} variant="accent" size="lg">Get Started Free</Btn>
            <button onClick={() => setPage("routes")} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", padding: "14px 32px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 17 }}>
              View Routes →
            </button>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 56, flexWrap: "wrap" }}>
            {[["2,400+","Students Enrolled"], ["3","Cities Covered"], ["98%","On-Time Rate"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: colors.accent }}>{n}</div>
                <div style={{ fontSize: 13, opacity: 0.7, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "80px 24px", background: colors.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: colors.secondary, fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Simple Process</p>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: colors.dark }}>How CampusRide Works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24 }}>
            {steps.map((s, i) => (
              <Card key={i} style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: colors.primary + "18", position: "absolute", top: 8, right: 16 }}>{s.n}</div>
                <div style={{ width: 56, height: 56, background: colors.primary + "12", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24 }}>
                  {["📝","💳","🔄","🚌"][i]}
                </div>
                <h3 style={{ fontWeight: 700, color: colors.dark, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: colors.muted, fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Route Preview */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <p style={{ color: colors.accent, fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Coverage</p>
              <h2 style={{ fontSize: 34, fontWeight: 800, color: colors.dark, marginBottom: 16 }}>Routes Across 3 Cities</h2>
              <p style={{ color: colors.muted, lineHeight: 1.8, marginBottom: 32 }}>Morning departures starting at 6:30 AM ensure you're always on campus before your first lecture.</p>
              <Btn onClick={() => setPage("routes")} variant="primary">See All Routes</Btn>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {routes.map(r => (
                <div key={r.city} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: colors.bg, borderRadius: 12, padding: "16px 20px", border: `1px solid ${colors.border}` }}>
                  <div>
                    <p style={{ fontWeight: 700, color: colors.dark }}>{r.city}</p>
                    <p style={{ fontSize: 13, color: colors.muted }}>{r.times[0]} · {r.times[1]}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: 700, color: colors.primary }}>${r.price.toFixed(2)}</p>
                    <Badge color={r.status === "On Time" ? colors.secondary : colors.accent}>{r.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "80px 24px", background: colors.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: colors.secondary, fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Benefits</p>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: colors.dark }}>Why Students Choose CampusRide</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {features.map((f, i) => (
              <Card key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, color: colors.dark, marginBottom: 6, fontSize: 16 }}>{f.title}</h3>
                <p style={{ color: colors.muted, fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${colors.primary}, #1d4ed8)`, color: "#fff", padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Ready to Ride Smarter?</h2>
        <p style={{ opacity: 0.8, marginBottom: 36, fontSize: 17 }}>Join 2,400+ students already using CampusRide.</p>
        <Btn onClick={() => setPage("register")} variant="accent" size="lg">Register Now — It's Free</Btn>
      </section>
    </div>
  );
};

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
const AboutPage = () => {
  const values = [
    { icon: "🎯", title: "Student-Centered", desc: "Every decision we make puts student needs first." },
    { icon: "🔐", title: "Trust & Safety", desc: "Verified drivers and secure digital payments." },
    { icon: "♻️", title: "Sustainability", desc: "Reducing individual car trips to lower campus carbon footprint." },
    { icon: "📊", title: "Transparency", desc: "Clear pricing, open schedules, real-time updates." },
  ];
  return (
    <div style={{ background: colors.bg }}>
      <section style={{ background: `linear-gradient(135deg, ${colors.primary}, #1d4ed8)`, color: "#fff", padding: "72px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 16 }}>About CampusRide</h1>
        <p style={{ opacity: 0.8, fontSize: 18, maxWidth: 540, margin: "0 auto" }}>Reimagining how university students get to campus every morning.</p>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px" }}>
        <Card style={{ marginBottom: 32 }}>
          <h2 style={{ color: colors.primary, fontWeight: 800, fontSize: 24, marginBottom: 16 }}>The Problem</h2>
          <p style={{ color: colors.muted, lineHeight: 1.8, fontSize: 16 }}>
            Every morning, thousands of university students struggle with expensive rides, unreliable public transport, and long commutes. Many miss lectures, spend excessive amounts on daily transportation, or rely on informal, unsafe carpooling arrangements. The lack of a structured, affordable system directly impacts academic performance and student wellbeing.
          </p>
        </Card>
        <Card style={{ marginBottom: 32, borderLeft: `4px solid ${colors.secondary}` }}>
          <h2 style={{ color: colors.secondary, fontWeight: 800, fontSize: 24, marginBottom: 16 }}>Our Solution</h2>
          <p style={{ color: colors.muted, lineHeight: 1.8, fontSize: 16 }}>
            CampusRide provides a fully digital, structured transport system exclusively for university students. With prepaid transport cards, fixed routes, scheduled departures, and a transparent pricing model, students can commute confidently and affordably — while administrators gain full visibility into the system.
          </p>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
          <Card>
            <h3 style={{ color: colors.primary, fontWeight: 700, marginBottom: 10 }}>🎯 Our Mission</h3>
            <p style={{ color: colors.muted, fontSize: 15, lineHeight: 1.7 }}>To make daily campus commuting safe, affordable, and stress-free for every university student — regardless of where they live.</p>
          </Card>
          <Card>
            <h3 style={{ color: colors.primary, fontWeight: 700, marginBottom: 10 }}>🔭 Our Vision</h3>
            <p style={{ color: colors.muted, fontSize: 15, lineHeight: 1.7 }}>A world where no student misses class because of transport. We envision smart mobility as a standard feature of every modern university.</p>
          </Card>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: colors.dark, textAlign: "center", marginBottom: 32 }}>Our Core Values</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {values.map((v, i) => (
            <Card key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{v.icon}</div>
              <h3 style={{ fontWeight: 700, color: colors.dark, marginBottom: 6 }}>{v.title}</h3>
              <p style={{ color: colors.muted, fontSize: 13, lineHeight: 1.6 }}>{v.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── ROUTES PAGE ──────────────────────────────────────────────────────────────
const RoutesPage = () => {
  const [suggestion, setSuggestion] = useState({ name: "", stop: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={{ background: colors.bg, minHeight: "100vh" }}>
      <section style={{ background: `linear-gradient(135deg, ${colors.primary}, #1d4ed8)`, color: "#fff", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, marginBottom: 12 }}>Bus Routes & Schedules</h1>
        <p style={{ opacity: 0.8, fontSize: 17 }}>Morning departures from 3 cities — 7 days a week.</p>
      </section>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 56 }}>
          {routes.map(r => (
            <Card key={r.city}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: colors.dark }}>{r.city}</h2>
                    <Badge color={r.status === "On Time" ? colors.secondary : colors.accent}>{r.status}</Badge>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {r.times.map(t => (
                      <span key={t} style={{ background: colors.primary + "12", color: colors.primary, padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: colors.primary }}>${r.price.toFixed(2)} <span style={{ fontSize: 14, color: colors.muted, fontWeight: 400 }}>/ ride</span></div>
                  <p style={{ color: colors.muted, fontSize: 13 }}>{r.seats} seats per bus</p>
                </div>
              </div>
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${colors.border}`, display: "flex", gap: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: colors.muted }}>
                  <span>📍</span> {r.city} → Main Campus
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: colors.muted }}>
                  <span>🚌</span> Air-conditioned buses
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: colors.muted }}>
                  <span>💳</span> Card payment only
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Suggest a Stop */}
        <Card>
          <h2 style={{ fontWeight: 800, color: colors.dark, fontSize: 22, marginBottom: 6 }}>💡 Suggest a New Stop</h2>
          <p style={{ color: colors.muted, fontSize: 14, marginBottom: 20 }}>Don't see your neighborhood? Let us know and we'll evaluate adding it to a route.</p>
          {submitted ? (
            <div style={{ background: colors.secondary + "15", border: `1px solid ${colors.secondary}`, borderRadius: 10, padding: 20, textAlign: "center" }}>
              <p style={{ color: colors.secondary, fontWeight: 700 }}>✅ Suggestion submitted! We'll review it within 3–5 business days.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input placeholder="Your name" value={suggestion.name} onChange={e => setSuggestion({...suggestion, name: e.target.value})} style={{ padding: "11px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 14, outline: "none" }} />
              <input placeholder="Suggested stop / neighborhood" value={suggestion.stop} onChange={e => setSuggestion({...suggestion, stop: e.target.value})} style={{ padding: "11px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 14, outline: "none" }} />
              <textarea placeholder="Why should this stop be added?" value={suggestion.reason} onChange={e => setSuggestion({...suggestion, reason: e.target.value})} rows={3} style={{ padding: "11px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 14, outline: "none", resize: "vertical" }} />
              <Btn onClick={() => setSubmitted(true)} variant="primary" style={{ alignSelf: "flex-start" }}>Submit Suggestion</Btn>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// ─── PRICING PAGE ─────────────────────────────────────────────────────────────
const PricingPage = ({ setPage }) => {
  const plans = [
    { name: "Starter", price: 5, rides: "~2 rides", color: colors.muted, popular: false, features: ["2 one-way rides", "Balance never expires", "Transaction history", "Email support"] },
    { name: "Weekly", price: 10, rides: "~4 rides", color: colors.primary, popular: true, features: ["4 one-way rides", "Balance never expires", "Transaction history", "Priority support", "Route change alerts"] },
    { name: "Pro", price: 20, rides: "~8 rides", color: colors.secondary, popular: false, features: ["8 one-way rides", "Balance never expires", "Full transaction history", "Priority support", "Route alerts", "Bonus 1 free ride"] },
  ];
  return (
    <div style={{ background: colors.bg, minHeight: "100vh" }}>
      <section style={{ background: `linear-gradient(135deg, ${colors.primary}, #1d4ed8)`, color: "#fff", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, marginBottom: 12 }}>Simple, Transparent Pricing</h1>
        <p style={{ opacity: 0.8, fontSize: 17 }}>Start with a $5 card — recharge whenever you need.</p>
      </section>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ background: colors.primary + "10", borderRadius: 14, padding: 20, marginBottom: 48, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 24 }}>💳</span>
          <div>
            <p style={{ fontWeight: 700, color: colors.dark }}>Transport Card — One-Time $5 Registration</p>
            <p style={{ color: colors.muted, fontSize: 14 }}>Every student pays a one-time $5 card fee. The $5 is added to your ride balance, so it's never wasted.</p>
          </div>
        </div>
        <h2 style={{ textAlign: "center", fontSize: 26, fontWeight: 800, color: colors.dark, marginBottom: 32 }}>Weekly Recharge Plans</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginBottom: 48 }}>
          {plans.map(p => (
            <div key={p.name} style={{ background: p.popular ? colors.primary : "#fff", borderRadius: 18, padding: 28, border: p.popular ? "none" : `1px solid ${colors.border}`, position: "relative", boxShadow: p.popular ? `0 8px 32px ${colors.primary}40` : "0 1px 4px rgba(0,0,0,0.06)" }}>
              {p.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: colors.accent, color: "#fff", borderRadius: 20, padding: "4px 16px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>MOST POPULAR</div>}
              <h3 style={{ fontWeight: 800, fontSize: 20, color: p.popular ? "#fff" : colors.dark, marginBottom: 4 }}>{p.name}</h3>
              <p style={{ fontSize: 13, color: p.popular ? "rgba(255,255,255,0.7)" : colors.muted, marginBottom: 16 }}>{p.rides}</p>
              <div style={{ fontSize: 44, fontWeight: 900, color: p.popular ? "#fff" : colors.primary, marginBottom: 4 }}>${p.price}</div>
              <p style={{ fontSize: 13, color: p.popular ? "rgba(255,255,255,0.6)" : colors.muted, marginBottom: 24 }}>per recharge</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: p.popular ? "rgba(255,255,255,0.85)" : colors.dark }}>
                    <span style={{ color: p.popular ? "#6EE7B7" : colors.secondary }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button onClick={() => setPage("register")} style={{ width: "100%", background: p.popular ? colors.accent : colors.primary, color: "#fff", border: "none", padding: "12px", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
                Get Started
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Card>
            <h3 style={{ fontWeight: 700, color: colors.dark, marginBottom: 10 }}>🪪 Lost Card Policy</h3>
            <p style={{ color: colors.muted, fontSize: 14, lineHeight: 1.7 }}>If your card is lost or stolen, report it immediately to support. Your remaining balance will be transferred to a new card after a $2 replacement fee. Allow 1–2 business days for processing.</p>
          </Card>
          <Card>
            <h3 style={{ fontWeight: 700, color: colors.dark, marginBottom: 10 }}>↩️ Refund Policy</h3>
            <p style={{ color: colors.muted, fontSize: 14, lineHeight: 1.7 }}>Unused balance can be refunded upon graduation or withdrawal. Submit a refund request at least 5 business days before your final exam date. The $5 card fee is non-refundable.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
const AuthPage = ({ type, setPage, setUser }) => {
  const [form, setForm] = useState({ email: "", password: "", name: "", role: "student" });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (form.email === "admin@uni.edu") {
      setUser({ name: "Admin User", email: form.email, role: "admin", balance: 0 });
      setPage("admin");
    } else {
      setUser({ name: form.name || "Alex Johnson", email: form.email, role: "student", balance: 18.50 });
      setPage("dashboard");
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", background: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: colors.primary, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <BusIcon />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: colors.dark }}>{type === "login" ? "Welcome Back" : "Join CampusRide"}</h1>
          <p style={{ color: colors.muted, marginTop: 6 }}>{type === "login" ? "Sign in to your account" : "Create your student account"}</p>
        </div>
        <Card>
          {type === "register" && (
            <input placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 15, outline: "none", marginBottom: 14, boxSizing: "border-box" }} />
          )}
          <input placeholder="University Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 15, outline: "none", marginBottom: 14, boxSizing: "border-box" }} />
          <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 15, outline: "none", marginBottom: type === "register" ? 14 : 20, boxSizing: "border-box" }} />
          {type === "register" && (
            <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 15, outline: "none", marginBottom: 20, boxSizing: "border-box", background: "#fff" }}>
              <option value="student">Student</option>
              <option value="driver">Driver</option>
            </select>
          )}
          {error && <p style={{ color: colors.danger, fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <Btn onClick={handleSubmit} variant="primary" style={{ width: "100%", padding: "13px" }}>
            {type === "login" ? "Sign In" : "Create Account"}
          </Btn>
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: colors.muted }}>
            {type === "login" ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setPage(type === "login" ? "register" : "login")} style={{ color: colors.primary, cursor: "pointer", fontWeight: 600 }}>
              {type === "login" ? "Register" : "Sign In"}
            </span>
          </p>
          {type === "login" && (
            <div style={{ marginTop: 16, padding: 12, background: colors.primary + "08", borderRadius: 8, fontSize: 13, color: colors.muted }}>
              <strong>Demo:</strong> Use <code>admin@uni.edu</code> for admin access, any other email for student dashboard.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// ─── STUDENT DASHBOARD ────────────────────────────────────────────────────────
const Dashboard = ({ user, setUser, setPage }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [recharging, setRecharging] = useState(false);
  const [rechargeAmt, setRechargeAmt] = useState(10);

  const handleRecharge = () => {
    setUser({ ...user, balance: user.balance + rechargeAmt });
    setRecharging(false);
  };

  const sidebarItems = [
    { id: "overview", icon: "🏠", label: "Overview" },
    { id: "routes", icon: "🗺️", label: "My Routes" },
    { id: "history", icon: "📋", label: "Transactions" },
    { id: "card", icon: "💳", label: "My Card" },
    { id: "suggest", icon: "💡", label: "Suggest Stop" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: colors.bg }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: colors.primary, color: "#fff", padding: "24px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ padding: "0 12px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 8 }}>
          <p style={{ fontWeight: 800, fontSize: 15 }}>{user.name}</p>
          <p style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>Student</p>
        </div>
        {sidebarItems.map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, background: activeTab === item.id ? "rgba(255,255,255,0.15)" : "transparent", color: "#fff", border: "none", cursor: "pointer", fontWeight: activeTab === item.id ? 700 : 400, fontSize: 14, textAlign: "left" }}>
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={() => { setUser(null); setPage("home"); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, background: "rgba(239,68,68,0.15)", color: "#FCA5A5", border: "none", cursor: "pointer", fontSize: 14 }}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 32, overflow: "auto" }}>
        {activeTab === "overview" && (
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: colors.dark, marginBottom: 4 }}>Good morning, {user.name.split(" ")[0]}! 👋</h1>
            <p style={{ color: colors.muted, marginBottom: 28 }}>Here's your transport overview for today.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginBottom: 28 }}>
              {[
                { label: "Card Balance", value: `$${user.balance.toFixed(2)}`, icon: "💳", color: colors.primary },
                { label: "Rides This Month", value: "14", icon: "🚌", color: colors.secondary },
                { label: "Total Spent", value: "$35.00", icon: "💰", color: colors.accent },
                { label: "My Route", value: "Painesville", icon: "📍", color: "#8B5CF6" },
              ].map(s => (
                <Card key={s.label} style={{ borderTop: `4px solid ${s.color}` }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <p style={{ color: colors.muted, fontSize: 13, marginTop: 4 }}>{s.label}</p>
                </Card>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
              <Card>
                <h2 style={{ fontWeight: 700, color: colors.dark, marginBottom: 16 }}>Recent Activity</h2>
                {demoTransactions.slice(0, 4).map(t => (
                  <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${colors.border}` }}>
                    <div>
                      <p style={{ fontWeight: 600, color: colors.dark, fontSize: 14 }}>{t.type}</p>
                      <p style={{ color: colors.muted, fontSize: 12 }}>{t.date} · {t.route}</p>
                    </div>
                    <span style={{ fontWeight: 700, color: t.amount > 0 ? colors.secondary : colors.danger }}>
                      {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </Card>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Card style={{ background: `linear-gradient(135deg, ${colors.primary}, #2563EB)`, color: "#fff", border: "none" }}>
                  <p style={{ opacity: 0.7, fontSize: 13, marginBottom: 4 }}>Current Balance</p>
                  <div style={{ fontSize: 34, fontWeight: 900, marginBottom: 16 }}>${user.balance.toFixed(2)}</div>
                  <Btn onClick={() => setRecharging(true)} variant="accent" style={{ width: "100%" }}>Recharge Now</Btn>
                </Card>

                <Card>
                  <p style={{ fontWeight: 700, color: colors.dark, marginBottom: 10 }}>Today's Bus</p>
                  <p style={{ fontSize: 13, color: colors.muted, marginBottom: 4 }}>📍 Painesville → Campus</p>
                  <p style={{ fontSize: 13, color: colors.muted, marginBottom: 8 }}>⏰ Next: 7:00 AM</p>
                  <Badge color={colors.secondary}>On Time</Badge>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: colors.dark, marginBottom: 24 }}>Transaction History</h1>
            <Card>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                    {["Date", "Type", "Route", "Amount"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 700, color: colors.muted }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {demoTransactions.map(t => (
                    <tr key={t.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "14px 16px", fontSize: 14, color: colors.muted }}>{t.date}</td>
                      <td style={{ padding: "14px 16px" }}><Badge color={t.type === "Recharge" ? colors.secondary : colors.primary}>{t.type}</Badge></td>
                      <td style={{ padding: "14px 16px", fontSize: 14, color: colors.dark }}>{t.route}</td>
                      <td style={{ padding: "14px 16px", fontWeight: 700, color: t.amount > 0 ? colors.secondary : colors.danger }}>
                        {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {activeTab === "routes" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: colors.dark, marginBottom: 24 }}>Available Routes</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {routes.map(r => (
                <Card key={r.city}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h3 style={{ fontWeight: 700, color: colors.dark, marginBottom: 6 }}>{r.city} → Main Campus</h3>
                      <div style={{ display: "flex", gap: 8 }}>
                        {r.times.map(t => <span key={t} style={{ background: colors.primary + "12", color: colors.primary, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{t}</span>)}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 22, fontWeight: 800, color: colors.primary }}>${r.price.toFixed(2)}</p>
                      <Badge color={r.status === "On Time" ? colors.secondary : colors.accent}>{r.status}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "card" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: colors.dark, marginBottom: 24 }}>My Transport Card</h1>
            <div style={{ maxWidth: 400 }}>
              <div style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, #1d4ed8 100%)`, borderRadius: 20, padding: 28, color: "#fff", marginBottom: 24, boxShadow: `0 8px 32px ${colors.primary}50` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
                  <span style={{ fontWeight: 800, fontSize: 18 }}>CampusRide</span>
                  <BusIcon />
                </div>
                <p style={{ opacity: 0.6, fontSize: 12, marginBottom: 4 }}>Card Number</p>
                <p style={{ fontFamily: "monospace", fontSize: 18, letterSpacing: 3, marginBottom: 24 }}>•••• •••• •••• 4821</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <p style={{ opacity: 0.6, fontSize: 11 }}>CARDHOLDER</p>
                    <p style={{ fontWeight: 700 }}>{user.name.toUpperCase()}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ opacity: 0.6, fontSize: 11 }}>BALANCE</p>
                    <p style={{ fontWeight: 900, fontSize: 22 }}>${user.balance.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <Btn onClick={() => setRecharging(true)} variant="accent" style={{ width: "100%", padding: 14 }}>Recharge Card</Btn>
            </div>
          </div>
        )}

        {activeTab === "suggest" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: colors.dark, marginBottom: 8 }}>Suggest a Bus Stop</h1>
            <p style={{ color: colors.muted, marginBottom: 28 }}>Help us expand our network by suggesting stops in your area.</p>
            <Card style={{ maxWidth: 500 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input placeholder="Neighborhood / Area" style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 14, outline: "none" }} />
                <input placeholder="Nearest landmark" style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 14, outline: "none" }} />
                <textarea placeholder="Why should this stop be added?" rows={4} style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 14, outline: "none", resize: "vertical" }} />
                <Btn variant="primary" style={{ alignSelf: "flex-start" }}>Submit Suggestion</Btn>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Recharge Modal */}
      {recharging && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <Card style={{ width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ fontWeight: 800, color: colors.dark, marginBottom: 20 }}>Recharge Card</h2>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {[5, 10, 20].map(amt => (
                <button key={amt} onClick={() => setRechargeAmt(amt)} style={{ flex: 1, padding: 14, borderRadius: 10, border: `2px solid ${rechargeAmt === amt ? colors.primary : colors.border}`, background: rechargeAmt === amt ? colors.primary + "12" : "#fff", cursor: "pointer", fontWeight: 700, color: rechargeAmt === amt ? colors.primary : colors.muted, fontSize: 16 }}>
                  ${amt}
                </button>
              ))}
            </div>
            <p style={{ color: colors.muted, fontSize: 13, marginBottom: 20 }}>Add ${rechargeAmt} to your balance (demo — no actual charge)</p>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={() => setRecharging(false)} variant="outline" style={{ flex: 1 }}>Cancel</Btn>
              <Btn onClick={handleRecharge} variant="primary" style={{ flex: 1 }}>Confirm +${rechargeAmt}</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
const AdminPanel = ({ user, setUser, setPage }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState(demoStudents);
  const [editingId, setEditingId] = useState(null);
  const [newBalance, setNewBalance] = useState("");

  const saveBalance = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, balance: parseFloat(newBalance) || s.balance } : s));
    setEditingId(null);
  };

  const sidebarItems = [
    { id: "overview", icon: "📊", label: "Analytics" },
    { id: "students", icon: "👨‍🎓", label: "Students" },
    { id: "routes", icon: "🗺️", label: "Routes" },
    { id: "stops", icon: "📍", label: "Manage Stops" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: colors.bg }}>
      <div style={{ width: 240, background: "#0F172A", color: "#fff", padding: "24px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ padding: "0 12px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, background: colors.secondary, borderRadius: "50%" }} />
            <p style={{ fontWeight: 800, fontSize: 14 }}>Admin Panel</p>
          </div>
          <p style={{ fontSize: 12, opacity: 0.5 }}>{user.email}</p>
        </div>
        {sidebarItems.map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, background: activeTab === item.id ? "rgba(255,255,255,0.1)" : "transparent", color: activeTab === item.id ? "#fff" : "rgba(255,255,255,0.6)", border: "none", cursor: "pointer", fontWeight: activeTab === item.id ? 700 : 400, fontSize: 14, textAlign: "left" }}>
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={() => { setUser(null); setPage("home"); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, background: "rgba(239,68,68,0.1)", color: "#FCA5A5", border: "none", cursor: "pointer", fontSize: 14 }}>
          🚪 Logout
        </button>
      </div>

      <div style={{ flex: 1, padding: 32, overflow: "auto" }}>
        {activeTab === "overview" && (
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: colors.dark, marginBottom: 24 }}>System Analytics</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginBottom: 32 }}>
              {[
                { label: "Total Students", value: "2,418", icon: "👨‍🎓", change: "+12%", color: colors.primary },
                { label: "Active Today", value: "847", icon: "✅", change: "+5%", color: colors.secondary },
                { label: "Revenue (Mar)", value: "$4,820", icon: "💰", change: "+18%", color: colors.accent },
                { label: "Routes Active", value: "3", icon: "🚌", change: "stable", color: "#8B5CF6" },
              ].map(s => (
                <Card key={s.label} style={{ borderLeft: `4px solid ${s.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>{s.icon}</span>
                    <span style={{ fontSize: 12, color: colors.secondary, fontWeight: 600 }}>{s.change}</span>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: colors.dark }}>{s.value}</div>
                  <p style={{ color: colors.muted, fontSize: 13 }}>{s.label}</p>
                </Card>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <Card>
                <h2 style={{ fontWeight: 700, color: colors.dark, marginBottom: 16 }}>Route Utilization</h2>
                {routes.map(r => (
                  <div key={r.city} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: colors.dark }}>{r.city}</span>
                      <span style={{ fontSize: 13, color: colors.muted }}>{Math.floor(Math.random() * 20 + 70)}%</span>
                    </div>
                    <div style={{ background: colors.border, borderRadius: 4, height: 8 }}>
                      <div style={{ background: colors.primary, borderRadius: 4, height: 8, width: `${Math.floor(Math.random() * 20 + 70)}%` }} />
                    </div>
                  </div>
                ))}
              </Card>
              <Card>
                <h2 style={{ fontWeight: 700, color: colors.dark, marginBottom: 16 }}>Quick Stats</h2>
                {[["Avg Balance", "$12.40"], ["Cards Issued", "2,418"], ["Lost Cards (Month)", "7"], ["Refund Requests", "3"], ["Pending Suggestions", "12"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${colors.border}` }}>
                    <span style={{ fontSize: 14, color: colors.muted }}>{k}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: colors.dark }}>{v}</span>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: colors.dark, marginBottom: 24 }}>Student Management</h1>
            <Card>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                    {["Student", "Email", "Route", "Balance", "Status", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 13, fontWeight: 700, color: colors.muted }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: "14px", fontWeight: 600, color: colors.dark, fontSize: 14 }}>{s.name}</td>
                      <td style={{ padding: "14px", fontSize: 13, color: colors.muted }}>{s.email}</td>
                      <td style={{ padding: "14px", fontSize: 13, color: colors.dark }}>{s.route}</td>
                      <td style={{ padding: "14px" }}>
                        {editingId === s.id ? (
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            <input value={newBalance} onChange={e => setNewBalance(e.target.value)} style={{ width: 70, padding: "5px 8px", borderRadius: 6, border: `1px solid ${colors.border}`, fontSize: 13 }} />
                            <Btn onClick={() => saveBalance(s.id)} variant="secondary" size="sm">✓</Btn>
                          </div>
                        ) : (
                          <span style={{ fontWeight: 700, color: s.balance === 0 ? colors.danger : colors.dark }}>${s.balance.toFixed(2)}</span>
                        )}
                      </td>
                      <td style={{ padding: "14px" }}><Badge color={s.status === "Active" ? colors.secondary : colors.danger}>{s.status}</Badge></td>
                      <td style={{ padding: "14px" }}>
                        <Btn onClick={() => { setEditingId(s.id); setNewBalance(s.balance.toString()); }} variant="outline" size="sm">Edit Balance</Btn>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {activeTab === "routes" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: colors.dark, marginBottom: 24 }}>Route Management</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {routes.map(r => (
                <Card key={r.city}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h3 style={{ fontWeight: 700, color: colors.dark, marginBottom: 6 }}>{r.city} Route</h3>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {r.times.map(t => <span key={t} style={{ background: colors.primary + "12", color: colors.primary, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{t}</span>)}
                      </div>
                      <p style={{ fontSize: 13, color: colors.muted, marginTop: 6 }}>{r.seats} seats · ${r.price.toFixed(2)}/ride</p>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Badge color={r.status === "On Time" ? colors.secondary : colors.accent}>{r.status}</Badge>
                      <Btn variant="outline" size="sm">Edit</Btn>
                    </div>
                  </div>
                </Card>
              ))}
              <button style={{ background: "transparent", border: `2px dashed ${colors.border}`, borderRadius: 16, padding: 20, cursor: "pointer", color: colors.muted, fontWeight: 600, fontSize: 15 }}>
                + Add New Route
              </button>
            </div>
          </div>
        )}

        {activeTab === "stops" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: colors.dark, marginBottom: 24 }}>Manage Bus Stops</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <Card>
                <h2 style={{ fontWeight: 700, color: colors.dark, marginBottom: 16 }}>Pending Suggestions</h2>
                {[
                  { area: "Northside Park", route: "Painesville", by: "student@uni.edu" },
                  { area: "West Village", route: "Broadville", by: "user2@uni.edu" },
                  { area: "Riverside Dr", route: "Baton Rougeville", by: "user3@uni.edu" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "14px 0", borderBottom: `1px solid ${colors.border}` }}>
                    <p style={{ fontWeight: 600, color: colors.dark, fontSize: 14 }}>{s.area}</p>
                    <p style={{ color: colors.muted, fontSize: 12, marginBottom: 8 }}>{s.route} route · {s.by}</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn variant="secondary" size="sm">Approve</Btn>
                      <Btn variant="danger" size="sm">Reject</Btn>
                    </div>
                  </div>
                ))}
              </Card>
              <Card>
                <h2 style={{ fontWeight: 700, color: colors.dark, marginBottom: 16 }}>Add New Stop</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input placeholder="Stop name / Area" style={{ padding: "11px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 14, outline: "none" }} />
                  <select style={{ padding: "11px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 14, outline: "none", background: "#fff" }}>
                    <option>Select Route</option>
                    {routes.map(r => <option key={r.city}>{r.city}</option>)}
                  </select>
                  <input placeholder="Stop order / position" style={{ padding: "11px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, fontSize: 14, outline: "none" }} />
                  <Btn variant="primary" style={{ alignSelf: "flex-start" }}>Add Stop</Btn>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "about": return <AboutPage />;
      case "routes": return <RoutesPage />;
      case "pricing": return <PricingPage setPage={setPage} />;
      case "login": return <AuthPage type="login" setPage={setPage} setUser={setUser} />;
      case "register": return <AuthPage type="register" setPage={setPage} setUser={setUser} />;
      case "dashboard": return user ? <Dashboard user={user} setUser={setUser} setPage={setPage} /> : <AuthPage type="login" setPage={setPage} setUser={setUser} />;
      case "admin": return user ? <AdminPanel user={user} setUser={setUser} setPage={setPage} /> : <AuthPage type="login" setPage={setPage} setUser={setUser} />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: colors.bg, minHeight: "100vh" }}>
      <Navbar page={page} setPage={setPage} user={user} setUser={setUser} />
      {renderPage()}
      {!["dashboard", "admin"].includes(page) && <Footer setPage={setPage} />}
    </div>
  );
}
