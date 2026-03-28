import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { AnimateIn } from '@/components/AnimateIn';

export const metadata: Metadata = {
  title: 'Contact Us — Free Flooring Quote',
  description:
    'Contact Smile Floors in Lombard, IL for a free flooring quote. Call (708) 299-5189, email Shaw@smilefloorsusa.com, or visit our showroom at 1218 S Garfield St, Lombard, IL 60148. Mon–Fri 8 AM–5 PM.',
  keywords: [
    'flooring quote Lombard IL',
    'free flooring estimate Chicagoland',
    'contact Smile Floors',
    'flooring showroom appointment Lombard',
    'flooring contractor quote DuPage County',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Smile Floors | Free Quote — Lombard, IL',
    description: 'Get a free flooring quote. Call (708) 299-5189 or visit 1218 S Garfield St, Lombard, IL. Mon–Fri 8 AM–5 PM.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-stone-50 border-b border-stone-100 py-14">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <AnimateIn>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Get in Touch</p>
            <h1 className="text-5xl sm:text-6xl font-black text-stone-900">Contact Us</h1>
            <p className="text-stone-500 text-lg mt-3">Request a free quote, ask a question, or stop by our showroom.</p>
          </AnimateIn>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Info column */}
            <AnimateIn direction="left" className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-black text-stone-900 mb-6">Our Information</h2>

              {/* Phone */}
              <a href="tel:7082995189" className="group flex items-start gap-4 bg-stone-50 border border-stone-100 rounded-xl p-5 hover:border-amber-200 hover:bg-amber-50 transition-all duration-200">
                <div className="w-11 h-11 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 transition-colors">
                  <PhoneIcon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-0.5">Phone</p>
                  <p className="font-bold text-stone-800 text-lg group-hover:text-amber-600 transition-colors">(708) 299-5189</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:Shaw@smilefloorsusa.com" className="group flex items-start gap-4 bg-stone-50 border border-stone-100 rounded-xl p-5 hover:border-amber-200 hover:bg-amber-50 transition-all duration-200">
                <div className="w-11 h-11 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 transition-colors">
                  <EnvelopeIcon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="font-bold text-stone-800 group-hover:text-amber-600 transition-colors break-all text-sm">Shaw@smilefloorsusa.com</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 bg-stone-50 border border-stone-100 rounded-xl p-5">
                <div className="w-11 h-11 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-0.5">Address</p>
                  <p className="font-bold text-stone-800">1218 S Garfield St</p>
                  <p className="text-stone-500 text-sm">Lombard, IL 60148</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 bg-stone-50 border border-stone-100 rounded-xl p-5">
                <div className="w-11 h-11 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="w-5 h-5 text-amber-600" />
                </div>
                <div className="w-full">
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Hours</p>
                  <div className="space-y-2 text-sm">
                    {[
                      { day: 'Monday', hours: '8 AM – 5 PM', closed: false },
                      { day: 'Tuesday', hours: '8 AM – 5 PM', closed: false },
                      { day: 'Wednesday', hours: '8 AM – 5 PM', closed: false },
                      { day: 'Thursday', hours: '8 AM – 5 PM', closed: false },
                      { day: 'Friday', hours: '8 AM – 5 PM', closed: false },
                      { day: 'Saturday', hours: 'Closed', closed: true },
                      { day: 'Sunday', hours: 'Closed', closed: true },
                    ].map(({ day, hours, closed }) => (
                      <div key={day} className="flex justify-between items-center">
                        <span className="text-stone-600">{day}</span>
                        <span className={`font-semibold ${closed ? 'text-red-400' : 'text-stone-800'}`}>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2971.0!2d-88.0!3d41.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1218+S+Garfield+St%2C+Lombard%2C+IL+60148!5e0!3m2!1sen!2sus!4v1"
                  width="100%" height="200"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Smile Floors Location"
                />
              </div>
            </AnimateIn>

            {/* Form column */}
            <AnimateIn direction="right" delay={120} className="lg:col-span-3">
              <div className="bg-stone-50 border border-stone-100 rounded-2xl p-8 lg:p-10">
                <h2 className="text-2xl font-black text-stone-900 mb-1">Send a Message</h2>
                <p className="text-stone-400 text-sm mb-8">We reply within 1 business day. For urgent requests, please call.</p>
                <ContactForm />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </div>
  );
}
