import { Box, Button } from "@chakra-ui/react";
import { FILE_PATHS } from "./Constants";

type LoadCsvButtonProp = {
  handleSetCsv: (path: string) => void;
  csvPath: string;
};

export function LoadCSVButton({ handleSetCsv, csvPath }: LoadCsvButtonProp) {
  const loadedBy =
    csvPath === FILE_PATHS.var
      ? "var"
      : csvPath === FILE_PATHS.local
        ? "local"
        : "remote";

  return (
    <>
      <Button colorScheme="teal" onClick={() => handleSetCsv(csvPath)}>
        load csv from: <span style={{ color: "#eeeeee", fontWeight: 'bold' }}> {loadedBy}</span>
      </Button>
    </>
  );
}
