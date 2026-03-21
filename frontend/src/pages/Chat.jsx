import { Search, MoreVertical, Bot } from 'lucide-react'

const messages = [
  {
    id: 1, sender: 'Ольга', side: 'left', avatarBg: '#DDE1FF', avatarEmoji: '👩',
    text: 'Всем привет! Сегодня уже прошла 7000 шагов по парку. Воздух просто супер! 🌳',
    time: '10:42',
  },
  {
    id: 2, sender: 'ai', side: 'ai',
    text: 'Отличная работа, Ольга! Ваша активность в утренние часы сжигает на 20% больше калорий за счет ускоренного метаболизма.',
    tip: 'Добавьте 15 минут растяжки после прогулки.',
    time: '10:43',
  },
  {
    id: 3, sender: 'Вы', side: 'right',
    text: 'Я тоже в деле! Только что закончил тренировку, на часах уже 9500. Вечером добью до 12к 💪',
    time: '11:15',
  },
  {
    id: 4, sender: 'Иван', side: 'left', avatarBg: '#93B9FF', avatarEmoji: '🧑',
    text: 'Ребята, вы монстры! А я пока на совещаниях застрял... Но обещаю вечером всех догнать!',
    time: '11:20',
  },
]

const quickReplies = ['Супер! 👏', 'Готов! 👟', 'Как успехи? 🤔', 'Поддерживаю 🔥', '+1 к цели']

export default function Chat() {
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
            <div style={{
              width: 40, height: 40, borderRadius: 999, background: '#E0E3E4',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}>🏃</div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#006F1F' }}>Sber Wellness</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={18} color="#71717A" />
            </button>
            <button style={{ width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MoreVertical size={20} color="#71717A" />
            </button>
          </div>
        </div>
      </div>

      {/* Pinned challenge card */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 40,
        paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
        background: 'rgba(255,255,255,0.60)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      }}>
        <div style={{
          padding: 16, background: 'white',
          boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', borderRadius: 32,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {/* Goal header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🎯</span>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: '#777B7C' }}>
                Цель:
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#2F3334' }}>Марафон 10 000 шагов</span>
            </div>
            <div style={{
              paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4,
              background: 'rgba(0,111,31,0.10)', borderRadius: 999,
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#006F1F', lineHeight: 1.5,
              textAlign: 'center',
            }}>
              День<br />12/30
            </div>
          </div>

          {/* AI daily analysis */}
          <div style={{
            padding: 12, background: 'rgba(132,252,135,0.30)', borderRadius: 48,
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <Bot size={22} color="#006F1F" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#006019', marginBottom: 4 }}>
                Ежедневный анализ ИИ
              </div>
              <div style={{ fontSize: 12, color: '#006019', lineHeight: 1.625 }}>
                Группа сегодня на 15% активнее, чем вчера.<br />
                Иван лидирует, но Ольга уже близко!<br />
                Продолжайте в том же темпе.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, paddingTop: 16, paddingBottom: 8 }}>
        {messages.map(m => {
          if (m.side === 'ai') {
            return (
              <div key={m.id} style={{ padding: '0 16px 24px' }}>
                <div style={{ position: 'relative' }}>
                  {/* AI badge */}
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
                    padding: 20, background: 'white', borderRadius: 48,
                    boxShadow: '0px 4px 6px -4px rgba(0,0,0,0.10), 0px 10px 15px -3px rgba(0,0,0,0.10)',
                    outline: '2px solid rgba(0,111,31,0.20)', outlineOffset: -2,
                    paddingTop: 24,
                  }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div style={{
                        width: 48, height: 48, background: 'rgba(0,111,31,0.10)', borderRadius: 999,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <Bot size={24} color="#006F1F" />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: '#2F3334', lineHeight: 1.4, marginBottom: 8 }}>
                          {m.text}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#006F1F' }}>Совет:</span>
                          <span style={{ fontSize: 10, color: '#777B7C' }}>{m.tip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          if (m.side === 'right') {
            return (
              <div key={m.id} style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{
                  padding: '12px 16px', background: '#006F1F', borderRadius: '16px 16px 0 16px',
                  boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', maxWidth: 304,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 400, color: '#EAFFE3', lineHeight: 1.375 }}>{m.text}</div>
                </div>
                <div style={{ marginTop: 4, paddingRight: 8, fontSize: 10, color: '#777B7C' }}>
                  Вы • {m.time}
                </div>
              </div>
            )
          }
          return (
            <div key={m.id} style={{ padding: '0 16px 24px', display: 'flex', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flexShrink: 0 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 999, background: m.avatarBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                }}>
                  {m.avatarEmoji}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ paddingLeft: 8, fontSize: 10, fontWeight: 700, color: '#777B7C' }}>{m.sender}</div>
                <div style={{
                  padding: '12px 16px', background: '#F3F4F4',
                  borderRadius: '0 16px 16px 16px', maxWidth: 260,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 400, color: '#2F3334', lineHeight: 1.375 }}>{m.text}</div>
                </div>
                <div style={{ paddingLeft: 8, fontSize: 10, color: '#777B7C' }}>{m.time}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick replies */}
      <div style={{
        position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
        width: 390, maxWidth: '100%',
        paddingLeft: 16, paddingRight: 16, paddingBottom: 8,
        zIndex: 45,
      }}>
        <div className="scroll-x" style={{ display: 'flex', gap: 8 }}>
          {quickReplies.map((r, i) => (
            <button key={i} style={{
              paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10,
              background: r === '+1 к цели' ? '#84FC87' : 'white',
              boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
              borderRadius: 999,
              outline: r === '+1 к цели' ? 'none' : '1px solid rgba(175,179,179,0.20)',
              outlineOffset: -1,
              fontSize: 14, fontWeight: r === '+1 к цели' ? 700 : 500,
              color: r === '+1 к цели' ? '#006019' : '#2F3334',
              border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
