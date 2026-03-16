// Basic contract for deal alerts (extend with cron/edge functions)
export interface DealAlert {
  userId: string;
  productId: string;
  thresholdPrice: number;
  email?: string;
  realtime?: boolean; // premium true
}

export async function createDealAlert(alert: DealAlert) {
  // placeholder: persist to Supabase or trigger edge function
  console.log("Deal alert registered", alert);
}

