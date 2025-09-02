import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Sliders - Admin Settings",
  description: "Manage homepage sliders from the admin settings.",
};

const Breadcrumb = [
  { name: "Dashboard", href: "/admin/dashboard", current: false },
  { name: "Sliders", href: "/admin/settings/sliders", current: true },
];
export default function SlidersPage() {
  return (
    <Card>
      <CardHeader>
        <DashboardHeader
          title="Slider"
          subTitle="Control homepage slider from here"
          breadcrumb={Breadcrumb}
        />
      </CardHeader>
      <CardContent>{/* Slider Data Table */}</CardContent>
    </Card>
  );
}
