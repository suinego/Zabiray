import { Bell, Plus, Filter, Clock, Users, ChevronRight } from 'lucide-react'

const challenges = [
  {
    id: 1, emoji: '👣', iconBg: 'rgba(98,236,255,0.20)', status: 'active',
    name: 'Марафон «Шаги к здоровью»',
    desc: 'Пройдите 10 000 шагов каждый день',
    progress: 65, current: '6 500', total: '10 000 шагов',
    daysLeft: '4 дня', participants: 6,
    barColor: '#006F1F',
  },
  {
    id: 2, emoji: '💧', iconBg: 'rgba(59,86,194,0.15)', status: 'active',
    name: 'Водный баланс',
    desc: 'Пейте 2 литра воды ежедневно',
    progress: 40, current: '0.8', total: '2.0 л',
    daysLeft: 'Ежедневно', participants: 4,
    barColor: '#3B56C2',
  },
  {
    id: 3, emoji: '💪', iconBg: '#84FC87', status: 'pending',
    name: 'Пресс за 30 дней',
    desc: 'Ежедневные упражнения на пресс',
    progress: 0, current: '0', total: '30 дней',
    daysLeft: 'Ожидает', participants: 3,
    barColor: '#006F1F',
  },
  {
    id: 4, emoji: '🧘', iconBg: '#DDE1FF', status: 'completed',
    name: 'Йога-неделя',
    desc: '7 дней ежедневной практики',
    progress: 100, current: '7', total: '7 дней',
    daysLeft: 'Завершён', participants: 5,
    barColor: '#2B47B4',
  },
]

const statusLabel = {
  active:    { label: 'Активный',   bg: 'rgba(0,111,31,0.10)',   color: '#006F1F' },
  pending:   { label: 'Ожидает',    bg: 'rgba(255,160,0,0.12)',  color: '#B45309' },
  completed: { label: 'Завершён',   bg: 'rgba(59,86,194,0.10)', color: '#3B56C2' },
}

export default function Challenges() {
  return (
    <div className="page">
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
            <div style={{
              width: 40, height: 40, borderRadius: 999, background: '#84FC87',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}>🏆</div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#006F1F' }}>Челленджи</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
              <Filter size={18} color="#71717A" />
            </button>
            <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
              <Bell size={20} color="#71717A" />
            </button>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 80, paddingLeft: 24, paddingRight: 24, paddingBottom: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Create challenge button */}
        <button style={{
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

        {/* Challenges list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#2F3334' }}>Все челленджи</span>
            <span style={{ fontSize: 14, color: '#777B7C' }}>4 шт.</span>
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
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#2F3334', lineHeight: 1.3, marginBottom: 4, flex: 1, paddingRight: 8 }}>
                          {c.name}
                        </div>
                        <div style={{
                          paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3,
                          background: st.bg, borderRadius: 999, flexShrink: 0,
                          fontSize: 10, fontWeight: 700, color: st.color,
                        }}>
                          {st.label}
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: '#777B7C' }}>{c.desc}</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {c.status !== 'pending' && (
                    <div>
                      <div style={{ height: 8, background: '#E6E9E9', borderRadius: 999, overflow: 'hidden', marginBottom: 6 }}>
                        <div style={{ width: `${c.progress}%`, height: 8, background: c.barColor, borderRadius: 999 }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11, fontWeight: 500, color: '#777B7C' }}>
                          {c.current} / {c.total}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: c.barColor }}>
                          {c.progress}%
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
    </div>
  )
}
