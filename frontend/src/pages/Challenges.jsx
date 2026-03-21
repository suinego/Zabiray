import { useState, useEffect } from 'react'
import { Bell, Plus, Clock, Users, ChevronRight, Check, User } from 'lucide-react'

/* ── Liquid progress bar (100% per one done task) ─────────────────────────── */
function LiquidBar({ pct, color = '#21A038', height = 8 }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(Math.max(3, Math.min(100, pct))), 120)
    return () => clearTimeout(t)
  }, [pct])

  return (
    <div style={{ height, borderRadius: 999, background: '#E6E9E9', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: `${width}%`,
        background: pct >= 100
          ? 'linear-gradient(90deg, #21A038 0%, #56FF71 100%)'
          : `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)`,
        borderRadius: 999,
        transition: 'width 0.85s cubic-bezier(0.34,1.4,0.64,1)',
        boxShadow: `0 0 6px ${color}55`,
      }} />
    </div>
  )
}

const statusLabel = {
  active:    { label: 'Активный',   bg: 'rgba(0,111,31,0.10)',   color: '#006F1F' },
  pending:   { label: 'Ожидает',    bg: 'rgba(255,160,0,0.12)',  color: '#B45309' },
  completed: { label: 'Завершён',   bg: 'rgba(59,86,194,0.10)', color: '#3B56C2' },
}

const INIT_CHALLENGES = [
  {
    id: 1, emoji: '👣', iconBg: 'rgba(98,236,255,0.20)', status: 'active', type: 'team',
    name: 'Марафон «Шаги к здоровью»',
    desc: 'Пройдите 10 000 шагов каждый день',
    progress: 100, current: '10 000', total: '10 000 шагов',
    daysLeft: '4 дня', participants: 6, barColor: '#006F1F',
  },
  {
    id: 2, emoji: '💧', iconBg: 'rgba(59,86,194,0.15)', status: 'active', type: 'team',
    name: 'Водный баланс',
    desc: 'Пейте 2 литра воды ежедневно',
    progress: 100, current: '2.0', total: '2.0 л',
    daysLeft: 'Ежедневно', participants: 4, barColor: '#3B56C2',
  },
  {
    id: 3, emoji: '💪', iconBg: '#84FC87', status: 'pending', type: 'personal',
    name: 'Пресс за 30 дней',
    desc: 'Ежедневные упражнения на пресс',
    progress: 0, current: '0', total: '30 дней',
    daysLeft: 'Ожидает', participants: 3, barColor: '#006F1F',
  },
  {
    id: 4, emoji: '🧘', iconBg: '#DDE1FF', status: 'completed', type: 'personal',
    name: 'Йога-неделя',
    desc: '7 дней ежедневной практики',
    progress: 100, current: '7', total: '7 дней',
    daysLeft: 'Завершён', participants: 5, barColor: '#2B47B4',
  },
]

const TYPE_EMOJIS = ['🏋️','🧘','🏃','💧','🥗','🌿','💪','🎯','🧠','❤️']

