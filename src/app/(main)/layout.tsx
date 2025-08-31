import { NavBar } from "@/components/global/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <main className="mt-15"> {children}</main>
    </div>
  );
}
