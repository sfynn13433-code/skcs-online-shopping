import type { Product } from "@/lib/models/product";

const mockProducts: Product[] = [
  {
    id: "mock_electronics_1",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    category: "Electronics",
    image: "🎧",
    rating: 4.8,
    reviews: 12450,
    bestPrice: 341.0,
    history: [399, 389, 379, 350, 341],
    vendors: [
      { name: "AliExpress", price: 341.0, stock: "In Stock", link: "https://aliexpress.com/item/123" },
      { name: "eBay", price: 352.0, stock: "Low Stock", link: "https://ebay.com/itm/123" },
      { name: "Amazon", price: 379.0, stock: "In Stock", link: "https://www.amazon.com/dp/B0XXXXXXX?tag=skcsshopping2-20" },
      { name: "Takealot", price: 385.5, stock: "In Stock", link: "https://takealot.com/sony/123" },
    ],
  },
  {
    id: "mock_electronics_2",
    title: "Apple MacBook Air M3 (15-inch, 16GB RAM, 512GB)",
    category: "Electronics",
    image: "💻",
    rating: 4.9,
    reviews: 8320,
    bestPrice: 1249.0,
    history: [1499, 1499, 1399, 1299, 1249],
    vendors: [
      { name: "Amazon", price: 1249.0, stock: "In Stock", link: "https://www.amazon.com/dp/B0YYYYYYY?tag=skcsshopping2-20" },
      { name: "B&H Photo", price: 1299.0, stock: "In Stock", link: "https://bhphoto.com/mac/456" },
      { name: "Best Buy", price: 1349.0, stock: "Out of Stock", link: "https://bestbuy.com/mac/456" },
    ],
  },
  {
    id: "mock_travel_1",
    title: "7 Nights - Rixos The Palm Hotel & Suites, Dubai",
    category: "Travel",
    image: "🌴",
    rating: 4.7,
    reviews: 3100,
    bestPrice: 1850.0,
    history: [2200, 2100, 1950, 2050, 1850],
    vendors: [
      { name: "Booking.com", price: 1850.0, stock: "Available", link: "https://booking.com/hotel/789" },
      { name: "Agoda", price: 1890.0, stock: "Available", link: "https://agoda.com/hotel/789" },
      { name: "Expedia", price: 1920.0, stock: "2 Rooms Left", link: "https://expedia.com/hotel/789" },
    ],
  },
  {
    id: "mock_fashion_1",
    title: "Nike Air Max 90 Men's Sneakers",
    category: "Fashion",
    image: "👟",
    rating: 4.6,
    reviews: 5421,
    bestPrice: 99.99,
    history: [129.99, 119.99, 109.99, 104.99, 99.99],
    vendors: [
      { name: "Nike", price: 109.99, stock: "In Stock", link: "https://www.nike.com/air-max-90" },
      { name: "Amazon", price: 99.99, stock: "In Stock", link: "https://www.amazon.com/s?k=air+max+90&tag=skcsshopping2-20" },
      { name: "eBay", price: 104.99, stock: "In Stock", link: "https://www.ebay.com/sch/i.html?_nkw=air+max+90" },
    ],
  },
];

export async function mockConnector(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return mockProducts;

  return mockProducts.filter((product) => product.title.toLowerCase().includes(q));
}
