import './home.css';
import WeatherWidget from './components/weatherwidget';
import Drawing from './components/apps'

export default function Home() {
  return (
    <div className='background-container'>
      <WeatherWidget />
      <Drawing />
    </div>
  );
}