/* ── Create challenge sheet ───────────────────────────────────────────────── */
function CreateSheet({ onClose, onCreate }) {
  const [type,  setType]  = useState('team')
  const [name,  setName]  = useState('')
  const [desc,  setDesc]  = useState('')
  const [emoji, setEmoji] = useState('🎯')

  function submit() {
    if (!name.trim()) return
    onCreate({
      id: Date.now(),
      emoji,
      iconBg: type === 'team' ? 'rgba(132,252,135,0.25)' : 'rgba(221,225,255,0.50)',
      status: 'pending',
      type,
      name: name.trim(),
      desc: desc.trim() || 'Новый челлендж',
      progress: 0, current: '0', total: '—',
      daysLeft: 'Ожидает',
      participants: type === 'team' ? 3 : 1,
      barColor: type === 'team' ? '#21A038' : '#3B56C2',
    })
    onClose()
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div style={{ fontSize: 22, fontWeight: 700, color: '#2F3334', marginBottom: 4 }}>Новый челлендж</div>
        <div style={{ fontSize: 14, color: '#5C6060', marginBottom: 24 }}>Командный или личный — твой выбор</div>

        {/* Type toggle */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[
            { id: 'team',     label: 'Командный', icon: <Users size={16} />, color: '#21A038', bg: '#E7F9ED' },
            { id: 'personal', label: 'Личный',    icon: <User  size={16} />, color: '#3B56C2', bg: '#EEF1FF' },
          ].map(t => {
            const active = type === t.id
            return (
              <button key={t.id} onClick={() => setType(t.id)} style={{
                flex: 1, padding: '14px 12px', borderRadius: 20,
                background: active ? t.bg : '#F3F4F4',
                outline: active ? `2px solid ${t.color}` : 'none', outlineOffset: -2,
                border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                transition: 'all 0.18s',
              }}>
                <div style={{ color: active ? t.color : '#A1A1AA' }}>{t.icon}</div>
                <span style={{ fontSize: 13, fontWeight: 700, color: active ? t.color : '#777B7C' }}>{t.label}</span>
                {active && <Check size={12} color={t.color} />}
              </button>
            )
          })}
        </div>

        {/* Emoji picker */}
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#A1A1AA', marginBottom: 8 }}>
          Иконка
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {TYPE_EMOJIS.map(e => (
            <button key={e} onClick={() => setEmoji(e)} style={{
              width: 44, height: 44, borderRadius: 14, fontSize: 22,
              background: emoji === e ? 'rgba(33,160,56,0.10)' : '#F3F4F4',
              outline: emoji === e ? '2px solid #21A038' : 'none', outlineOffset: -2,
              border: 'none', cursor: 'pointer',
            }}>{e}</button>
          ))}
        </div>

        {/* Name input */}
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#A1A1AA', marginBottom: 8 }}>
          Название
        </div>
        <input
          value={name} onChange={e => setName(e.target.value)}
          placeholder="Например: Бег по утрам"
          style={{
            width: '100%', padding: '14px 16px', borderRadius: 16, marginBottom: 16,
            background: '#F3F4F4', border: 'none', outline: 'none',
            fontSize: 15, color: '#2F3334', boxSizing: 'border-box',
          }}
        />

        {/* Description input */}
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#A1A1AA', marginBottom: 8 }}>
          Описание
        </div>
        <textarea
          value={desc} onChange={e => setDesc(e.target.value)}
          placeholder="Что нужно сделать?"
          rows={3}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: 16, marginBottom: 24,
            background: '#F3F4F4', border: 'none', outline: 'none', resize: 'none',
            fontSize: 14, color: '#2F3334', lineHeight: 1.5, boxSizing: 'border-box',
            fontFamily: 'inherit',
          }}
        />

        <button onClick={submit} style={{
          width: '100%', padding: 18, borderRadius: 16,
          background: name.trim()
            ? 'linear-gradient(169deg, #21A038 0%, #56FF71 100%)'
            : '#E6E9E9',
          boxShadow: name.trim() ? '0px 4px 6px -4px rgba(33,160,56,0.30), 0px 10px 15px -3px rgba(33,160,56,0.30)' : 'none',
          fontSize: 16, fontWeight: 700,
          color: name.trim() ? 'white' : '#A1A1AA',
          border: 'none', cursor: name.trim() ? 'pointer' : 'default',
          transition: 'background 0.2s',
        }}>
          Создать челлендж
        </button>
      </div>
    </div>
  )
}

