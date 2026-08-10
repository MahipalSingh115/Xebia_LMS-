import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, Shield, Award, Users, BarChart3, Layers, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#1b1c1c", display: "flex", flexDirection: "column", fontFamily: "'Geist Variable', sans-serif", overflowX: "hidden" }}>

      {/* ── Background Glows ── */}
      <div aria-hidden="true" style={{ position: "fixed", top: "-120px", left: "10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(108,29,95,0.06) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: "fixed", top: "25%", right: "5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(74,30,71,0.05) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: "fixed", bottom: "10%", left: "30%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(1,172,159,0.05) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />

      {/* ── Header ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: "rgba(255,255,255,0.85)", borderBottom: "1px solid rgba(0,0,0,0.08)", padding: "0 48px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #6C1D5F, #84117C)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(108,29,95,0.25)" }}>
            <GraduationCap size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#1b1c1c", lineHeight: 1 }}>Xebia LMS</div>
            <div style={{ fontSize: "9px", fontWeight: 700, color: "#84117C", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px" }}>Enterprise Suite</div>
          </div>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <a href="#features" style={{ fontSize: "13px", fontWeight: 600, color: "rgba(27,28,28,0.55)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#1b1c1c"} onMouseLeave={e => e.target.style.color = "rgba(27,28,28,0.55)"}>Features</a>
          <a href="#impact" style={{ fontSize: "13px", fontWeight: 600, color: "rgba(27,28,28,0.55)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#1b1c1c"} onMouseLeave={e => e.target.style.color = "rgba(27,28,28,0.55)"}>Impact</a>
          <Link to="/login" style={{ padding: "8px 18px", background: "linear-gradient(to right, #6C1D5F, #84117C)", color: "#fff", borderRadius: "10px", fontSize: "13px", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 4px 14px rgba(108,29,95,0.25)" }}>
            Access Platform <ArrowRight size={13} />
          </Link>
        </nav>
      </header>

      {/* ── Hero Section ── */}
      <section style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "100px 24px 80px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 14px", borderRadius: "100px", background: "rgba(132,17,124,0.08)", border: "1px solid rgba(132,17,124,0.2)", fontSize: "11px", fontWeight: 700, color: "#84117C", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "24px" }}>
          <Sparkles size={11} color="#84117C" /> AI-Powered Training Infrastructure
        </div>

        <h1 style={{ fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 900, color: "#1b1c1c", letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: "800px", marginBottom: "20px" }}>
          Empower Your Organization With{" "}
          <span style={{ background: "linear-gradient(135deg, #84117C 0%, #6C1D5F 40%, #01ac9f 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Next-Gen Learning
          </span>
        </h1>

        <p style={{ fontSize: "clamp(14px, 1.8vw, 17px)", color: "rgba(27,28,28,0.55)", lineHeight: 1.75, maxWidth: "560px", marginBottom: "40px" }}>
          The ultimate Enterprise Learning Management System built for high-performance engineering teams.
          Track capabilities, automate certifications, and close skill gaps in real-time.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/login" style={{ padding: "13px 28px", background: "linear-gradient(to right, #6C1D5F, #84117C)", color: "#fff", borderRadius: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 8px 28px rgba(108,29,95,0.25)" }}>
            Launch Platform Portal <ArrowRight size={16} />
          </Link>
          <a href="#features" style={{ padding: "13px 28px", background: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", color: "rgba(27,28,28,0.75)", borderRadius: "12px", fontSize: "14px", fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f8f7fa"; e.currentTarget.style.color = "#1b1c1c"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "rgba(27,28,28,0.75)"; }}
          >
            Learn More
          </a>
        </div>

        {/* Dashboard mockup */}
        <div style={{ marginTop: "64px", width: "100%", maxWidth: "900px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", background: "#ffffff", boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(108,29,95,0.06)" }}>
          {/* Window chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px", background: "#f8f7fa", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(239,68,68,0.7)" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(234,179,8,0.7)" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(34,197,94,0.7)" }} />
            <span style={{ marginLeft: "8px", fontSize: "11px", color: "rgba(27,28,28,0.4)", fontFamily: "monospace" }}>lms.xebia.com — Executive Dashboard</span>
          </div>
          <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {[
                { label: "Active Learners", value: "2,845", change: "+14.2% this month", color: "#01ac9f" },
                { label: "Hours Logged", value: "48,290h", change: "96.4% completion rate", color: "#84117C" },
                { label: "Certifications", value: "1,208", change: "+8% year-over-year", color: "#f59e0b" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "18px", borderRadius: "12px", background: "#f8f7fa", border: "1px solid rgba(0,0,0,0.06)", textAlign: "left" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(27,28,28,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#1b1c1c", margin: "6px 0 4px" }}>{s.value}</div>
                  <div style={{ fontSize: "10px", fontWeight: 600, color: s.color }}>{s.change}</div>
                </div>
              ))}
            </div>
            <div style={{ height: "100px", borderRadius: "12px", background: "#f8f7fa", border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(27,28,28,0.25)", fontSize: "12px", fontFamily: "monospace" }}>
              [ Course Analytics — Interactive Graph ]
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" style={{ position: "relative", zIndex: 1, padding: "80px 24px", background: "#f8f7fa", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 800, color: "#1b1c1c", letterSpacing: "-0.02em", marginBottom: "12px" }}>Full-Spectrum Training Hub</h2>
            <p style={{ fontSize: "14px", color: "rgba(27,28,28,0.5)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>Explore key functional pillars crafted to accelerate enterprise capabilities and maximize returns.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {[
              { icon: Users, title: "Comprehensive User Directory", desc: "Track student profiles, assign programs, and monitor milestones inside a fully integrated directory." },
              { icon: BarChart3, title: "Deep Analytics & Insights", desc: "Dive into executive summary, skill gap analytics, training effectiveness, and predictive models." },
              { icon: Layers, title: "Curriculum Builder", desc: "Easily design modules, drag-and-drop learning blocks, and organize resources in one place." },
              { icon: Award, title: "Certification Tracking", desc: "Issue smart badges, check compliance levels, and verify certified professionals instantly." },
              { icon: Shield, title: "Enterprise Settings", desc: "Manage domain configuration, SMTP parameters, white-label branding, and fine-grained permissions." },
              { icon: Sparkles, title: "App Integrations Ecosystem", desc: "Seamlessly connect Google Meet, Zoom, Slack, Outlook, and GitHub to drive learning workflows." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} style={{ padding: "24px", borderRadius: "16px", background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)", transition: "all 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.border = "1px solid rgba(132,17,124,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(108,29,95,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.border = "1px solid rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(108,29,95,0.08)", border: "1px solid rgba(108,29,95,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    <Icon size={18} color="#84117C" />
                  </div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1b1c1c", marginBottom: "8px" }}>{f.title}</h3>
                  <p style={{ fontSize: "13px", color: "rgba(27,28,28,0.5)", lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Impact / Stats Section ── */}
      <section id="impact" style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", borderRadius: "20px", padding: "48px", background: "linear-gradient(135deg, rgba(132,17,124,0.06) 0%, rgba(108,29,95,0.04) 50%, rgba(248,247,250,1) 100%)", border: "1px solid rgba(108,29,95,0.12)", position: "relative", overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center", justifyContent: "space-between" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: "-60px", right: "-60px", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(132,17,124,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ flex: "1 1 300px", position: "relative" }}>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, color: "#01ac9f", background: "rgba(1,172,159,0.08)", border: "1px solid rgba(1,172,159,0.2)", padding: "4px 12px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "16px" }}>Proven Results</span>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 800, color: "#1b1c1c", letterSpacing: "-0.02em", marginBottom: "12px" }}>Drive Training Return on Investment</h2>
            <p style={{ fontSize: "13px", color: "rgba(27,28,28,0.55)", lineHeight: 1.7 }}>We empower industry leaders to upscale workforce skills, track career progression, and monitor team certifications with clean, audit-ready analytics.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", flexShrink: 0 }}>
            {[
              { value: "40%", label: "Efficiency Jump", color: "#84117C" },
              { value: "98%", label: "Completion Rate", color: "#01ac9f" },
              { value: "10k+", label: "Trained Pros", color: "#f59e0b" },
              { value: "200+", label: "Enterprise Clients", color: "#6C1D5F" },
            ].map((stat, i) => (
              <div key={i} style={{ padding: "20px", borderRadius: "12px", background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)", textAlign: "center", minWidth: "110px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: "28px", fontWeight: 900, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(27,28,28,0.45)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "6px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ position: "relative", zIndex: 1, marginTop: "auto", padding: "28px 48px", borderTop: "1px solid rgba(0,0,0,0.06)", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#6C1D5F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: "#fff" }}>X</div>
          <span style={{ fontSize: "12px", color: "rgba(27,28,28,0.45)", fontWeight: 600 }}>© {new Date().getFullYear()} Xebia Learning System.</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy Policy", "Terms of Service", "Contact Support"].map((link, i) => (
            <a key={i} href="#" style={{ fontSize: "12px", color: "rgba(27,28,28,0.45)", textDecoration: "none", fontWeight: 600, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "rgba(27,28,28,0.75)"} onMouseLeave={e => e.target.style.color = "rgba(27,28,28,0.45)"}>{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
