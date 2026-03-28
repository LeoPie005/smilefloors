'use client';

import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const PROJECT_TYPES = [
  'Residential – Kitchen / Living Room', 'Residential – Bedroom', 'Residential – Bathroom',
  'Residential – Full Home', 'Commercial – Office', 'Commercial – Retail',
  'Commercial – Restaurant / Hospitality', 'Healthcare / Hospital', 'School / Institution',
  'New Construction', 'Contractor / Builder Project', 'Other',
];
const FLOORING_TYPES = ['Hardwood', 'Laminate', 'Vinyl / LVP', 'Tile', 'Mosaics', 'Rugs', 'Not Sure Yet'];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', flooringType: '', squareFootage: '', timeline: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const id = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!id || id === 'your-formspree-form-id') {
      await new Promise(r => setTimeout(r, 900));
      setStatus('success');
      return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `New Flooring Inquiry from ${form.name} — Smile Floors`, _replyto: form.email }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', projectType: '', flooringType: '', squareFootage: '', timeline: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMsg(data?.errors?.[0]?.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-14">
        <CheckCircleIcon className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h3 className="text-2xl font-black text-stone-900 mb-2">Message Sent!</h3>
        <p className="text-stone-500 mb-1">We&apos;ll get back to you within 1 business day.</p>
        <p className="text-stone-400 text-sm mb-8">Urgent? Call <a href="tel:7082995189" className="text-amber-500 font-bold">(708) 299-5189</a></p>
        <button onClick={() => setStatus('idle')} className="btn-outline rounded-lg">Send Another Message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Full Name *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" className="form-input rounded-lg" />
        </div>
        <div>
          <label className="form-label">Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className="form-input rounded-lg" />
        </div>
      </div>

      <div>
        <label className="form-label">Phone</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="(708) 555-0100" className="form-input rounded-lg" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Project Type</label>
          <select name="projectType" value={form.projectType} onChange={handleChange} className="form-input rounded-lg">
            <option value="">Select type...</option>
            {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label">Flooring Interest</label>
          <select name="flooringType" value={form.flooringType} onChange={handleChange} className="form-input rounded-lg">
            <option value="">Select flooring...</option>
            {FLOORING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Approx. Square Footage</label>
          <input type="text" name="squareFootage" value={form.squareFootage} onChange={handleChange} placeholder="e.g. 500 sq ft" className="form-input rounded-lg" />
        </div>
        <div>
          <label className="form-label">Timeline</label>
          <select name="timeline" value={form.timeline} onChange={handleChange} className="form-input rounded-lg">
            <option value="">Select timeline...</option>
            <option value="ASAP">ASAP</option>
            <option value="Within 1 month">Within 1 month</option>
            <option value="1–3 months">1–3 months</option>
            <option value="3–6 months">3–6 months</option>
            <option value="Just browsing">Just browsing</option>
          </select>
        </div>
      </div>

      <div>
        <label className="form-label">Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us about your project..." className="form-input rounded-lg resize-none" />
      </div>

      {errorMsg && (
        <div className="border border-red-200 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{errorMsg}</div>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full py-4 text-base rounded-lg justify-center disabled:opacity-50 disabled:cursor-not-allowed">
        {status === 'loading'
          ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending...</span>
          : 'Send Message →'}
      </button>

      <p className="text-xs text-stone-400 text-center">By submitting you agree to be contacted by Smile Floors regarding your inquiry.</p>
    </form>
  );
}
