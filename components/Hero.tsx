import React from 'react';
import { ArrowDown, MapPin } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[20s] hover:scale-110"
        style={{ backgroundImage: "url('https://picsum.photos/id/1036/1920/1080')" }} // Using a snowy mountain placeholder
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up space-y-6">
          <div className="flex items-center justify-center space-x-2 text-emerald-400 font-medium tracking-wider uppercase text-sm sm:text-base mb-4">
            <MapPin className="w-5 h-5" />
            <span>Выезд из Краснодара</span>
          </div>
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold leading-tight tracking-tight drop-shadow-lg">
            Душа <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">Кавказа</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-200 font-light leading-relaxed">
            Авторские туры в горы. Открой для себя величие вершин, чистоту рек и древнюю историю.
          </p>

          <div className="pt-8">
            <button 
              onClick={onExplore}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-emerald-600 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 shadow-lg hover:shadow-emerald-500/30"
            >
              Выбрать путешествие
              <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
        <ArrowDown className="w-8 h-8" />
      </div>
    </div>
  );
};