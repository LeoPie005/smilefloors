import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://smilefloors.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                                  lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/shop`,                        lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/contact`,                     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/collections/hardwood`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/collections/tile`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/collections/vinyl`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/collections/laminate`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/collections/mosaics`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/collections/rugs`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/collections/accessories`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
  ];
}
