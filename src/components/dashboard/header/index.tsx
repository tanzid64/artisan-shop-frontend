import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";

interface DashboardHeaderProps {
  title: string;
  subTitle?: string;
  breadcrumb?: { name: string; href: string; current: boolean }[];
}
export const DashboardHeader = ({
  title,
  subTitle,
  breadcrumb,
}: DashboardHeaderProps) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      <div className="">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{subTitle}</p>
      </div>
      {/* Breadcrumb */}
      {breadcrumb && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className={cn(
                      item.current && "text-blue-500 font-semibold"
                    )}
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </header>
  );
};
