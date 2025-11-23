import React from 'react';
import { Phone, Mail, Instagram, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/60 backdrop-blur-lg text-slate-300 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-2xl font-serif font-bold text-white mb-4">Вершины Кавказа</h3>
          <p className="text-sm leading-relaxed text-slate-300 mb-6">
            Организуем душевные путешествия в горы с 2015 года. Показываем настоящий Кавказ с любовью и заботой о комфорте.
          </p>
          <div className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Caucasus Peaks. Все права защищены.
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-4">Контакты</h4>
          <ul className="space-y-4">
            <li className="flex items-center hover:text-emerald-400 transition-colors cursor-pointer">
              <Phone className="w-5 h-5 mr-3" />
              <span>+7 (918) 000-00-00</span>
            </li>
            <li className="flex items-center hover:text-emerald-400 transition-colors cursor-pointer">
              <Mail className="w-5 h-5 mr-3" />
              <span>booking@caucasus-peaks.ru</span>
            </li>
            <li className="flex items-center text-slate-400">
              <span className="w-5 mr-3 text-center">📍</span>
              <span>г. Краснодар, гараж за заправкой лукойл
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-4">Следите за нами</h4>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors text-white backdrop-blur-sm">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors text-white backdrop-blur-sm">
              <Send size={20} />
            </a>
          </div>
          <p className="text-sm text-slate-500">
            Подписывайтесь на рассылку анонсов новых туров.
          </p>
        </div>
      </div>
    </footer>
  );
};