import { ChartData } from "chart.js";
import { GroupedCsvRow } from "@/types/CsvFile";
import { useMemo } from "react";

type GraphDataset = {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
};

function createDatasets(csvRow: GroupedCsvRow) {
  const datasets: GraphDataset[] = [];

  const colors = [
    { bg: "rgba(75, 192, 192, 0.2)", bdr: "rgba(75, 192, 192, 1)" }, // green
    { bg: "rgba(54, 162, 235, 0.4)", bdr: "rgba(54, 162, 235, 1)" }, // blue
    { bg: "rgba(255, 159, 64, 0.6)", bdr: "rgba(255, 159, 64, 1)" }, // red
  ];

  csvRow.grades.forEach((grade, i) => {
    const dataset = {
      label: `${grade["学年"]}年生`,
      data: [
        grade["国語"],
        grade["数学"],
        grade["英語"],
        grade["理科"],
        grade["社会"],
      ],
      backgroundColor: colors[grade.学年 - 1].bg,  // 0: 1年, 1: 2年, 2: 3年
      borderColor: colors[grade.学年 - 1].bdr,  // 0: 1年, 1: 2年, 2: 3年
      borderWidth: 3,
      pointStyle: "circle",
      order: csvRow.grades.length - i, // 3年生のオーダー値が最小になり，グラフの一番上に描画される（ラベルも逆順になってしまう→ラベルも逆順に設定する）
    };

    // datasetをdatasetsに追加
    datasets.push(dataset);
  });

  return datasets;
}

function createOptions(csvRow: GroupedCsvRow) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
  csvRow: GroupedCsvRow,
): [ChartData<"radar", number[], string>, object] {
  const data = useMemo(() => {
    const datasets = createDatasets(csvRow);
    return {
      labels: ["国語", "数学", "英語", "理科", "社会"],
      datasets: datasets,
    };
  }, [csvRow]);

  const options = useMemo(() => {
    return createOptions(csvRow);
  }, [csvRow]);

  return [data, options];
}
