import img01 from '../assets/images/product/product-dummy-01.png'
import img02 from '../assets/images/product/product-dummy-02.png'
import img03 from '../assets/images/product/product-dummy-03.png'
import img07 from '../assets/images/product/product-dummy-07.png'
import img08 from '../assets/images/product/product-dummy-08.png'
import img09 from '../assets/images/product/product-dummy-09.png'
import img10 from '../assets/images/product/product-dummy-10.png'
import img11 from '../assets/images/product/product-dummy-11.png'
import img12 from '../assets/images/product/product-dummy-12.png'
import img13 from '../assets/images/product/product-dummy-13.png'

export const MIYU_PRODUCTS = [
  { id: 1,  name: '아누아 피디알엔 캡슐',                     price: '23,500', category: '스킨케어', img: img01 },
  { id: 2,  name: '비노트 물톡스 부스터 앰플',                  price: '35,900', category: '스킨케어', img: img02 },
  { id: 3,  name: '에스네이처 아쿠아 스쿠알란',                  price: '24,000', category: '스킨케어', img: img03 },
  { id: 4,  name: '에스트라 아토베리어365 크림 80ml',             price: '33,000', category: '스킨케어', img: img07 },
  { id: 5,  name: 'VDL 치크스테인 블러셔 01 바운딩 피치',         price: '12,900', category: '메이크업', img: img11 },
  { id: 6,  name: '바닐라코 프라이밍 베일 치크 6g 5종',           price: '12,000', category: '메이크업', img: img12 },
  { id: 7,  name: '데이지크 블렌딩 무드 치크',                   price: '24,000', category: '메이크업', img: img13 },
  { id: 8,  name: '어뮤즈 듀 틴트 04 포멜로 누드',               price: '20,000', category: '메이크업', img: img08 },
  { id: 9,  name: '파티온 포도당 하이드로 에센스 토너 500ml',     price: '29,000', category: '스킨케어', img: img10 },
  { id: 10, name: '토리든 다이브인 저분자 히알루론산 토너',        price: '14,900', category: '스킨케어', img: img09 },
  { id: 11, name: '앰플엔 세라마이드샷 앰플',                    price: '14,900', category: '스킨케어', img: null   },
]

/** GPT 시스템 프롬프트에 주입할 제품 목록 텍스트 */
export const PRODUCT_LIST_TEXT = MIYU_PRODUCTS
  .map(p => `${p.id}. ${p.name} / ${p.price}원 / ${p.category}`)
  .join('\n')

/** 이름으로 제품 조회 (부분 일치 포함) */
export const findProductByName = (name) =>
  MIYU_PRODUCTS.find(p =>
    p.name === name ||
    name.includes(p.name) ||
    p.name.includes(name)
  ) ?? null