/* ── Main ──────────────────────────────────────────────────────────────────── */
export default function Challenges() {
  const [challenges, setChallenges] = useState(INIT_CHALLENGES)
  const [showCreate, setShowCreate] = useState(false)

  function handleCreate(newChallenge) {
    setChallenges(prev => [newChallenge, ...prev])
  }

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
        boxShadow: '0px 1px 0px rgba(0,0,0,0.06)',
      }}>
        <div style={{ height: 64, paddingLeft: 24, paddingRight: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: '#84FC87', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏆</div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#006F1F' }}>Челленджи</span>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
            <Bell size={20} color="#71717A" />
          </button>
        </div>
      </div>

      <div style={{ paddingTop: 80, paddingLeft: 24, paddingRight: 24, paddingBottom: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Create button */}
        <button onClick={() => setShowCreate(true)} style={{
          width: '100%', padding: '18px', borderRadius: 48,
          background: 'linear-gradient(169deg, #21A038 0%, #56FF71 100%)',
          boxShadow: '0px 4px 6px -4px rgba(33,160,56,0.30), 0px 10px 15px -3px rgba(33,160,56,0.30)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: 16, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer',
        }}>
          <Plus size={20} color="white" />
          Создать новый челлендж
        </button>

        {/* AI tip */}
        <div style={{
          padding: 16, background: 'rgba(132,252,135,0.20)', borderRadius: 32,
          display: 'flex', gap: 12, alignItems: 'flex-start',
          outline: '1px solid rgba(0,111,31,0.15)', outlineOffset: -1,
        }}>
          <span style={{ fontSize: 20 }}>🤖</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#006019', marginBottom: 4 }}>
              Рекомендация ИИ
            </div>
            <div style={{ fontSize: 13, color: '#006019', lineHeight: 1.5 }}>
              Попробуйте «Утренние 10 минут» — короткий и лёгкий старт, который подойдёт всем участникам вашей группы.
            </div>
          </div>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#2F3334' }}>Все челленджи</span>
            <span style={{ fontSize: 14, color: '#777B7C' }}>{challenges.length} шт.</span>
          </div>

          {challenges.map(c => {
            const st = statusLabel[c.status]
            return (
              <div key={c.id} style={{
                background: 'white',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.04)', borderRadius: 32, overflow: 'hidden',
              }}>
                <div style={{ padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 28, background: c.iconBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0,
                    }}>
                      {c.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#2F3334', lineHeight: 1.3, marginBottom: 4, flex: 1, paddingRight: 8 }}>
                          {c.name}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                          <div style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3, background: st.bg, borderRadius: 999, fontSize: 10, fontWeight: 700, color: st.color }}>
                            {st.label}
                          </div>
                          <div style={{
                            paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2,
                            background: c.type === 'team' ? 'rgba(33,160,56,0.08)' : 'rgba(59,86,194,0.08)',
                            borderRadius: 999, fontSize: 9, fontWeight: 700,
                            color: c.type === 'team' ? '#006F1F' : '#3B56C2',
                            display: 'flex', alignItems: 'center', gap: 3,
                          }}>
                            {c.type === 'team' ? <Users size={9} /> : <User size={9} />}
                            {c.type === 'team' ? 'Команда' : 'Личный'}
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: '#777B7C' }}>{c.desc}</div>
                    </div>
                  </div>

                  {/* Progress — 100% per task */}
                  {c.status !== 'pending' && (
                    <div>
                      <LiquidBar pct={c.progress} color={c.barColor} height={8} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 500, color: '#777B7C' }}>
                          {c.current} / {c.total}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: c.progress >= 100 ? '#21A038' : c.barColor }}>
                          {c.progress >= 100 ? '✓ Выполнено' : `${c.progress}%`}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4, borderTop: '1px solid #F4F4F5' }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} color="#A1A1AA" />
                        <span style={{ fontSize: 11, color: '#A1A1AA' }}>{c.daysLeft}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Users size={12} color="#A1A1AA" />
                        <span style={{ fontSize: 11, color: '#A1A1AA' }}>{c.participants} участников</span>
                      </div>
                    </div>
                    <button style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 12, fontWeight: 700, color: '#006F1F', border: 'none', background: 'none', cursor: 'pointer',
                    }}>
                      Подробнее <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showCreate && <CreateSheet onClose={() => setShowCreate(false)} onCreate={handleCreate} />}
    </div>
  )
}
