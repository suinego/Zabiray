import { useEffect, useRef, useState } from 'react'
import { MoreVertical, Bot, Pin, BarChart2, X } from 'lucide-react'
import { api } from '../api'

const ACTION_TEMPLATES = [
  { label: 'Поделиться приёмом', action: 'Сегодня на обед я съел гречку, куриную грудку и компот, старался сделать приём пищи полезным' },
  { label: 'Пробежался 🏃',     action: 'Я пробежал 2 километра' },
  { label: 'Выпил воду 💧',     action: 'Я выпил стакан воды, слежу за балансом, друзья, тоже не забывайте пить воду' },
  { label: 'Прогулялся 🌿',     action: 'Сделал сегодня прогулку на свежем воздухе, и вам советую!' },
  { label: 'Цели выполнены ✅', action: 'Выполнил свои цели на сегодняшний день на 100 процентов!' },
]

const PINNED_CHALLENGE = {
  emoji: '👣',
  name: 'Марафон «Шаги к здоровью»',
  progress: 100,
}


const REACTIONS = ['👍', '😊']

const CHAT_ID = 1
const ME_ID   = 1

function formatTime(ts) {
  return new Date(ts * 1000).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
}

function buildFeed(msgs) {
  return msgs.map(m => ({ ...m, type: m.is_ai || m.user_id === 0 ? 'ai' : 'user' }))
}

