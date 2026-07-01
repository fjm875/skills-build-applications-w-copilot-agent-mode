import { useEffect, useState } from 'react';
import { fetchCollection } from './api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('workouts')
      .then(setWorkouts)
      .catch(() => setError('Unable to load workouts right now.'));
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Suggested workouts</h2>
        <p className="text-muted">Choose a plan that fits your current routine.</p>
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
