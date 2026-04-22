import { TopBar } from "@/components/TopBar";
import { getPin } from "@/lib/api";

export default async function PinDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pin = await getPin(id);

  return (
    <div className="container">
      <TopBar />
      <section className="panel route-card">
        <h1 style={{ marginTop: 0 }}>{pin.title}</h1>
        <div className="detail-grid" style={{ gridTemplateColumns: "420px 1fr", alignItems: "start" }}>
          <div className="panel" style={{ minHeight: 620, background: `linear-gradient(180deg, ${pin.templateColor}, #16152a)` }} />
          <div className="stack">
            <div className="log-row">{pin.description}</div>
            <div className="badge-list">
              {pin.hashtags.map((tag) => (
                <span key={tag} className="pill" style={{ color: "#14c4ff" }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="action-row">
              <button className="btn btn-primary">Publish Now</button>
              <button className="btn">Queue Pin</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
