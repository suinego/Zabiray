import { Bell, Search, SlidersHorizontal, Play } from 'lucide-react'

const history = [
  { id: 1, date: '15 Октября', name: 'Йога: Баланс',    duration: '45 мин', color: '#DDE1FF', textColor: '#3B56C2', emoji: '🧘' },
  { id: 2, date: '14 Октября', name: 'Силовая: Плечи',  duration: '60 мин', color: '#84FC87', textColor: '#006F1F', emoji: '💪' },
]

const community = [
  { id: 1, name: 'Анна Петрова',   desc: 'Хатха-йога для всех',     live: true,  borderColor: '#006F1F' },
  { id: 2, name: 'Марк Волков',    desc: 'Пробежал 10км в Лужниках', live: false, borderColor: '#3B56C2' },
  { id: 3, name: 'Елена Соколова', desc: 'Пешая прогулка: 12к шагов', live: false, borderColor: '#84FC87' },
]

export default function Explore() {
  return (
    <div className="page">
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
            <div style={{
              width: 40, height: 40, borderRadius: 999, background: '#84FC87',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}>🏃</div>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#21A038' }}>Sber Wellness</span>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={20} color="#71717A" />
          </button>
        </div>
      </div>

      <div style={{ paddingTop: 96, paddingLeft: 24, paddingRight: 24, paddingBottom: 32, display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* Search bar */}
        <div style={{ position: 'relative' }}>
          <div style={{
            paddingLeft: 48, paddingRight: 16, paddingTop: 18, paddingBottom: 18,
            background: '#E6E9E9', borderRadius: 16,
            fontSize: 16, color: '#777B7C',
          }}>
            Поиск тренировок или атлетов
          </div>
          <div style={{
            position: 'absolute', left: 16, top: 0, bottom: 0,
            display: 'flex', alignItems: 'center',
          }}>
            <Search size={18} color="#777B7C" />
          </div>
        </div>

        {/* Training history */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, color: '#777B7C', marginBottom: 4 }}>
                Твои достижения
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#2F3334' }}>История тренировок</div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#006F1F' }}>Все</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {history.map(h => (
              <div key={h.id} style={{
                height: 96, padding: 20, background: '#F3F4F4', borderRadius: 48,
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 999, background: h.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
                }}>
                  {h.emoji}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#777B7C', marginBottom: 2 }}>{h.date}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#2F3334' }}>{h.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: h.textColor }}>{h.duration}</div>
                </div>
              </div>
            ))}

            {/* Featured run card */}
            <div style={{
              padding: 24, background: 'white',
              boxShadow: '0px 8px 30px rgba(0,0,0,0.03)',
              borderRadius: 48, overflow: 'hidden', position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4,
                  background: 'rgba(0,111,31,0.10)', borderRadius: 999,
                  fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#006F1F',
                }}>Вчера</div>
                <span style={{ fontSize: 12, color: '#777B7C' }}>Утренняя пробежка</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 16 }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: '#2F3334' }}>5.2 </span>
                <span style={{ fontSize: 18, fontWeight: 500, color: '#777B7C', marginBottom: 2 }}>км</span>
              </div>
              <div style={{ display: 'flex', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#777B7C' }}>Время</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#2F3334' }}>24:12</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#777B7C' }}>Калории</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#2F3334' }}>340 ккал</div>
                </div>
              </div>
              {/* Decorative bg element */}
              <div style={{
                position: 'absolute', right: 32, top: 0, opacity: 0.07, fontSize: 96,
                pointerEvents: 'none',
              }}>🏃</div>
            </div>
          </div>
        </div>

        {/* Community */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, color: '#777B7C', marginBottom: 4 }}>
                Сообщество
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#2F3334' }}>Что делают другие</div>
            </div>
            <button style={{
              width: 32, height: 32, background: '#E6E9E9', borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer',
            }}>
              <SlidersHorizontal size={14} color="#2F3334" />
            </button>
          </div>

          <div className="scroll-x" style={{ display: 'flex', gap: 16, paddingBottom: 4 }}>
            {community.map(c => (
              <div key={c.id} style={{
                minWidth: 280, background: 'white',
                boxShadow: '0px 4px 6px -4px rgba(0,0,0,0.05), 0px 10px 15px -3px rgba(0,0,0,0.05)',
                borderRadius: 48, overflow: 'hidden', flexShrink: 0,
              }}>
                <div style={{
                  height: 160, background: '#E4E4E7', position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56,
                }}>
                  {c.id === 1 ? '🧘' : c.id === 2 ? '🏃' : '🚶'}
                  {c.live && (
                    <div style={{
                      position: 'absolute', top: 12, left: 12,
                      paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4,
                      background: 'rgba(255,255,255,0.90)', borderRadius: 999, backdropFilter: 'blur(6px)',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <div style={{ width: 8, height: 8, background: '#EF4444', borderRadius: 999 }} />
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#2F3334' }}>В прямом эфире</span>
                    </div>
                  )}
                  {!c.live && (
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: '#006F1F', borderRadius: 999,
                      paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Play size={12} color="white" fill="white" />
                    </div>
                  )}
                </div>
                <div style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 999, overflow: 'hidden',
                    boxShadow: `0 0 0 4px ${c.borderColor}, 0 0 0 2px white`,
                    background: '#E4E4E7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
                  }}>
                    👤
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2F3334' }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: '#777B7C' }}>{c.desc}</div>
                  </div>
                  <Play size={20} color={c.live ? '#006F1F' : '#777B7C'} fill={c.live ? '#006F1F' : 'none'} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended challenges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#2F3334', paddingLeft: 4 }}>
            Рекомендуемые челленджи
          </div>
          <div style={{
            padding: 24, borderRadius: 24,
            background: 'linear-gradient(163deg, #21A038 0%, #84FC87 100%)',
            overflow: 'hidden', position: 'relative',
          }}>
            <div style={{
              position: 'absolute', right: -20, top: -20, opacity: 0.20,
              width: 135, height: 135, background: 'white', borderRadius: 0,
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: 'white' }}>Зеленый Марафон</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.80)', maxWidth: 200, lineHeight: 1.4, paddingBottom: 16 }}>
                Присоединяйся к самому масштабному забегу страны
              </div>
              <button style={{
                alignSelf: 'flex-start',
                paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8,
                background: 'white', borderRadius: 999,
                fontSize: 14, fontWeight: 700, color: '#006F1F', border: 'none', cursor: 'pointer',
              }}>
                Участвовать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
