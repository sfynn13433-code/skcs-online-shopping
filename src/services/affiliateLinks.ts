const affiliateTag = process.env.AMAZON_AFFILIATE_TAG || "";

export function ensureAmazonAffiliateTag(rawUrl: string): string {
  if (!rawUrl) return rawUrl;

  try {
    const normalized = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
    const url = new URL(normalized);
    const host = url.hostname.toLowerCase();

    if (host.includes("amazon.")) {
      const existingTag = url.searchParams.get("tag");
      if (!existingTag && affiliateTag) {
        url.searchParams.set("tag", affiliateTag);
      }
    }

    return url.toString();
  } catch (error) {
    console.warn("Failed to normalize affiliate URL", error);
    return rawUrl;
  }
}

export function buildTrackedAffiliateLink({
  url,
  title,
  store,
  productId,
}: {
  url: string;
  title?: string;
  store?: string;
  productId?: string | number;
}) {
  const safeUrl = ensureAmazonAffiliateTag(url);
  const params = new URLSearchParams({
    title: title || "Deal",
    store: store || "partner",
    url: safeUrl,
  });
  if (productId) params.set("productId", String(productId));

  return `/api/track-click?${params.toString()}`;
}
