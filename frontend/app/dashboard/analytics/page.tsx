import { TopBar } from "@/components/TopBar";
import { getOverview } from "@/lib/api";

export default async function AnalyticsPage() {
  const overview = await getOverview();

  return (
    <div className="container">
      <TopBar />
      <section className="panel section">
        <h2 className="section-title">Analytics</h2>
        <div className="chart">
          {overview.ctrSeries.map((point) => (
            <div key={point.label} className="chart-col">
              <div className="line-a" style={{ height: `${point.ctr * 26}px` }} />
              <div className="line-b" style={{ height: `${point.saves * 34}px` }} />
              <div className="muted">{point.label}</div>
            </div>
          ))}
        </div>
        <div className="stack" style={{ marginTop: 24 }}>
          {overview.queue.map((pin) => (
            <div key={pin.id} className="product-row">
              <div>{pin.title}</div>
              <div className="muted">
                Impr. {pin.analytics.impressions} · Clicks {pin.analytics.clicks} · CTR {(pin.analytics.ctr * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

