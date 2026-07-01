import { useEffect, useState } from 'react';
import { fetchCollection } from './api';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('leaderboard')
      .then(setLeaders)
      .catch(() => setError('Unable to load leaderboard right now.'));
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Leaderboard</h2>
        <p className="text-muted">See who is leading the fitness challenge.</p>
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
