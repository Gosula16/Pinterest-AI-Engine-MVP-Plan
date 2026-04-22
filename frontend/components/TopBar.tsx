export function TopBar() {
  return (
    <div className="panel topbar">
      <div className="brand">
        pin<span>engine</span>.ai
      </div>
      <div className="badge-list">
        <span className="pill" style={{ color: "#56d364" }}>
          Engine running
        </span>
        <span className="pill" style={{ color: "#e8edf7" }}>
          Venkatesh
        </span>
        <span className="pill" style={{ color: "#97a1c6" }}>
          10:34 pm
        </span>
      </div>
    </div>
  );
}

