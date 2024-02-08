import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";

import { GroupedCsvRowObj } from "@/types/CsvFile";

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

type GraphDataset = {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
};

function createDatasets(csvFile: GroupedCsvRowObj[]) {
  const datasets: GraphDataset[] = [];

  // ページ描画の初期段階ではCSVデータは存在しないため
  if (csvFile.length === 0) return datasets;

  const selectedStudent = csvFile[0];

  // const colors = ['rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'];
  const colors = [
    { bg: "rgba(75, 192, 192, 0.2)", bdr: "rgba(75, 192, 192, 1)" },  // green
    { bg: "rgba(54, 162, 235, 0.2)", bdr: "rgba(54, 162, 235, 1)" },  // blue
    { bg: "rgba(255, 159, 64, 0.2)", bdr: "rgba(255, 159, 64, 1)" },  // red
  ];

  selectedStudent.grades.forEach((grade, i) => {
    const dataset = {
      label: `${grade["学年"]}年生`,
      data: [
        grade["国語"],
        grade["数学"],
        grade["英語"],
        grade["理科"],
        grade["社会"],
      ],
      backgroundColor: colors[i].bg,
      borderColor: colors[i].bdr,
      borderWidth: 3,
      pointStyle: "circle",
      order: selectedStudent.grades.length - i,  // 3年生のオーダー値が最小になり，グラフの一番上に描画される（ラベルも逆順になってしまう→ラベルも逆順に設定する）
    };

    // datasetをdatasetsに追加
    datasets.push(dataset);
  });

  return datasets;
}

function createOptions(csvRow: GroupedCsvRowObj) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        reverse: true,  // ラベルの位置を逆順にする
        title: {
          display: true,
          text: csvRow.name,
          padding: 10,
        },
      },
    },
  };

  return options;
}

function makeChartJSData(
  csvFile: GroupedCsvRowObj[],
): [ChartData<"radar", number[], string>, object] {
  const datasets = createDatasets(csvFile);
  const data = {
    labels: ["国語", "数学", "英語", "理科", "社会"],
    datasets: datasets,
  };
  
  const options = csvFile.length !== 0 ? createOptions(csvFile[0]) : {};

  return [data, options];
}

export function GraphView({ csvFile }: GraphViewProps) {
  const [data, options] = makeChartJSData(csvFile);

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
