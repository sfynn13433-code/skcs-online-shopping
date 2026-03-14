// app/search/page.tsx
import { Suspense } from 'react';
import SearchResults from './SearchResults'; // We'll create this next

export default function SearchPage() {
  return (
    // You can keep any static layout or headers here
    <div className="p-6">
      <Suspense fallback={<div className="text-center py-10">Loading search results…</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}