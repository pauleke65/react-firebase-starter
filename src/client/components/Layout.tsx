import React from "react";

import { Toaster } from "sonner";

function Layout({ children }: { children: any }) {
  return (
    <div className="h-screen overflow-hidden bg-gray-600 dark:bg-background flex flex-col justify-center">
      {children}
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default Layout;
