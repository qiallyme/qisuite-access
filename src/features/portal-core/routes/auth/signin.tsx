import { createFileRoute } from "@tanstack/react-router";
import SignInForm from "../../components/auth/SignInForm";
import { getPortalCoreConfig } from "../../lib/env";

export const Route = createFileRoute("/portal/auth/signin")({
  beforeLoad: () => {
    // Check if Portal Core is enabled
    if (!getPortalCoreConfig().enabled) {
      throw new Response("Not Found", { status: 404 });
    }
  },
  component: SignInPage,
});

function SignInPage() {
  return <SignInForm />;
}
