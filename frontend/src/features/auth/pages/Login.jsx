import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Users,
  Briefcase,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/* ─── Demo credentials (unchanged) ─── */
const DEMO_CREDS = {
  admin:   { email: "admin@xebia.com",   password: "Xebia@2024", role: "admin",   label: "Admin Console",     route: "/admin" },
  trainer: { email: "trainer@xebia.com", password: "Xebia@2024", role: "trainer", label: "Trainer Workspace",  route: "/trainer" },
  student: { email: "student@xebia.com", password: "Xebia@2024", role: "student", label: "Student Portal",     route: "/student" },
  manager: { email: "manager@xebia.com", password: "Xebia@2024", role: "manager", label: "Manager Console",    route: "/manager" },
};

const CARD_META = [
  { key: "admin",   icon: Shield,    color: "#84117C", bg: "rgba(108,29,95,0.08)",  border: "rgba(108,29,95,0.2)" },
  { key: "trainer", icon: BookOpen,  color: "#84117C", bg: "rgba(108,29,95,0.08)",  border: "rgba(108,29,95,0.2)" },
  { key: "manager", icon: Briefcase, color: "#84117C", bg: "rgba(132,17,124,0.08)", border: "rgba(132,17,124,0.2)" },
  { key: "student", icon: Users,     color: "#01ac9f", bg: "rgba(1,172,159,0.08)",  border: "rgba(1,172,159,0.2)" },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  /* ── Handlers (unchanged logic) ── */
  const doLogin = (route) => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      navigate(route);
    }, 900);
  };

  const handleQuickLogin = (type) => {
    const cred = DEMO_CREDS[type];
    setActiveCard(type);
    setEmail(cred.email);
    setPassword(cred.password);
    setRole(cred.role);
    doLogin(cred.route);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const adminCred = DEMO_CREDS.admin;
    const trainerCred = DEMO_CREDS.trainer;
    const studentCred = DEMO_CREDS.student;
    const managerCred = DEMO_CREDS.manager;

    if (email === adminCred.email && password === adminCred.password) {
      doLogin(adminCred.route);
    } else if (email === trainerCred.email && password === trainerCred.password) {
      doLogin(trainerCred.route);
    } else if (email === studentCred.email && password === studentCred.password) {
      doLogin(studentCred.route);
    } else if (email === managerCred.email && password === managerCred.password) {
      doLogin(managerCred.route);
    } else {
      setError("Invalid credentials. Please check your email and password.");
    }
  };

  /* ── Render ── */
  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Geist Variable', sans-serif", background: "#ffffff", color: "#1b1c1c", overflow: "hidden" }}>

      {/* ════════════════ LEFT PANEL ════════════════ */}
      <div
        className="hidden-mobile"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 48px",
          width: "45%",
          minWidth: "380px",
          background: "linear-gradient(160deg, #f8f7fa 0%, #f0ecf4 40%, #e8e0ec 100%)",
          borderRight: "1px solid rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Decorative glows */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(132,17,124,0.1) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "260px", height: "260px", background: "radial-gradient(circle, rgba(1,172,159,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Grid pattern overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
          backgroundImage: "linear-gradient(rgba(108,29,95,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108,29,95,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Top: back link */}
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(27,28,28,0.55)", fontSize: "13px", fontWeight: 600, textDecoration: "none", transition: "color 0.2s", position: "relative" }}
          onMouseEnter={e => e.currentTarget.style.color = "#1b1c1c"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(27,28,28,0.55)"}
        >
          <ArrowLeft size={15} /> Back to Home
        </Link>

        {/* Middle: branding + text */}
        <div style={{ position: "relative" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "16px",
            background: "linear-gradient(135deg, #6C1D5F, #84117C)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "28px",
            boxShadow: "0 8px 24px rgba(108,29,95,0.25)",
          }}>
            <GraduationCap size={26} color="#fff" />
          </div>
          <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, color: "#1b1c1c", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Elevating Capabilities<br />Across Engineering Teams
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(27,28,28,0.6)", lineHeight: 1.7, maxWidth: "340px" }}>
            Access personalized training tracks, monitor learning investments, and manage corporate capabilities from one powerful hub.
          </p>

          {/* Feature chips */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "32px" }}>
            {["AI-Powered Learning Paths", "Real-Time Skill Analytics", "Certification Management"].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "rgba(27,28,28,0.75)" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "rgba(1,172,159,0.1)", border: "1px solid rgba(1,172,159,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckCircle2 size={13} color="#01ac9f" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: copyright */}
        <div style={{ fontSize: "11px", color: "rgba(27,28,28,0.4)", position: "relative" }}>
          © {new Date().getFullYear()} Xebia Learning System. All rights reserved.
        </div>
      </div>

      {/* ════════════════ RIGHT PANEL ════════════════ */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", background: "#ffffff", position: "relative", overflow: "auto" }}>
        {/* Subtle background pattern */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(108,29,95,0.04), transparent 60%)", pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: "440px", position: "relative" }}>
          {/* Mobile brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg, #6C1D5F, #84117C)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={17} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#1b1c1c", lineHeight: 1 }}>Xebia LMS</div>
              <div style={{ fontSize: "9px", fontWeight: 700, color: "#84117C", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px" }}>Enterprise Suite</div>
            </div>
          </div>

          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#1b1c1c", letterSpacing: "-0.02em", marginBottom: "6px" }}>Welcome Back</h1>
          <p style={{ fontSize: "13px", color: "rgba(27,28,28,0.5)", marginBottom: "28px" }}>Sign in to access your learning portal</p>

          {/* ── Quick Access Cards ── */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, color: "rgba(27,28,28,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
              <Sparkles size={12} />
              Quick Access
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {CARD_META.map(({ key, icon: Icon, color, bg, border }) => {
                const cred = DEMO_CREDS[key];
                const isActive = activeCard === key;
                const isHovered = hoveredCard === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleQuickLogin(key)}
                    onMouseEnter={() => setHoveredCard(key)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      padding: "12px 8px",
                      borderRadius: "12px",
                      background: isActive ? bg : isHovered ? "#ffffff" : "#f8f7fa",
                      border: isActive ? `1.5px solid ${border}` : isHovered ? "1.5px solid rgba(108,29,95,0.25)" : "1.5px solid rgba(0,0,0,0.08)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                      boxShadow: isHovered
                        ? "0 8px 24px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)"
                        : "0 1px 2px rgba(0,0,0,0.03)",
                      transform: isHovered ? "translateY(-2px)" : "none",
                    }}
                  >
                    <div style={{
                      width: "30px", height: "30px", borderRadius: "8px",
                      background: bg, border: `1px solid ${border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "10px",
                      transition: "transform 0.2s",
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}>
                      <Icon size={15} color={color} />
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#1b1c1c", marginBottom: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {cred.label}
                    </div>
                    <div style={{ fontSize: "9px", color: "rgba(27,28,28,0.45)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {cred.email}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
            <span style={{ fontSize: "11px", color: "rgba(27,28,28,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0 }}>Or sign in manually</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Role toggle */}
            <div>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "rgba(27,28,28,0.45)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>Login Profile</label>
              <div style={{ display: "flex", gap: "4px", background: "#f8f7fa", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "10px", padding: "4px", flexWrap: "wrap" }}>
                {["student", "trainer", "manager", "admin"].map(r => {
                  let activeBg = "#01ac9f"; // student
                  if (r === "admin") activeBg = "#6C1D5F";
                  if (r === "manager") activeBg = "#84117C";
                  if (r === "trainer") activeBg = "#84117C";
                  const isSelected = role === r;

                  return (
                    <button key={r} type="button" onClick={() => { setRole(r); setEmail(DEMO_CREDS[r].email); setPassword(DEMO_CREDS[r].password); }}
                      style={{
                        flex: "1 1 calc(50% - 4px)",
                        minWidth: "75px",
                        padding: "7px 0",
                        borderRadius: "7px",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        border: "none",
                        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                        background: isSelected ? activeBg : "transparent",
                        color: isSelected ? "#fff" : "rgba(27,28,28,0.45)",
                        boxShadow: isSelected ? `0 2px 8px ${r === "student" ? "rgba(1,172,159,0.25)" : "rgba(108,29,95,0.25)"}` : "none",
                      }}
                    >
                      {r === "student" ? "Student" : r === "trainer" ? "Trainer" : r === "manager" ? "Manager" : "Admin"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "rgba(27,28,28,0.45)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(27,28,28,0.35)", pointerEvents: "none" }} />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder={DEMO_CREDS[role]?.email}
                  style={{ width: "100%", paddingLeft: "40px", paddingRight: "14px", paddingTop: "11px", paddingBottom: "11px", background: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "10px", fontSize: "13px", color: "#1b1c1c", outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "all 0.2s" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(108,29,95,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(108,29,95,0.06)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(0,0,0,0.12)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "rgba(27,28,28,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Password</label>
                <a href="#" style={{ fontSize: "11px", fontWeight: 600, color: "#84117C", textDecoration: "none" }}>Forgot password?</a>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(27,28,28,0.35)", pointerEvents: "none" }} />
                <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: "100%", paddingLeft: "40px", paddingRight: "44px", paddingTop: "11px", paddingBottom: "11px", background: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "10px", fontSize: "13px", color: "#1b1c1c", outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "all 0.2s" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(108,29,95,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(108,29,95,0.06)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(0,0,0,0.12)"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(27,28,28,0.4)", padding: 0, display: "flex" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ fontSize: "12px", color: "#dc2626", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)", borderRadius: "8px", padding: "10px 12px" }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{
                width: "100%", padding: "13px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, color: "#fff",
                cursor: loading ? "not-allowed" : "pointer", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                background: role === "admin" ? "linear-gradient(to right, #6C1D5F, #84117C)" : role === "manager" || role === "trainer" ? "linear-gradient(to right, #84117C, #a8249f)" : "linear-gradient(to right, #009e92, #01ac9f)",
                boxShadow: role === "admin" ? "0 6px 20px rgba(108,29,95,0.25)" : role === "manager" || role === "trainer" ? "0 6px 20px rgba(132,17,124,0.2)" : "0 6px 20px rgba(1,172,159,0.2)",
                opacity: loading ? 0.7 : 1,
                transform: "translateY(0)",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {loading ? (
                <>
                  <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                  Authenticating...
                </>
              ) : (
                <>Access Account <ArrowRight size={15} /></>
              )}
            </button>
          </form>

        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </div>
  );
}