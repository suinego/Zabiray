import { useState } from 'react'
import { Users, Home, Heart, Globe, ChevronRight, Check } from 'lucide-react'

const scenarios = [
  { id: 'friends', label: 'Друзья и коллеги', bg: '#E7F9ED', activeBg: '#21A038', textColor: '#006019', Icon: Users },
  { id: 'family',  label: 'Семья',            bg: '#E0F8F7', activeBg: '#00B9B4', textColor: '#004D4B', Icon: Home },
  { id: 'community', label: 'Комьюнити',      bg: '#F0F4F8', activeBg: '#3B56C2', textColor: '#1A237E', Icon: Globe },
]

function ScenarioSheet({ onClose, onSelect }) {
  const [selected, setSelected] = useState('friends')
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#2F3334', marginBottom: 4 }}>Выберите сценарий</div>
          <div style={{ fontSize: 14, color: '#5C6060' }}>Как вы планируете использовать группу?</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          {scenarios.map(({ id, label, bg, activeBg, textColor, Icon }) => {
            const active = selected === id
            return (
              <button
                key={id}
                onClick={() => setSelected(id)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '20px', borderRadius: 16,
                  background: active ? bg : '#F3F4F4',
                  outline: active ? `2px solid ${activeBg}` : 'none',
                  outlineOffset: active ? -2 : 0,
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 999,
                    background: active ? activeBg : 'rgba(92,96,96,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={active ? 'white' : '#5C6060'} />
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 700, color: active ? textColor : '#2F3334' }}>
                    {label}
                  </span>
                </div>
                {active
                  ? <Check size={20} color={activeBg} />
                  : <ChevronRight size={14} color='#AFB3B3' />
                }
              </button>
            )
          })}
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '20px', borderRadius: 16,
              background: '#F0F4F8', border: 'none', cursor: 'pointer', opacity: 0.5,
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 999,
              background: 'rgba(92,96,96,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 16 }}>—</span>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#5C6060' }}>Другой вариант</span>
          </button>
        </div>
        <button
          onClick={() => onSelect(selected)}
          style={{
            marginTop: 24, width: '100%', padding: '18px', borderRadius: 16,
            background: 'linear-gradient(169deg, #21A038 0%, #56FF71 100%)',
            boxShadow: '0px 4px 6px -4px rgba(33,160,56,0.30), 0px 10px 15px -3px rgba(33,160,56,0.30)',
            fontSize: 18, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer',
          }}
        >
          Продолжить
        </button>
      </div>
    </div>
  )
}

