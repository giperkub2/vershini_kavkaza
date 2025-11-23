import React, { useState, useEffect, useRef } from 'react';
import { Destination } from '../types';
import { Clock, Mountain, ChevronLeft, ChevronRight, CheckCircle, Share2, Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onBook: (id: string) => void;
}

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onBook }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % destination.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + destination.images.length) % destination.images.length);
  };

  const handleShare = (platform: 'telegram' | 'whatsapp') => {
    const url = window.location.origin + window.location.pathname + '#' + destination.id;
    const text = `Посмотрите этот тур: ${destination.title} - ${destination.price.toLocaleString('ru-RU')}₽!`;
    
    let shareUrl = '';
    if (platform === 'telegram') {
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    } else {
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
    }
    
    window.open(shareUrl, '_blank');
  };

  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('солн') || lower.includes('ясно')) return <Sun className="w-4 h-4 text-amber-500" />;
    if (lower.includes('дождь')) return <CloudRain className="w-4 h-4 text-blue-500" />;
    if (lower.includes('снег')) return <CloudSnow className="w-4 h-4 text-sky-300" />;
    if (lower.includes('облач')) return <Cloud className="w-4 h-4 text-slate-500" />;
    return <Sun className="w-4 h-4 text-amber-500" />;
  };

  return (
    <div 
      id={destination.id}
      ref={cardRef}
      className={`transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} h-full`}
    >
      <div className="group bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-slate-100 flex flex-col h-full">
        {/* Image Gallery Area */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-200">
          <img 
            src={destination.images[currentImageIdx]} 
            alt={destination.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Image Controls */}
          <button 
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={20} />
          </button>

          {/* Weather Widget */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 shadow-lg flex items-center gap-2 border border-white/50">
            {getWeatherIcon(destination.weather.condition)}
            <span className="text-sm">{destination.weather.temp > 0 ? '+' : ''}{destination.weather.temp}°C</span>
            <span className="hidden sm:inline-block text-slate-500 font-normal border-l border-slate-200 pl-2 ml-0.5">
              {destination.weather.condition}
            </span>
          </div>

          {/* Difficulty Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-800 shadow-sm uppercase tracking-wider">
            {destination.difficulty}
          </div>
          
          {/* Dots indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
              {destination.images.map((_, idx) => (
                  <div 
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIdx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                  />
              ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-serif font-bold text-slate-800">{destination.title}</h3>
          </div>

          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {destination.duration}
            </div>
            <div className="flex items-center text-emerald-600 font-semibold">
              {destination.price.toLocaleString('ru-RU')} ₽
            </div>
          </div>

          <p className="text-slate-600 mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">
            {destination.description}
          </p>

          {/* Features Mini List */}
          <div className="mb-6 space-y-1">
              {destination.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="flex items-center text-xs text-slate-500">
                      <CheckCircle className="w-3 h-3 mr-2 text-emerald-500" />
                      {feature}
                  </div>
              ))}
          </div>

          <div className="mt-auto space-y-4">
            <button 
              onClick={() => onBook(destination.id)}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors duration-300 flex items-center justify-center shadow-lg shadow-slate-900/10"
            >
              <Mountain className="w-4 h-4 mr-2" />
              Забронировать место
            </button>

            <div className="flex items-center justify-center space-x-4 pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400 uppercase tracking-wide font-medium">Поделиться:</span>
              <button 
                onClick={() => handleShare('telegram')}
                className="p-2 rounded-full text-slate-400 hover:text-[#0088cc] hover:bg-[#0088cc]/10 transition-colors duration-200"
                aria-label="Share on Telegram"
              >
                <TelegramIcon />
              </button>
              <button 
                onClick={() => handleShare('whatsapp')}
                className="p-2 rounded-full text-slate-400 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-colors duration-200"
                aria-label="Share on WhatsApp"
              >
                <WhatsAppIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};