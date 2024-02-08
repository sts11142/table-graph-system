import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";

import { GroupedCsvRow } from "@/types/CsvFile";
import { useRadarChartData } from "@/hooks/useRadarChartData";

// setting ChartJS
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type GraphViewProps = {
  csvFile: GroupedCsvRow[];
};

export function GraphView({ csvFile }: GraphViewProps) {
  const [data, options] = useRadarChartData(csvFile[0]);

  return (
    <>
      <Box mt={10}>
        <Radar data={data} options={options} />
      </Box>
    </>
  );
}
