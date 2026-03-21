const BASE = 'http://localhost:8000/api'

async function get(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

export const api = {
  users:       ()                              => get('/users/'),
  user:        (id)                            => get(`/users/${id}/`),
  chats:       ()                              => get('/chats/'),
  chat:        (id)                            => get(`/chats/${id}/`),
  messages:    (chatId)                        => get(`/chats/${chatId}/messages/`),
  stats:       ()                              => get('/stats/'),
  sendMessage: (chatId, userId, actionText)    => post(`/chats/${chatId}/send/`, { user_id: userId, action_text: actionText }),
}
