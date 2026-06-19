import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&lang=kr&appid=${API_KEY}`
const CACHE_TTL = 10 * 60 * 1000 // 10분

let _cache = null
let _cacheAt = 0

function getWeatherTip(weatherId, humidity, temp) {
  if (weatherId >= 200 && weatherId < 300) return '천둥번개가 예상돼요. 외출 시 피부 보호에 신경쓰세요!'
  if (weatherId >= 300 && weatherId < 400) return '가랑비가 내려요. 가벼운 방수 메이크업을 추천해요.'
  if (weatherId >= 500 && weatherId < 600) return '비가 내려요. 방수 메이크업으로 오래 유지해보세요!'
  if (weatherId >= 600 && weatherId < 700) return '눈이 내려요. 촉촉한 보습 제품 꼭 챙겨주세요!'
  if (weatherId >= 700 && weatherId < 800) return '미세먼지 주의! 외출 후 꼼꼼한 클렌징이 필요해요.'
  if (weatherId === 800) {
    if (temp >= 30) return '강렬한 햇살! 선크림 꼼꼼히 바르고 자외선을 차단해주세요.'
    if (humidity < 40) return '맑지만 건조해요. 보습 제품으로 수분을 채워주세요!'
    return '맑은 날씨예요. 외출 전 자외선 차단 잊지 마세요!'
  }
  if (weatherId > 800) {
    if (humidity > 70) return '흐리고 습해요. 산뜻한 수분 밸런스 케어를 추천해요.'
    return '흐린 날씨예요. 보습에 신경 써주세요!'
  }
  return '오늘도 건강한 피부 관리 잊지 마세요!'
}

export default function useWeather() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const now = Date.now()
    if (_cache && now - _cacheAt < CACHE_TTL) {
      setData(_cache)
      setLoading(false)
      return
    }

    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('weather api error')
        return res.json()
      })
      .then(json => {
        const w = json.weather[0]
        const result = {
          temp: Math.round(json.main.temp),
          description: w.description,
          iconUrl: `https://openweathermap.org/img/wn/${w.icon}@2x.png`,
          humidity: json.main.humidity,
          weatherId: w.id,
          isNight: w.icon.endsWith('n'),
          tip: getWeatherTip(w.id, json.main.humidity, Math.round(json.main.temp)),
        }
        _cache = result
        _cacheAt = Date.now()
        setData(result)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
