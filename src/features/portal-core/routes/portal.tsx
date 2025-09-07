import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalLayout } from "../components/layout/PortalLayout";
import { getPortalCoreConfig } from "../lib/env";

export const Route = createFileRoute("/portal")({
  beforeLoad: () => {
    // Check if Portal Core is enabled
    if (!getPortalCoreConfig().enabled) {
      throw new Response("Not Found", { status: 404 });
    }
  },
  component: PortalPage,
});

function PortalPage() {
  return (
    <PortalLayout>
      <Outlet />
    </PortalLayout>
  );
}
