import { useEffect, useState } from 'react';

function getUsersUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/users/`;
  }

  return `http://localhost:8000/api/users/`;
}

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = getUsersUrl();

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text().catch(() => '');
          throw new Error(
            `Unable to load users from ${url}: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`
          );
        }
        return response.json();
      })
      .then(setUsers)
      .catch(() => setError('Unable to load users right now.'));
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Users</h2>
        <p className="text-muted">Browse the active members in OctoFit Tracker.</p>
        <p className="small text-muted mb-3">Debug URL: <code>{getUsersUrl()}</code></p>
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
