import React from 'react';
import { ShieldCheck, CloudSun, Footprints, Bus } from 'lucide-react';

export const ImportantInfo: React.FC = () => {
  const tips = [
    {
      icon: <Bus className="w-8 h-8 text-emerald-600" />,
      title: "Трансфер из Краснодара",
      text: "Выезжаем рано утром (05:00-06:00) на комфортабельных микроавтобусах Mercedes Sprinter. Сбор в центре города."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title: "Страховка и Безопасность",
      text: "Все участники застрахованы. Группы регистрируются в МЧС. Гиды имеют сертификаты первой помощи."
    },
    {
      icon: <CloudSun className="w-8 h-8 text-emerald-600" />,
      title: "Переменчивая погода",
      text: "В горах погода меняется быстро. Всегда берите с собой дождевик, флисовую кофту и солнцезащитный крем, даже если прогноз обещает солнце."
    },
    {
      icon: <Footprints className="w-8 h-8 text-emerald-600" />,
      title: "Экипировка",
      text: "Не обязательно покупать свое. Треккинговые палки, ботинки и рюкзаки можно арендовать у нас перед выездом."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Важно знать</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Мы позаботились о деталях, чтобы вы могли наслаждаться природой. Вот несколько моментов, которые сделают ваше путешествие идеальным.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="mb-4 bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{tip.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};