import { Metadata } from 'next';

export function generateBaseMetadata(): Metadata {
  return {
    title: {
      default: 'SKCS Online Shopping - Premium Global Marketplace with AI',
      template: '%s | SKCS Online Shopping'
    },
    description: 'Compare products across Amazon, AliExpress, eBay, Walmart, and Takealot with AI-powered shopping assistant. Find the best deals instantly with SKCS Global Marketplace.',
    keywords: [
      'online shopping',
      'AI shopping assistant',
      'price comparison',
      'Amazon deals',
      'AliExpress',
      'eBay',
      'Walmart',
      'Takealot',
      'global marketplace',
      'best prices',
      'product comparison',
      'travel booking',
      'hotel deals',
      'flight deals'
    ],
    authors: [{ name: 'SKCS Online Shopping' }],
    creator: 'SKCS Online Shopping',
    publisher: 'SKCS Online Shopping',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://skcs-online-shopping.vercel.app'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://skcs-online-shopping.vercel.app',
      title: 'SKCS Online Shopping - Premium Global Marketplace with AI',
      description: 'Compare products across Amazon, AliExpress, eBay, Walmart, and Takealot with AI-powered shopping assistant. Find the best deals instantly.',
      siteName: 'SKCS Online Shopping',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'SKCS Online Shopping - AI-Powered Global Marketplace',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SKCS Online Shopping - Premium Global Marketplace with AI',
      description: 'Compare products across Amazon, AliExpress, eBay, Walmart, and Takealot with AI-powered shopping assistant. Find the best deals instantly.',
      images: ['/og-image.jpg'],
      creator: '@skcs_shopping',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  };
}

export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SKCS Online Shopping',
    description: 'Premium Global Marketplace with AI-powered shopping assistant',
    url: 'https://skcs-online-shopping.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://skcs-online-shopping.vercel.app/products?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'SKCS Online Shopping',
      url: 'https://skcs-online-shopping.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skcs-online-shopping.vercel.app/logo.png',
        width: 512,
        height: 512,
      },
      sameAs: [
        // Add social media URLs here
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English']
      }
    }
  };
}

export function generateProductStructuredData(products: any[]) {
  return products.map(product => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'SKCS Marketplace'
    },
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.currency || 'USD',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: product.marketplace
      }
    }
  }));
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url
    }))
  };
}
