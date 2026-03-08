import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const store = searchParams.get('store');
  const url = searchParams.get('url');

  // Default fallback URL (homepage)
  const fallbackUrl = new URL('/', request.url).toString();

  // Always try to log the click, even if parameters are missing or URL is invalid
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Insert into the correct table: click_analytics
    await supabase.from('click_analytics').insert({
      product_title: title || 'Unknown',
      store_name: store || 'Unknown',
      original_link: url || fallbackUrl,
      clicked_at: new Date(), // will be converted to ISO string
    });
  } catch (err) {
    // Log error but continue – we still want to redirect the user
    console.error('Failed to log click to Supabase:', err);
  }

  // Determine where to redirect
  let redirectUrl = fallbackUrl;

  if (url && url !== '#') {
    redirectUrl = url;
    // Ensure protocol (if missing, prepend https://)
    if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
      redirectUrl = 'https://' + redirectUrl;
    }
  }

  // Perform the redirect (302 temporary redirect)
  return NextResponse.redirect(redirectUrl, 302);
}