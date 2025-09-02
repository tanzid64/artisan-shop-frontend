import { Input } from "@/components/ui/input";
import { ISliderFilter } from "@/hooks/dashbaord/admin/use-slider";
import debounce from "lodash.debounce";
import React, { useCallback, useMemo } from "react";

export const SliderFilter = ({
  setFilterData,
}: {
  setFilterData: React.Dispatch<React.SetStateAction<ISliderFilter>>;
}) => {
  // create a debounced version of setFilterData
  const debouncedSetFilter = useMemo(
    () =>
      debounce((value: string) => {
        setFilterData((prev) => ({
          ...prev,
          search: value,
          page: 1,
        }));
      }, 500), // delay in ms
    [setFilterData]
  );

  // cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [debouncedSetFilter]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetFilter(e.target.value);
    },
    [debouncedSetFilter]
  );

  return (
    <div className="space-y-4 mb-4">
      <h2>Filters</h2>
      <div>
        <Input type="text" placeholder="Search..." onChange={handleSearch} />
      </div>
    </div>
  );
};
