import { useEffect, useState } from 'react';

function getApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${resource}/`;
  }

  return `http://localhost:8000/api/${resource}/`;
}

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = getApiUrl('workouts');

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text().catch(() => '');
          throw new Error(
            `Unable to load workouts from ${url}: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`
          );
        }
        return response.json();
      })
      .then(setWorkouts)
      .catch(() => setError('Unable to load workouts right now.'));
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Suggested workouts</h2>
        <p className="text-muted">Choose a plan that fits your current routine.</p>
        <p className="small text-muted mb-3">Debug URL: <code>{getApiUrl('workouts')}</code></p>
        {error ? (
          <div className="alert alert-warning">{error}</div>
        ) : (
          <div className="row g-3">
            {workouts.map((workout, index) => (
              <div key={workout.id || workout._id || `${workout.title}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-semibold">{workout.title}</h3>
                  <p className="text-muted mb-2">{workout.focus}</p>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                  <p className="mb-0"><strong>Duration:</strong> {workout.duration} min</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
