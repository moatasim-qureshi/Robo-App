'use client';
import React from 'react';
import './WeatherWidget.css';

export default function WeatherWidget() {
  return (
    <div className="weather-widget">
      <div className="weather-top">
        <div className="location">Karachi</div>
        <div className="current-weather">
          <img src="/sunny.png" alt="weather icon" className="weather-icon" />
          <div className="temperature">33°</div>
        </div>
        <div className="description">Sunny</div>
      </div>

      <div className="weather-bottom">
        <div className="day">
          <span>Mon</span>
          <img src="/cloudy.png" alt="cloudy" />
          <span>31°</span>
        </div>
        <div className="day">
          <span>Tue</span>
          <img src="/rainy.png" alt="rain" />
          <span>28°</span>
        </div>
        <div className="day">
          <span>Wed</span>
          <img src="/sunny.png" alt="sun" />
          <span>32°</span>
        </div>
      </div>
    </div>
  );
}
