import { TopBar } from "@/components/TopBar";
import { getBillingState } from "@/lib/api";

export default async function SettingsPage() {
  const billing = await getBillingState();

  return (
    <div className="container">
      <TopBar />
      <section className="panel section">
        <h2 className="section-title">Settings</h2>
        <div className="settings-grid">
          <label>
            <div className="muted" style={{ marginBottom: 8 }}>Timezone</div>
            <input defaultValue="Asia/Kolkata" />
          </label>
          <label>
            <div className="muted" style={{ marginBottom: 8 }}>Daily pin limit</div>
            <input defaultValue="3" />
          </label>
          <label>
            <div className="muted" style={{ marginBottom: 8 }}>OpenAI API key</div>
            <input placeholder="sk-..." />
          </label>
          <label>
            <div className="muted" style={{ marginBottom: 8 }}>Pinterest App ID</div>
            <input placeholder="Pinterest app id" />
          </label>
          <label>
            <div className="muted" style={{ marginBottom: 8 }}>Amazon associate tag</div>
            <input placeholder="yourtag-21" />
          </label>
          <label>
            <div className="muted" style={{ marginBottom: 8 }}>Cloudinary cloud name</div>
            <input placeholder="cloud-name" />
          </label>
        </div>
        <div className="action-row" style={{ marginTop: 24 }}>
          <button className="btn btn-primary">Save settings</button>
          <button className="btn">Connect Pinterest</button>
          <button className="btn">Upgrade to Pro ({billing.plan})</button>
        </div>
      </section>
    </div>
  );
}

