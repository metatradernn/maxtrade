import * as React from "react";
import AssetBankCard from "@/components/ai-trade/AssetBankCard";
import { tradingAssetGroups, type TradingAssetCategory } from "@/lib/trading-assets";
import { cn } from "@/lib/utils";
import { BarChart3, Coins, Globe2, Layers3, TrendingUp } from "lucide-react";

const categoryMeta: Record<
  TradingAssetCategory,
  { icon: React.ComponentType<{ className?: string }>; tone: Parameters<typeof AssetBankCard>[0]["tone"] }
> = {
  "Валютные пары": { icon: Globe2, tone: "indigo" },
  "Криптовалюты": { icon: Coins, tone: "teal" },
  "Сырьевые товары": { icon: Layers3, tone: "amber" },
  "Акции": { icon: TrendingUp, tone: "rose" },
  "Индексы": { icon: BarChart3, tone: "slate" },
};

export default function AssetsPanel() {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <div className="space-y-7">
      {tradingAssetGroups.map((group) => {
        const meta = categoryMeta[group.title];
        const Icon = meta.icon;

        return (
          <section key={group.title} className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-2xl border border-border bg-card/60">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                    {group.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {group.items.length} активов
                  </p>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "grid gap-3",
                "sm:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {group.items.map((name) => {
                const key = `${group.title}:${name}`;
                return (
                  <AssetBankCard
                    key={key}
                    name={name}
                    tone={meta.tone}
                    selected={selected === key}
                    onSelect={() => setSelected(key)}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}