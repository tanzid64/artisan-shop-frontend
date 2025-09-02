import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

interface SortColumnHeaderProps {
  title: string;
  name: string;
  filterData: {
    sort_by: string;
    sort_dir: "asc" | "desc";
  };
}
export const SortColumnHeader = ({
  filterData,
  title,
  name,
}: SortColumnHeaderProps) => {
  // 🔹 Utility for rendering dynamic arrows
  const renderSortIcon = (column: string) => {
    if (filterData.sort_by !== column)
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return filterData.sort_dir === "desc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };
  return (
    <Button variant="sort">
      {title}
      {renderSortIcon(name)}
    </Button>
  );
};
