import { useState } from "react";
import "./App.css";
// import { CsvFile, GroupedCsvRow } from "@/types/CsvFile";
import { LoadCSVButton } from "@/components/LoadCSVButton";
import { FILE_PATHS, PathValues } from "@/components/LoadCSVButton/Constants";
// import { useFetchCsv } from "@/hooks/useFetchCsv";
import { TableView } from "@/components/TableView";
import { GraphView } from "@/components/GraphView";
import {
  Box,
  Container,
  ButtonGroup,
  SimpleGrid,
  Text,
  Divider,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useSelectedGroups } from "@/hooks/useSelectedGroups";
import { useGroupedCsv } from "./hooks/useGroupedCsv";

function App() {
  const [csvPath, setCsvPath] = useState<PathValues>("");

  const [groupedCsvFile, setGroupedCsvFile] = useGroupedCsv(csvPath)
  const [selectedGroupedCsvFile] = useSelectedGroups(groupedCsvFile);

  return (
    <>
      <Box m="0">
        <Container centerContent>
          {/* heading */}
          <Box mb={20}>
            <Heading as="h1">Table-Graph System</Heading>
          </Box>

          {/* load csv button */}
          <Box display="flex" mb={10}>
            <ButtonGroup gap="8">
              <LoadCSVButton
                csvPath={FILE_PATHS.var}
                handleSetPath={setCsvPath}
              ></LoadCSVButton>
              <LoadCSVButton
                csvPath={FILE_PATHS.local}
                handleSetPath={setCsvPath}
                ></LoadCSVButton>
              <LoadCSVButton
                csvPath={FILE_PATHS.remote}
                handleSetPath={setCsvPath}
              ></LoadCSVButton>
            </ButtonGroup>
          </Box>

          <Button
            onClick={() => setGroupedCsvFile([])}
            size="md"
            colorScheme="teal"
            variant="outline"
            mb={10}
          >
            Unload CSV
          </Button>

          <SimpleGrid columns={2} gap={10} w="80vw">
            {/* table */}
            <Box>
              <Divider />
              <Text>Table</Text>
              <Divider />
              {groupedCsvFile.length !== 0 ? (
                <TableView
                  csvFile={groupedCsvFile}
                  setCsvFile={setGroupedCsvFile}
                />
              ) : (
                <Text>Please load the CSV data!</Text>
              )}
            </Box>

            {/* graph */}
            <Box>
              <Divider />
              <p>Graph</p>
              <Divider />
              {selectedGroupedCsvFile.length !== 0 ? (
                selectedGroupedCsvFile.map((group) => {
                  return <GraphView selectedRow={group} key={group.id} />;
                })
              ) : (
                <Text>Please choose specific students!</Text>
              )}
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}

export default App;
