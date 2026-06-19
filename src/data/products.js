/* 기존 11개 — 실제 제품 이미지 */
import imgAnua          from '../assets/images/product/product-capsule-anua.png'
import imgVinote        from '../assets/images/product/product-ampoule-vinote.png'
import imgEsnatureSq    from '../assets/images/product/product-serum-esnature.png'
import imgEstra         from '../assets/images/product/product-cream-estra.png'
import imgVdl           from '../assets/images/product/product-blusher-vdl.png'
import imgBanilaco      from '../assets/images/product/product-cheek-banilaco.png'
import imgDasiqueCheek  from '../assets/images/product/product-cheek-dasique.png'
import imgAmuse         from '../assets/images/product/product-tint-amuse.png'
import imgPartion       from '../assets/images/product/product-toner-partion.png'
import imgToriden       from '../assets/images/product/product-toner-toriden.png'       // 히알루론산 파일 없어 공용 사용
// 앰플엔 세라마이드샷 이미지 파일 없음 (null 처리)

/* 신규 18개 */
import imgToridenToner  from '../assets/images/product/product-toner-toriden.png'       // #12
import imgCetaphil      from '../assets/images/product/product-lotion-cetaphil.png'
import imgMediheal      from '../assets/images/product/product-mask-mediheal.png'
import imgDewme         from '../assets/images/product/product-cleansingbalm-dewme.png'
import imgDrg           from '../assets/images/product/product-serum-drg.png'
import imgRoundlab      from '../assets/images/product/product-suncream-roundlab.png'
import imgLaneige       from '../assets/images/product/product-lip-laneige.png'
import imgClio          from '../assets/images/product/product-cushion-clio.png'
import imgJungsaemmool  from '../assets/images/product/product-base-jungsaemmool.png'
import imgCosrxPatch    from '../assets/images/product/product-troublepatch-cosrx.png'
import imgPcalm         from '../assets/images/product/product-mist-pcalm.png'
import imgMixsoon       from '../assets/images/product/product-eyecream-mixsoon.png'
import imgCosrxPeeling  from '../assets/images/product/product-peeling-cosrx.png'
import imgMedipeel      from '../assets/images/product/product-cleansingoil-medipeel.png'
import imgEsnatureOasis from '../assets/images/product/product-toner-esnature-oasis.png'
import imgBanilacoBlusher from '../assets/images/product/product-blusher-banilaco-mellowness.jpg'
import imgEsnatureCream from '../assets/images/product/product-cream-esnature-squalane.webp'
import imgDasiqueEye    from '../assets/images/product/product-eyeshadow-dasique-peachsqueeze.jpg'

/* 신규 10개 */
import imgMakeon          from '../assets/images/product/product-device-makeon.png'
import imgSchoolofhip     from '../assets/images/product/product-tint-schoolofhip-inkmoodglow-034.jpg'
import imgBergamot        from '../assets/images/product/product-innerbeauty-bergamot-collagen.jpg'
import imgPeripera        from '../assets/images/product/product-tint-peripera-inkmoodglow.webp'
import imgFweeEye02       from '../assets/images/product/product-eyepalette-fwee-glass-02summer.jpg'
import imgFweeBase        from '../assets/images/product/product-base-fwee-spaairy-uvtoneup.png'
import imgFweeEye         from '../assets/images/product/product-eyepalette-fwee-glass.jpg'
import imgFweeCushion     from '../assets/images/product/product-cushion-fwee-glass-original.png'
import imgFweeSuede       from '../assets/images/product/product-tint-fwee-suede.jpg'
import imgFweePink        from '../assets/images/product/product-tint-fwee-pinkobsession-rosebeige.png'

