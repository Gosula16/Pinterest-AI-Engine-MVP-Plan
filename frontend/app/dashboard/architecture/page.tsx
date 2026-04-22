import Link from "next/link";
import { TopBar } from "@/components/TopBar";

const nodes = [
  { label: "Google Trends", key: "google-trends", color: "#0c6c59", text: "Keyword signals from the Python trend engine." },
  { label: "Pinterest Suggest", key: "pinterest-suggest", color: "#00645a", text: "Feature-flagged autocomplete enrichment seam for later." },
  { label: "Amazon Creators", key: "amazon-creators", color: "#0f6c5e", text: "Affiliate product signal and link generation." },
  { label: "Content AI", key: "content-ai", color: "#453794", text: "OpenAI prompt adapter for titles, descriptions, and hashtags." },
  { label: "Affiliate Engine", key: "affiliate-engine", color: "#853611", text: "Ranking, filtering, and best-fit product selection." },
  { label: "Image Gen", key: "image-gen", color: "#0d5aa2", text: "Cloudinary-backed pin rendering pipeline." },
  { label: "Pin Assembler", key: "pin-assembler", color: "#255f06", text: "Builds the full PinDocument plus workflow state." },
  { label: "Scheduler", key: "scheduler", color: "#0f6a62", text: "Pinterest-first publish and queue orchestration." },
  { label: "Analytics", key: "analytics", color: "#134b8b", text: "Daily sync, CTR scoring, and clone/mutate automation." }
];

export default function ArchitecturePage() {
  return (
    <div className="container">
      <TopBar />
      <section className="panel section">
        <h1 style={{ marginTop: 0, fontSize: "2.2rem" }}>Architecture Overview</h1>
        <p className="muted" style={{ maxWidth: 860 }}>
          Every node below is a deep-dive entrypoint for the module it represents. This mirrors the architecture
          diagram you shared and keeps the UI interactive even before live integrations are fully connected.
        </p>
        <div className="arch-grid" style={{ marginTop: 28 }}>
          <div className="arch-row">
            {nodes.slice(0, 3).map((node) => (
              <Link key={node.key} href={`/dashboard/architecture/${node.key}`} className="arch-node" style={{ background: node.color }}>
                <div style={{ fontSize: "1.25rem", marginBottom: 8 }}>{node.label}</div>
                <div className="muted">{node.text}</div>
              </Link>
            ))}
          </div>
          <div className="arch-row">
            {nodes.slice(3, 6).map((node) => (
              <Link key={node.key} href={`/dashboard/architecture/${node.key}`} className="arch-node" style={{ background: node.color }}>
                <div style={{ fontSize: "1.25rem", marginBottom: 8 }}>{node.label}</div>
                <div className="muted">{node.text}</div>
              </Link>
            ))}
          </div>
          <div className="arch-row wide">
            <Link href="/dashboard/architecture/pin-assembler" className="arch-node" style={{ background: "#255f06" }}>
              <div style={{ fontSize: "1.4rem", marginBottom: 8 }}>Pin Assembler</div>
              <div className="muted">Image + copy + hashtags + affiliate data + analytics state into MongoDB.</div>
            </Link>
          </div>
          <div className="arch-row">
            {nodes.slice(7).map((node) => (
              <Link key={node.key} href={`/dashboard/architecture/${node.key}`} className="arch-node" style={{ background: node.color }}>
                <div style={{ fontSize: "1.25rem", marginBottom: 8 }}>{node.label}</div>
                <div className="muted">{node.text}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