export default function Landing({ onEnter }) {
  const [sheet, setSheet] = useState(null) // 'create' | 'join' | null
  const [bonus, setBonus] = useState('personal')

  const handleSelect = () => {
    setSheet(null)
    onEnter()
  }

  return (
    <div className="page" style={{ background: 'white', minHeight: '100svh' }}>
      <div style={{ padding: '48px 24px 160px', display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 999,
            background: 'linear-gradient(135deg, #21A038 0%, #56FF71 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0px 4px 6px -4px rgba(0,0,0,0.10), 0px 10px 15px -3px rgba(0,0,0,0.10)',
          }}>
            <Heart size={20} color="white" fill="white" />
          </div>
          <span style={{ fontSize: 24, fontWeight: 900, color: '#21A038', lineHeight: 1 }}>Sber Wellness</span>
        </div>

        <div style={{ fontSize: 18, fontWeight: 400, color: '#5C6060', lineHeight: 1.375 }}>
          Заботьтесь о здоровье вместе с<br />близкими
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Создать чат */}
          <button
            onClick={() => setSheet('create')}
            style={{
              width: '100%', height: 176, padding: 32, borderRadius: 48,
              background: '#006F1F',
              boxShadow: '0px 8px 10px -6px rgba(0,111,31,0.20), 0px 20px 25px -5px rgba(0,111,31,0.20)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start',
              overflow: 'hidden', position: 'relative', border: 'none', cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignSelf: 'stretch' }}>
              <div style={{
                width: 34, height: 34, borderRadius: 999,
                background: 'rgba(255,255,255,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Users size={18} color="white" />
              </div>
              <Heart size={15} color="rgba(234,255,227,0.30)" />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#EAFFE3', marginBottom: 4 }}>Создать чат</div>
              <div style={{ fontSize: 14, fontWeight: 400, color: 'rgba(234,255,227,0.80)' }}>
                Организуйте свою группу здоровья
              </div>
            </div>
            {/* Blur circle */}
            <div style={{
              position: 'absolute', width: 128, height: 128, borderRadius: 999,
              background: 'rgba(255,255,255,0.10)', filter: 'blur(20px)',
              right: -20, bottom: -20,
            }} />
          </button>

          {/* Присоединиться */}
          <button
            onClick={() => setSheet('join')}
            style={{
              width: '100%', height: 176, padding: 32, borderRadius: 48,
              background: '#F3F4F4',
              outline: '1px solid rgba(175,179,179,0.10)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start',
              overflow: 'hidden', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignSelf: 'stretch' }}>
              <div style={{
                width: 34, height: 34, borderRadius: 999,
                background: 'rgba(0,185,180,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Globe size={18} color="#00B9B4" />
              </div>
              <ChevronRight size={20} color="rgba(92,96,96,0.30)" />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#2F3334', marginBottom: 4 }}>Присоединиться</div>
              <div style={{ fontSize: 14, fontWeight: 400, color: '#5C6060' }}>
                Введите код доступа к группе
              </div>
            </div>
          </button>
        </div>

        {/* Bonus selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.4, color: '#5C6060', paddingLeft: 4 }}>
            Выберите ваш бонус
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 32, overflow: 'hidden' }}>
            {/* Personal */}
            <button
              onClick={() => setBonus('personal')}
              style={{
                display: 'flex', alignItems: 'center', gap: 20, padding: 24,
                background: bonus === 'personal' ? 'white' : 'white',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                outline: bonus === 'personal' ? '2px solid #21A038' : '1px solid rgba(175,179,179,0.15)',
                outlineOffset: -2,
                borderRadius: 32, border: 'none', cursor: 'pointer', textAlign: 'left',
                marginBottom: 4,
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 999,
                background: '#DDE1FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Heart size={20} color="#2B47B4" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#2F3334', marginBottom: 4 }}>Личный бонус</div>
                <div style={{ fontSize: 14, color: '#5C6060' }}>Скидка 15% на чекап в<br />СберЗдоровье</div>
              </div>
              <div style={{
                width: 24, height: 24, borderRadius: 999, flexShrink: 0,
                background: bonus === 'personal' ? '#21A038' : 'transparent',
                outline: `2px solid ${bonus === 'personal' ? '#21A038' : '#AFB3B3'}`,
                outlineOffset: -2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {bonus === 'personal' && <div style={{ width: 8, height: 8, borderRadius: 4, background: 'white' }} />}
              </div>
            </button>

            {/* Social */}
            <button
              onClick={() => setBonus('social')}
              style={{
                display: 'flex', alignItems: 'center', gap: 20, padding: 24,
                background: 'white',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                outline: bonus === 'social' ? '2px solid #21A038' : '1px solid rgba(175,179,179,0.15)',
                outlineOffset: -2,
                borderRadius: 32, border: 'none', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 999,
                background: '#93B9FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Heart size={20} color="#003570" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#2F3334', marginBottom: 4 }}>Социальный бонус</div>
                <div style={{ fontSize: 14, color: '#5C6060' }}>Помощь детским домам<br />Сбера</div>
              </div>
              <div style={{
                width: 24, height: 24, borderRadius: 999, flexShrink: 0,
                background: bonus === 'social' ? '#21A038' : 'transparent',
                outline: `2px solid ${bonus === 'social' ? '#21A038' : '#AFB3B3'}`,
                outlineOffset: -2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {bonus === 'social' && <div style={{ width: 8, height: 8, borderRadius: 4, background: 'white' }} />}
              </div>
            </button>
          </div>
        </div>

        {/* Scenarios */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.4, color: '#5C6060', paddingLeft: 4 }}>
            Сценарии участия
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Друзья и коллеги', bg: '#56FF71', color: '#006019', Icon: Users },
              { label: 'Семья',            bg: '#62ECFF', color: '#003570', Icon: Home },
              { label: 'Комьюнити',        bg: '#ADFFC6', color: '#006019', Icon: Globe },
            ].map(({ label, bg, color, Icon }) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 20, borderRadius: 32, background: bg,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Icon size={20} color={color} />
                  <span style={{ fontSize: 16, fontWeight: 700, color }}>{label}</span>
                </div>
                <ChevronRight size={14} color={color} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 390, maxWidth: '100%',
        padding: 24,
        background: 'rgba(255,255,255,0.90)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid #E6E9E9',
        display: 'flex', flexDirection: 'column', gap: 16,
        zIndex: 40,
      }}>
        <button
          onClick={onEnter}
          style={{
            width: '100%', padding: '18px', borderRadius: 48,
            background: 'linear-gradient(169deg, #21A038 0%, #56FF71 100%)',
            boxShadow: '0px 4px 6px -4px rgba(33,160,56,0.30), 0px 10px 15px -3px rgba(33,160,56,0.30)',
            fontSize: 18, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer',
          }}
        >
          Войти по Сбер ID
        </button>
        <div style={{ textAlign: 'center', fontSize: 12, color: '#5C6060' }}>
          Продолжая, вы принимаете условия использования
        </div>
      </div>

      {/* Sheet */}
      {sheet && (
        <ScenarioSheet
          type={sheet}
          onClose={() => setSheet(null)}
          onSelect={handleSelect}
        />
      )}
    </div>
  )
}
