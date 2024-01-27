type LoadCsvButtonProp = {
  handleSetCsv: (path: string) => void;
  csvPath: string;
};

export function LoadCSVButton({ handleSetCsv, csvPath }: LoadCsvButtonProp) {
  return (
    <>
      <div>
        <button onClick={() => handleSetCsv(csvPath)}>load csv from var</button>
      </div>
    </>
  );
}
