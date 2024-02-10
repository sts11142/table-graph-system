import { CsvRow, GroupedCsvRow } from "@/types/CsvFile";
import { useEffect, useState } from "react";

function methodName(methodType: "avg" | "max" | "min"): string {
  return methodType === 'avg' ? '平均点' : methodType === 'max' ? '最大値' : '最小値'
}

const calcSuperRow = (groupedCsvFile: GroupedCsvRow[], methodType: "avg" | "max" | "min", grade: number): CsvRow => {
  if (methodType === 'avg') {
    const sums = {
      '国語': 0,
      '数学': 0,
      '英語': 0,
      '理科': 0,
      '社会': 0
    };

    // その学年について，5教科それぞれの合計点を求める
    groupedCsvFile.forEach((group) => {
      group.grades.forEach((row) => {
        if (row.学年 !== grade) return
        sums['国語'] += row['国語']
        sums['数学'] += row['数学']
        sums['英語'] += row['英語']
        sums['理科'] += row['理科']
        sums['社会'] += row['社会']
      })
    })
    return {
      '番号': 999,
      '氏名': methodName(methodType),
      '学年': grade,
      '国語': sums['国語'] / groupedCsvFile.length,
      '数学': sums['数学'] / groupedCsvFile.length,
      '英語': sums['英語'] / groupedCsvFile.length,
      '理科': sums['理科'] / groupedCsvFile.length,
      '社会': sums['社会'] / groupedCsvFile.length,
    }
  } else if (methodType === 'max') {
    const maxs = {
      '国語': 0,
      '数学': 0,
      '英語': 0,
      '理科': 0,
      '社会': 0
    };
    groupedCsvFile.forEach((group) => {
      group.grades.forEach((row) => {
        if (row.学年 !== grade) return
        if (row.国語 > maxs['国語']) maxs['国語'] = row['国語']
        if (row.数学 > maxs['数学']) maxs['数学'] = row['数学']
        if (row.英語 > maxs['英語']) maxs['英語'] = row['英語']
        if (row.理科 > maxs['理科']) maxs['理科'] = row['理科']
        if (row.社会 > maxs['社会']) maxs['社会'] = row['社会']
      })
    })

    return {
      '番号': NaN,
      '氏名': methodName(methodType),
      '学年': grade,
      '国語': maxs['国語'],
      '数学': maxs['数学'],
      '英語': maxs['英語'],
      '理科': maxs['理科'],
      '社会': maxs['社会'],
    }
  } else {
    const mins = {
      '国語': Number.MAX_SAFE_INTEGER,
      '数学': Number.MAX_SAFE_INTEGER,
      '英語': Number.MAX_SAFE_INTEGER,
      '理科': Number.MAX_SAFE_INTEGER,
      '社会': Number.MAX_SAFE_INTEGER
    };
    groupedCsvFile.forEach((group) => {
      group.grades.forEach((row) => {
        if (row.学年 !== grade) return
        if (row.国語 < mins['国語']) mins['国語'] = row['国語']
        if (row.数学 < mins['数学']) mins['数学'] = row['数学']
        if (row.英語 < mins['英語']) mins['英語'] = row['英語']
        if (row.理科 < mins['理科']) mins['理科'] = row['理科']
        if (row.社会 < mins['社会']) mins['社会'] = row['社会']
      })
    })

    return {
      '番号': NaN,
      '氏名': methodName(methodType),
      '学年': grade,
      '国語': mins['国語'],
      '数学': mins['数学'],
      '英語': mins['英語'],
      '理科': mins['理科'],
      '社会': mins['社会'],
    }
  }
}

export function useCalcOf(methodType: "avg" | "max" | "min", groupedCsvFile: GroupedCsvRow[]) {
  const [superRow, setSuperRow] = useState<GroupedCsvRow>({
    id: NaN,
    name: methodName(methodType),
    selected: false,
    grades: []
  })

  useEffect(() => {
    const arr: CsvRow[] = []
    const grades = [1, 2, 3]
    grades.forEach((grade) => {
      const row: CsvRow = calcSuperRow(groupedCsvFile, methodType, grade)
      console.log("row: ", row)
      arr.push(row)
    })
    setSuperRow((prev) => ({...prev, grades: arr}))
  }, [groupedCsvFile])

  return [superRow]
}
