import Link from "next/link";
import type { DashboardOverviewDto } from "@pinengine/contracts";

const colorMap = {
  trend_discovery: "#14c4ff",
  content_generation: "#f7a928",
  affiliate_match: "#56d364",
  image_render: "#ff5470",
  pin_assembly: "#84cc16",
  queue_schedule: "#b8bcc8",
  publish: "#14b8a6",
  analytics_sync: "#60a5fa"
};

export function DashboardOverview({ overview }: { overview: DashboardOverviewDto }) {
  return (
    <>
      <div className="card-grid">
        <MetricCard title="Pins published" value={overview.stats.pinsPublished} sub="+18 this week" color="#14c4ff" />
        <MetricCard title="Avg CTR" value={`${overview.stats.avgCtr}%`} sub="+0.4% vs last wk" color="#f7a928" />
        <MetricCard title="Affiliate clicks" value={overview.stats.affiliateClicks.toLocaleString()} sub="+12% MoM" color="#56d364" />
        <MetricCard title="Est. revenue" value={`₹${overview.stats.estimatedRevenue.toLocaleString()}`} sub="~ this month" color="#ff5470" />
      </div>

      <div className="two-col">
        <section className="panel section">
          <h2 className="section-title">Generation Pipeline</h2>
          <div className="stack">
            {overview.pipeline.map((stage, index) => (
              <Link key={stage.stage} href={`/dashboard/architecture?focus=${stage.stage}`} className="pipeline-row">
                <span className="pipeline-dot" style={{ background: colorMap[stage.stage] ?? "#94a3b8" }} />
                <div>
                  <div>{`${index + 1} — ${toLabel(stage.stage)}`}</div>
                  <div className="muted">{stage.message}</div>
                </div>
                <div className="bar" style={{ width: 140 }}>
                  <span
                    style={{
                      width:
                        stage.status === "completed"
                          ? "100%"
                          : stage.status === "running"
                            ? "62%"
                            : stage.status === "failed"
                              ? "100%"
                              : "12%",
                      background: colorMap[stage.stage] ?? "#94a3b8"
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="action-row">
            <button className="btn btn-primary">Run Pipeline</button>
            <Link className="btn" href="/dashboard/scheduler">
              Schedule
            </Link>
          </div>
        </section>

        <section className="panel section">
          <h2 className="section-title">Pin Queue (Next 3)</h2>
          <div className="stack">
            {overview.queue.map((pin) => (
              <Link key={pin.id} href={`/dashboard/pins/${pin.id}`} className="queue-card">
                <div className="queue-thumb" />
                <div>
                  <div style={{ fontSize: "1.4rem", lineHeight: 1.4 }}>{pin.title}</div>
                  <div className="badge-list" style={{ marginTop: 12 }}>
                    <span className="pill" style={{ color: pin.status === "posted" ? "#56d364" : "#14c4ff" }}>
                      {pin.status}
                    </span>
                    <span className="muted">
                      {pin.scheduledFor ? new Date(pin.scheduledFor).toLocaleString() : "Published"}
                    </span>
                  </div>
                  <div className="muted" style={{ marginTop: 10 }}>
                    CTR est: {(pin.ctrEstimate ?? pin.analytics.ctr).toFixed(3)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="three-col">
        <section className="panel section">
          <h2 className="section-title">CTR Trend — Last 7 Days</h2>
          <div className="chart">
            {overview.ctrSeries.map((point) => (
              <div key={point.label} className="chart-col">
                <div className="line-a" style={{ height: `${point.ctr * 26}px` }} />
                <div className="line-b" style={{ height: `${point.saves * 34}px` }} />
                <div className="muted">{point.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel section">
          <h2 className="section-title">Top Affiliate Products</h2>
          <div className="stack">
            {overview.topProducts.map((product) => (
              <div key={product.asin} className="product-row">
                <div>{product.title}</div>
                <div className="muted">
                  ★ {product.rating} · {product.price}
                </div>
              </div>
            ))}
            <button className="btn">Fetch More</button>
          </div>
        </section>
      </div>

      <div className="two-col" style={{ marginTop: 28 }}>
        <section className="panel section">
          <h2 className="section-title">Trending Niches</h2>
          <div className="badge-list">
            {overview.trendingNiches.map((niche, index) => (
              <Link
                key={niche}
                href={`/dashboard/trends?seed=${encodeURIComponent(niche)}`}
                className="tag"
                style={{
                  color: ["#ff6b81", "#ffbe3d", "#14c4ff", "#56d364"][index % 4]
                }}
              >
                {niche}
              </Link>
            ))}
          </div>
          <div className="action-row">
            <button className="btn">Refresh Trends</button>
            <Link className="btn" href="/dashboard/architecture">
              Google Trends
            </Link>
          </div>
        </section>

        <section className="panel section">
          <h2 className="section-title">System Log</h2>
          <div className="stack">
            {overview.activityLog.map((log) => (
              <div key={log.id} className="log-row">
                <div className="muted">{new Date(log.createdAt).toLocaleTimeString()}</div>
                <div>{log.message}</div>
              </div>
            ))}
            <Link className="btn" href="/dashboard/architecture">
              View Full Project Structure
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

function MetricCard({
  title,
  value,
  sub,
  color
}: {
  title: string;
  value: string | number;
  sub: string;
  color: string;
}) {
  return (
    <section className="panel metric">
      <h3 className="section-title" style={{ marginBottom: 0 }}>
        {title}
      </h3>
      <div className="metric-value" style={{ color }}>
        {value}
      </div>
      <div className="metric-sub">{sub}</div>
    </section>
  );
}

function toLabel(stage: string) {
  return stage.replaceAll("_", " ");
}
