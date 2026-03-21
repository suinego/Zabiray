import { useEffect, useRef, useState } from 'react'
import { Search, MoreVertical, Bot } from 'lucide-react'
import { api } from '../api'

const ACTION_TEMPLATES = [
{ label: 'Поделиться приемом пищи', action: 'Сегодня на обед я съел гречку, куриную грудку и компот, старался сделать прием пищи полезным ' },
{ label: 'Пробежался', action: 'Я пробежал 2 километра' },
{ label: 'Выпил воду', action: 'Я выпил стакан воды, слежу за балансом, друзья, тоже не забывайте пить воду' },
{ label: 'Прогулялся', action: 'Сделал сегодня прогулку на свежем воздухе, и вам советую!' },
{ label: 'Поделиться целями', action: 'Выполнил свои цели на сегодняшний день на 100 процентов!' },
]

const CHAT_ID = 1   // единственный чат в CSV
const ME_ID   = 1   // текущий пользователь (Рома)

function formatTime(ts) {
  const d = new Date(ts * 1000)
  return d.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
}

// Build feed: real AI messages (user_id=0) get type='ai'; others type='user'
function buildFeed(msgs) {
  return msgs.map(m => ({
    ...m,
    type: m.is_ai || m.user_id === 0 ? 'ai' : 'user',
  }))
}

