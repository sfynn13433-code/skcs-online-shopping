import os
import requests

# Paste your Supabase URL and SERVICE ROLE KEY here
SUPABASE_URL = "https://your-project-id.supabase.co"
SUPABASE_KEY = "your-service-role-key-here"

# The 50 products list (truncated for display, but full in the actual script)
products = [
    {"title": "Samsung 65-inch QLED 4K TV", "brand": "Samsung", "price": 1299.99, "category": "Electronics", "description": "Crystal clear 4K resolution with HDR10+", "image": "https://m.media-amazon.com/images/I/71LJJ67A73L._AC_SL1500_.jpg", "product_url": "https://amazon.com"},
    {"title": "Sony PlayStation 5 Console", "brand": "Sony", "price": 499.00, "category": "Gaming", "description": "Ultra-high speed SSD and immersive dualsense controller", "image": "https://m.media-amazon.com/images/I/51051HiS9OL._SL1500_.jpg", "product_url": "https://amazon.com"},
    {"title": "Apple MacBook Air M3", "brand": "Apple", "price": 1099.00, "category": "Computers", "description": "Thin, light, and powerful with the M3 chip", "image": "https://m.media-amazon.com/images/I/71ItM95NE8L._AC_SL1500_.jpg", "product_url": "https://amazon.com"},
    # ... Imagine 47 more products here ...
]

def populate():
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    
    url = f"{SUPABASE_URL}/rest/v1/products"
    
    print(f"🚀 Injecting {len(products)} products into SKCS Database...")
    response = requests.post(url, headers=headers, json=products)
    
    if response.status_code in [201, 200]:
        print("✅ Success! Your database is now populated.")
    else:
        print(f"❌ Failed: {response.text}")

if __name__ == "__main__":
    populate()