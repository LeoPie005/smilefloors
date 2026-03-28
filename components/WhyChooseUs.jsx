import Link from 'next/link';
import { AnimateIn } from './AnimateIn';

export default function WhyChooseUs() {
  return (
    <section className="bg-white">

      {/* ── Top split: Showroom  |  Shop Online ── */}
      <div className="grid lg:grid-cols-2 min-h-[480px]">

        {/* LEFT — In-Person Showroom */}
        <AnimateIn direction="left" className="relative flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-20 overflow-hidden">
          {/* wood-plank texture stripes */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${i * 12.5}%`,
                  width: '12.5%',
                  background: i % 2 === 0
                    ? 'rgba(245,230,210,0.25)'
                    : 'rgba(235,215,190,0.18)',
                }}
              />
            ))}
          </div>

          <div className="relative">
            <span className="inline-block bg-amber-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
              Visit Us In Lombard, IL
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-stone-900 leading-tight mb-4">
              Come See It<br />
              <span className="text-amber-500">In Person.</span>
            </h2>
            <p className="text-stone-500 text-base leading-relaxed mb-8 max-w-md">
              Walk our 4,000+ sq&nbsp;ft showroom floor. Touch every sample. Our team will guide you from first look to final install — no pressure, just real advice.
            </p>

            {/* mini info row */}
            <div className="flex flex-wrap gap-6 mb-8 text-sm">
              <div>
                <p className="text-stone-400 font-semibold uppercase tracking-wide text-xs mb-0.5">Address</p>
                <p className="font-bold text-stone-800">1218 S Garfield St, Lombard IL</p>
              </div>
              <div>
                <p className="text-stone-400 font-semibold uppercase tracking-wide text-xs mb-0.5">Hours</p>
                <p className="font-bold text-stone-800">Mon – Fri &nbsp;8 AM – 5 PM</p>
              </div>
              <div>
                <p className="text-stone-400 font-semibold uppercase tracking-wide text-xs mb-0.5">Phone</p>
                <a href="tel:7082995189" className="font-bold text-amber-600 hover:text-amber-700 transition-colors">(708) 299-5189</a>
              </div>
            </div>

            <Link href="/contact" className="btn-primary rounded-lg inline-flex">
              Plan a Showroom Visit →
            </Link>
          </div>
        </AnimateIn>

        {/* divider line (desktop) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-stone-200 pointer-events-none" aria-hidden />

        {/* RIGHT — Shop Online */}
        <AnimateIn direction="right" delay={80} className="relative flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-20 bg-stone-50 overflow-hidden">
          {/* subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px), linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)',
              backgroundSize: '32px 32px',
            }}
            aria-hidden
          />

          <div className="relative">
            <span className="inline-block bg-stone-900 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
              Browse &amp; Order Online
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-stone-900 leading-tight mb-4">
              Shop 4,000+<br />
              <span className="text-stone-500">Products Online.</span>
            </h2>
            <p className="text-stone-500 text-base leading-relaxed mb-8 max-w-md">
              Filter by category, compare prices, and order from anywhere. Same great selection as our showroom — available 24/7 with secure checkout.
            </p>

            {/* category pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Hardwood', 'Tile', 'Vinyl / LVP', 'Mosaics', 'Rugs', 'Laminate'].map((cat) => (
                <Link
                  key={cat}
                  href={`/collections/${cat.toLowerCase().replace(/\s*\/\s*/g, '-').replace(/\s+/g, '-')}`}
                  className="bg-white border border-stone-200 text-stone-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:border-amber-400 hover:text-amber-600 transition-all duration-150"
                >
                  {cat}
                </Link>
              ))}
            </div>

            <Link href="/shop" className="btn-outline rounded-lg inline-flex">
              Browse All Products →
            </Link>
          </div>
        </AnimateIn>
      </div>

      {/* ── Bottom strip: 4 trust stats ── */}
      <div className="border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone-100">
            {[
              { n: '4,000+', label: 'Products in Stock', sub: 'Every flooring type' },
              { n: 'All Types', label: 'Customers Served', sub: 'Homes · Commercial · Contractors' },
              { n: '1-Day', label: 'Quote Turnaround', sub: 'Fast, honest estimates' },
              { n: 'Lombard', label: 'Local Chicagoland', sub: 'Serving all of Chicagoland' },
            ].map((s, i) => (
              <AnimateIn key={s.label} delay={i * 55}>
                <div className="py-10 px-8 text-center">
                  <div className="text-3xl font-black text-amber-500 mb-1">{s.n}</div>
                  <div className="text-stone-900 font-bold text-sm">{s.label}</div>
                  <div className="text-stone-400 text-xs mt-0.5">{s.sub}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