export default function Chat() {
  const [chatData, setChatData]     = useState(null)
  const [messages, setMessages]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [sending, setSending]       = useState(false)
  const bottomRef                   = useRef(null)

  useEffect(() => {
    Promise.all([api.chat(CHAT_ID), api.messages(CHAT_ID)])
      .then(([chat, msgs]) => {
        setChatData(chat)
        setMessages(msgs)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleAction(actionText) {
    if (sending) return
    setSending(true)
    try {
      const { user_message, ai_message } = await api.sendMessage(CHAT_ID, ME_ID, actionText)
      setMessages(prev => {
        const next = [...prev]
        if (user_message) next.push(user_message)
        if (ai_message)   next.push(ai_message)
        return next
      })
    } catch (e) {
      console.error(e)
    } finally {
      setSending(false)
    }
  }

  const feed = buildFeed(messages)

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 390, maxWidth: '100%', zIndex: 50,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0px 20px 40px rgba(0,0,0,0.05)',
      }}>
        <div style={{ height: 64, paddingLeft: 24, paddingRight: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: '#E0E3E4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏃</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#006F1F', lineHeight: 1 }}>
                {loading ? 'Загрузка...' : (chatData?.goal?.slice(0, 28) + (chatData?.goal?.length > 28 ? '…' : ''))}
              </div>
              <div style={{ fontSize: 11, color: '#A1A1AA', marginTop: 2 }}>
                {chatData ? `${chatData.participant_count} участников` : ''}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
              <Search size={18} color="#71717A" />
            </button>
            <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
              <MoreVertical size={20} color="#71717A" />
            </button>
          </div>
        </div>
      </div>

      {/* Pinned goal + AI analysis */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 40,
        paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
        background: 'rgba(255,255,255,0.70)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      }}>
        <div style={{ padding: 16, background: 'white', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Goal row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🎯</span>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: '#777B7C' }}>Цель:</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#2F3334' }}>
                {chatData?.goal || '...'}
              </span>
            </div>
            <div style={{
              paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3,
              background: 'rgba(0,111,31,0.10)', borderRadius: 999,
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#006F1F', textAlign: 'center',
            }}>
              {chatData?.participant_count || 0} чел.
            </div>
          </div>

          {/* AI daily analysis */}
          <div style={{ padding: 12, background: 'rgba(132,252,135,0.30)', borderRadius: 48, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <Bot size={22} color="#006F1F" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#006019', marginBottom: 4 }}>
                Ежедневный анализ ИИ
              </div>
              <div style={{ fontSize: 12, color: '#006019', lineHeight: 1.625 }}>
                {messages.length > 0
                  ? `В группе ${messages.length} активностей сегодня. Лидирует ${messages[0]?.user_name}! Продолжайте — вы близко к цели.`
                  : 'Загрузка анализа...'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, paddingTop: 16, paddingBottom: 8 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#A1A1AA', fontSize: 14 }}>
            Загрузка сообщений...
          </div>
        ) : feed.map(m => {
          if (m.type === 'ai') {
            const text = m.text || m.message || ''
            return (
              <div key={m.id} style={{ padding: '0 16px 24px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: '#006F1F', borderRadius: 999,
                    paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4,
                    display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', zIndex: 2,
                  }}>
                    <Bot size={10} color="white" />
                    <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, color: 'white' }}>
                      Ассистент Sber
                    </span>
                  </div>
                  <div style={{
                    padding: '24px 20px 20px', background: 'white', borderRadius: 48,
                    boxShadow: '0px 4px 6px -4px rgba(0,0,0,0.10), 0px 10px 15px -3px rgba(0,0,0,0.10)',
                    outline: '2px solid rgba(0,111,31,0.20)', outlineOffset: -2,
                  }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div style={{ width: 48, height: 48, background: 'rgba(0,111,31,0.10)', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Bot size={24} color="#006F1F" />
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#2F3334', lineHeight: 1.4 }}>
                        {text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          const isMe = m.user_id === ME_ID
          if (isMe) {
            return (
              <div key={m.id} style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{
                  padding: '12px 16px', background: '#006F1F', borderRadius: '16px 16px 0 16px', maxWidth: 304,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 400, color: '#EAFFE3', lineHeight: 1.375 }}>{m.message}</div>
                </div>
                <div style={{ marginTop: 4, paddingRight: 8, fontSize: 10, color: '#777B7C' }}>
                  {m.user_name} • {formatTime(m.date)}
                </div>
              </div>
            )
          }

          const avatarBg = m.user_id === 2 ? '#93B9FF' : '#DDE1FF'
          return (
            <div key={m.id} style={{ padding: '0 16px 16px', display: 'flex', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {m.user_emoji}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ paddingLeft: 8, fontSize: 10, fontWeight: 700, color: '#777B7C' }}>{m.user_name}</div>
                <div style={{ padding: '12px 16px', background: '#F3F4F4', borderRadius: '0 16px 16px 16px', maxWidth: 260 }}>
                  <div style={{ fontSize: 14, fontWeight: 400, color: '#2F3334', lineHeight: 1.375 }}>{m.message}</div>
                </div>
                <div style={{ paddingLeft: 8, fontSize: 10, color: '#777B7C' }}>{formatTime(m.date)}</div>
              </div>
            </div>
          )
        })}
        {sending && (
          <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ padding: '12px 16px', background: 'rgba(0,111,31,0.15)', borderRadius: '16px 16px 0 16px' }}>
              <div style={{ fontSize: 13, color: '#006F1F' }}>Отправляем…</div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Action templates */}
      <div style={{
        position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
        width: 390, maxWidth: '100%',
        paddingLeft: 16, paddingRight: 16, paddingBottom: 8,
        zIndex: 45,
      }}>
        <div className="scroll-x" style={{ display: 'flex', gap: 8 }}>
          {ACTION_TEMPLATES.map((t, i) => {
            const isHighlight = t.label.includes('✅')
            return (
              <button key={i} onClick={() => handleAction(t.action)} disabled={sending} style={{
                paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10,
                background: isHighlight ? '#84FC87' : 'white',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                borderRadius: 999,
                outline: isHighlight ? 'none' : '1px solid rgba(175,179,179,0.20)',
                outlineOffset: -1,
                fontSize: 14, fontWeight: isHighlight ? 700 : 500,
                color: isHighlight ? '#006019' : '#2F3334',
                border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
                opacity: sending ? 0.6 : 1,
                whiteSpace: 'nowrap', transition: 'opacity 0.15s',
              }}>
                {t.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
