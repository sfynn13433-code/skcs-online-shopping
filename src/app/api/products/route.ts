import { NextResponse } from 'next/server';

// Helper to create a reliable inline placeholder image (no external requests)
function generatePlaceholder(text: string, color: string): string {
  const fillColor = color === 'lime' ? '%2300ff00' : '%23ffffff';
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='28' fill='${fillColor}' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
}

export async function GET() {
  
  // Simulated API Delay
  await new Promise((resolve) => setTimeout(resolve, 800)); 

  const simulatedProducts = [
    // ========== AMAZON PRODUCTS (IDs 1–16) – your provided images ==========
    { 
      id: 1, 
      title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones", 
      price: "R 6,999", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/61BGLYEN-xL._AC_SY300_SX300_QL70_FMwebp_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B09XS7JWHH?tag=skcsshopping2-20" 
    },
    { 
      id: 2, 
      title: "Apple AirPods Pro (2nd Generation)", 
      price: "R 5,499", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SX342_SY445_QL70_FMwebp_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B0BDHWDR12?tag=skcsshopping2-20" 
    },
    { 
      id: 3, 
      title: "LG 27-Inch 4K UHD IPS Monitor", 
      price: "R 5,999", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/71fh0CrVXyL._AC_SY300_SX300_QL70_FMwebp_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B088G1PKKN?tag=skcsshopping2-20" 
    },
    { 
      id: 4, 
      title: "Apple MacBook Air M2 (256GB, Midnight)", 
      price: "R 22,999", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/71sQdN4lfYL._AC_UY327_FMwebp_QL65_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B0B3C76427?tag=skcsshopping2-20" 
    },
    { 
      id: 5, 
      title: "Logitech MX Master 3S Wireless Mouse", 
      price: "R 2,499", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/61+OT7FPABL._AC_SY300_SX300_QL70_FMwebp_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B09HM94VDS?tag=skcsshopping2-20" 
    },
    { 
      id: 6, 
      title: "AMD Ryzen 7 7800X3D Processor", 
      price: "R 8,499", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/51HqC0rU9HL._AC_SL1500_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B0BTZB7F88?tag=skcsshopping2-20" 
    },
    { 
      id: 7, 
      title: "Nintendo Switch OLED Model", 
      price: "R 7,999", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/61nqNujSF2L._AC_UY327_FMwebp_QL65_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B098RKBCS7?tag=skcsshopping2-20" 
    },
    { 
      id: 8, 
      title: "Meta Quest 3 Advanced VR Headset", 
      price: "R 12,999", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/51GB5K1U9sL._AC_UY327_FMwebp_QL65_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B0CEG6Y69T?tag=skcsshopping2-20" 
    },
    { 
      id: 9, 
      title: "Apple iPhone 15 Pro (128GB, Natural Titanium)", 
      price: "R 24,999", 
      store: "Amazon", 
      image: "https://images-na.ssl-images-amazon.com/images/I/51PtFHUPjBL._AC_UL165_SR165,165_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B0CHXCFBTP?tag=skcsshopping2-20" 
    },
    { 
      id: 10, 
      title: "Apple Watch Ultra 2", 
      price: "R 17,999", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/61i3ax+W1sL._AC_SX466_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B0CHX8B79B?tag=skcsshopping2-20" 
    },
    { 
      id: 11, 
      title: "Google Pixel 8 Pro (128GB)", 
      price: "R 19,999", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/712n8i9spML._AC_UY327_FMwebp_QL65_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B0CGTKVW8L?tag=skcsshopping2-20" 
    },
    { 
      id: 12, 
      title: "Kindle Paperwhite Signature Edition", 
      price: "R 3,499", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/61BlQU1sxVL._AC_SX679_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B09TMN58KL?tag=skcsshopping2-20" 
    },
    { 
      id: 13, 
      title: "DJI Mini 3 Pro Drone with Smart Controller", 
      price: "R 16,999", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/51QIRyL+TKL._AC_UL480_FMwebp_QL65_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B09WDBZ667?tag=skcsshopping2-20" 
    },
    { 
      id: 14, 
      title: "Sonos Arc Premium Smart Soundbar", 
      price: "R 18,999", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/51kIR1gKWYL._AC_SL1500_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B087C9N47G?tag=skcsshopping2-20" 
    },
    { 
      id: 15, 
      title: "Roborock S8 Pro Ultra Robot Vacuum", 
      price: "R 24,999", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/619xjRMbkSL._AC_SY300_SX300_QL70_FMwebp_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B0BVB89W8V?tag=skcsshopping2-20" 
    },
    { 
      id: 16, 
      title: "Jackery Explorer 500 Power Station", 
      price: "R 9,999", 
      store: "Amazon", 
      image: "https://m.media-amazon.com/images/I/71L+AGwEr7L._AC_SL1500_.jpg", 
      affiliateLink: "https://www.amazon.com/dp/B07SM5HBK1?tag=skcsshopping2-20" 
    },

    // ========== EVETECH PRODUCTS (IDs 17–19) ==========
    // No image provided for the monitor and GPU → using placeholders
    { 
      id: 17, 
      title: "Samsung 49-Inch Odyssey G9 Curved Gaming Monitor", 
      price: "R 28,999", 
      store: "Evetech", 
      image: generatePlaceholder("Odyssey G9", "lime"), 
      affiliateLink: "https://www.evetech.co.za/samsung-odyssey-g9-49-inch-curved-gaming-monitor/best-deal/9546.aspx" 
    },
    { 
      id: 18, 
      title: "ASUS ROG Strix RTX 4070 Ti 12GB", 
      price: "R 19,999", 
      store: "Evetech", 
      image: generatePlaceholder("RTX 4070 Ti", "lime"), 
      affiliateLink: "https://www.evetech.co.za/asus-rog-strix-rtx-4070-ti-12gb-gddr6x/best-deal/11012.aspx" 
    },
    { 
      id: 19, 
      title: "Razer BlackShark V2 Pro Wireless Headset", 
      price: "R 3,999", 
      store: "Evetech", 
      image: "https://img.evetech.co.za/repository/ProductImages/razer-blackshark-v-2-pro-wireless-gaming-headset-main-1600px-v1.webp?width=600", 
      affiliateLink: "https://www.evetech.co.za/razer-blackshark-v2-pro-wireless-gaming-headset/best-deal/10103.aspx" 
    },

    // ========== WOOTWARE PRODUCT (ID 20) ==========
    { 
      id: 20, 
      title: "Corsair Vengeance RGB 32GB DDR5 RAM", 
      price: "R 2,699", 
      store: "Wootware", 
      image: "https://www.wootware.co.za/media/catalog/product/cache/1/image/512x512/9df78eab33525d08d6e5fb8d27136e95/v/e/vengeance_d5_rgb_black_1_.jpg", 
      affiliateLink: "https://www.wootware.co.za/corsair-cmh32gx5m2b5200c40-vengeance-rgb-32gb-2x16gb-ddr5-5200mhz-cl40-1-25v-black-desktop-memory.html" 
    },

    // ========== ALIEXPRESS PRODUCTS (IDs 21–40) – your 20 images in order ==========
    { 
      id: 21, 
      title: "Baseus 65W GaN USB C Charger Station", 
      price: "R 599", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S2695d7d05a824376aefc42c5d609718aQ.jpg_960x960q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c3ElbFoT" 
    },
    { 
      id: 22, 
      title: "Xiaomi Mi Smart Band 8 Tracker", 
      price: "R 499", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S42fb62614f2c42ff9473740185a5e32fD.jpg_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c39QWNkL" 
    },
    { 
      id: 23, 
      title: "Elegant Minimalist Quartz Watch Men", 
      price: "R 899", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S3d7b23368b604395b3d7d7b64cdb4ac3b.jpg", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c4PyOiIx" 
    },
    { 
      id: 24, 
      title: "Wireless Earbuds Bluetooth 5.3", 
      price: "R 299", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S1a13c5f34e424bca82d89e33fee2d2e57.jpg_960x960q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c2RF8vmf" 
    },
    { 
      id: 25, 
      title: "3D Holographic Projector Fan", 
      price: "R 1,299", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S8fbeeb79d1354b2aa57abd592fb2d98bm.jpg_960x960q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c4axtOe3" 
    },
    { 
      id: 26, 
      title: "Smart Watch for Men Women", 
      price: "R 799", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S9b8f942309294b888410b9fb339dc2efg.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c3rmPpKn" 
    },
    { 
      id: 27, 
      title: "Portable Bluetooth Speaker Waterproof", 
      price: "R 449", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S8c11d84865ae48a0be8e3e10a146818aX.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c3a07dG3" 
    },
    { 
      id: 28, 
      title: "Magnetic Wireless Power Bank 10000mAh", 
      price: "R 699", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S1a61ee7e38cb40e9861a47f0089dc8bfI.jpg_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c3ElbFoT" 
    },
    { 
      id: 29, 
      title: "LED Desk Lamp with Wireless Charger", 
      price: "R 549", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S99a1c9dc128d45ceb45aadd7e726e244S.jpg_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c39QWNkL" 
    },
    { 
      id: 30, 
      title: "Mechanical Gaming Keyboard RGB", 
      price: "R 899", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/Sf1e62876621b47c3af37e57aaba430bcS.jpg", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c4PyOiIx" 
    },
    { 
      id: 31, 
      title: "Webcam 1080P with Microphone", 
      price: "R 399", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S01d64ca1b21a44a9b54b277734730002M.jpg_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c2RF8vmf" 
    },
    { 
      id: 32, 
      title: "USB C Hub Multiport Adapter", 
      price: "R 329", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/Sed077bb86de04cd9a81ef806a74967dcg.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c4axtOe3" 
    },
    { 
      id: 33, 
      title: "Noise Cancelling Earbuds", 
      price: "R 499", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S4483834cbfc7475cb692d836399b39eaj.png_220x220.png_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c3rmPpKn" 
    },
    { 
      id: 34, 
      title: "Smart Home Security Camera", 
      price: "R 699", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S48a9a81e5d594898aef50146ff729730y.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c3a07dG3" 
    },
    { 
      id: 35, 
      title: "Fitness Tracker Smart Band", 
      price: "R 379", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S9cb61b06e2e14ba39fee082bd8840c2e6.jpg", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c3ElbFoT" 
    },
    { 
      id: 36, 
      title: "Portable SSD 1TB External Drive", 
      price: "R 1,199", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S120caf8c6c264cd6a213b5d9c630e9e95.jpg_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c39QWNkL" 
    },
    { 
      id: 37, 
      title: "Mini Projector 4K Support", 
      price: "R 2,499", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S82d13d31c0c042409deec6f884643969f.jpg", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c4PyOiIx" 
    },
    { 
      id: 38, 
      title: "Wireless Gaming Mouse", 
      price: "R 289", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S56b58b5296844cc69c2f3391ce1a1af5W.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c2RF8vmf" 
    },
    { 
      id: 39, 
      title: "Laptop Cooling Pad", 
      price: "R 449", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S76554bf5a05842bca1e985a01697148dG.jpg?has_lang=1&ver=1_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c4axtOe3" 
    },
    { 
      id: 40, 
      title: "Phone Gimbal Stabilizer", 
      price: "R 999", 
      store: "AliExpress", 
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S400b3d3450c746ee8670b56d57e77b24D.jpg?has_lang=1&ver=2_220x220q75.jpg_.avif", 
      affiliateLink: "https://s.click.aliexpress.com/e/_c3rmPpKn" 
    }
  ];

  return NextResponse.json(simulatedProducts);
}