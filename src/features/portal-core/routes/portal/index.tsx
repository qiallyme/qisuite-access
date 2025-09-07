// Note: This file is prepared for TanStack Router integration
// Currently using React Router in the Portal Core repo
import { getPortalCoreConfig } from "../../lib/env";
import { useSupabaseSession } from "../../components/auth/SupabaseAuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// This component will be integrated with TanStack Router in the Template repo
export function PortalDashboard() {
  const { user, loading } = useSupabaseSession();
  const [email, setEmail] = useState<string>("");
  const [updates, setUpdates] = useState<Array<{ id: string; company: string; notes: string; created_at: string }>>([]);
  const [updatesLoading, setUpdatesLoading] = useState(true);
  const { featureClientUpdates } = getPortalCoreConfig();

  useEffect(() => {
    let active = true;
    (async () => {
      if (user) {
        setEmail(user.email ?? "");

        if (featureClientUpdates) {
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
      }
      if (active) setUpdatesLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user, featureClientUpdates]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Portal Core Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your Portal Core dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">User Info</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {email || "Loading..."}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Auth Provider</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Supabase
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Status</h3>
          <p className="text-sm text-green-600">
            Authenticated
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Features</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Portal Core Active
          </p>
        </div>
      </div>

      {featureClientUpdates && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Recent Client Updates</h3>
          {updatesLoading ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
          ) : updates.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No updates yet.</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {updates.map((u) => (
                <div key={u.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <div className="font-medium text-gray-800 dark:text-white">{u.company}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{u.notes}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(u.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
