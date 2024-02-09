import { Dispatch } from "react";
import { Button } from "@chakra-ui/react";
import { FILE_PATHS } from "@/components/LoadCSVButton/Constants";

type LoadCsvButtonProp = {
  csvPath: string;
  handleSetPath: Dispatch<React.SetStateAction<string>>;
};

export function LoadCSVButton({ csvPath, handleSetPath }: LoadCsvButtonProp) {
  const loadedBy =
    csvPath === FILE_PATHS.var
      ? "var"
      : csvPath === FILE_PATHS.local
        ? "local"
        : "remote";

  return (
    <>
      <Button colorScheme="teal" onClick={() => handleSetPath(csvPath)}>
        Load CSV from:{" "}
        <span style={{ color: "#eeeeee", fontWeight: "bold" }}>
          {" "}
          {loadedBy}
        </span>
      </Button>
    </>
  );
}
