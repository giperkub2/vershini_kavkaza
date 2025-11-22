import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Destination } from '../types';

interface BookingModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ destination, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: 1,
    date: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !destination) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md text-center shadow-2xl transform scale-100 transition-all">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Заявка принята!</h3>
          <p className="text-slate-600 mb-6">Наш менеджер свяжется с вами в течение 15 минут для подтверждения деталей поездки в {destination.title}.</p>
          <button 
            onClick={() => { setIsSuccess(false); onClose(); }}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
          >
            Отлично
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden animate-slide-up">
        {/* Header Image */}
        <div className="h-32 bg-slate-200 relative">
            <img src={destination.images[0]} alt="" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
                <X size={20} />
            </button>
            <div className="absolute bottom-4 left-6 text-white">
                <p className="text-sm opacity-80">Бронирование тура</p>
                <h3 className="text-xl font-bold">{destination.title}</h3>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ваше имя</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Телефон</label>
            <input 
              type="tel" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              placeholder="+7 (999) 000-00-00"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Дата выезда</label>
                <input 
                type="date" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-600"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Гостей</label>
                <select 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
                    value={formData.guests}
                    onChange={e => setFormData({...formData, guests: Number(e.target.value)})}
                >
                    {[1,2,3,4,5,6,7,8].map(n => (
                        <option key={n} value={n}>{n} чел.</option>
                    ))}
                </select>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              Отправить заявку
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">
                Нажимаю кнопку, вы соглашаетесь с условиями обработки персональных данных.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};