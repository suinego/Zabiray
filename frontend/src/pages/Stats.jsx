import { useEffect, useState } from 'react'
import { Bell, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import { api } from '../api'

const ME_ID = 1  // Рома — текущий пользователь

const USER_COLORS = ['#21A038', '#3B56C2', '#00B9B4']

/* ── Liquid line (группа) ─────────────────────────────────────────────────── */
function LiquidBar({ pct, height = 6, delay = 0 }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(Math.max(2, Math.min(100, pct))), delay + 80)
    return () => clearTimeout(t)
  }, [pct, delay])

  return (
    <div style={{ height, borderRadius: 999, background: 'rgba(0,0,0,0.07)', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: `${width}%`,
        background: 'linear-gradient(90deg, #21A038 0%, #56FF71 100%)',
        borderRadius: 999,
        transition: 'width 0.9s cubic-bezier(0.34,1.4,0.64,1)',
        boxShadow: '0 0 8px rgba(33,160,56,0.45)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: `${width}%`,
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
        borderRadius: 999,
        animation: 'shimmer 2.2s infinite',
      }} />
    </div>
  )
}

/* ── Segmented bar (личный) ───────────────────────────────────────────────── */
function SegmentedBar({ count, max, color = '#21A038', delay = 0 }) {
  const [filled, setFilled] = useState(0)
  const segments = 10
  const target = Math.round((count / Math.max(max, 1)) * segments)

  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      i++; setFilled(i)
      if (i >= target) clearInterval(iv)
    }, delay + 55)
    return () => clearInterval(iv)
  }, [target, delay])

  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: segments }).map((_, idx) => (
        <div key={idx} style={{
          flex: 1, height: 5, borderRadius: 999,
          background: idx < filled ? color : 'rgba(0,0,0,0.07)',
          transition: 'background 0.18s',
          boxShadow: idx < filled ? `0 0 4px ${color}55` : 'none',
        }} />
      ))}
    </div>
  )
}

function formatDate(ts) {
  return new Date(ts * 1000).toLocaleString('ru', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  })
}

