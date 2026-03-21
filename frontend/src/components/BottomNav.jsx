import { Home, Trophy, MessageCircle, BarChart2, Compass } from 'lucide-react'

const tabs = [
  { id: 'home',       label: 'Главная',     Icon: Home },
  { id: 'challenges', label: 'Челленджи',   Icon: Trophy },
  { id: 'chat',       label: 'Чат',         Icon: MessageCircle },
  { id: 'stats',      label: 'Статистика',  Icon: BarChart2 },
  { id: 'explore',    label: 'Исследовать', Icon: Compass },
]

export default function BottomNav({ current, onChange }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 390,
      maxWidth: '100%',
      paddingTop: 12,
      paddingBottom: 24,
      background: 'rgba(255,255,255,0.90)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0px -8px 30px rgba(0,0,0,0.05)',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 50,
    }}>
      {tabs.map(({ id, label, Icon }) => {
        const active = current === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: active ? '6px 16px' : '0 8px',
              background: active ? 'rgba(132,252,135,0.20)' : 'none',
              borderRadius: 999,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s',
            }}
          >
            <Icon
              size={active ? 22 : 20}
              color={active ? '#006F1F' : '#A1A1AA'}
              strokeWidth={active ? 2.5 : 1.8}
            />
            <span style={{
              fontSize: 9,
              fontWeight: active ? 700 : 500,
              textTransform: 'uppercase',
              letterSpacing: 0.3,
              color: active ? '#006F1F' : '#A1A1AA',
              lineHeight: 1.5,
            }}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
