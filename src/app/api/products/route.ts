import { NextResponse } from 'next/server';

export async function GET() {
  
  // Simulated API Delay
  await new Promise((resolve) => setTimeout(resolve, 800)); 

  const simulatedAmazonData = [
    // --- AUDIO & HEADPHONES ---
    { id: 1, title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones", price: "R 6,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/61BGLYEN-xL._AC_SY300_SX300_QL70_FMwebp_.jpg", affiliateLink: "https://www.amazon.com/dp/B09XS7JWHH?tag=skcsshopping2-20" },
    { id: 2, title: "Apple AirPods Pro (2nd Generation)", price: "R 5,499", store: "Amazon", image: "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B0BDHWDR12?tag=skcsshopping2-20" },
    { id: 3, title: "Bose QuietComfort 45 Wireless Headphones", price: "R 6,499", store: "Takealot", image: "https://m.media-amazon.com/images/I/51JbsHSktkL._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/bose-quietcomfort-45-wireless-noise-cancelling-headphones-black/PLID73151740" },
    { id: 4, title: "JBL Flip 6 Portable Waterproof Bluetooth Speaker", price: "R 2,299", store: "Makro", image: "https://m.media-amazon.com/images/I/61ptzAQ7EBL._AC_SX679_.jpg", affiliateLink: "https://www.makro.co.za/electronics-computers/audio-video/speakers/portable-speakers/jbl-flip-6-portable-waterproof-speaker/p/000000000000441094_EA" },
    { id: 5, title: "Sennheiser Momentum 4 Wireless", price: "R 6,899", store: "Loot", image: "https://m.media-amazon.com/images/I/81cOza0NkpL._AC_SX679_.jpg", affiliateLink: "https://www.loot.co.za/product/sennheiser-momentum-4-wireless-noise-cancelling-headphones/mzkp-7711-g120" },
    { id: 6, title: "Marshall Emberton II Portable Speaker", price: "R 3,499", store: "Takealot", image: "https://m.media-amazon.com/images/I/81WbMhX-g7L._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/marshall-emberton-ii-portable-bluetooth-speaker-black-brass/PLID91129532" },

    // --- COMPUTERS & MONITORS ---
    { id: 7, title: "LG 27-Inch 4K UHD IPS Monitor with FreeSync", price: "R 5,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/71fh0CrVXyL._AC_SY300_SX300_QL70_FMwebp_.jpg", affiliateLink: "https://www.amazon.com/dp/B088G1PKKN?tag=skcsshopping2-20" },
    { id: 8, title: "Apple MacBook Air M2 (256GB, Midnight)", price: "R 22,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/719C6bJv8jL._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B0B3C76427?tag=skcsshopping2-20" },
    { id: 9, title: "Samsung 49-Inch Odyssey G9 Curved Gaming Monitor", price: "R 28,999", store: "Evetech", image: "https://m.media-amazon.com/images/I/81r8JbVFzcL._AC_SX679_.jpg", affiliateLink: "https://www.evetech.co.za/samsung-odyssey-g9-49-inch-curved-gaming-monitor/best-deal/9546.aspx" },
    { id: 10, title: "Logitech MX Master 3S Wireless Mouse", price: "R 2,499", store: "Amazon", image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B09HM94VDS?tag=skcsshopping2-20" },
    { id: 11, title: "Keychron K2 Wireless Mechanical Keyboard", price: "R 1,899", store: "Loot", image: "https://m.media-amazon.com/images/I/61vJbWq+Q8L._AC_SX679_.jpg", affiliateLink: "https://www.loot.co.za/product/keychron-k2-wireless-mechanical-keyboard/fkmj-7212-g1a0" },
    { id: 12, title: "Dell XPS 15 9520 Laptop (Core i7, 16GB RAM)", price: "R 39,999", store: "Incredible Connection", image: "https://m.media-amazon.com/images/I/71oGqHn32oL._AC_SX679_.jpg", affiliateLink: "https://www.incredible.co.za/dell-xps-15-9520-intel-core-i7-12700h-16gb-ram-512gb-ssd" },

    // --- PC COMPONENTS & STORAGE ---
    { id: 13, title: "ASUS ROG Strix GeForce RTX 4070 Ti 12GB", price: "R 19,999", store: "Evetech", image: "https://m.media-amazon.com/images/I/8100rN+L+IL._AC_SX679_.jpg", affiliateLink: "https://www.evetech.co.za/asus-rog-strix-rtx-4070-ti-12gb-gddr6x/best-deal/11012.aspx" },
    { id: 14, title: "AMD Ryzen 7 7800X3D Processor", price: "R 8,499", store: "Amazon", image: "https://m.media-amazon.com/images/I/51wB7-D3r-L._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B0BTZB7F88?tag=skcsshopping2-20" },
    { id: 15, title: "Samsung 990 PRO 2TB PCIe 4.0 NVMe SSD", price: "R 3,899", store: "Takealot", image: "https://m.media-amazon.com/images/I/81xUeKteS-L._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/samsung-990-pro-2tb-pcie-4-0-nvme-m-2-internal-ssd/PLID91428574" },
    { id: 16, title: "Corsair Vengeance RGB 32GB DDR5 RAM", price: "R 2,699", store: "Wootware", image: "https://m.media-amazon.com/images/I/71K0BihZ6NL._AC_SX679_.jpg", affiliateLink: "https://www.wootware.co.za/corsair-cmh32gx5m2b5200c40-vengeance-rgb-32gb-2x16gb-ddr5-5200mhz-cl40-1-25v-black-desktop-memory.html" },

    // --- GAMING ---
    { id: 17, title: "PlayStation 5 Console (Disc Edition)", price: "R 11,999", store: "Takealot", image: "https://m.media-amazon.com/images/I/51eOztNdCkL._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/playstation-5-console/PLID69399435" },
    { id: 18, title: "Xbox Series X 1TB Console", price: "R 12,499", store: "Makro", image: "https://m.media-amazon.com/images/I/51ojzlGGeXL._AC_SX679_.jpg", affiliateLink: "https://www.makro.co.za/electronics-computers/gaming/consoles/xbox-series-x-1tb-console/p/000000000000343360_EA" },
    { id: 19, title: "Nintendo Switch OLED Model", price: "R 7,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/51yJ+OqXiJL._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B098RKBCS7?tag=skcsshopping2-20" },
    { id: 20, title: "DualSense Wireless Controller - Midnight Black", price: "R 1,499", store: "Takealot", image: "https://m.media-amazon.com/images/I/61O9tWR6WDS._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/playstation-5-dualsense-wireless-controller-midnight-black/PLID72384661" },
    { id: 21, title: "Meta Quest 3 Advanced All-in-One VR Headset", price: "R 12,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/611ZzB8uKML._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B0CEG6Y69T?tag=skcsshopping2-20" },
    { id: 22, title: "Razer BlackShark V2 Pro Wireless Gaming Headset", price: "R 3,999", store: "Evetech", image: "https://m.media-amazon.com/images/I/71A9W1B13QL._AC_SX679_.jpg", affiliateLink: "https://www.evetech.co.za/razer-blackshark-v2-pro-wireless-gaming-headset/best-deal/10103.aspx" },

    // --- PHONES & WEARABLES ---
    { id: 23, title: "Apple iPhone 15 Pro (128GB, Natural Titanium)", price: "R 24,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/81SigpJN1KL._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B0CHXCFBTP?tag=skcsshopping2-20" },
    { id: 24, title: "Samsung Galaxy S24 Ultra (256GB)", price: "R 26,999", store: "Takealot", image: "https://m.media-amazon.com/images/I/71WcjsOVOmL._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/samsung-galaxy-s24-ultra-256gb-5g-dual-sim-titanium-gray/PLID94534444" },
    { id: 25, title: "Apple Watch Ultra 2", price: "R 17,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/81IhwX1L9bL._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B0CHX8B79B?tag=skcsshopping2-20" },
    { id: 26, title: "Garmin Fenix 7 Sapphire Solar Smartwatch", price: "R 15,499", store: "Loot", image: "https://m.media-amazon.com/images/I/51n0x5fXg7L._AC_SX679_.jpg", affiliateLink: "https://www.loot.co.za/product/garmin-fenix-7-sapphire-solar-edition/gkpj-7411-g120" },
    { id: 27, title: "Google Pixel 8 Pro (128GB)", price: "R 19,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/71lCyspM3mL._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B0CGTKVW8L?tag=skcsshopping2-20" },
    { id: 28, title: "Samsung Galaxy Watch 6 Classic", price: "R 7,499", store: "Makro", image: "https://m.media-amazon.com/images/I/61S-rV-tKSL._AC_SX679_.jpg", affiliateLink: "https://www.makro.co.za/electronics-computers/wearable-technology/smart-watches/samsung-galaxy-watch6-classic-47mm-black/p/000000000000466318_EA" },

    // --- TABLETS & E-READERS ---
    { id: 29, title: "Apple iPad Pro 11-inch (M2, Wi-Fi, 128GB)", price: "R 16,999", store: "Takealot", image: "https://m.media-amazon.com/images/I/81gC7frRJyL._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/apple-ipad-pro-11-inch-m2-wi-fi-128gb-space-grey/PLID91538354" },
    { id: 30, title: "Samsung Galaxy Tab S9 Ultra", price: "R 22,999", store: "Incredible Connection", image: "https://m.media-amazon.com/images/I/81Pz-vC+L3L._AC_SX679_.jpg", affiliateLink: "https://www.incredible.co.za/samsung-galaxy-tab-s9-ultra-5g-256gb-graphite" },
    { id: 31, title: "Kindle Paperwhite (16GB) Signature Edition", price: "R 3,499", store: "Amazon", image: "https://m.media-amazon.com/images/I/61X0IsBpDPL._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B09TMN58KL?tag=skcsshopping2-20" },
    { id: 32, title: "Apple Pencil (2nd Generation)", price: "R 2,899", store: "Takealot", image: "https://m.media-amazon.com/images/I/41S3ZKe9kRL._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/apple-pencil-2nd-generation/PLID53448496" },

    // --- CAMERAS & DRONES ---
    { id: 33, title: "DJI Mini 3 Pro Drone with Smart Controller", price: "R 16,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/61wF1fE6k9L._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B09WDBZ667?tag=skcsshopping2-20" },
    { id: 34, title: "GoPro HERO12 Black Action Camera", price: "R 8,499", store: "Takealot", image: "https://m.media-amazon.com/images/I/61m1Z2X3XDL._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/gopro-hero12-black/PLID93710744" },
    { id: 35, title: "Sony Alpha a7 IV Mirrorless Camera Body", price: "R 44,999", store: "Makro", image: "https://m.media-amazon.com/images/I/717w47xXpIL._AC_SX679_.jpg", affiliateLink: "https://www.makro.co.za/electronics-computers/cameras/dslr-mirrorless-cameras/sony-alpha-a7-iv-mirrorless-camera-body-only/p/000000000000438318_EA" },
    { id: 36, title: "DJI Osmo Pocket 3 Gimbal Camera", price: "R 10,999", store: "Loot", image: "https://m.media-amazon.com/images/I/61+tS1R-3zL._AC_SX679_.jpg", affiliateLink: "https://www.loot.co.za/product/dji-osmo-pocket-3/mvkp-7911-g120" },
    { id: 37, title: "Canon EOS R5 Mirrorless Camera", price: "R 69,999", store: "Kameraz", image: "https://m.media-amazon.com/images/I/71k1r-yYv3L._AC_SX679_.jpg", affiliateLink: "https://www.kameraz.com/products/canon-eos-r5-mirrorless-digital-camera-body-only" },

    // --- TVS & HOME THEATER ---
    { id: 38, title: "LG 65-Inch OLED C3 Series 4K Smart TV", price: "R 34,999", store: "Makro", image: "https://m.media-amazon.com/images/I/81h2uK+RqhL._AC_SX679_.jpg", affiliateLink: "https://www.makro.co.za/electronics-computers/audio-video/televisions/oled-tvs/lg-65-oled-4k-smart-tv-65c3/p/000000000000466014_EA" },
    { id: 39, title: "Samsung 55-Inch The Frame QLED 4K TV", price: "R 21,999", store: "Takealot", image: "https://m.media-amazon.com/images/I/71p0WfB6u8L._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/samsung-55-the-frame-qled-4k-smart-tv/PLID90134444" },
    { id: 40, title: "Sonos Arc Premium Smart Soundbar", price: "R 18,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/71FkEEx21TL._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B087C9N47G?tag=skcsshopping2-20" },
    { id: 41, title: "Apple TV 4K (Wi-Fi + Ethernet, 128GB)", price: "R 3,499", store: "Incredible Connection", image: "https://m.media-amazon.com/images/I/51wXF5tFfmL._AC_SX679_.jpg", affiliateLink: "https://www.incredible.co.za/apple-tv-4k-wi-fi-ethernet-128gb-storage-2022" },

    // --- SMART HOME & LIFESTYLE ---
    { id: 42, title: "Dyson V15 Detect Cordless Vacuum Cleaner", price: "R 14,999", store: "Makro", image: "https://m.media-amazon.com/images/I/51qB1DUSxZL._AC_SX679_.jpg", affiliateLink: "https://www.makro.co.za/home-appliances/cleaning-appliances/vacuum-cleaners/cordless-vacuum-cleaners/dyson-v15-detect-cordless-vacuum-cleaner/p/000000000000438319_EA" },
    { id: 43, title: "Ninja Air Fryer Max XL", price: "R 3,299", store: "Takealot", image: "https://m.media-amazon.com/images/I/71+8uTJEy6L._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/ninja-air-fryer-max-xl-5-2l-1750w-af160/PLID71934444" },
    { id: 44, title: "Philips Hue White & Color Ambiance Starter Kit", price: "R 3,899", store: "Loot", image: "https://m.media-amazon.com/images/I/61lB9y7uC9L._AC_SX679_.jpg", affiliateLink: "https://www.loot.co.za/product/philips-hue-white-color-ambiance-starter-kit/rskp-7611-g120" },
    { id: 45, title: "Nespresso Vertuo Next Coffee Machine", price: "R 2,999", store: "Takealot", image: "https://m.media-amazon.com/images/I/61U08l10qAL._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/nespresso-vertuo-next-coffee-machine-by-magimix-grey/PLID70534444" },
    { id: 46, title: "Roborock S8 Pro Ultra Robot Vacuum", price: "R 24,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/71b2V5ZXZeL._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B0BVB89W8V?tag=skcsshopping2-20" },
    { id: 47, title: "Ring Video Doorbell Plus", price: "R 3,499", store: "Makro", image: "https://m.media-amazon.com/images/I/61kM2oQoUGL._AC_SX679_.jpg", affiliateLink: "https://www.makro.co.za/home-appliances/security-safety/smart-security/smart-doorbells/ring-video-doorbell-plus/p/000000000000466319_EA" },

    // --- OUTDOOR & GADGETS ---
    { id: 48, title: "Segway Ninebot MAX Electric Kick Scooter", price: "R 14,999", store: "Takealot", image: "https://m.media-amazon.com/images/I/61nQ5z+kRKL._AC_SX679_.jpg", affiliateLink: "https://www.takealot.com/segway-ninebot-kickscooter-max-g30/PLID69134444" },
    { id: 49, title: "Jackery Explorer 500 Portable Power Station", price: "R 9,999", store: "Amazon", image: "https://m.media-amazon.com/images/I/71oD4N-E2tL._AC_SX679_.jpg", affiliateLink: "https://www.amazon.com/dp/B07SM5HBK1?tag=skcsshopping2-20" },
    { id: 50, title: "YETI Hopper Flip 12 Portable Cooler", price: "R 4,999", store: "Loot", image: "https://m.media-amazon.com/images/I/61r59D2c-uL._AC_SX679_.jpg", affiliateLink: "https://www.loot.co.za/product/yeti-hopper-flip-12-portable-cooler/vjkp-7811-g120" }
  ];

  return NextResponse.json(simulatedAmazonData);
}