/* ── Список активностей одного пользователя ──────────────────────────────── */
function UserActivityList({ user, messages, color }) {
  const msgs = messages.filter(m => m.user_id === user.id && !m.is_ai).sort((a, b) => b.date - a.date)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
      {msgs.length === 0 ? (
        <div style={{ fontSize: 12, color: '#A1A1AA', paddingLeft: 4 }}>Нет активностей</div>
      ) : msgs.map(m => (
        <div key={m.id} style={{
          display: 'flex', gap: 10, alignItems: 'flex-start',
          padding: '8px 12px', background: 'rgba(0,0,0,0.03)', borderRadius: 12,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: 999, background: color, marginTop: 5, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#2F3334', lineHeight: 1.4 }}>{m.message}</div>
            <div style={{ fontSize: 10, color: '#A1A1AA', marginTop: 2 }}>{formatDate(m.date)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

const SBER_SPECIALISTS = [
  { icon: '🩺', name: 'Терапевт',        visits: [
    { user: '🧑', name: 'Рома',  date: '18 мар' },
    { user: '👨', name: 'Иван',  date: '15 мар' },
    { user: '👦', name: 'Влад',  date: '12 мар' },
  ]},
  { icon: '🦷', name: 'Стоматолог',      visits: [
    { user: '🧑', name: 'Рома',  date: '10 мар' },
    { user: '👨', name: 'Иван',  date: '5 мар'  },
  ]},
  { icon: '🧠', name: 'Психолог',        visits: [
    { user: '👦', name: 'Влад',  date: '20 мар' },
  ]},
  { icon: '🏃', name: 'Спортивный врач', visits: [
    { user: '🧑', name: 'Рома',  date: '1 мар'  },
  ]},
]
const TOTAL_VISITS = SBER_SPECIALISTS.reduce((s, sp) => s + sp.visits.length, 0)

function SberZdorovyeCard() {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(0)
  useEffect(() => { const t = setTimeout(() => setWidth(Math.min(100, TOTAL_VISITS * 14)), 200); return () => clearTimeout(t) }, [])

  return (
    <div style={{
      borderRadius: 28,
      background: 'linear-gradient(135deg, #E0F8F7 0%, #F0FFFE 100%)',
      outline: '1px solid rgba(0,185,180,0.20)', outlineOffset: -1,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', padding: '18px 20px', background: 'none',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#00817D' }}>
            СберЗдоровье
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: '#00817D', lineHeight: 1 }}>{TOTAL_VISITS}</span>
            <span style={{ fontSize: 12, color: '#00B9B4', fontWeight: 600 }}>визитов</span>
          </div>
        </div>
        {/* Mini liquid bar */}
        <div style={{ height: 5, borderRadius: 999, background: 'rgba(0,185,180,0.18)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${width}%`,
            background: 'linear-gradient(90deg, #00B9B4, #62ECFF)',
            borderRadius: 999, transition: 'width 0.9s cubic-bezier(0.34,1.4,0.64,1)',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#5C6060' }}>Обращений к специалистам</span>
          <span style={{ fontSize: 11, color: '#00B9B4', fontWeight: 700 }}>
            {open ? 'Свернуть ▲' : 'Подробнее ▼'}
          </span>
        </div>
      </button>

      {/* Scrollable detail */}
      {open && (
        <div style={{ borderTop: '1px solid rgba(0,185,180,0.15)', maxHeight: 280, overflowY: 'auto' }}>
          {SBER_SPECIALISTS.map(sp => (
            <div key={sp.name} style={{ padding: '12px 20px', borderBottom: '1px solid rgba(0,185,180,0.10)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{sp.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#2F3334', flex: 1 }}>{sp.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#00817D', background: 'rgba(0,185,180,0.15)', borderRadius: 999, paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2 }}>
                  {sp.visits.length} раз
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {sp.visits.map((v, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 28 }}>
                    <span style={{ fontSize: 14 }}>{v.user}</span>
                    <span style={{ fontSize: 12, color: '#2F3334', fontWeight: 600 }}>{v.name}</span>
                    <span style={{ fontSize: 11, color: '#A1A1AA', marginLeft: 'auto' }}>{v.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Главный компонент ────────────────────────────────────────────────────── */
export default function Stats() {
  const [stats,    setStats]    = useState(null)
  const [users,    setUsers]    = useState([])
  const [messages, setMessages] = useState([])
  const [loading,  setLoading]  = useState(true)

  // Group goal expand
  const [groupOpen, setGroupOpen] = useState(false)
  // Personal expand (только свой — ME_ID)
  const [myOpen, setMyOpen] = useState(false)

  useEffect(() => {
    Promise.all([api.stats(), api.users(), api.messages(1)])
      .then(([s, u, msgs]) => { setStats(s); setUsers(u); setMessages(msgs) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const maxActivity = stats?.leaderboard?.[0]?.activity_count || 1
  const groupPct    = Math.min(100, (stats?.total_messages || 0) * 5)

  const me = users.find(u => u.id === ME_ID)
  const myEntry = stats?.leaderboard?.find(l => l.user_id === ME_ID)
  const myCount = myEntry?.activity_count || 0

  return (
    <div className="page">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 390, maxWidth: '100%', zIndex: 50,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #F4F4F5',
      }}>
        <div style={{ height: 64, paddingLeft: 24, paddingRight: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: '#84FC87', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏃</div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#006F1F' }}>Статистика</span>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
            <Bell size={20} color="#71717A" />
          </button>
        </div>
      </div>

      <div style={{ paddingTop: 80, paddingLeft: 24, paddingRight: 24, paddingBottom: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#A1A1AA', fontSize: 14 }}>Загрузка...</div>
        ) : <>

          {/* ══ ОБЩАЯ ЦЕЛЬ — разворачивается и показывает всех ══ */}
          <button onClick={() => setGroupOpen(o => !o)} style={{
            width: '100%', background: 'white', borderRadius: 32, padding: '24px 24px 20px',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', outline: '1px solid #F4F4F5', outlineOffset: -1,
            position: 'relative', overflow: 'hidden', border: 'none', cursor: 'pointer', textAlign: 'left',
          }}>
            <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: 999, background: 'rgba(0,111,31,0.08)', filter: 'blur(32px)', right: -16, top: -16 }} />

            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#006F1F', marginBottom: 6 }}>
              Общая цель группы
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#2F3334', lineHeight: 1.3, flex: 1, paddingRight: 12 }}>
                {stats?.group_goal || '—'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <div style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3, background: 'rgba(0,111,31,0.10)', borderRadius: 999, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: '#006F1F' }}>
                  {stats?.participant_count} уч.
                </div>
                {groupOpen ? <ChevronUp size={16} color="#A1A1AA" /> : <ChevronDown size={16} color="#A1A1AA" />}
              </div>
            </div>

            {/* Liquid progress line */}
            <LiquidBar pct={groupPct} height={6} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: '#006F1F', lineHeight: 1 }}>{stats?.total_messages}</span>
                <span style={{ fontSize: 12, color: '#777B7C' }}>активностей всего</span>
              </div>
              <span style={{ fontSize: 11, color: '#A1A1AA' }}>{Math.round(groupPct)}% к цели</span>
            </div>

            {/* Развёрнутый список участников */}
            {groupOpen && (
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }} onClick={e => e.stopPropagation()}>
                <div style={{ height: 1, background: '#F4F4F5' }} />
                {users.map((u, idx) => {
                  const entry = stats?.leaderboard?.find(l => l.user_id === u.id)
                  const count = entry?.activity_count || 0
                  const color = USER_COLORS[idx] || '#21A038'
                  return (
                    <div key={u.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 999, background: '#E4E4E7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                            {u.emoji}
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#2F3334' }}>{u.name}</div>
                            <div style={{ fontSize: 10, color: '#A1A1AA' }}>{count} действий</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Zap size={11} color={color} />
                          <span style={{ fontSize: 12, fontWeight: 900, color }}>{count * 5} очков</span>
                        </div>
                      </div>

                      {/* Сегментный бар каждого участника */}
                      <SegmentedBar count={count} max={maxActivity} color={color} delay={idx * 80} />

                      {/* Список активностей */}
                      <UserActivityList user={u} messages={messages} color={color} />
                    </div>
                  )
                })}
              </div>
            )}
          </button>

          {/* ══ ЛИЧНЫЙ ПРОГРЕСС — только свой, разворачивается что делал ══ */}
          {me && (
            <button onClick={() => setMyOpen(o => !o)} style={{
              width: '100%', padding: '20px 24px', borderRadius: 32,
              background: 'linear-gradient(148deg, #006F1F 0%, #00A030 100%)',
              boxShadow: '0px 8px 10px -6px rgba(0,111,31,0.20), 0px 20px 25px -5px rgba(0,111,31,0.20)',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>
                    Мой личный прогресс
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1.3, maxWidth: 240 }}>
                    {me.goal}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                    {me.emoji}
                  </div>
                  {myOpen ? <ChevronUp size={16} color="rgba(255,255,255,0.7)" /> : <ChevronDown size={16} color="rgba(255,255,255,0.7)" />}
                </div>
              </div>

              {/* Сегментный бар — личный */}
              <div>
                <SegmentedBar count={myCount} max={maxActivity} color="rgba(255,255,255,0.90)" />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.60)' }}>{myCount} активностей</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Zap size={11} color="rgba(255,255,255,0.8)" />
                    <span style={{ fontSize: 12, fontWeight: 900, color: 'white' }}>+{myCount * 5} очков</span>
                  </div>
                </div>
              </div>

              {/* Развёрнутый список моих действий */}
              {myOpen && (
                <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 6 }} onClick={e => e.stopPropagation()}>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 4 }} />
                  {messages
                    .filter(m => m.user_id === ME_ID && !m.is_ai)
                    .sort((a, b) => b.date - a.date)
                    .map(m => (
                      <div key={m.id} style={{
                        display: 'flex', gap: 10, alignItems: 'flex-start',
                        padding: '8px 12px', background: 'rgba(255,255,255,0.12)', borderRadius: 12,
                      }}>
                        <div style={{ width: 5, height: 5, borderRadius: 999, background: '#84FC87', marginTop: 6, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.95)', lineHeight: 1.4 }}>{m.message}</div>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.50)', marginTop: 2 }}>{formatDate(m.date)}</div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </button>
          )}

          {/* ══ Лидерборд ══ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 4 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#2F3334' }}>Лидерборд</span>
              <div style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, background: 'rgba(0,111,31,0.10)', borderRadius: 16, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, color: '#006F1F' }}>
                В прямом эфире
              </div>
            </div>
            {stats?.leaderboard.map((p, i) => (
              <div key={p.user_id} style={{
                padding: '12px 16px', background: 'white',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 16,
                outline: i === 0 ? '2px solid rgba(33,160,56,0.25)' : '1px solid #FAFAFA', outlineOffset: -1,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 999, background: '#E4E4E7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                      {p.user_emoji}
                    </div>
                    {['🥇','🥈','🥉'][i] && (
                      <div style={{ position: 'absolute', bottom: -2, right: -2, fontSize: 14 }}>{['🥇','🥈','🥉'][i]}</div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2F3334' }}>{p.user_name}</div>
                    <div style={{ fontSize: 11, color: '#A1A1AA' }}>{p.activity_count} действий</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Zap size={12} color="#006F1F" />
                  <span style={{ fontSize: 15, fontWeight: 900, color: '#006F1F' }}>+{p.activity_count * 5}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ══ СберЗдоровье — компактная карточка со скроллом ══ */}
          <SberZdorovyeCard />

        </>}
      </div>
    </div>
  )
}
