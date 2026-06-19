import clearDaySvg    from '../assets/icons/weather/clear-day.svg'
import cloudySvg      from '../assets/icons/weather/cloudy.svg'
import rainSvg        from '../assets/icons/weather/rain.svg'
import drizzleSvg     from '../assets/icons/weather/drizzle.svg'
import thundersSvg    from '../assets/icons/weather/thunderstorms.svg'
import snowSvg        from '../assets/icons/weather/snow.svg'
import mistSvg        from '../assets/icons/weather/mist.svg'

// OWM weatherId → Meteocons animated SVG (img 태그용)
export function getWeatherSvg(weatherId) {
  if (!weatherId) return cloudySvg
  if (weatherId >= 200 && weatherId < 300) return thundersSvg
  if (weatherId >= 300 && weatherId < 400) return drizzleSvg
  if (weatherId >= 500 && weatherId < 600) return rainSvg
  if (weatherId >= 600 && weatherId < 700) return snowSvg
  if (weatherId >= 700 && weatherId < 800) return mistSvg
  if (weatherId === 800) return clearDaySvg
  return cloudySvg
}
