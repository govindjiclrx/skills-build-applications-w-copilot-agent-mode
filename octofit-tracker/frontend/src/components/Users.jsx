import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    fetchCollection(usersEndpoint, 'users')
      .then((data) => {
        if (isActive) {
          setUsers(data)
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
        <p className="eyebrow">Profiles</p>
        <h2>Users</h2>
      </div>
      {status === 'loading' && <p className="status-text">Loading users...</p>}
      {status === 'error' && <p className="status-text error-text">Unable to load users: {error}</p>}
      {status === 'ready' && (
        <div className="data-grid">
          {users.map((user) => (
            <article className="data-card user-card" key={user._id || user.username}>
              <img src={user.profileImage} alt="" className="avatar" />
              <div>
                <h3>{user.displayName}</h3>
                <p>@{user.username}</p>
              </div>
              <dl>
                <div>
                  <dt>Team</dt>
                  <dd>{user.teamName}</dd>
                </div>
                <div>
                  <dt>Points</dt>
                  <dd>{user.totalPoints}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users