export const MIYU_PRODUCTS = [
  /* ── 스킨케어 ── */
  { id: 1,  name: '아누아 피디알엔 캡슐',                             price: '23,500', category: '스킨케어',    img: imgAnua },
  { id: 2,  name: '비노트 물톡스 부스터 앰플',                         price: '35,900', category: '스킨케어',    img: imgVinote },
  { id: 3,  name: '에스네이처 아쿠아 스쿠알란',                         price: '24,000', category: '스킨케어',    img: imgEsnatureSq },
  { id: 4,  name: '에스트라 아토베리어365 크림 80ml',                   price: '33,000', category: '스킨케어',    img: imgEstra },
  { id: 9,  name: '파티온 포도당 하이드로 에센스 토너 500ml',           price: '29,000', category: '스킨케어',    img: imgPartion },
  { id: 10, name: '토리든 다이브인 저분자 히알루론산 토너',              price: '14,900', category: '스킨케어',    img: imgToriden },
  { id: 11, name: '앰플엔 세라마이드샷 앰플',                           price: '14,900', category: '스킨케어',    img: null },

  /* ── 메이크업 ── */
  { id: 5,  name: 'VDL 치크스테인 블러셔 01 바운딩 피치',              price: '12,900', category: '메이크업',    img: imgVdl },
  { id: 6,  name: '바닐라코 프라이밍 베일 치크 6g 5종',                price: '12,000', category: '메이크업',    img: imgBanilaco },
  { id: 7,  name: '데이지크 블렌딩 무드 치크',                          price: '24,000', category: '메이크업',    img: imgDasiqueCheek },
  { id: 8,  name: '어뮤즈 듀 틴트 04 포멜로 누드',                     price: '20,000', category: '메이크업',    img: imgAmuse },

  /* ── 신규 스킨케어 ── */
  { id: 12, name: '토리든 다이브인 토너',                               price: '14,900', category: '토너',        img: imgToridenToner },
  { id: 13, name: '갈더마 세타필 모이스처라이징 로션',                   price: '16,900', category: '로션',        img: imgCetaphil },
  { id: 14, name: '메디힐 티트리 케어 솔루션 에센셜 마스크',            price: '12,900', category: '마스크',       img: imgMediheal },
  { id: 15, name: '듀엠 쌀뜨물 세안 클렌징밤',                          price: '19,900', category: '클렌저',       img: imgDewme },
  { id: 16, name: '닥터지 레드 블레미쉬 세럼',                          price: '18,000', category: '세럼',        img: imgDrg },
  { id: 17, name: '라운드랩 자작나무 수분 선크림',                       price: '15,000', category: '선크림',       img: imgRoundlab },
  { id: 21, name: '코스알엑스 아크네 핌플 마스터 패치',                  price: '6,000',  category: '트러블케어',   img: imgCosrxPatch },
  { id: 22, name: 'P.CALM 민감진정 수분 미스트',                        price: '14,000', category: '미스트',       img: imgPcalm },
  { id: 23, name: '믹순 콩 아이크림 20ml',                              price: '28,000', category: '아이크림',     img: imgMixsoon },
  { id: 24, name: '코스알엑스 살리실릭 아시드 데일리 젠틀 필링',         price: '9,000',  category: '필링',        img: imgCosrxPeeling },
  { id: 25, name: '메디필 비건 비타민 딥톡스 클렌징 오일',               price: '22,000', category: '클렌징오일',   img: imgMedipeel },
  { id: 26, name: '에스네이처 아쿠아 오아시스 토너',                     price: '24,000', category: '토너',        img: imgEsnatureOasis },
  { id: 28, name: '에스네이처 스쿠알란 수분크림',                        price: '26,000', category: '크림',        img: imgEsnatureCream },

  /* ── 신규 메이크업 ── */
  { id: 18, name: '라네즈 립 슬리핑 마스크 EX',                        price: '22,000', category: '립',          img: imgLaneige },
  { id: 19, name: '킬커버 더 뉴 파운웨어 쿠션',                         price: '35,000', category: '메이크업',    img: imgClio },
  { id: 20, name: '정샘물 마스터클래스 글로우 베이스',                   price: '42,000', category: '메이크업',    img: imgJungsaemmool },
  { id: 27, name: '바닐라코 프라이밍 베일 치크 팩트 블러셔 멜로우니스', price: '22,000', category: '메이크업',    img: imgBanilacoBlusher },
  { id: 29, name: '데이지크 섀도우 팔레트 14 피치 스퀴즈',              price: '24,000', category: '아이섀도우',   img: imgDasiqueEye },

  /* ── 신규 10개 ── */
  { id: 30, name: '메이크온 디바이스',                                   price: '89,000', category: '디바이스',     img: imgMakeon,    tags: [] },
  { id: 31, name: '스쿨 오브 힙 잉크 무드 글로이 틴트 034 웜핑크',      price: '16,000', category: '틴트',         img: imgSchoolofhip, tags: ['신상'] },
  { id: 32, name: '이너뷰티 베르가못 콜라겐 스틱 1박스',                  price: '32,000', category: '이너뷰티',     img: imgBergamot,  tags: [] },
  { id: 33, name: '페리페라 잉크 무드 글로이 틴트',                       price: '15,000', category: '틴트',         img: imgPeripera,  tags: ['신상'] },
  { id: 34, name: '퓌 아이팔레트 글래스 5.1g 02 여름',                   price: '19,000', category: '아이섀도우',   img: imgFweeEye02, tags: [] },
  { id: 35, name: '퓌 스파 에어리 UV 톤업 베이스',                        price: '17,000', category: '베이스',       img: imgFweeBase,  tags: [] },
  { id: 36, name: '퓌 아이팔레트 글래스 5.1g',                           price: '19,000', category: '아이섀도우',   img: imgFweeEye,   tags: [] },
  { id: 37, name: '퓌 쿠션 글래스 오리지널',                              price: '25,000', category: '쿠션',         img: imgFweeCushion, tags: [] },
  { id: 38, name: '퓌 틴트 스웨이드 5g',                                  price: '14,000', category: '틴트',         img: imgFweeSuede, tags: [] },
  { id: 39, name: '퓌 핑크 옵세션 스테이핏 틴트 로즈베이지',              price: '14,000', category: '틴트',         img: imgFweePink,  tags: [] },
]

/** GPT 시스템 프롬프트에 주입할 제품 목록 텍스트 */
export const PRODUCT_LIST_TEXT = MIYU_PRODUCTS
  .map(p => `${p.id}. ${p.name} / ${p.price}원 / ${p.category}`)
  .join('\n')

/** 이름으로 제품 조회 (부분 일치 + 핵심 키워드 매칭) */
export const findProductByName = (name) => {
  if (!name) return null
  const normalized = name.trim()

  // 1. 완전 일치
  const exact = MIYU_PRODUCTS.find(p => p.name === normalized)
  if (exact) return exact

  // 2. 포함 관계
  const partial = MIYU_PRODUCTS.find(p =>
    normalized.includes(p.name) || p.name.includes(normalized)
  )
  if (partial) return partial

  // 3. 핵심 단어 2개 이상 일치 (띄어쓰기로 분리)
  const words = normalized.split(/\s+/).filter(w => w.length >= 2)
  const scored = MIYU_PRODUCTS
    .map(p => ({
      p,
      score: words.filter(w => p.name.includes(w)).length,
    }))
    .filter(({ score }) => score >= 2)
    .sort((a, b) => b.score - a.score)

  return scored[0]?.p ?? null
}
