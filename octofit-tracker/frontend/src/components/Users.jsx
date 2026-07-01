import { useEffect, useState } from 'react';
import { fetchCollection, getApiUrl } from './api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
      .catch(() => setError('Unable to load users right now.'));
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Users</h2>
        <p className="text-muted">Browse the active members in OctoFit Tracker.</p>
        <p className="small text-muted mb-3">Debug URL: <code>{getApiUrl('users')}</code></p>
        {error ? (
          <div className="alert alert-warning">{error}</div>
        ) : (
          <div className="row g-3">
            {users.map((user, index) => (
              <div key={user.id || user._id || `${user.email}-${index}`} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-semibold">{user.name}</h3>
                  <p className="text-muted mb-2">{user.email}</p>
                  <p className="mb-1"><strong>Role:</strong> {user.role}</p>
                  <p className="mb-0"><strong>Goal:</strong> {user.fitnessGoal}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Users;
