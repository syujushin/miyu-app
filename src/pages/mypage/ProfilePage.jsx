import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import statusBarSvg from '../../assets/Top/Status Bar.svg'
import arrowBack    from '../../assets/Icon/ui/icon-arrow-back.svg'
import iconUp       from '../../assets/Icon/icon-up.svg'
import profileSvg   from '../../assets/images/review/Profile.svg'
import badgeLv2     from '../../assets/Icon/badges/Property 1=badge-lv2-rookie.svg'
import chevronRight from '../../assets/Icon/chevron-right.svg'

const STATS = [
  { label: '상품 구매', value: 102 },
  { label: '상품 리뷰', value: 61 },
  { label: '리뷰 평가', value: 113 },
]

const REVIEW_CATEGORIES = [
  { name: '메이크업', review: 47, rating: 40 },
  { name: '스킨케어', review: 30, rating: 24 },
  { name: '헤어케어', review: 11, rating: 15 },
  { name: '바디케어', review: 11, rating: 21 },
  { name: '뷰티소품', review: 17, rating: 13 },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const [barFill, setBarFill] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setBarFill(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ backgroundColor: '#F7F6F9', height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* 고정 헤더 */}
      <div style={{ flexShrink: 0, backgroundColor: '#F7F6F9' }}>
        <img src={statusBarSvg} alt="" draggable={false} style={{ width: '100%', display: 'block' }} />
        <div style={{ height: 52, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, position: 'relative' }}>
          <button
            onClick={() => navigate(-1)}
            style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
          >
            <img src={arrowBack} alt="뒤로" style={{ width: 28, height: 28, display: 'block' }} />
          </button>
          <span style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            fontSize: 18, fontWeight: 500, color: '#242227', lineHeight: 1.4, letterSpacing: '-0.01em',
          }}>
            프로필
          </span>
        </div>
      </div>

      {/* 스크롤 콘텐츠 */}
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <motion.div initial="hidden" animate="visible" variants={stagger} style={{ padding: '12px 16px 40px', display: 'flex', flexDirection: 'column', gap: 8 }}>

        {/* 프로필 카드 */}
        <motion.div variants={fadeUp} style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '20px 20px 0' }}>
          {/* 아바타 */}
          {/* 아이콘 + 닉네임 + 등급 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <img src={profileSvg} alt="프로필" style={{ width: 68, height: 68, borderRadius: 99, display: 'block' }} />
            <p style={{ fontSize: 20, fontWeight: 600, color: '#242227', lineHeight: 1.4, margin: 0, letterSpacing: '-0.01em', textAlign: 'center' }}>
              김구르
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 400, color: '#242227', lineHeight: 1.4 }}>현재 등급</span>
              <img src={badgeLv2} alt="LV2" style={{ height: 20, width: 'auto', display: 'block', flexShrink: 0 }} />
            </div>
          </div>

          {/* 레벨 프로그레스 바 */}
          <div style={{ marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ width: 318, height: 4, borderRadius: 99, backgroundColor: '#F0EFF3', overflow: 'hidden' }}>
              <div style={{ width: barFill ? 222 : 0, height: '100%', background: 'linear-gradient(to right, #D4B8FF, #A1B0FF, #B38BFF)', borderRadius: '99px 0 0 99px', transition: 'width 0.6s cubic-bezier(0.25, 1, 0.5, 1)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#9D9AA3', lineHeight: 1.5 }}>LV2</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#9D9AA3', lineHeight: 1.5 }}>LV3</span>
            </div>
          </div>

          {/* 레벨업 안내 */}
          <div style={{ height: 1, backgroundColor: '#F0EFF3', margin: '12px -20px' }} />
          <div style={{ marginBottom: 12 }}>
          <div style={{
            width: 318,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderRadius: 10, padding: '0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#242227', lineHeight: 1.4, whiteSpace: 'nowrap' }}>
                <span style={{ fontWeight: 500, color: '#6633CC' }}>평가 점수 32점</span>
                {' '}추가 달성 시{' '}
                <span style={{ fontWeight: 500, color: '#6633CC' }}>레벨 업</span>
              </span>
              <motion.img
                src={iconUp}
                alt=""
                style={{ width: 18, height: 18, display: 'block', flexShrink: 0 }}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <span style={{
              fontSize: 12, fontWeight: 500, color: '#78757D', lineHeight: 1.5,
              backgroundColor: '#F7F6F9', borderRadius: 16,
              width: 94, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              1만원 쿠폰 증정
            </span>
          </div>
          </div>
        </motion.div>

        {/* 통계 카드 */}
        <motion.div variants={fadeUp} style={{
          backgroundColor: '#FFFFFF', borderRadius: 16,
          padding: '20px 0',
          display: 'flex',
        }}>
          {STATS.map(({ label, value }, i) => (
            <div key={label} style={{
              flex: 1, textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid #F0EFF3' : 'none',
              padding: '0 12px',
            }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#9D9AA3', margin: 0, lineHeight: 1.4 }}>{label}</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#6633CC', margin: 0, lineHeight: 1.4 }}>{value}</p>
            </div>
          ))}
        </motion.div>

        {/* 내가 쓴 리뷰 */}
        <motion.div variants={fadeUp} style={{
          backgroundColor: '#FFFFFF', borderRadius: 16,
          padding: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#242227', lineHeight: 1.4, letterSpacing: '-0.01em' }}>내가 쓴 리뷰</span>
          <img src={chevronRight} alt="" style={{ width: 20, height: 20, display: 'block' }} />
        </motion.div>

        {/* 내가 받은 리뷰 평가 */}
        <motion.div variants={fadeUp} style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '20px 20px 0' }}>
          {/* 헤더 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#242227', letterSpacing: '-0.01em' }}>내가 받은 리뷰 평가</span>
            <img src={chevronRight} alt="" style={{ width: 20, height: 20, display: 'block' }} />
          </div>

          {/* 카테고리 행 */}
          {REVIEW_CATEGORIES.map(({ name, review, rating }, i) => (
            <div key={name}>
              {i > 0 && <div style={{ height: 1, backgroundColor: '#F0EFF3' }} />}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '24px 0',
              }}>
                <span style={{ fontSize: 14, fontWeight: 400, color: '#242227' }}>{name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 400, color: '#9D9AA3' }}>
                    리뷰 <span style={{ fontSize: 14, fontWeight: 700, color: '#6633CC' }}>{review}</span>
                  </span>
                  <div style={{ width: 1, height: 20, backgroundColor: '#F0EFF3' }} />
                  <span style={{ fontSize: 14, fontWeight: 400, color: '#9D9AA3' }}>
                    평가 <span style={{ fontSize: 14, fontWeight: 700, color: '#6633CC' }}>{rating}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </motion.div>
      </div>
    </div>
  )
}
