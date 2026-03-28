import Link from 'next/link';
import { HomeIcon, BuildingOffice2Icon, AcademicCapIcon, BuildingOfficeIcon, WrenchScrewdriverIcon, HeartIcon } from '@heroicons/react/24/outline';
import { AnimateIn } from './AnimateIn';

const segments = [
  { icon: HomeIcon, label: 'Homeowners', desc: 'Transform any room with floors that last a lifetime.' },
  { icon: WrenchScrewdriverIcon, label: 'Contractors', desc: 'Bulk pricing and full inventory for every project.' },
  { icon: BuildingOffice2Icon, label: 'Businesses', desc: 'Professional flooring for commercial spaces.' },
  { icon: BuildingOfficeIcon, label: 'Builders', desc: 'Complete flooring programs for new construction.' },
  { icon: HeartIcon, label: 'Healthcare', desc: 'Durable, hygienic flooring for medical settings.' },
  { icon: AcademicCapIcon, label: 'Schools', desc: 'Safe, resilient floors for high-traffic institutions.' },
];

export default function WhoWeServe() {
  return (
    <section id="who-we-serve" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateIn direction="left">
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-1">Who We Serve</p>
            <h2 className="text-4xl font-black text-stone-900 mb-6">Flooring for Everyone.</h2>
            <p className="text-stone-500 leading-relaxed mb-4">
              Whether you&apos;re refreshing a single bedroom or outfitting an entire hospital wing — Smile Floors has the selection, the expertise, and the pricing to deliver.
            </p>
            <p className="text-stone-500 leading-relaxed mb-8">
              Based in Lombard, IL. Every customer gets the same dedicated service regardless of project size.
            </p>
            <Link href="/contact" className="btn-primary">Talk to Our Team →</Link>
          </AnimateIn>

          <div className="grid grid-cols-2 gap-4">
            {segments.map((seg, i) => (
              <AnimateIn key={seg.label} delay={80 + i * 55}>
                <div className="group border border-stone-100 rounded-xl p-5 hover:border-amber-200 hover:shadow-md transition-all duration-200 bg-white">
                  <seg.icon className="w-6 h-6 text-stone-400 group-hover:text-amber-500 mb-3 transition-colors duration-200" />
                  <h3 className="font-bold text-stone-800 text-sm">{seg.label}</h3>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed">{seg.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
