import Link from 'next/link';
import { AnimateIn } from './AnimateIn';

export default function QuoteBanner() {
  return (
    <section className="bg-amber-500 py-20">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
        <AnimateIn>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div>
              <p className="text-amber-100 font-semibold text-sm uppercase tracking-widest mb-2">Free Consultation</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                Ready to Transform<br />Your Space?
              </h2>
              <p className="text-amber-100 mt-4 text-lg max-w-lg">
                Get a free, no-obligation quote from our flooring experts. Any budget. Any project size.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link href="/contact" className="bg-white text-amber-600 font-bold px-8 py-4 rounded-lg hover:bg-amber-50 transition-colors text-center text-base shadow-sm">
                Get a Free Quote →
              </Link>
              <a href="tel:7082995189" className="border-2 border-white/50 text-white font-bold px-8 py-4 rounded-lg hover:border-white hover:bg-white/10 transition-colors text-center text-base">
                (708) 299-5189
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
