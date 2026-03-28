'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { PhoneIcon } from '@heroicons/react/24/outline';

const WORDS = ['Hardwood.', 'Tile.', 'Vinyl.', 'Mosaics.', 'Rugs.', 'Laminate.'];

// Floor material palettes — each simulates a different flooring type
const FLOOR_TILES = [
  { bg: '#c8a96e', stripe: '#b8955a', label: 'Oak' },
  { bg: '#6b4226', stripe: '#5a3620', label: 'Walnut' },
  { bg: '#e8d5b7', stripe: '#d4c09e', label: 'Maple' },
  { bg: '#8B6914', stripe: '#7a5c10', label: 'Hickory' },
  { bg: '#4a3020', stripe: '#3d2618', label: 'Ebony' },
  { bg: '#bfaa88', stripe: '#ae9874', label: 'Travertine' },
  { bg: '#9e9b95', stripe: '#8c8a84', label: 'Slate' },
  { bg: '#d4a574', stripe: '#c49060', label: 'Bamboo' },
  { bg: '#a07850', stripe: '#8e6840', label: 'Cherry' },
  { bg: '#c8c4bc', stripe: '#b8b4ac', label: 'Marble' },
];

const COLS = 7;
const ROWS = 5;
const N = COLS * ROWS;

function randomTile() {
  return FLOOR_TILES[Math.floor(Math.random() * FLOOR_TILES.length)];
}

// The airport-style flip tile board
function FlipBoard() {
  const [tiles, setTiles] = useState(() =>
    Array.from({ length: N }, () => ({ tile: randomTile(), flip: false, next: randomTile() }))
  );

  useEffect(() => {
    const run = () => {
      const count = 4 + Math.floor(Math.random() * 5);
      const idxs = new Set();
      while (idxs.size < count) idxs.add(Math.floor(Math.random() * N));
      const arr = [...idxs];

      // Kick off flip (scaleY → 0)
      setTiles(prev => prev.map((t, i) =>
        arr.includes(i) ? { ...t, flip: true, next: randomTile() } : t
      ));

      // At halfway, swap the tile color
      setTimeout(() => {
        setTiles(prev => prev.map((t, i) =>
          arr.includes(i) ? { ...t, tile: t.next, flip: false } : t
        ));
      }, 220);
    };

    run();
    const id = setInterval(run, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gap: '6px',
        transform: 'rotate(-14deg) skewY(3deg)',
        transformOrigin: 'center center',
      }}
    >
      {tiles.map((t, i) => (
        <div
          key={i}
          style={{
            aspectRatio: '1',
            background: t.tile.bg,
            backgroundImage: `repeating-linear-gradient(
              88deg,
              transparent 0px, transparent 9px,
              ${t.tile.stripe}55 9px, ${t.tile.stripe}55 10px
            ), repeating-linear-gradient(
              178deg,
              transparent 0px, transparent 22px,
              ${t.tile.stripe}30 22px, ${t.tile.stripe}30 23px
            )`,
            borderRadius: '2px',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)',
            transform: t.flip ? 'scaleY(0.05)' : 'scaleY(1)',
            transition: t.flip
              ? 'transform 0.18s cubic-bezier(0.4,0,1,1)'
              : 'transform 0.18s cubic-bezier(0,0,0.6,1)',
          }}
        />
      ))}
    </div>
  );
}

// ─── Animated worker characters ───────────────────────────

// Worker 1: walks across screen carrying a floor plank
function WorkerWalking() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '80px',
        left: 0,
        width: '100%',
        height: '70px',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div style={{ animation: 'walkAcross 14s linear infinite' }}>
        <svg width="64" height="70" viewBox="0 0 64 70" fill="none">
          {/* Shadow */}
          <ellipse cx="28" cy="68" rx="14" ry="3" fill="rgba(0,0,0,0.12)" />
          {/* Plank on shoulder */}
          <rect
            x="-8" y="16" width="60" height="6" rx="2"
            fill="#b8895a" stroke="#8b6540" strokeWidth="1"
            style={{ animation: 'plankBob 0.5s ease-in-out infinite alternate' }}
          />
          {/* Body */}
          <rect x="22" y="24" width="12" height="18" rx="3" fill="#3d5a80" />
          {/* Head */}
          <circle cx="28" cy="20" r="8" fill="#f4a261" />
          {/* Hard hat */}
          <ellipse cx="28" cy="13" rx="10" ry="4" fill="#e9c46a" />
          <rect x="18" y="13" width="20" height="3" rx="1" fill="#e9c46a" />
          {/* Arms */}
          <g style={{ animation: 'armSwing 0.5s ease-in-out infinite alternate' }}>
            <rect x="10" y="24" width="10" height="4" rx="2" fill="#f4a261" />
          </g>
          <rect x="34" y="20" width="10" height="4" rx="2" fill="#f4a261"
            style={{ transform: 'rotate(-20deg)', transformOrigin: '34px 22px' }} />
          {/* Legs */}
          <g style={{ animation: 'legLeft 0.5s ease-in-out infinite alternate' }}>
            <rect x="22" y="42" width="8" height="18" rx="3" fill="#264653" />
            <rect x="20" y="58" width="10" height="5" rx="2" fill="#333" />
          </g>
          <g style={{ animation: 'legRight 0.5s ease-in-out infinite alternate' }}>
            <rect x="30" y="42" width="8" height="18" rx="3" fill="#264653" />
            <rect x="28" y="58" width="10" height="5" rx="2" fill="#333" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// Worker 2: kneels and lays a tile (repeating loop)
