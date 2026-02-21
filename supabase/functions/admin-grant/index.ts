import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ADMIN_PASSWORD = "AK5917906";

type Body = {
  traderId?: string;
  sumdep?: number | null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    console.warn("[admin-grant] invalid method", { method: req.method });
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  const pass = req.headers.get("x-admin-password") || "";
  if (pass !== ADMIN_PASSWORD) {
    console.warn("[admin-grant] unauthorized");
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const body = (await req.json().catch(() => ({}))) as Body;
  const traderId = (body.traderId || "").trim();

  if (!traderId) {
    console.warn("[admin-grant] missing traderId");
    return new Response("Missing traderId", { status: 400, headers: corsHeaders });
  }

  const sumdep =
    body.sumdep === null || body.sumdep === undefined ? null : Number(body.sumdep);

  console.log("[admin-grant] granting access", { traderId, sumdep });

  const { error } = await supabase.from("pp_traders").upsert(
    {
      trader_id: traderId,
      registered: true,
      ftd: true,
      sumdep: sumdep,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "trader_id" },
  );

  if (error) {
    console.error("[admin-grant] upsert error", { message: error.message });
    return new Response(error.message, { status: 500, headers: corsHeaders });
  }

  console.log("[admin-grant] OK", { traderId });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
});