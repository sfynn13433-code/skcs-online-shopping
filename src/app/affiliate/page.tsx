export default function AffiliatePage() {
  const stores = [
    {
      name: "Amazon",
      description: "Global marketplace with millions of products.",
      link: "https://www.amazon.com/",
    },
    {
      name: "Takealot",
      description: "South Africa's largest online store.",
      link: "https://www.takealot.com/",
    },
    {
      name: "eBay",
      description: "Buy new and used items worldwide.",
      link: "https://www.ebay.com/",
    },
    {
      name: "AliExpress",
      description: "Affordable products shipped worldwide.",
      link: "https://www.aliexpress.com/",
    },
  ];

  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        SKCS Affiliate Stores
      </h1>

      <p style={{ marginBottom: "30px" }}>
        Browse our partner stores and shop directly through trusted online marketplaces.
      </p>

      <div style={{ display: "grid", gap: "20px" }}>
        {stores.map((store) => (
          <div
            key={store.name}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h2>{store.name}</h2>
            <p>{store.description}</p>

            <a
              href={store.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "8px 16px",
                background: "black",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              Visit Store
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}