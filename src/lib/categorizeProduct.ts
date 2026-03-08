export function categorizeProduct(title: string) {
  const t = title.toLowerCase()

  if (
    t.includes("laptop") ||
    t.includes("phone") ||
    t.includes("tablet") ||
    t.includes("headphones") ||
    t.includes("camera") ||
    t.includes("smartwatch")
  ) {
    return "Electronics"
  }

  if (
    t.includes("gaming") ||
    t.includes("xbox") ||
    t.includes("playstation") ||
    t.includes("controller") ||
    t.includes("keyboard") ||
    t.includes("mouse")
  ) {
    return "Gaming"
  }

  if (
    t.includes("shirt") ||
    t.includes("jacket") ||
    t.includes("shoes") ||
    t.includes("watch") ||
    t.includes("sunglasses") ||
    t.includes("bag")
  ) {
    return "Fashion"
  }

  if (
    t.includes("kitchen") ||
    t.includes("lamp") ||
    t.includes("decor") ||
    t.includes("furniture") ||
    t.includes("home")
  ) {
    return "Home & Living"
  }

  if (
    t.includes("fitness") ||
    t.includes("gym") ||
    t.includes("dumbbell") ||
    t.includes("yoga") ||
    t.includes("running")
  ) {
    return "Health & Fitness"
  }

  if (
    t.includes("car") ||
    t.includes("dash") ||
    t.includes("automotive")
  ) {
    return "Automotive"
  }

  if (
    t.includes("tool") ||
    t.includes("drill") ||
    t.includes("screwdriver")
  ) {
    return "Tools & DIY"
  }

  if (
    t.includes("toy") ||
    t.includes("lego") ||
    t.includes("kids")
  ) {
    return "Toys & Kids"
  }

  if (
    t.includes("beauty") ||
    t.includes("skincare") ||
    t.includes("hair")
  ) {
    return "Beauty"
  }

  return "Other"
}