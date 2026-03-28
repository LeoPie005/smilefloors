import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/lib/cartContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://smilefloors.com';

export const viewport: Viewport = {
  themeColor: '#f59e0b',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Smile Floors | Premium Flooring Store in Lombard, IL',
    template: '%s | Smile Floors — Lombard, IL',
  },
  description:
    'Smile Floors is Lombard\'s premier flooring destination. Shop 4,000+ hardwood, tile, luxury vinyl plank (LVP), laminate, mosaic, and rug products. Serving homeowners, contractors, builders, hospitals, and schools across Chicagoland. Visit us at 1218 S Garfield St or call (708) 299-5189.',
  keywords: [
    'flooring store Lombard IL',
    'hardwood floors Lombard',
    'tile flooring Chicagoland',
    'luxury vinyl plank LVP Illinois',
    'laminate flooring DuPage County',
    'mosaic tile backsplash',
    'area rugs Lombard',
    'flooring contractor supply',
    'commercial flooring Illinois',
    'flooring store near me',
    'Smile Floors',
    'smilefloorsusa',
    'flooring Elmhurst',
    'flooring Oak Brook',
    'flooring Wheaton IL',
    'flooring Villa Park',
    'flooring Addison IL',
    'flooring Downers Grove',
    'hardwood floor installation Chicagoland',
    'porcelain tile store Illinois',
  ],
  authors: [{ name: 'Smile Floors', url: BASE }],
  creator: 'Smile Floors',
  publisher: 'Smile Floors',
  category: 'Home Improvement',
  classification: 'Flooring Store',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: BASE,
    siteName: 'Smile Floors',
    title: 'Smile Floors | Premium Flooring Store in Lombard, IL',
    description:
      'Shop 4,000+ flooring products — hardwood, tile, LVP, laminate, mosaics & rugs. Local showroom in Lombard, IL. Serving all of Chicagoland.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smile Floors | Premium Flooring Store in Lombard, IL',
    description:
      'Shop 4,000+ flooring products — hardwood, tile, LVP, laminate, mosaics & rugs. Local showroom in Lombard, IL.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'US-IL',
    'geo.placename': 'Lombard, Illinois',
    'geo.position': '41.8698;-88.0163',
    'ICBM': '41.8698, -88.0163',
    'business:contact_data:street_address': '1218 S Garfield St',
    'business:contact_data:locality': 'Lombard',
    'business:contact_data:region': 'IL',
    'business:contact_data:postal_code': '60148',
    'business:contact_data:country_name': 'United States',
    'business:contact_data:phone_number': '+1-708-299-5189',
    'business:contact_data:email': 'Shaw@smilefloorsusa.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'HomeGoodsStore', 'Store'],
      '@id': `${BASE}/#business`,
      name: 'Smile Floors',
      alternateName: 'Smile Floors USA',
      description:
        'Smile Floors is Lombard\'s premier flooring destination offering 4,000+ products including hardwood, tile, luxury vinyl plank, laminate, mosaics, and area rugs. Serving homeowners, contractors, builders, hospitals, schools, and businesses across Chicagoland.',
      url: BASE,
      telephone: '+1-708-299-5189',
      email: 'Shaw@smilefloorsusa.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1218 S Garfield St',
        addressLocality: 'Lombard',
        addressRegion: 'IL',
        postalCode: '60148',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 41.8698,
        longitude: -88.0163,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
      ],
      priceRange: '$$',
      currenciesAccepted: 'USD',
      paymentAccepted: 'Cash, Credit Card, Debit Card, Check',
      areaServed: [
        { '@type': 'City', name: 'Lombard', sameAs: 'https://en.wikipedia.org/wiki/Lombard,_Illinois' },
        { '@type': 'City', name: 'Elmhurst' },
        { '@type': 'City', name: 'Oak Brook' },
        { '@type': 'City', name: 'Villa Park' },
        { '@type': 'City', name: 'Addison' },
        { '@type': 'City', name: 'Downers Grove' },
        { '@type': 'City', name: 'Westmont' },
        { '@type': 'City', name: 'Carol Stream' },
        { '@type': 'City', name: 'Wheaton' },
        { '@type': 'City', name: 'Glen Ellyn' },
        { '@type': 'City', name: 'Bloomingdale' },
        { '@type': 'City', name: 'Glendale Heights' },
        { '@type': 'AdministrativeArea', name: 'DuPage County' },
        { '@type': 'AdministrativeArea', name: 'Cook County' },
        { '@type': 'State', name: 'Illinois' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Flooring Products',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Hardwood Flooring', description: 'Solid and engineered hardwood floors in hundreds of species and stains.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Tile Flooring', description: 'Porcelain, ceramic, and natural stone tile for floors and walls.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Luxury Vinyl Plank (LVP)', description: 'Waterproof vinyl plank flooring for any room.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Laminate Flooring', description: 'High-definition realistic wood and stone laminate.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Mosaic Tile', description: 'Artisan mosaic patterns for backsplashes and feature floors.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Area Rugs', description: 'Curated area rugs in every size and style.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Flooring Accessories', description: 'Moldings, transitions, underlayment, and adhesives.' } },
        ],
      },
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      url: BASE,
      name: 'Smile Floors',
      description: 'Premium flooring store in Lombard, IL — 4,000+ products.',
      publisher: { '@id': `${BASE}/#business` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/shop?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <CartProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { borderRadius: '12px', background: '#1c1917', color: '#fff' },
              success: { iconTheme: { primary: '#f59e0b', secondary: '#fff' } },
            }}
          />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
