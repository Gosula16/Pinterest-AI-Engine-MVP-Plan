import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { getPins } from "@/lib/api";

export default async function PinsPage() {
  const pins = await getPins();

  return (
    <div className="container">
      <TopBar />
      <section className="panel section">
        <h2 className="section-title">Pin Manager</h2>
        <div className="stack">
          {pins.map((pin) => (
            <Link key={pin.id} href={`/dashboard/pins/${pin.id}`} className="queue-card">
              <div className="queue-thumb" />
              <div>
                <div style={{ fontSize: "1.3rem", marginBottom: 8 }}>{pin.title}</div>
                <div className="muted">{pin.description}</div>
              </div>
              <div className="badge-list">
                <span className="pill" style={{ color: pin.status === "posted" ? "#56d364" : "#14c4ff" }}>
                  {pin.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

