'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { AnimateIn } from './AnimateIn';

const testimonials = [
  { name: 'Maria G.', location: 'Lombard, IL', rating: 5, text: 'Smile Floors had an incredible hardwood selection. The team guided me perfectly and the price was unbeatable. My floors look absolutely stunning.' },
  { name: 'James R.', location: 'Contractor, DuPage County', rating: 5, text: 'As a contractor I send all my clients here. The variety, pricing, and quality are top-notch. Always in stock and the staff is knowledgeable.' },
  { name: 'Priya S.', location: 'Oak Brook, IL', rating: 5, text: 'Tiled our entire kitchen and bathrooms here. The mosaic selection is gorgeous. Quote process was easy and transparent — no surprises.' },
  { name: 'Tom W.', location: 'Naperville, IL', rating: 5, text: 'Used Smile Floors for a commercial office build. Great bulk pricing and fast turnaround. Will absolutely be back for our next project.' },
  { name: 'Angela K.', location: 'Downers Grove, IL', rating: 5, text: 'Replaced all the flooring in my home. Smile Floors made matching everything across rooms seamless. Outstanding service start to finish.' },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const t = testimonials[index];

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">

        <AnimateIn>
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-1">Reviews</p>
          <h2 className="text-4xl font-black text-stone-900 mb-12">What Our Customers Say</h2>
        </AnimateIn>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main quote */}
          <AnimateIn className="lg:col-span-2">
            <div className="bg-white border border-stone-100 rounded-2xl p-8 sm:p-10 shadow-sm">
              {/* Stars */}
              <div className="flex gap-1 mb-7">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>

              <blockquote
                key={index}
                className="text-stone-700 text-xl sm:text-2xl font-light leading-relaxed mb-8"
                style={{ animation: 'fadeUp 0.3s ease forwards' }}
              >
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-black text-amber-700">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-sm">{t.name}</p>
                    <p className="text-stone-400 text-xs">{t.location}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={prev} className="w-9 h-9 border border-stone-200 rounded-full flex items-center justify-center hover:border-stone-400 transition-colors">
                    <ChevronLeftIcon className="w-4 h-4 text-stone-500" />
                  </button>
                  <button onClick={next} className="w-9 h-9 border border-stone-200 rounded-full flex items-center justify-center hover:border-stone-400 transition-colors">
                    <ChevronRightIcon className="w-4 h-4 text-stone-500" />
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="flex gap-1.5 mt-6">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'bg-amber-500 w-6' : 'bg-stone-200 w-2 hover:bg-stone-300'}`}
                  />
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Side list */}
          <AnimateIn delay={120} className="space-y-2">
            {testimonials.map((t2, i) => (
              <button key={i} onClick={() => setIndex(i)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${i === index ? 'border-amber-200 bg-amber-50' : 'border-stone-100 bg-white hover:border-stone-200'}`}
              >
                <p className={`text-sm font-bold mb-0.5 ${i === index ? 'text-amber-700' : 'text-stone-700'}`}>{t2.name}</p>
                <p className="text-stone-400 text-xs">{t2.location}</p>
                <div className="flex gap-0.5 mt-1.5">
                  {[...Array(t2.rating)].map((_, j) => <span key={j} className="text-amber-400 text-xs">★</span>)}
                </div>
              </button>
            ))}
          </AnimateIn>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
}
