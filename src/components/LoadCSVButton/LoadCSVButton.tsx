import { Box, Button } from "@chakra-ui/react";

type LoadCsvButtonProp = {
  handleSetCsv: (path: string) => void;
  csvPath: string;
};

export function LoadCSVButton({ handleSetCsv, csvPath }: LoadCsvButtonProp) {
  return (
    <>
      <Box>
        <Button onClick={() => handleSetCsv(csvPath)}>load csv from var</Button>
      </Box>
    </>
  );
}
