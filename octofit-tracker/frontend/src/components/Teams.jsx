import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    fetchCollection(teamsEndpoint, 'teams')
      .then((data) => {
        if (isActive) {
          setTeams(data)
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
        <p className="eyebrow">Team management</p>
        <h2>Teams</h2>
      </div>
      {status === 'loading' && <p className="status-text">Loading teams...</p>}
      {status === 'error' && <p className="status-text error-text">Unable to load teams: {error}</p>}
      {status === 'ready' && (
        <div className="data-grid">
          {teams.map((team) => (
            <article className="data-card" key={team._id || team.name}>
              <span className="pill">{team.mascot}</span>
              <h3>{team.name}</h3>
              <p>Captain: {team.captain}</p>
              <dl>
                <div>
                  <dt>Members</dt>
                  <dd>{team.memberCount}</dd>
                </div>
                <div>
                  <dt>Weekly points</dt>
                  <dd>{team.weeklyPoints}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams