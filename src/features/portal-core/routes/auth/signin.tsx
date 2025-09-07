// Note: This file is prepared for TanStack Router integration
// Currently using React Router in the Portal Core repo
import SignInForm from "../../components/auth/SignInForm";
import { getPortalCoreConfig } from "../../lib/env";

// This component will be integrated with TanStack Router in the Template repo
export function PortalSignInPage() {
  // Check if Portal Core is enabled
  if (!getPortalCoreConfig().enabled) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portal Core Disabled</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            This feature is currently disabled.
          </p>
        </div>
      </div>
    );
  }

  return <SignInForm />;
}
