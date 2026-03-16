export function isSkcsDeal(price: number, marketAverage: number) {
  return price < marketAverage * 0.8;
}

