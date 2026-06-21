import { NavLink } from 'react-router-dom'

import homeActive      from '../../assets/Icon/home-active.svg'
import homeInactive    from '../../assets/Icon/home-inactive.svg'
import catActive       from '../../assets/Icon/category-active.svg'
import catInactive     from '../../assets/Icon/category-inactive.svg'
import botActive       from '../../assets/Icon/chatbot-active.svg'
import botInactive     from '../../assets/Icon/chatbot-inactive.svg'
import heartActive     from '../../assets/Icon/boheart-active.svg'
import heartInactive   from '../../assets/Icon/heart-inactive.svg'
import userActive      from '../../assets/Icon/user-active.svg'
import userInactive    from '../../assets/Icon/user-inactive.svg'

const TABS = [
  { to: '/',         end: true,  label: '홈',       active: homeActive,  inactive: homeInactive,  iconSize: 32 },
  { to: '/category', end: false, label: '카테고리',  active: catActive,   inactive: catInactive,   iconSize: 32, disabled: true },
  { to: '/miyubot',  end: false, label: '미유봇',    active: botActive,   inactive: botInactive,   iconSize: 32 },
  { to: '/liked',    end: false, label: '좋아요',    active: heartActive, inactive: heartInactive, iconSize: 30, disabled: true },
  { to: '/mypage',   end: false, label: '마이페이지', active: userActive,  inactive: userInactive,  iconSize: 32 },
]

export default function BottomNavigation() {
  return (
    <nav
      style={{
        width: '100%',
        flexShrink: 0,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #F0EFF3',
      }}
    >
      {/* 탭 영역: 상단 4px 여백, 좌20 + 5×48 + 4×27.5 + 우20 = 390 */}
      <div
        style={{
          paddingTop: 4,
          paddingLeft: 20,
          paddingRight: 20,
          display: 'flex',
          gap: 27.5,
        }}
      >
        {TABS.map(({ to, end, label, active, inactive, iconSize, disabled }) => (
          disabled ? (
            <div key={to} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, width: 48, height: 48 }}>
              <img src={inactive} alt={label} style={{ width: iconSize, height: iconSize, display: 'block', flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 500, lineHeight: 1, color: '#78757D', whiteSpace: 'nowrap' }}>{label}</span>
            </div>
          ) : (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={{ textDecoration: 'none' }}
          >
            {({ isActive }) => (
              <div
                data-guide-id={to === '/miyubot' ? 'miyubot-nav' : undefined}
                style={{
                  width: 48,
                  height: 48,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
              >
                <img
                  src={isActive ? active : inactive}
                  alt={label}
                  style={{ width: iconSize, height: iconSize, display: 'block', flexShrink: 0 }}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    lineHeight: 1,
                    color: isActive ? '#7445D6' : '#78757D',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </span>
              </div>
            )}
          </NavLink>
          )
        ))}
      </div>

      {/* 하단 여백 34px + 홈 인디케이터 */}
      <div style={{ height: 34, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 140,
            height: 5,
            backgroundColor: '#000000',
            borderRadius: 2.5,
          }}
        />
      </div>
    </nav>
  )
}
