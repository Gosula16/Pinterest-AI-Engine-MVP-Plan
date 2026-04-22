import { TopBar } from "@/components/TopBar";
import { getKeywords } from "@/lib/api";

export default async function TrendsPage() {
  const keywords = await getKeywords();

  return (
    <div className="container">
      <TopBar />
      <section className="panel section">
        <h2 className="section-title">Trend Explorer</h2>
        <div className="action-row">
          <button className="btn btn-primary">Generate From Niche</button>
          <button className="btn">Approve Selected</button>
        </div>
        <table className="table" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Score</th>
              <th>Source</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((keyword) => (
              <tr key={keyword.id}>
                <td>{keyword.keyword}</td>
                <td>{keyword.trendScore}</td>
                <td>{keyword.source}</td>
                <td>{keyword.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