/* ── Reaction picker popup ────────────────────────────────────────────────── */
function ReactionPicker({ onPick, onClose }) {
  return (
    <div style={{
      position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
      background: 'white', borderRadius: 999,
      boxShadow: '0px 8px 24px rgba(0,0,0,0.14)',
      display: 'flex', gap: 0, zIndex: 100, overflow: 'hidden',
      outline: '1px solid rgba(0,0,0,0.06)', outlineOffset: -1,
    }}>
      {REACTIONS.map(r => (
        <button key={r} onClick={() => { onPick(r); onClose() }} style={{
          padding: '8px 14px', fontSize: 22, background: 'none', border: 'none', cursor: 'pointer',
          transition: 'background 0.1s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#F3F4F4'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >{r}</button>
      ))}
    </div>
  )
}

/* ── Pinned challenge bar ─────────────────────────────────────────────────── */
function PinnedChallenge() {
  const [width, setWidth] = useState(0)
  useEffect(() => { const t = setTimeout(() => setWidth(100), 150); return () => clearTimeout(t) }, [])
  return (
    <div style={{
      padding: '8px 14px', background: 'white', borderRadius: 20,
      boxShadow: '0px 1px 2px rgba(0,0,0,0.06)',
      outline: '1px solid rgba(0,111,31,0.12)', outlineOffset: -1,
      display: 'flex', flexDirection: 'column', gap: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Pin size={10} color="#006F1F" />
        <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, color: '#006F1F' }}>Челлендж</span>
        <span style={{ fontSize: 13 }}>{PINNED_CHALLENGE.emoji}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#2F3334', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {PINNED_CHALLENGE.name}
        </span>
        <span style={{ fontSize: 11, fontWeight: 900, color: '#21A038', flexShrink: 0 }}>✓ 100%</span>
      </div>
      <div style={{ height: 3, borderRadius: 999, background: 'rgba(0,111,31,0.10)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${width}%`,
          background: 'linear-gradient(90deg, #21A038, #56FF71)',
          borderRadius: 999, transition: 'width 0.9s cubic-bezier(0.34,1.4,0.64,1)',
        }} />
      </div>
    </div>
  )
}

/* ── Daily summary card ───────────────────────────────────────────────────── */
function DailySummaryCard({ data, loading, onClose }) {
  return (
    <div style={{
      margin: '0 16px 20px', background: 'white', borderRadius: 28,
      boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
      outline: '2px solid rgba(33,160,56,0.18)', outlineOffset: -2, overflow: 'hidden',
    }}>
      <div style={{
        padding: '12px 16px 10px',
        background: 'linear-gradient(135deg, rgba(132,252,135,0.25) 0%, rgba(255,255,255,0) 100%)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BarChart2 size={15} color="#006F1F" />
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, color: '#006F1F' }}>
            Сводка дня
          </span>
          {data?.score != null && (
            <span style={{ fontSize: 11, fontWeight: 900, color: 'white', background: '#21A038', borderRadius: 999, paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2 }}>
              {data.score}/100
            </span>
          )}
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
          <X size={14} color="#A1A1AA" />
        </button>
      </div>

      {loading ? (
        <div style={{ padding: '20px 16px', textAlign: 'center', color: '#A1A1AA', fontSize: 13 }}>
          GigaChat анализирует день группы…
        </div>
      ) : (
        <>
          {data?.members_today?.length > 0 && (
            <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {data.members_today.map(m => (
                <div key={m.user_id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{m.user_emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#2F3334' }}>{m.user_name}</div>
                    <div style={{ fontSize: 11, color: '#777B7C' }}>{m.count} активностей сегодня</div>
                  </div>
                  <div style={{ background: 'rgba(0,111,31,0.08)', borderRadius: 999, paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2 }}>
                    <span style={{ fontSize: 11, fontWeight: 900, color: '#006F1F' }}>×{m.count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ margin: '4px 12px 12px', padding: '10px 14px', background: 'rgba(132,252,135,0.22)', borderRadius: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Bot size={14} color="#006F1F" style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 12, color: '#006019', lineHeight: 1.5 }}>
              {data?.ai_comment || 'Нет данных за сегодня'}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

/* ── Main ──────────────────────────────────────────────────────────────────── */
export default function Chat() {
  const [chatData,      setChatData]      = useState(null)
  const [messages,      setMessages]      = useState([])
  const [loading,       setLoading]       = useState(true)
  const [sending,       setSending]       = useState(false)
  const [showSummary,   setShowSummary]   = useState(false)
  const [summaryData,   setSummaryData]   = useState(null)
  const [summaryLoad,   setSummaryLoad]   = useState(false)
  const [reactions,     setReactions]     = useState({})
  const [pickerFor,     setPickerFor]     = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    Promise.all([api.chat(CHAT_ID), api.messages(CHAT_ID)])
      .then(([chat, msgs]) => { setChatData(chat); setMessages(msgs) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, showSummary])

  // Close picker when clicking outside
  useEffect(() => {
    if (!pickerFor) return
    const close = () => setPickerFor(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [pickerFor])

  async function fetchSummary() {
    setSummaryLoad(true)
    setShowSummary(true)
    try {
      const data = await api.summary(CHAT_ID)
      setSummaryData(data)
    } catch (e) { console.error(e) }
    finally { setSummaryLoad(false) }
  }

  async function handleAction(actionText, isSummaryTrigger = false) {
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
      // При нажатии "Цели выполнены" — автоматически запрашиваем сводку
      if (isSummaryTrigger) await fetchSummary()
    } catch (e) { console.error(e) }
    finally { setSending(false) }
  }

  function addReaction(msgId, emoji) {
    setReactions(prev => {
      const cur = prev[msgId] || {}
      return { ...prev, [msgId]: { ...cur, [emoji]: (cur[emoji] || 0) + 1 } }
    })
  }

  function togglePicker(e, msgId) {
    e.stopPropagation()
    setPickerFor(p => p === msgId ? null : msgId)
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
            <button
              onClick={() => showSummary ? setShowSummary(false) : fetchSummary()}
              style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: showSummary ? 'rgba(0,111,31,0.10)' : 'none', cursor: 'pointer' }}>
              <BarChart2 size={18} color={showSummary ? '#006F1F' : '#71717A'} />
            </button>
            <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
              <MoreVertical size={20} color="#71717A" />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky pinned area */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 40,
        paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
        background: 'rgba(255,255,255,0.80)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{ padding: 14, background: 'white', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>🎯</span>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: '#777B7C' }}>Цель:</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#2F3334' }}>{chatData?.goal || '...'}</span>
            </div>
            <div style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, background: 'rgba(0,111,31,0.10)', borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#006F1F' }}>
              {chatData?.participant_count || 0} чел.
            </div>
          </div>
          <div style={{ padding: '8px 12px', background: 'rgba(132,252,135,0.30)', borderRadius: 32, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Bot size={16} color="#006F1F" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontSize: 11, color: '#006019', lineHeight: 1.5 }}>
              {messages.length > 0
                ? `${messages.length} активностей в группе. Лидирует ${messages.filter(m => !m.is_ai)[0]?.user_name}! 💪`
                : 'Загрузка анализа...'}
            </div>
          </div>
        </div>
        <PinnedChallenge />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, paddingTop: 12, paddingBottom: 8 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#A1A1AA', fontSize: 14 }}>Загрузка...</div>
        ) : feed.map(m => {
          const msgReactions = reactions[m.id] || {}
          const hasReactions = Object.values(msgReactions).some(v => v > 0)

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
                    <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, color: 'white' }}>Ассистент Sber</span>
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
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#2F3334', lineHeight: 1.4 }}>{text}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          const isMe = m.user_id === ME_ID
          const avatarBg = m.user_id === 2 ? '#93B9FF' : '#DDE1FF'

          return (
            <div key={m.id} style={{
              padding: '0 16px 4px',
              display: 'flex', flexDirection: 'column',
              alignItems: isMe ? 'flex-end' : 'flex-start',
            }}>
              {!isMe && (
                <div style={{ paddingLeft: 44, fontSize: 10, fontWeight: 700, color: '#777B7C', marginBottom: 2 }}>{m.user_name}</div>
              )}
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexDirection: isMe ? 'row-reverse' : 'row', maxWidth: '85%' }}>
                {/* Avatar (только для чужих) */}
                {!isMe && (
                  <div style={{ width: 32, height: 32, borderRadius: 999, background: avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                    {m.user_emoji}
                  </div>
                )}

                {/* Bubble + reaction trigger */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={e => togglePicker(e, m.id)}
                    style={{
                      display: 'block', padding: '12px 16px',
                      background: isMe ? '#006F1F' : '#F3F4F4',
                      borderRadius: isMe ? '16px 16px 0 16px' : '0 16px 16px 16px',
                      border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 400, color: isMe ? '#EAFFE3' : '#2F3334', lineHeight: 1.375 }}>{m.message}</div>
                  </button>
                  {pickerFor === m.id && (
                    <ReactionPicker
                      onPick={emoji => addReaction(m.id, emoji)}
                      onClose={() => setPickerFor(null)}
                    />
                  )}
                </div>
              </div>

              {/* Reaction pills */}
              {hasReactions && (
                <div style={{
                  display: 'flex', gap: 4, marginTop: 4,
                  paddingLeft: isMe ? 0 : 40, justifyContent: isMe ? 'flex-end' : 'flex-start',
                }}>
                  {Object.entries(msgReactions).filter(([, v]) => v > 0).map(([emoji, count]) => (
                    <button key={emoji} onClick={() => addReaction(m.id, emoji)} style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      padding: '3px 10px', borderRadius: 999, fontSize: 14,
                      background: 'white', border: '1.5px solid #E6E9E9', cursor: 'pointer',
                      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                    }}>
                      {emoji}
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#5C6060' }}>{count}</span>
                    </button>
                  ))}
                </div>
              )}

              <div style={{ fontSize: 10, color: '#777B7C', marginTop: 3, marginBottom: 12, paddingRight: isMe ? 4 : 0, paddingLeft: isMe ? 0 : 44 }}>
                {formatTime(m.date)}
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

        {showSummary && (
          <DailySummaryCard
            data={summaryData}
            loading={summaryLoad}
            onClose={() => { setShowSummary(false); setSummaryData(null) }}
          />
        )}
        <div ref={bottomRef} />
      </div>

      {/* Action templates */}
      <div style={{
        position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
        width: 390, maxWidth: '100%',
        paddingLeft: 16, paddingRight: 16, paddingBottom: 8, zIndex: 45,
      }}>
        <div className="scroll-x" style={{ display: 'flex', gap: 8 }}>
          {ACTION_TEMPLATES.map((t, i) => {
            const isHighlight = t.label.includes('✅')
            return (
              <button key={i} onClick={() => handleAction(t.action, isHighlight)} disabled={sending} style={{
                paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                background: isHighlight ? '#84FC87' : 'white',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                borderRadius: 999,
                outline: isHighlight ? 'none' : '1px solid rgba(175,179,179,0.20)', outlineOffset: -1,
                fontSize: 13, fontWeight: isHighlight ? 700 : 500,
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
