import Link from "next/link";

export default function HomePage() {
  return (
    <div className="app-shell">
      <div className="container">
        <section className="panel hero-panel">
          <div>
            <div className="brand" style={{ fontSize: "3.6rem", marginBottom: 18 }}>
              pin<span>engine</span>.ai
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 4.6rem)", lineHeight: 1.05, margin: "0 0 18px" }}>
              AI pin generation, affiliate matching, and publishing in one workspace.
            </h1>
            <p className="muted" style={{ fontSize: "1.05rem", maxWidth: 680 }}>
              Build a Pinterest content engine that discovers trends, generates conversion-focused pin copy,
              matches affiliate products, renders images, schedules publishing, and learns from analytics.
            </p>
            <div className="action-row">
              <Link href="/dashboard" className="btn btn-primary">
                Open Dashboard
              </Link>
              <Link href="/dashboard/architecture" className="btn">
                Explore Architecture
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <div className="arch-grid">
              <div className="arch-row">
                <Link href="/dashboard/architecture?focus=google-trends" className="arch-node" style={{ background: "#0c6c59" }}>
                  Google Trends
                </Link>
                <Link href="/dashboard/architecture?focus=content-ai" className="arch-node" style={{ background: "#453794" }}>
                  Content AI
                </Link>
                <Link href="/dashboard/architecture?focus=image-gen" className="arch-node" style={{ background: "#0d5aa2" }}>
                  Image Gen
                </Link>
              </div>
              <div className="arch-row wide">
                <Link href="/dashboard/architecture?focus=pin-assembler" className="arch-node" style={{ background: "#255f06" }}>
                  Pin Assembler
                </Link>
              </div>
              <div className="arch-row">
                <Link href="/dashboard/architecture?focus=scheduler" className="arch-node" style={{ background: "#0f6a62" }}>
                  Scheduler
                </Link>
                <Link href="/dashboard/architecture?focus=analytics" className="arch-node" style={{ background: "#134b8b" }}>
                  Analytics
                </Link>
                <Link href="/dashboard/settings" className="arch-node" style={{ background: "#7f4a09" }}>
                  Billing + Settings
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="panel form-card" style={{ maxWidth: 560 }}>
          <h2 className="section-title">Sign In</h2>
          <div className="auth-form">
            <input placeholder="Email" />
            <input placeholder="Password" type="password" />
            <button className="btn btn-primary">Continue</button>
            <button className="btn">Connect Pinterest</button>
          </div>
        </section>
      </div>
    </div>
  );
}