function WorkerKneeling({ style }) {
  return (
    <div style={{ position: 'absolute', ...style, pointerEvents: 'none' }}>
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        {/* Shadow */}
        <ellipse cx="30" cy="58" rx="18" ry="3" fill="rgba(0,0,0,0.1)" />
        {/* Tile being placed */}
        <rect x="6" y="46" width="20" height="14" rx="1" fill="#bfaa88" stroke="#ae9874" strokeWidth="1"
          style={{ animation: 'tilePlace 1.8s ease-in-out infinite' }} />
        {/* Body */}
        <rect x="22" y="22" width="14" height="18" rx="3" fill="#3d5a80" />
        {/* Head */}
        <circle cx="29" cy="17" r="8" fill="#f4a261" />
        {/* Hard hat */}
        <ellipse cx="29" cy="10" rx="10" ry="4" fill="#e9c46a" />
        <rect x="19" y="10" width="20" height="3" rx="1" fill="#e9c46a" />
        {/* Kneeling legs */}
        <rect x="22" y="40" width="8" height="12" rx="3" fill="#264653" transform="rotate(30 22 40)" />
        <rect x="30" y="38" width="8" height="14" rx="3" fill="#264653" />
        {/* Arm reaching down */}
        <g style={{ animation: 'reachDown 1.8s ease-in-out infinite' }}>
          <rect x="10" y="30" width="14" height="4" rx="2" fill="#f4a261" transform="rotate(40 10 30)" />
        </g>
        {/* Other arm */}
        <rect x="36" y="28" width="10" height="4" rx="2" fill="#f4a261" />
      </svg>
    </div>
  );
}

