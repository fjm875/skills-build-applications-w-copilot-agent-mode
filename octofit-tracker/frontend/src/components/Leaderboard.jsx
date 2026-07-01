import { useEffect, useState } from 'react';

function getLeaderboardUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
  }

  return `http://localhost:8000/api/leaderboard/`;
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = getLeaderboardUrl();

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text().catch(() => '');
          throw new Error(
            `Unable to load leaderboard from ${url}: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`
          );
        }
        return response.json();
      })
      .then(setLeaders)
      .catch(() => setError('Unable to load leaderboard right now.'));
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Leaderboard</h2>
        <p className="text-muted">See who is leading the fitness challenge.</p>
        <p className="small text-muted mb-3">Debug URL: <code>{getLeaderboardUrl()}</code></p>
        {error ? (
          <div className="alert alert-warning">{error}</div>
        ) : (
          <ol className="list-group list-group-numbered">
            {leaders.map((entry, index) => (
              <li key={entry.id || entry._id || `${entry.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <div className="fw-semibold">{entry.name}</div>
                  <div className="text-muted small">Streak: {entry.streak} days</div>
                </div>
                <span className="badge text-bg-primary rounded-pill">{entry.points} pts</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
