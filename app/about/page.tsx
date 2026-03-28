import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import WhoWeServe from '@/components/WhoWeServe';
import QuoteBanner from '@/components/QuoteBanner';
import { AnimateIn } from '@/components/AnimateIn';

export const metadata: Metadata = {
  title: 'About Us — Lombard\'s Premier Flooring Store',
  description:
    'Learn about Smile Floors — Lombard\'s premier flooring destination. 4,000+ products, expert guidance, honest pricing. Serving homeowners, contractors, builders, hospitals, and schools across Chicagoland. Visit us at 1218 S Garfield St, Lombard, IL 60148.',
  keywords: [
    'about Smile Floors',
    'flooring store Lombard IL history',
    'local flooring company Chicagoland',
    'flooring showroom DuPage County',
    'hardwood tile vinyl flooring experts Illinois',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Smile Floors | Lombard, IL Flooring Showroom',
    description: 'Lombard\'s premier flooring destination. 4,000+ products. Honest guidance. Serving all of Chicagoland.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-stone-50 border-b border-stone-100 py-14">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <AnimateIn>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Story</p>
            <h1 className="text-5xl sm:text-6xl font-black text-stone-900">About Smile Floors</h1>
            <p className="text-stone-500 text-lg mt-3 max-w-2xl leading-relaxed">
              Lombard&apos;s premier flooring destination — serving every customer with the same dedication and expertise.
            </p>
          </AnimateIn>
        </div>
      </div>

      {/* Story section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateIn direction="left">
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Who We Are</p>
              <h2 className="text-4xl font-black text-stone-900 mb-6">Quality Flooring.<br />Honest Service.</h2>
              <div className="space-y-4 text-stone-500 leading-relaxed text-[15px]">
                <p>
                  At Smile Floors, we specialize in top-quality flooring solutions for every type of project — from a single bedroom remodel to a full commercial build-out. Based in Lombard, IL, we serve homeowners, contractors, builders, hospitals, schools, and businesses across all of Chicagoland.
                </p>
                <p>
                  Our showroom carries hardwood, ceramic and porcelain tile, luxury vinyl plank (LVP), laminate, mosaics, and area rugs. With over 4,000 products in stock, we have something for every style, room, and budget.
                </p>
                <p>
                  We take the time to understand your vision and guide you to the flooring that truly fits. No pressure. No gimmicks. Just honest advice and quality products.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/shop" className="btn-primary rounded-lg">Browse Products →</Link>
                <Link href="/contact" className="btn-outline rounded-lg">Contact Us</Link>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={100}>
              {/* Info card — no images needed */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden">
                <div className="bg-amber-500 px-8 py-6">
                  <h3 className="text-white font-black text-xl">Visit Our Showroom</h3>
                  <p className="text-amber-100 text-sm mt-1">Come see our full selection in person</p>
                </div>
                <div className="p-8 space-y-5">
                  <a href="tel:7082995189" className="group flex items-center gap-4 hover:text-amber-600 transition-colors">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                      <PhoneIcon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Phone</p>
                      <p className="font-bold text-stone-800 group-hover:text-amber-600 transition-colors">(708) 299-5189</p>
                    </div>
                  </a>
                  <a href="mailto:Shaw@smilefloorsusa.com" className="group flex items-center gap-4 hover:text-amber-600 transition-colors">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                      <EnvelopeIcon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Email</p>
                      <p className="font-bold text-stone-800 group-hover:text-amber-600 transition-colors text-sm break-all">Shaw@smilefloorsusa.com</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Address</p>
                      <p className="font-bold text-stone-800">1218 S Garfield St</p>
                      <p className="text-stone-500 text-sm">Lombard, IL 60148</p>
                    </div>
                  </div>
                  <div className="border-t border-stone-200 pt-5">
                    <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-3">Hours</p>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-600 font-medium">Monday – Friday</span>
                        <span className="text-stone-800 font-bold">8 AM – 5 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600 font-medium">Saturday</span>
                        <span className="text-red-500 font-bold">Closed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600 font-medium">Sunday</span>
                        <span className="text-red-500 font-bold">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-500 py-14">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '4,000+', l: 'Products in Stock' },
              { n: '6+', l: 'Flooring Categories' },
              { n: '100%', l: 'Satisfaction Goal' },
              { n: '1', l: 'Lombard Showroom' },
            ].map((s, i) => (
              <AnimateIn key={s.l} delay={i * 70}>
                <div>
                  <div className="text-4xl lg:text-5xl font-black text-white">{s.n}</div>
                  <div className="text-amber-100 font-medium mt-1 text-sm">{s.l}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* What we carry */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <AnimateIn>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Specialties</p>
            <h2 className="text-4xl font-black text-stone-900 mb-12">What We Carry</h2>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Hardwood Flooring', desc: 'Solid & engineered in dozens of species.', href: '/collections/hardwood' },
              { name: 'Tile', desc: 'Porcelain, ceramic, and natural stone.', href: '/collections/tile' },
              { name: 'Mosaics', desc: 'Artisan patterns for backsplashes & floors.', href: '/collections/mosaics' },
              { name: 'Rugs', desc: 'Curated area rugs in every size and style.', href: '/collections/rugs' },
              { name: 'Vinyl / LVP', desc: 'Waterproof luxury vinyl for any room.', href: '/collections/vinyl' },
              { name: 'Laminate', desc: 'High-definition realistic wood visuals.', href: '/collections/laminate' },
            ].map((item, i) => (
              <AnimateIn key={item.name} delay={i * 55}>
                <Link href={item.href} className="group bg-white border border-stone-200 rounded-xl p-7 hover:border-amber-300 hover:shadow-md transition-all duration-200 block">
                  <h3 className="font-black text-stone-900 text-base mb-1.5 group-hover:text-amber-600 transition-colors">{item.name}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                  <span className="text-stone-300 group-hover:text-amber-500 text-sm mt-4 block transition-all duration-200">Browse →</span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <WhoWeServe />
      <QuoteBanner />
    </>
  );
}
