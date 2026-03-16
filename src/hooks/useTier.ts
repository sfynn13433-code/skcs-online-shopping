import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useTier() {
  const [tier, setTier] = useState<"normal" | "premium">("normal");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("profiles").select("tier").eq("id", user.id).single();
        const nextTier = (data?.tier as "normal" | "premium" | undefined) || "normal";
        setTier(nextTier);
      } else {
        setTier("normal");
      }
      setLoading(false);
    };
    load();
  }, []);

  return { tier, loading };
}
