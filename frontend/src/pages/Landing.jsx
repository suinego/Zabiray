import { useState } from 'react'
import { Users, Home, Heart, Globe, ChevronRight, Check, ChevronDown } from 'lucide-react'

const SBER_BONUSES = [
  { id: 'checkup',    icon: '🩺', label: 'Скидка 15% на чекап в СберЗдоровье',         tag: 'Личный' },
  { id: 'food',       icon: '🥗', label: 'Скидка 20% в СберМаркет (здоровое питание)',  tag: 'Личный' },
  { id: 'sport',      icon: '🏋️', label: 'Абонемент в фитнес-клуб Сбера −30%',         tag: 'Личный' },
  { id: 'insurance',  icon: '🛡️', label: 'Страховка СберЗащита на 3 месяца бесплатно', tag: 'Личный' },
  { id: 'donate_kids',icon: '👶', label: 'Помощь детским домам фонда Сбера',           tag: 'Социальный' },
  { id: 'donate_eco', icon: '🌱', label: 'Озеленение городов — экопрограмма Сбера',    tag: 'Социальный' },
  { id: 'donate_edu', icon: '📚', label: 'Помощь школам в регионах России',             tag: 'Социальный' },
]

const scenarios = [
  { id: 'friends',   label: 'Друзья и коллеги', bg: '#E7F9ED', activeBg: '#21A038', textColor: '#006019', Icon: Users },
  { id: 'family',    label: 'Семья',            bg: '#E0F8F7', activeBg: '#00B9B4', textColor: '#004D4B', Icon: Home },
  { id: 'community', label: 'Комьюнити',        bg: '#F0F4F8', activeBg: '#3B56C2', textColor: '#1A237E', Icon: Globe },
]

function ScenarioSheet({ onClose, onSelect }) {
  const [selected, setSelected] = useState('friends')
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#2F3334', marginBottom: 4 }}>Выберите сценарий</div>
          <div style={{ fontSize: 14, color: '#5C6060' }}>Как вы планируете использовать группу?</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {scenarios.map(({ id, label, bg, activeBg, textColor, Icon }) => {
            const active = selected === id
            return (
              <button key={id} onClick={() => setSelected(id)} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 20, borderRadius: 16,
                background: active ? bg : '#F3F4F4',
                outline: active ? `2px solid ${activeBg}` : 'none', outlineOffset: -2,
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 999,
                    background: active ? activeBg : 'rgba(92,96,96,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={active ? 'white' : '#5C6060'} />
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 700, color: active ? textColor : '#2F3334' }}>{label}</span>
                </div>
                {active ? <Check size={20} color={activeBg} /> : <ChevronRight size={14} color="#AFB3B3" />}
              </button>
            )
          })}
        </div>
        <button onClick={() => onSelect(selected)} style={{
          marginTop: 24, width: '100%', padding: 18, borderRadius: 16,
          background: 'linear-gradient(169deg, #21A038 0%, #56FF71 100%)',
          boxShadow: '0px 4px 6px -4px rgba(33,160,56,0.30), 0px 10px 15px -3px rgba(33,160,56,0.30)',
          fontSize: 18, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer',
        }}>
          Продолжить
        </button>
      </div>
    </div>
  )
}

function BonusSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const selected = SBER_BONUSES.find(b => b.id === value) || SBER_BONUSES[0]

  const personalBonuses = SBER_BONUSES.filter(b => b.tag === 'Личный')
  const socialBonuses   = SBER_BONUSES.filter(b => b.tag === 'Социальный')

  return (
    <div style={{ position: 'relative' }}>
      {/* Trigger */}
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 16,
        padding: '16px 20px', background: 'white', borderRadius: 24,
        boxShadow: open ? '0px 0px 0px 2px #21A038' : '0px 1px 2px rgba(0,0,0,0.05)',
        outline: '1px solid rgba(175,179,179,0.15)', outlineOffset: -1,
        border: 'none', cursor: 'pointer', transition: 'box-shadow 0.2s',
        textAlign: 'left',
      }}>
        <span style={{ fontSize: 28 }}>{selected.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5,
            color: selected.tag === 'Личный' ? '#2B47B4' : '#00B9B4', marginBottom: 2 }}>
            {selected.tag}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#2F3334', lineHeight: 1.3 }}>{selected.label}</div>
        </div>
        <ChevronDown size={18} color="#777B7C" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
          background: 'white', borderRadius: 24, zIndex: 200,
          boxShadow: '0px 8px 30px rgba(0,0,0,0.12)', overflow: 'hidden',
        }}>
          {/* Personal */}
          <div style={{ padding: '12px 20px 6px', fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: 1, color: '#2B47B4' }}>
            Личные бонусы
          </div>
          {personalBonuses.map(b => (
            <button key={b.id} onClick={() => { onChange(b.id); setOpen(false) }} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 20px',
              background: value === b.id ? 'rgba(33,160,56,0.06)' : 'white',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              borderLeft: value === b.id ? '3px solid #21A038' : '3px solid transparent',
              transition: 'background 0.15s',
            }}>
              <span style={{ fontSize: 22 }}>{b.icon}</span>
              <span style={{ fontSize: 13, color: '#2F3334', lineHeight: 1.3 }}>{b.label}</span>
              {value === b.id && <Check size={14} color="#21A038" style={{ marginLeft: 'auto', flexShrink: 0 }} />}
            </button>
          ))}
          {/* Social */}
          <div style={{ padding: '12px 20px 6px', fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: 1, color: '#00B9B4',
            borderTop: '1px solid #F4F4F5', marginTop: 4 }}>
            Социальные бонусы
          </div>
          {socialBonuses.map(b => (
            <button key={b.id} onClick={() => { onChange(b.id); setOpen(false) }} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 20px',
              background: value === b.id ? 'rgba(0,185,180,0.06)' : 'white',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              borderLeft: value === b.id ? '3px solid #00B9B4' : '3px solid transparent',
              transition: 'background 0.15s',
            }}>
              <span style={{ fontSize: 22 }}>{b.icon}</span>
              <span style={{ fontSize: 13, color: '#2F3334', lineHeight: 1.3 }}>{b.label}</span>
              {value === b.id && <Check size={14} color="#00B9B4" style={{ marginLeft: 'auto', flexShrink: 0 }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Landing({ onEnter }) {
  const [sheet, setSheet] = useState(null)
  const [bonus, setBonus] = useState('checkup')

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
          <span style={{ fontSize: 24, fontWeight: 900, color: '#21A038' }}>Sber Wellness</span>
        </div>

        <div style={{ fontSize: 18, color: '#5C6060', lineHeight: 1.375 }}>
          Заботьтесь о здоровье вместе с<br />близкими
        </div>

        {/* Action cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button onClick={() => setSheet('create')} style={{
            width: '100%', height: 176, padding: 32, borderRadius: 48, background: '#006F1F',
            boxShadow: '0px 8px 10px -6px rgba(0,111,31,0.20), 0px 20px 25px -5px rgba(0,111,31,0.20)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start',
            overflow: 'hidden', position: 'relative', border: 'none', cursor: 'pointer', textAlign: 'left',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignSelf: 'stretch' }}>
              <div style={{ width: 34, height: 34, borderRadius: 999, background: 'rgba(255,255,255,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} color="white" />
              </div>
              <Heart size={15} color="rgba(234,255,227,0.30)" />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#EAFFE3', marginBottom: 4 }}>Создать чат</div>
              <div style={{ fontSize: 14, color: 'rgba(234,255,227,0.80)' }}>Организуйте свою группу здоровья</div>
            </div>
            <div style={{ position: 'absolute', width: 128, height: 128, borderRadius: 999, background: 'rgba(255,255,255,0.10)', filter: 'blur(20px)', right: -20, bottom: -20 }} />
          </button>

          <button onClick={() => setSheet('join')} style={{
            width: '100%', height: 176, padding: 32, borderRadius: 48, background: '#F3F4F4',
            outline: '1px solid rgba(175,179,179,0.10)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start',
            overflow: 'hidden', border: 'none', cursor: 'pointer', textAlign: 'left',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignSelf: 'stretch' }}>
              <div style={{ width: 34, height: 34, borderRadius: 999, background: 'rgba(0,185,180,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={18} color="#00B9B4" />
              </div>
              <ChevronRight size={20} color="rgba(92,96,96,0.30)" />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#2F3334', marginBottom: 4 }}>Присоединиться</div>
              <div style={{ fontSize: 14, color: '#5C6060' }}>Введите код доступа к группе</div>
            </div>
          </button>
        </div>

        {/* Bonus select */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2.4, color: '#5C6060', paddingLeft: 4 }}>
            Выберите ваш бонус
          </div>
          <BonusSelect value={bonus} onChange={setBonus} />
          <div style={{ fontSize: 12, color: '#A1A1AA', paddingLeft: 4 }}>
            Бонус начисляется за выполнение командной цели
          </div>
        </div>

        {/* Scenarios */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.4, color: '#5C6060', paddingLeft: 4 }}>
            Сценарии участия
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Друзья и коллеги', bg: '#56FF71', color: '#006019', Icon: Users },
              { label: 'Семья',            bg: '#62ECFF', color: '#003570', Icon: Home },
              { label: 'Комьюнити',        bg: '#ADFFC6', color: '#006019', Icon: Globe },
            ].map(({ label, bg, color, Icon }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderRadius: 32, background: bg }}>
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
        width: 390, maxWidth: '100%', padding: 24,
        background: 'rgba(255,255,255,0.90)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid #E6E9E9', display: 'flex', flexDirection: 'column', gap: 16, zIndex: 40,
      }}>
        <button onClick={onEnter} style={{
          width: '100%', padding: 18, borderRadius: 48,
          background: 'linear-gradient(169deg, #21A038 0%, #56FF71 100%)',
          boxShadow: '0px 4px 6px -4px rgba(33,160,56,0.30), 0px 10px 15px -3px rgba(33,160,56,0.30)',
          fontSize: 18, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer',
        }}>
          Войти по Сбер ID
        </button>
        <div style={{ textAlign: 'center', fontSize: 12, color: '#5C6060' }}>
          Продолжая, вы принимаете условия использования
        </div>
      </div>

      {sheet && <ScenarioSheet onClose={() => setSheet(null)} onSelect={() => { setSheet(null); onEnter() }} />}
    </div>
  )
}
