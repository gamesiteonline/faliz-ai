import React, { useEffect, useState } from 'react';
import { GlassCard } from '../shared/GlassCard';
import { Cloud, Sun, CloudRain, Snowflake, Thermometer } from 'lucide-react';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        // In a real app, this would call your backend API which then calls OpenWeatherMap
        // For now, a mock API call
        const response = await new Promise<WeatherData>((resolve) =>
          setTimeout(() => {
            resolve({
              city: 'New York',
              temperature: 22,
              condition: 'Partly Cloudy',
              icon: 'cloud',
            });
          }, 1000)
        );
        setWeather(response);
      } catch (err) {
        setError('Failed to fetch weather data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 60 * 60 * 1000); // Update every hour
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun size={24} className="text-oracle-DEFAULT" />;
      case 'clouds':
      case 'partly cloudy':
        return <Cloud size={24} className="text-falizMutedText" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain size={24} className="text-cyber-DEFAULT" />;
      case 'snow':
        return <Snowflake size={24} className="text-cyber-DEFAULT" />;
      default:
        return <Thermometer size={24} className="text-oracle-DEFAULT" />;
    }
  };

  return (
    <GlassCard title="Weather" icon={getWeatherIcon(weather?.condition || '')}>
      {loading && <p>Loading weather...</p>}
      {error && <p className="text-danger">{error}</p>}
      {weather && !loading && (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-falizText text-lg font-semibold">{weather.city}</p>
            <p className="text-falizMutedText text-sm">{weather.condition}</p>
          </div>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-oracle-DEFAULT">{weather.temperature}°C</span>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default WeatherWidget;
