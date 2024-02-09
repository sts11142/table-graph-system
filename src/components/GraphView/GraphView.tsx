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
import { TypedChartComponent } from "node_modules/react-chartjs-2/dist/types";

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
  selectedRow: GroupedCsvRow;
};

export function GraphView({ selectedRow }: GraphViewProps) {
  const [data, options] = useRadarChartData(selectedRow);

  return (
    <>
      <Box mt={10} w="100%">
        <Box height="40vh">
          <Radar data={data} options={options} />
        </Box>
      </Box>
    </>
  );
}
