import { GroupedCsvRow } from "@/types/CsvFile";
import { useMemo } from "react";

export function useSelectedGroups(groupedCsvFile: GroupedCsvRow[]) {
  const selectedGroups = useMemo(() => {
    return groupedCsvFile.filter(group => 
      group.selected
    ).map(group => ({
      ...group
    }))
  }, [groupedCsvFile])

  return [selectedGroups]
}
