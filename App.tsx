import React, { useState, useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { DestinationCard } from './components/DestinationCard';
import { BookingModal } from './components/BookingModal';
import { ImportantInfo } from './components/ImportantInfo';
import { ChatWidget } from './components/ChatWidget';
import { Footer } from './components/Footer';
import { DESTINATIONS } from './constants';
import { Destination } from './types';

const App: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        // Switch to scale effect for "volume".
        // Translating Y moves the background off-screen on long pages.
        // Scaling slightly (zooming in) creates depth while keeping coverage.
        const scrollProgress = window.scrollY;
        const scale = 1 + (scrollProgress * 0.00015); 
        
        bgRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBook = (id: string) => {
    const dest = DESTINATIONS.find(d => d.id === id);
    if (dest) {
      setSelectedDestination(dest);
      setIsModalOpen(true);
    }
  };

  const scrollToDestinations = () => {
    const element = document.getElementById('destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Global Fixed Background */}
      <div className="fixed inset-0 z-0">
        <div 
          ref={bgRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-100 ease-linear will-change-transform"
          style={{ 
            // High-quality mountain landscape
            backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80')",
            transformOrigin: 'center 40%' 
          }}
        >
          {/* Global Dark Overlay for readability */}
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
      </div>

      {/* Header/Nav Overlay */}
      <nav className="absolute top-0 w-full z-50 p-6 flex justify-between items-center">
        <div className="text-white font-serif text-2xl font-bold tracking-wider drop-shadow-md">
          ВЕРШИНЫ
        </div>
        <a 
          href="tel:+79180000000" 
          className="text-white font-medium px-4 py-2 border border-white/30 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          +7 (918) 000-00-00
        </a>
      </nav>

      {/* Scrollable Content Wrapper */}
      <div className="relative z-10 w-full">
        <Hero onExplore={scrollToDestinations} />

        {/* Destinations Section */}
        <section id="destinations" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-emerald-400 font-bold tracking-wider uppercase text-sm">Выбирай сердцем</span>
              <h2 className="mt-2 text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-lg">Популярные направления</h2>
              <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full shadow-lg"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {DESTINATIONS.map((destination) => (
                <DestinationCard 
                  key={destination.id} 
                  destination={destination} 
                  onBook={handleBook} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom sections */}
        <div className="relative z-20">
          <ImportantInfo />
          <Footer />
        </div>
      </div>

      {/* Floating Elements */}
      <ChatWidget />
      
      <BookingModal 
        destination={selectedDestination} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default App;