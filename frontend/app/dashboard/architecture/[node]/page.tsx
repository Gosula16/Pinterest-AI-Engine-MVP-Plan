import { TopBar } from "@/components/TopBar";

const nodeCopy: Record<string, { title: string; bullets: string[] }> = {
  "google-trends": {
    title: "Google Trends Module",
    bullets: [
      "Calls the FastAPI service for discover and score operations.",
      "Normalizes trend scores into keyword records for MongoDB.",
      "Seeds downstream generation with niche-focused high intent phrases."
    ]
  },
  "content-ai": {
    title: "Content AI Module",
    bullets: [
      "Uses OpenAI Responses API when credentials exist.",
      "Falls back to deterministic drafts in local development.",
      "Produces title, description, and hashtag sets for pin creation."
    ]
  },
  "affiliate-engine": {
    title: "Affiliate Engine Module",
    bullets: [
      "Targets Amazon Creators API instead of deprecated PA-API.",
      "Keeps product filtering and ranking isolated for easier provider swaps.",
      "Attaches qualifying affiliate products to each draft pin."
    ]
  }
};

export default async function ArchitectureNodePage({
  params
}: {
  params: Promise<{ node: string }>;
}) {
  const { node } = await params;
  const content = nodeCopy[node] ?? {
    title: node.replaceAll("-", " "),
    bullets: [
      "Interactive deep-dive page for this module.",
      "Implementation contracts live in backend services and shared DTOs.",
      "UI hooks here can surface generated code, logs, and module status."
    ]
  };

  return (
    <div className="container">
      <TopBar />
      <section className="panel route-card">
        <h1 style={{ marginTop: 0 }}>{content.title}</h1>
        <div className="stack">
          {content.bullets.map((item) => (
            <div key={item} className="log-row">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
