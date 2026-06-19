// 날씨 아이콘 배경색 (날씨/주야간에 따라 분위기 전달)
export function getWeatherIconBg(weatherId, isNight) {
  if (!weatherId) return '#D6EBF5'
  if (weatherId >= 200 && weatherId < 300) return isNight ? '#BCC4CF' : '#CFD6E4' // 천둥
  if (weatherId >= 300 && weatherId < 600) return isNight ? '#BBCCD9' : '#C8DFF0' // 비/이슬비
  if (weatherId >= 600 && weatherId < 700) return '#DCF0F8' // 눈
  if (weatherId >= 700 && weatherId < 800) return '#DDD9D2' // 안개/먼지
  if (weatherId === 800) return isNight ? '#C8CCE0' : '#FFE8B0' // 맑음
  return isNight ? '#C4CAD4' : '#D6EBF5' // 구름
}