// Worker 3: sweeps/finishes the floor
function WorkerSweeping() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '80px',
        right: '12%',
        pointerEvents: 'none',
        animation: 'sweepBob 2s ease-in-out infinite',
      }}
    >
      <svg width="52" height="68" viewBox="0 0 52 68" fill="none">
        <ellipse cx="26" cy="66" rx="12" ry="2.5" fill="rgba(0,0,0,0.1)" />
        {/* Mop handle */}
        <rect x="34" y="4" width="4" height="50" rx="2" fill="#a07850"
          style={{ animation: 'mopSwing 2s ease-in-out infinite', transformOrigin: '36px 30px' }} />
        {/* Mop head */}
        <rect x="28" y="52" width="20" height="6" rx="3" fill="#ccc"
          style={{ animation: 'mopSwing 2s ease-in-out infinite', transformOrigin: '36px 30px' }} />
        {/* Body */}
        <rect x="18" y="22" width="14" height="20" rx="3" fill="#e9c46a" />
        {/* Head */}
        <circle cx="25" cy="16" r="8" fill="#f4a261" />
        {/* Hard hat */}
        <ellipse cx="25" cy="9" rx="10" ry="4" fill="#2a9d8f" />
        <rect x="15" y="9" width="20" height="3" rx="1" fill="#2a9d8f" />
        {/* Arm holding handle */}
        <rect x="30" y="28" width="10" height="4" rx="2" fill="#f4a261" />
        {/* Legs */}
        <rect x="18" y="42" width="8" height="18" rx="3" fill="#264653" />
        <rect x="24" y="42" width="8" height="18" rx="3" fill="#264653" />
        <rect x="16" y="58" width="10" height="5" rx="2" fill="#333" />
        <rect x="22" y="58" width="10" height="5" rx="2" fill="#333" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setWordVisible(true); }, 280);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-stone-50 overflow-hidden" style={{ minHeight: '62vh' }}>
      {/* Amber left accent rail */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500 z-10" />

      {/* Floor surface — spans full section width, no column boundary */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '80px',
          background: 'linear-gradient(to top, #f0e8dc 0%, #f0e8dc 60%, transparent 100%)',
          borderTop: '2px solid #d4bfa0',
          zIndex: 1,
        }}
      />

      {/* RIGHT: absolutely positioned — no grid, no column boundary line */}
      <div
        className="hidden lg:block"
        style={{
          position: 'absolute',
          top: 0, bottom: 0, left: '50%', right: 0,
          zIndex: 2,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s ease 0.5s',
        }}
      >
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '420px', padding: '0 8px' }}>
            <FlipBoard />
          </div>
          <WorkerWalking />
          <WorkerKneeling style={{ bottom: '80px', left: '20%' }} />
          <WorkerSweeping />
        </div>
      </div>

      {/* LEFT: text — normal flow, constrained to left half on desktop */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-20"
        style={{ minHeight: '62vh', display: 'flex', alignItems: 'center' }}
      >
        <div className="py-12 lg:py-16 w-full lg:w-1/2">
          <h1
            className="font-black leading-[1.0] tracking-tight text-stone-900"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'none' : 'translateY(16px)',
              transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
            }}
          >
            Premium
            <br />
            <span
              className="text-amber-500 block"
              style={{
                opacity: wordVisible ? 1 : 0,
                transform: wordVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
              }}
            >
              {WORDS[wordIdx]}
            </span>
            Flooring.
          </h1>

          <p
            className="text-stone-500 text-lg mt-6 mb-8 max-w-md leading-relaxed"
            style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}
          >
            4,000+ products for homes, businesses, contractors, hospitals, and schools.
            Serving Chicagoland from our Lombard showroom.
          </p>

          <div
            className="flex flex-wrap gap-3"
            style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.42s' }}
          >
            <Link href="/shop" className="btn-primary text-base gap-2 group rounded-lg">
              Shop All Flooring
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <a href="tel:7082995189" className="btn-outline text-base gap-2 rounded-lg">
              <PhoneIcon className="w-4 h-4" />
              (708) 299-5189
            </a>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-10 mt-10 pt-8 border-t border-stone-200"
            style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.58s' }}
          >
            {[
              { value: '4,000+', label: 'Products' },
              { value: '6', label: 'Categories' },
              { value: '1', label: 'Lombard Showroom' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-black text-stone-900">{s.value}</div>
                <div className="text-stone-400 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes walkAcross {
          0%   { transform: translateX(-80px); }
          45%  { transform: translateX(38vw); }
          46%  { transform: translateX(38vw) scaleX(-1); opacity: 1; }
          90%  { transform: translateX(-10px) scaleX(-1); }
          91%  { opacity: 0; }
          99%  { opacity: 0; transform: translateX(-80px) scaleX(1); }
          100% { opacity: 1; transform: translateX(-80px) scaleX(1); }
        }
        @keyframes legLeft {
          from { transform: rotate(-20deg) translateY(0); }
          to   { transform: rotate(20deg) translateY(2px); }
        }
        @keyframes legRight {
          from { transform: rotate(20deg) translateY(2px); }
          to   { transform: rotate(-20deg) translateY(0); }
        }
        @keyframes armSwing {
          from { transform: rotate(-15deg); }
          to   { transform: rotate(15deg); }
        }
        @keyframes plankBob {
          from { transform: translateY(-1px) rotate(-2deg); }
          to   { transform: translateY(1px) rotate(-1deg); }
        }
        @keyframes tilePlace {
          0%, 60%  { transform: translateY(0); opacity: 1; }
          75%  { transform: translateY(-8px); opacity: 0.6; }
          85%  { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes reachDown {
          0%, 60%  { transform: rotate(40deg) translateY(0); }
          75%  { transform: rotate(55deg) translateY(4px); }
          85%  { transform: rotate(40deg) translateY(0); }
          100% { transform: rotate(40deg) translateY(0); }
        }
        @keyframes sweepBob {
          0%, 100% { transform: rotate(0deg); }
          25%  { transform: rotate(3deg) translateX(4px); }
          75%  { transform: rotate(-3deg) translateX(-4px); }
        }
        @keyframes mopSwing {
          0%, 100% { transform: rotate(0deg); }
          25%  { transform: rotate(8deg); }
          75%  { transform: rotate(-8deg); }
        }
      `}</style>
    </section>
  );
}
