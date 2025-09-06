import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [updates, setUpdates] = useState<Array<{ id: string; company: string; notes: string; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);
  const enableClientUpdates = (import.meta.env.VITE_FEATURE_CLIENT_UPDATES as string) === "true";

  useEffect(() => {
    let active = true;
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!active) return;
      setEmail(session?.user?.email ?? "");

      if (enableClientUpdates) {
        try {
          const { data, error } = await supabase
            .from("client_updates")
            .select("id, company, notes, created_at")
            .order("created_at", { ascending: false })
            .limit(5);
          if (!error && active && Array.isArray(data)) setUpdates(data as any);
        } catch {
          // Silently ignore if table is missing in this environment
        }
      }
      if (active) setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [enableClientUpdates]);

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Welcome</div>
              <div className="text-base font-medium text-gray-800 dark:text-white">
                {email || "Loading session…"}
              </div>
            </div>
            <div className="flex gap-3">
              <a href="/client-update">
                <Button size="sm">New Client Update</Button>
              </a>
              <a href="/profile">
                <Button size="sm" variant="outline">
                  Profile
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>

        {enableClientUpdates && (
          <div className="col-span-12">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="font-medium text-gray-800 dark:text-white mb-3">Recent Client Updates</div>
              {loading ? (
                <div className="text-sm text-gray-500 dark:text-gray-400">Loading…</div>
              ) : updates.length === 0 ? (
                <div className="text-sm text-gray-500 dark:text-gray-400">No updates yet.</div>
              ) : (
                <ul className="grid gap-3 md:grid-cols-2">
                  {updates.map((u) => (
                    <li key={u.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                      <div className="font-medium text-gray-800 dark:text-white">{u.company}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{u.notes}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(u.created_at).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
