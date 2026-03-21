import { Bell, Plus, TrendingUp, MapPin, Footprints, Droplets, ThumbsUp, MessageCircle } from 'lucide-react'

const challenges = [
  {
    id: 1, icon: '👣', iconBg: 'rgba(98,236,255,0.20)', iconColor: '#1032A1',
    name: 'Марафон "Шаги к здоров…',
    progress: 65, daysLeft: 4, current: '6 500', total: '10 000 шагов',
  },
  {
    id: 2, icon: '💧', iconBg: '#84FC87', iconColor: '#006F1F',
    name: 'Водный баланс',
    progress: 40, barColor: '#3B56C2', daysLeft: null, current: '0.8', total: '2.0 ЛИТРА',
    suffix: 'ЕЖЕДНЕВНО',
  },
]

const activities = [
  { id: 1, label: 'Сегодня, 18:30', name: 'Йога в парке Горького', sub: '4.2 км от вас • 15 участников' },
  { id: 2, label: 'Завтра, 10:00',  name: 'Кроссфит интенсив',    sub: '1.5 км от вас • 8 мест осталось' },
]

const feed = [
  {
    id: 1, name: 'Мария',
    text: <>
      <b>Мария</b> пробежала <b>5.4 км</b> и побила свой личный рекорд!
    </>,
    likes: 12, comments: 3,
  },
  {
    id: 2, name: 'Дмитрий',
    text: <>
      <b>Дмитрий</b> присоединился к челленджу <b>"Пресс за 30 дней"</b>.
    </>,
    likes: 5,
  },
]

export default function Home() {
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
              overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 20 }}>🏃</span>
            </div>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#21A038' }}>Sber Wellness</span>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={20} color="#71717A" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ paddingTop: 96, paddingLeft: 24, paddingRight: 24, paddingBottom: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* Greeting */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#2F3334', lineHeight: 1.2 }}>Привет, Александр!</div>
          <div style={{ fontSize: 16, color: '#5C6060' }}>Сегодня отличный день для новой цели.</div>
        </div>

        {/* Online + Start */}
        <div style={{
          background: '#F3F4F4', borderRadius: 32, padding: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: '#777B7C' }}>
              Сейчас онлайн
            </div>
            <div style={{ display: 'flex' }}>
              {['🧑', '👩', '👨'].map((e, i) => (
                <div key={i} style={{
                  width: 40, height: 40, borderRadius: 999, background: '#c8f0cb',
                  border: '4px solid #F3F4F4', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginLeft: i > 0 ? -8 : 0, fontSize: 18, zIndex: 3 - i,
                }}>
                  {e}
                </div>
              ))}
              <div style={{
                width: 40, height: 40, borderRadius: 999, background: '#84FC87',
                border: '4px solid #F3F4F4', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginLeft: -8, fontSize: 10, fontWeight: 700, color: '#006019',
              }}>+12</div>
            </div>
          </div>
          <button style={{
            paddingLeft: 20, paddingRight: 20, paddingTop: 12, paddingBottom: 12,
            background: '#006F1F', borderRadius: 999,
            boxShadow: '0px 4px 6px -4px rgba(0,111,31,0.20), 0px 10px 15px -3px rgba(0,111,31,0.20)',
            fontSize: 14, fontWeight: 700, color: '#EAFFE3', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            Начать тренировку
          </button>
        </div>

        {/* Two cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{
            padding: 24, background: 'white',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 48,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32, minHeight: 160,
          }}>
            <div style={{
              width: 48, height: 48, background: '#DDE1FF', borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Plus size={20} color="#2B47B4" />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#2F3334', lineHeight: 1.25 }}>Создать<br />челлендж</div>
              <div style={{ fontSize: 12, color: '#5C6060', marginTop: 4 }}>Бросьте вызов<br />друзьям</div>
            </div>
          </div>
          <div style={{
            padding: 24, background: '#21A038',
            boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 48,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32, minHeight: 160,
          }}>
            <div style={{
              width: 48, height: 48, background: 'rgba(255,255,255,0.20)', borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <TrendingUp size={20} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'white', lineHeight: 1.25 }}>Ваш<br />прогресс</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.80)', marginTop: 4 }}>85% от цели на<br />неделю</div>
            </div>
          </div>
        </div>

        {/* Active challenges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#2F3334' }}>Активные челленджи</div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#006F1F' }}>Все</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {challenges.map(c => (
              <div key={c.id} style={{
                padding: 20, background: 'white',
                boxShadow: '0px 10px 30px rgba(0,0,0,0.03)', borderRadius: 48,
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 32, background: c.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 24,
                }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#2F3334', marginBottom: 8 }}>{c.name}</div>
                  <div style={{ height: 8, background: '#E6E9E9', borderRadius: 999, overflow: 'hidden', marginBottom: 6 }}>
                    <div style={{ width: `${c.progress}%`, height: 8, background: c.barColor || '#006F1F', borderRadius: 999 }} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 500, color: '#5C6060' }}>
                    {c.suffix ? `${c.suffix} • ${c.current} / ${c.total}` : `ОСТАЛОСЬ ${c.daysLeft} ДН • ${c.current} / ${c.total}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming activities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#2F3334' }}>Ближайшие активности</div>
          <div className="scroll-x" style={{ display: 'flex', gap: 16, paddingBottom: 4 }}>
            {activities.map(a => (
              <div key={a.id} style={{
                minWidth: 280, background: 'white',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 48, overflow: 'hidden', flexShrink: 0,
              }}>
                <div style={{ height: 128, background: '#E4E4E7', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4,
                    background: 'rgba(255,255,255,0.90)', borderRadius: 999, backdropFilter: 'blur(6px)',
                    fontSize: 10, fontWeight: 700, color: '#2F3334', textTransform: 'uppercase',
                  }}>
                    {a.label}
                  </div>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={32} color="#A1A1AA" />
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#2F3334', marginBottom: 4 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: '#5C6060' }}>{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#2F3334' }}>Лента активности</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {feed.map(f => (
              <div key={f.id} style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 999, background: '#DDE1FF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18,
                }}>
                  {f.id === 1 ? '👩' : '👨'}
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 14, color: '#2F3334', lineHeight: 1.4 }}>{f.text}</div>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <ThumbsUp size={12} color="#A1A1AA" />
                      <span style={{ fontSize: 12, color: '#A1A1AA' }}>{f.likes}</span>
                    </div>
                    {f.comments && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MessageCircle size={12} color="#A1A1AA" />
                        <span style={{ fontSize: 12, color: '#A1A1AA' }}>{f.comments}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
