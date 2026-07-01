import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-primary text-white py-4">
        <div className="container">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <p className="text-uppercase fw-semibold mb-1 opacity-75">OctoFit Tracker</p>
              <h1 className="h3 mb-0">React 19 presentation tier</h1>
            </div>
            <div className="text-lg-end">
              <p className="mb-1">API base</p>
              <code className="bg-white text-dark px-2 py-1 rounded">
                {codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/` : 'http://localhost:8000/api/'}
              </code>
            </div>
          </div>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <div className="navbar-nav flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="alert alert-info" role="status">
          Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> when running in a GitHub Codespace so the frontend points at the correct public API host.
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="row g-4">
                <div className="col-lg-7">
                  <section className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                      <h2 className="h4 fw-semibold">Welcome to OctoFit</h2>
                      <p className="text-muted">
                        Explore your fitness community through users, teams, workouts, and real-time progress.
                      </p>
                      <p className="mb-0">
                        The presentation tier uses React Router for navigation and fetches data from the backend API with Vite environment variables.
                      </p>
                    </div>
                  </section>
                </div>
                <div className="col-lg-5">
                  <section className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                      <h2 className="h4 fw-semibold">Ready for launch</h2>
                      <ul className="list-group list-group-flush mt-3">
                        <li className="list-group-item px-0">React 19 + Vite frontend</li>
                        <li className="list-group-item px-0">Express + TypeScript backend</li>
                        <li className="list-group-item px-0">MongoDB + Mongoose data layer</li>
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
