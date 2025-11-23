import React from 'react';
import { ShieldCheck, CloudSun, Footprints, Bus } from 'lucide-react';

export const ImportantInfo: React.FC = () => {
  const tips = [
    {
      icon: <Bus className="w-8 h-8 text-emerald-400" />,
      title: "Трансфер из Краснодара",
      text: "Выезжаем рано утром (05:00-06:00) на комфортабельных микроавтобусах Mercedes Sprinter. Сбор в центре города."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      title: "Страховка и Безопасность",
      text: "Все участники застрахованы. Группы регистрируются в МЧС. Гиды имеют сертификаты первой помощи."
    },
    {
      icon: <CloudSun className="w-8 h-8 text-emerald-400" />,
      title: "Переменчивая погода",
      text: "В горах погода меняется быстро. Всегда берите с собой дождевик, флисовую кофту и солнцезащитный крем, даже если прогноз обещает солнце."
    },
    {
      icon: <Footprints className="w-8 h-8 text-emerald-400" />,
      title: "Экипировка",
      text: "Не обязательно покупать свое. Треккинговые палки, ботинки и рюкзаки можно арендовать у нас перед выездом."
    }
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 drop-shadow-md">Важно знать</h2>
          <p className="text-slate-200 max-w-2xl mx-auto drop-shadow-sm">
            Мы позаботились о деталях, чтобы вы могли наслаждаться природой. Вот несколько моментов, которые сделают ваше путешествие идеальным.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:bg-slate-900/50 transition-all border border-white/10">
              <div className="mb-4 bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{tip.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};