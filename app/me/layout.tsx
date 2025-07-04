import React from "react";
import RouteProtection from "@/app/_components/RouteProtection";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteProtection protectFrom="unauthenticated">
      <div>{children}</div>
    </RouteProtection>
  );
}
