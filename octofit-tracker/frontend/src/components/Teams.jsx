import { useEffect, useState } from 'react';
import { fetchCollection, getApiUrl } from './api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('teams')
      .then(setTeams)
      .catch(() => setError('Unable to load teams right now.'));
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Teams</h2>
        <p className="text-muted">Coordinate squads, captains, and goals.</p>
        <p className="small text-muted mb-3">Debug URL: <code>{getApiUrl('teams')}</code></p>
        {error ? (
          <div className="alert alert-warning">{error}</div>
        ) : (
          <div className="row g-3">
            {teams.map((team, index) => (
              <div key={team.id || team._id || `${team.name}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-semibold">{team.name}</h3>
                  <p className="text-muted mb-2">{team.focus}</p>
                  <p className="mb-1"><strong>Members:</strong> {team.members}</p>
                  <p className="mb-0"><strong>Captain:</strong> {team.captain}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
