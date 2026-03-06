import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
              SKCS <span className="text-gray-900">Online Shopping</span>
            </Link>
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 max-w-2xl px-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-100 border border-transparent text-gray-900 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                placeholder="Search across global and local stores..."
              />
              <button className="absolute right-2 top-2 text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right side links */}
          <div className="flex items-center space-x-4">
            <Link href="/categories" className="text-gray-600 hover:text-blue-600 font-medium">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-600 hover:text-blue-600 font-medium">
              Daily Deals
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}