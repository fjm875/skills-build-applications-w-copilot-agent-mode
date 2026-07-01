import { useEffect, useState } from 'react';
import { fetchCollection, getApiUrl } from './api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('activities')
      .then(setActivities)
      .catch(() => setError('Unable to load activities right now.'));
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Recent activities</h2>
        <p className="text-muted">Track the latest logs from your community.</p>
        <p className="small text-muted mb-3">Debug URL: <code>{getApiUrl('activities')}</code></p>
        {error ? (
          <div className="alert alert-warning">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id || activity._id || `${activity.type}-${index}`}>
                    <td className="text-capitalize">{activity.type}</td>
                    <td>{activity.duration} min</td>
                    <td>{activity.calories}</td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Activities;
