import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KeyRound, UserCheck } from "lucide-react";

type AdminGrantPanelProps = {
  adminPassword: string;
};

export default function AdminGrantPanel({ adminPassword }: AdminGrantPanelProps) {
  const [traderId, setTraderId] = useState("");
  const [sumdep, setSumdep] = useState<string>("");
  const [sending, setSending] = useState(false);

  const parsedSumdep = useMemo(() => {
    const v = sumdep.trim();
    if (!v) return null;
    const n = Number(v);
    if (!Number.isFinite(n)) return null;
    return n;
  }, [sumdep]);

  async function grant() {
    const id = traderId.trim();
    if (!id) {
      showError("Введите Trader ID пользователя.");
      return;
    }

    if (!adminPassword.trim()) {
      showError("Нет admin-пароля в сессии. Перезайдите как админ.");
      return;
    }

    setSending(true);
    const { error } = await supabase.functions.invoke("admin-grant", {
      body: { traderId: id, sumdep: parsedSumdep },
      headers: {
        "x-admin-password": adminPassword,
      },
    });
    setSending(false);

    if (error) {
      console.error("[admin-grant-panel] invoke error", { message: error.message });
      showError("Не удалось выдать доступ. Попробуйте ещё раз.");
      return;
    }

    showSuccess(`Доступ выдан для Trader ID: ${id}`);
    setTraderId("");
    setSumdep("");
  }

  return (
    <Card className="rounded-2xl border-border bg-background/40 backdrop-blur">
      <CardContent className="space-y-3 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-border bg-card/60">
            <UserCheck className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-tight">Админ-панель</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Принудительно выдать доступ к сигналам по Trader ID (без постбека).
            </p>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
          <Input
            value={traderId}
            onChange={(e) => setTraderId(e.target.value)}
            placeholder="Trader ID пользователя"
            className="h-11 rounded-xl border-border bg-background/40"
          />
          <Input
            value={sumdep}
            onChange={(e) => setSumdep(e.target.value)}
            placeholder="sumdep (необязательно)"
            inputMode="decimal"
            className="h-11 rounded-xl border-border bg-background/40"
          />
          <Button
            onClick={grant}
            disabled={sending}
            className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <KeyRound className="h-4 w-4" />
            {sending ? "Выдаём..." : "Выдать доступ"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}