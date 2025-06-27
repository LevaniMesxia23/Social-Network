import RouteProtection from "@/app/_components/RouteProtection";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteProtection protectFrom="authenticated" redirectTo="/me">
      {children}
    </RouteProtection>
  );
}
