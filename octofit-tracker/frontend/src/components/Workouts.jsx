import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    fetchCollection(workoutsEndpoint, 'workouts')
      .then((data) => {
        if (isActive) {
          setWorkouts(data)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (isActive) {
          setError(requestError.message)
          setStatus('error')
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  return (
    <section className="view-panel">
      <div className="view-heading">
        <p className="eyebrow">Suggestions</p>
        <h2>Workouts</h2>
      </div>
      {status === 'loading' && <p className="status-text">Loading workouts...</p>}
      {status === 'error' && <p className="status-text error-text">Unable to load workouts: {error}</p>}
      {status === 'ready' && (
        <div className="data-grid">
          {workouts.map((workout) => (
            <article className="data-card" key={workout._id || workout.title}>
              <span className="pill">{workout.difficulty}</span>
              <h3>{workout.title}</h3>
              <p>{workout.recommendedFor}</p>
              <dl>
                <div>
                  <dt>Category</dt>
                  <dd>{workout.category}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{workout.durationMinutes} min</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts