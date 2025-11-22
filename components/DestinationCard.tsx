import React, { useState, useEffect, useRef } from 'react';
import { Destination } from '../types';
import { Clock, Mountain, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onBook: (id: string) => void;
}

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

  return (
    <div 
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

          {/* Badge */}
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

          <button 
            onClick={() => onBook(destination.id)}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors duration-300 flex items-center justify-center shadow-lg shadow-slate-900/10"
          >
            <Mountain className="w-4 h-4 mr-2" />
            Забронировать место
          </button>
        </div>
      </div>
    </div>
  );
};