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
import { Box, Text } from "@chakra-ui/react";

import { GroupedCsvRowObj } from "@/types/CsvFile";
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
  csvFile: GroupedCsvRowObj[];
};

export function GraphView({ csvFile }: GraphViewProps) {
  const [data, options] = useRadarChartData(csvFile);

  return (
    <>
      {csvFile.length === 0 ? (
        <Text>Please choose a specific student!</Text>
      ) : (
        <Box mt={10}>
          <Radar data={data} options={options} />
        </Box>
      )}
    </>
  );
}
