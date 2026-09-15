import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    fetchCollection(leaderboardEndpoint, 'leaderboard')
      .then((data) => {
        if (isActive) {
          setEntries(data)
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
        <p className="eyebrow">Competition</p>
        <h2>Leaderboard</h2>
      </div>
      {status === 'loading' && <p className="status-text">Loading leaderboard...</p>}
      {status === 'error' && <p className="status-text error-text">Unable to load leaderboard: {error}</p>}
      {status === 'ready' && (
        <div className="table-wrap">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Member</th>
                <th>Team</th>
                <th>Points</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id || entry.username}>
                  <td>#{entry.rank}</td>
                  <td>{entry.username}</td>
                  <td>{entry.teamName}</td>
                  <td>{entry.points}</td>
                  <td>{entry.streakDays} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard