import { getAllSliders } from "@/actions/admin/sliders";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type SliderStatus = "all" | "active" | "inactive";
type SortDirection = "asc" | "desc";

export interface ISliderFilter {
  search: string;
  status: SliderStatus;
  sort_by: string;
  sort_dir: SortDirection;
  per_page: number;
  page: number;
}

export const useSlider = () => {
  const [filterData, setFilterData] = useState<ISliderFilter>({
    search: "",
    status: "all",
    sort_by: "id",
    sort_dir: "desc",
    per_page: 15,
    page: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["sliders", filterData],
    queryFn: () => getAllSliders(filterData),
    retry: false,
    select(res) {
      if (res?.success) {
        return res.data;
      }
      return null;
    },
  });
  return {
    data,
    isLoading,
    filterData,
    setFilterData,
  };
};
