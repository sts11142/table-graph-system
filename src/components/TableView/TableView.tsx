import { GroupedCsvRow } from "@/types/CsvFile";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type TableProps = {
  csvFile: GroupedCsvRow[];
  setCsvFile: Dispatch<SetStateAction<GroupedCsvRow[]>>;
};

function defineColumns(csvFile: GroupedCsvRow[]) {
  if (csvFile.length === 0) return [];

  const columns: ColumnDef<GroupedCsvRow>[] = [];

  const labels = ['selected', '番号', '氏名', '学年', '国語', '数学', '英語', '理科', '社会']

  labels.map((key) => {
    columns.push({
      id: key.toString(),
      accessorKey: key.toString(),
      header: key === 'selected' ? '✅' : key.toString(),
    });
  });

  return columns;
}

export function TableView({ csvFile, setCsvFile }: TableProps) {
  const columns = defineColumns(csvFile);

  const table = useReactTable<GroupedCsvRow>({
    data: csvFile,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleCheckboxChange = (isChecked: boolean, selectedGroupId: number) => {
    const updatedCsvFile = csvFile.map((group) => {
      if (group.id === selectedGroupId) {
        return {...group, selected: isChecked}
      }
      return group;
    })

    setCsvFile(updatedCsvFile);
  }

  return (
    <>
      <Box>
        <TableContainer>
          <Table>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {csvFile.map((group) =>
                group.grades.map((row, rowIndex) => {
                  const isGroupStart = rowIndex === 0;
                  const rowSpan = group.grades.length;

                  return (
                    <Tr key={row.番号 + row.氏名 + row.学年}>
                      {isGroupStart && (
                        <>
                          <Td rowSpan={rowSpan}><Checkbox isChecked={group.selected} onChange={(e) => handleCheckboxChange(e.target.checked, group.id)} /></Td>
                          <Td rowSpan={rowSpan}>{row.番号}</Td>
                          <Td rowSpan={rowSpan}>{row.氏名}</Td>
                        </>
                      )}
                      <Td>{row.学年}</Td>
                      <Td>{row.国語}</Td>
                      <Td>{row.数学}</Td>
                      <Td>{row.英語}</Td>
                      <Td>{row.理科}</Td>
                      <Td>{row.社会}</Td>
                    </Tr>
                  );
                }),
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
