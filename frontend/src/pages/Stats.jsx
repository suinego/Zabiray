import { Bell, Footprints, Droplets, Zap } from 'lucide-react'

const participants = [
  { id: 1, name: 'Анна',   emoji: '👩', action: 'Пробежала',  highlight: '5.2 км',    when: '25 мин назад', points: '+15', online: true },
  { id: 2, name: 'Игорь',  emoji: '👨', action: 'Тренировка ', highlight: 'Пресс',    when: '1 ч назад',    points: '+10', online: false },
  { id: 3, name: 'Мария',  emoji: '👩', action: 'Йога ',       highlight: '45 мин',   when: '3 ч назад',    points: '+20', online: false },
]

const challenges = [
  { id: 1, name: 'Анна',  emoji: '👩', action: 'Пробежала 5км утром',   points: '+15' },
  { id: 2, name: 'Игорь', emoji: '👨', action: 'Тренировка пресса',     points: '+10' },
  { id: 3, name: 'Мария', emoji: '👩', action: 'Йога (45 мин)',          points: '+20' },
]

export default function Stats() {
  return (
    <div className="page">
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
            <div style={{
              width: 40, height: 40, borderRadius: 999, background: '#84FC87',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}>🏃</div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#006F1F' }}>Статистика</span>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={20} color="#71717A" />
          </button>
        </div>
      </div>

      <div style={{ paddingTop: 80, paddingLeft: 24, paddingRight: 24, paddingBottom: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Group goal card */}
        <div style={{
          background: 'white', borderRadius: 32, padding: '40px 24px 24px',
          boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', outline: '1px solid #F4F4F5', outlineOffset: -1,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Blur bg */}
          <div style={{
            position: 'absolute', width: 128, height: 128, borderRadius: 999,
            background: 'rgba(0,111,31,0.10)', filter: 'blur(32px)',
            right: -16, top: -16,
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#006F1F', marginBottom: 6 }}>
                Общая цель группы
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: '#2F3334', lineHeight: 1.25 }}>
                Эко-<br />марафон<br />2024
              </div>
            </div>
            <div style={{
              paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4,
              background: 'rgba(0,111,31,0.10)', borderRadius: 999,
              fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5, color: '#006F1F',
            }}>
              Глобальный
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: '#006F1F', lineHeight: 1 }}>68</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#006F1F', lineHeight: 1.5 }}>%</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#A1A1AA' }}>13,600 / 20,000 км</span>
            </div>
            <div style={{ height: 20, background: '#F4F4F5', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '68%', height: 12, margin: 4, background: '#006F1F', borderRadius: 999 }} />
            </div>
          </div>

          <div style={{ marginTop: 16, fontSize: 14, fontWeight: 500, color: '#5C6060', lineHeight: 1.625 }}>
            Мы объединились, чтобы внедрить полезные привычки. Каждое достижение конвертируется в баллы для благотворительности.
          </div>
        </div>

        {/* Personal progress */}
        <div style={{
          padding: 32, borderRadius: 32,
          background: 'linear-gradient(148deg, #006F1F 0%, #00A030 100%)',
          boxShadow: '0px 8px 10px -6px rgba(0,111,31,0.20), 0px 20px 25px -5px rgba(0,111,31,0.20)',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.70)', marginBottom: 4 }}>
              Личный прогресс
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>Ваш вклад</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: 'white', lineHeight: 1 }}>82</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'white', lineHeight: 1.5 }}>%</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.80)' }}>41 / 50 заданий</span>
          </div>
          <div style={{ height: 20, background: 'rgba(255,255,255,0.20)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: '82%', height: 12, margin: 4, background: 'white', borderRadius: 999 }} />
          </div>
        </div>

        {/* Current metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 4 }}>
            <div style={{ width: 8, height: 8, background: '#006F1F', borderRadius: 999 }} />
            <span style={{ fontSize: 18, fontWeight: 700, color: '#2F3334' }}>Текущие показатели</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            <div style={{
              padding: 24, background: '#F3F4F4', borderRadius: 16,
              outline: '1px solid white', outlineOffset: -1,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 48,
                background: 'rgba(0,111,31,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Footprints size={20} color="#006F1F" />
              </div>
              <div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#2F3334', lineHeight: 1 }}>10.2к</div>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: 'rgba(92,96,96,0.70)', marginTop: 4 }}>
                  Шагов<br />сегодня
                </div>
              </div>
            </div>
            <div style={{
              padding: 24, background: 'rgba(221,225,255,0.20)', borderRadius: 16,
              outline: '1px solid white', outlineOffset: -1,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 48,
                background: 'rgba(59,86,194,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Droplets size={20} color="#3B56C2" />
              </div>
              <div>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#2F3334', lineHeight: 1 }}>2.1л</div>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: 'rgba(92,96,96,0.70)', marginTop: 4 }}>
                  Водный<br />баланс
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Participants activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 4, paddingRight: 4 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#2F3334' }}>Активность участников</div>
            </div>
            <div style={{
              paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2,
              background: 'rgba(0,111,31,0.10)', borderRadius: 16,
              fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, color: '#006F1F',
              lineHeight: 1.5,
            }}>
              В прямом<br />эфире
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {participants.map(p => (
              <div key={p.id} style={{
                padding: 16, background: 'white',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 16,
                outline: '1px solid #FAFAFA', outlineOffset: -1,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 999, overflow: 'hidden',
                      outline: '2px solid rgba(0,111,31,0.20)', outlineOffset: -2,
                      background: '#E4E4E7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                    }}>
                      {p.emoji}
                    </div>
                    {p.online && (
                      <div style={{
                        position: 'absolute', bottom: 1, right: 1,
                        width: 10, height: 10, borderRadius: 999,
                        background: '#006F1F', border: '2px solid white',
                      }} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2F3334' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#5C6060' }}>
                      {p.action}<span style={{ fontWeight: 700, color: '#006F1F' }}>{p.highlight}</span> • {p.when}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 14, fontWeight: 900, color: '#006F1F' }}>{p.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges tab */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 4, paddingRight: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#2F3334' }}>Челленджи</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#006F1F' }}>Сегодня</span>
          </div>
          <div style={{ background: '#F3F4F4', borderRadius: 48, overflow: 'hidden' }}>
            {challenges.map((c, i) => (
              <div key={c.id} style={{
                padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: i < challenges.length - 1 ? '1px solid rgba(255,255,255,0.8)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 999, overflow: 'hidden',
                    outline: '2px solid white', outlineOffset: -2,
                    background: '#E0E3E4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }}>
                    {c.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2F3334' }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: '#5C6060' }}>{c.action}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Zap size={10} color="#006F1F" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#006F1F' }}>{c.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
