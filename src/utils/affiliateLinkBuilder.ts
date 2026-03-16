export interface AffiliateConfig {
  baseUrl: string;
  affiliateId: string;
  source?: string;
  trackingParams?: Record<string, string>;
}

export interface MarketplaceConfig {
  name: string;
  baseUrl: string;
  affiliateId: string;
  trackingParams?: Record<string, string>;
}

// Marketplace configurations
export const marketplaceConfigs: Record<string, MarketplaceConfig> = {
  amazon: {
    name: 'Amazon',
    baseUrl: 'https://www.amazon.com',
    affiliateId: 'skcsshopping2-20',
    trackingParams: {
      tag: 'skcsshopping2-20',
    },
  },
  aliexpress: {
    name: 'AliExpress',
    baseUrl: 'https://www.aliexpress.com',
    affiliateId: 'skcs',
    trackingParams: {
      aff_platform: 'skcs',
      aff_trace_key: 'skcs',
    },
  },
  ebay: {
    name: 'eBay',
    baseUrl: 'https://www.ebay.com',
    affiliateId: 'skcs',
    trackingParams: {
      mkcid: '1',
      mkrid: '711-53200-19255-0',
      siteid: '0',
      campid: '5338288536',
      customid: 'skcs',
      toolid: '20008',
    },
  },
  walmart: {
    name: 'Walmart',
    baseUrl: 'https://www.walmart.com',
    affiliateId: 'skcs',
    trackingParams: {
      u1: 'skcs',
      u2: 'skcs',
    },
  },
  takealot: {
    name: 'Takealot',
    baseUrl: 'https://www.takealot.com',
    affiliateId: 'skcs',
    trackingParams: {
      aff: 'skcs',
    },
  },
  booking: {
    name: 'Booking.com',
    baseUrl: 'https://www.booking.com',
    affiliateId: 'skcs',
    trackingParams: {
      aid: 'skcs',
      label: 'skcs',
    },
  },
  expedia: {
    name: 'Expedia',
    baseUrl: 'https://www.expedia.com',
    affiliateId: 'skcs',
    trackingParams: {
      tag: 'skcs',
    },
  },
  sovrn: {
    name: 'Sovrn',
    baseUrl: 'https://sovrn.co',
    affiliateId: 'skcs',
    trackingParams: {
      userId: 'skcs',
    },
  },
};

/**
 * Builds an affiliate link with tracking parameters
 */
export function buildAffiliateLink(
  baseUrl: string,
  affiliateId: string,
  source?: string,
  additionalParams?: Record<string, string>
): string {
  const url = new URL(baseUrl);
  
  // Add affiliate ID
  if (affiliateId) {
    url.searchParams.set('affiliateId', affiliateId);
  }
  
  // Add source tracking
  if (source) {
    url.searchParams.set('source', source);
  }
  
  // Add additional parameters
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  
  return url.toString();
}

/**
 * Builds a marketplace-specific affiliate link
 */
export function buildMarketplaceLink(
  marketplace: keyof typeof marketplaceConfigs,
  productPath?: string,
  additionalParams?: Record<string, string>
): string {
  const config = marketplaceConfigs[marketplace];
  if (!config) {
    throw new Error(`Marketplace '${marketplace}' not configured`);
  }
  
  const baseUrl = productPath ? `${config.baseUrl}${productPath}` : config.baseUrl;
  const trackingParams = { ...config.trackingParams, ...additionalParams };
  
  return buildAffiliateLink(baseUrl, config.affiliateId, 'skcs-platform', trackingParams);
}

/**
 * Builds an Amazon affiliate link
 */
export function buildAmazonLink(searchQuery?: string, category?: string): string {
  const config = marketplaceConfigs.amazon;
  const path = searchQuery ? `/s?k=${encodeURIComponent(searchQuery)}` : '/bestsellers';
  const params: Record<string, string> = { ...config.trackingParams };
  
  if (category) {
    params['i'] = category;
  }
  
  return buildMarketplaceLink('amazon', path, params);
}

/**
 * Builds an AliExpress affiliate link
 */
export function buildAliExpressLink(category?: string, campaign?: string): string {
  const config = marketplaceConfigs.aliexpress;
  let path = '';
  const params: Record<string, string> = { ...config.trackingParams };
  
  if (campaign) {
    path = `/e/${campaign}`;
  } else if (category) {
    path = `/category/${category}`;
  } else {
    path = '/e/_c3ElbFoT'; // Default high commission link
  }
  
  return buildMarketplaceLink('aliexpress', path, params);
}

/**
 * Validates if a URL is from a supported marketplace
 */
export function isSupportedMarketplace(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return Object.values(marketplaceConfigs).some(config => 
      urlObj.hostname.includes(config.baseUrl.replace('https://www.', '').replace('https://', ''))
    );
  } catch {
    return false;
  }
}

/**
 * Extracts marketplace from URL
 */
export function extractMarketplace(url: string): keyof typeof marketplaceConfigs | null {
  try {
    const urlObj = new URL(url);
    for (const [key, config] of Object.entries(marketplaceConfigs)) {
      if (urlObj.hostname.includes(config.baseUrl.replace('https://www.', '').replace('https://', ''))) {
        return key as keyof typeof marketplaceConfigs;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Converts any marketplace URL to affiliate link
 */
export function convertToAffiliateLink(url: string, source?: string): string {
  const marketplace = extractMarketplace(url);
  if (!marketplace) {
    return url; // Return original URL if not supported
  }
  
  const config = marketplaceConfigs[marketplace];
  const urlObj = new URL(url);
  
  // Build new URL with affiliate parameters
  const params = new URLSearchParams();
  
  // Add existing parameters
  urlObj.searchParams.forEach((value, key) => {
    params.set(key, value);
  });
  
  // Add affiliate parameters
  if (config.trackingParams) {
    Object.entries(config.trackingParams).forEach(([key, value]) => {
      params.set(key, value);
    });
  }
  
  // Add source tracking
  if (source) {
    params.set('source', source);
  }
  
  // Reconstruct URL
  const newUrl = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
  const paramString = params.toString();
  return paramString ? `${newUrl}?${paramString}` : newUrl;
}
