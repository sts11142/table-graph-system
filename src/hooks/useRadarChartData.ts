import { ChartData } from "chart.js";
import { GroupedCsvRowObj } from "@/types/CsvFile";
import { useMemo } from "react";

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

  const colors = [
    { bg: "rgba(75, 192, 192, 0.2)", bdr: "rgba(75, 192, 192, 1)" }, // green
    { bg: "rgba(54, 162, 235, 0.4)", bdr: "rgba(54, 162, 235, 1)" }, // blue
    { bg: "rgba(255, 159, 64, 0.6)", bdr: "rgba(255, 159, 64, 1)" }, // red
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
      order: selectedStudent.grades.length - i, // 3年生のオーダー値が最小になり，グラフの一番上に描画される（ラベルも逆順になってしまう→ラベルも逆順に設定する）
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
        reverse: true, // ラベルの位置を逆順にする
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

/** Radar Chart を描画するために必要な二つの要素を作成・返却する関数
 * 
 * Args:
 * 
 *    in : `csvFile`  
 *    out: `[data, options]`
 */
export function useRadarChartData(
  csvFile: GroupedCsvRowObj[],
): [ChartData<"radar", number[], string>, object] {
  const data = useMemo(() => {
    const datasets = createDatasets(csvFile);
    return {
      labels: ["国語", "数学", "英語", "理科", "社会"],
      datasets: datasets,
    };
  }, [csvFile]);

  const options = useMemo(() => {
    return csvFile.length !== 0 ? createOptions(csvFile[0]) : {};
  }, [csvFile]);

  return [data, options];
}
