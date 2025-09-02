import { getAllSliders } from "@/actions/admin/sliders";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSlider = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["sliders"],
    queryFn: () => getAllSliders(),
    select(data) {
      if (data?.success) {
        return data?.data;
      } else {
        toast.error(data?.message);
        return null;
      }
    },
  });
  return {
    data,
    isLoading,
  };
};
