import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    fetchCollection(activitiesEndpoint, 'activities')
      .then((data) => {
        if (isActive) {
          setActivities(data)
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
        <p className="eyebrow">Activity logging</p>
        <h2>Recent activity</h2>
      </div>
      {status === 'loading' && <p className="status-text">Loading activities...</p>}
      {status === 'error' && <p className="status-text error-text">Unable to load activities: {error}</p>}
      {status === 'ready' && (
        <div className="data-grid">
          {activities.map((activity) => (
            <article className="data-card" key={activity._id || `${activity.username}-${activity.activityType}`}>
              <span className="pill">{activity.activityType}</span>
              <h3>{activity.username}</h3>
              <p>{activity.durationMinutes} minutes</p>
              <dl>
                <div>
                  <dt>Calories</dt>
                  <dd>{activity.caloriesBurned}</dd>
                </div>
                <div>
                  <dt>Points</dt>
                  <dd>{activity.points}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Activities