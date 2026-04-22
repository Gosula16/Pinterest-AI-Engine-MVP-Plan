import { TopBar } from "@/components/TopBar";
import { getPins } from "@/lib/api";

export default async function SchedulerPage() {
  const pins = await getPins();

  return (
    <div className="container">
      <TopBar />
      <section className="panel section">
        <h2 className="section-title">Scheduler</h2>
        <p className="muted">Pinterest-first publishing queue with daily limit awareness and human-style spacing.</p>
        <div className="stack" style={{ marginTop: 18 }}>
          {pins.map((pin) => (
            <div key={pin.id} className="queue-card">
              <div className="queue-thumb" />
              <div>
                <div>{pin.title}</div>
                <div className="muted">
                  {pin.scheduledFor ? new Date(pin.scheduledFor).toLocaleString() : "Awaiting schedule slot"}
                </div>
              </div>
              <button className="btn">Reschedule</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

