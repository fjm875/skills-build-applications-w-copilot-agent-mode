import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold">Build healthier habits with a modern fitness hub.</h1>
          <p className="lead text-muted">
            Track workouts, manage teams, and stay motivated with a polished multi-tier experience.
          </p>
          <div className="d-flex gap-3 mt-4">
            <a className="btn btn-primary btn-lg" href="https://vite.dev/" target="_blank" rel="noreferrer">
              Explore the stack
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://react.dev/" target="_blank" rel="noreferrer">
              Learn React 19
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 fw-semibold">Ready for launch</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item px-0">React 19 + Vite frontend</li>
                <li className="list-group-item px-0">Express + TypeScript backend</li>
                <li className="list-group-item px-0">MongoDB + Mongoose data layer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
