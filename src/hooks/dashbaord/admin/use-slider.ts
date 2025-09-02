import { getAllSliders } from "@/actions/admin/sliders";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type SliderStatus = "all" | "active" | "inactive";
type SortDirection = "asc" | "desc";

interface SliderFilter {
  search: string;
  status: SliderStatus;
  sort_by: string;
  sort_dir: SortDirection;
  per_page: number;
  page: number;
}

export const useSlider = () => {
  const [filterData, setFilterData] = useState<SliderFilter>({
    search: "",
    status: "all",
    sort_by: "id",
    sort_dir: "desc",
    per_page: 10,
    page: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["sliders", filterData],
    queryFn: () => getAllSliders(filterData),
    select(res) {
      if (res?.success) {
        return res.data;
      } else {
        toast.error(res?.message || "Failed to fetch sliders");
        return null;
      }
    },
  });

  return {
    data,
    isLoading,
    filterData,
    setFilterData,
  };
};
