import { useEffect, useState } from "react";

export function useFetchCsv() {
  const [file, setFile] = useState([])

  useEffect(() => {
    const fetchFile = async (url:string) => {
      const response = await fetch(url)
      await console.log(response.text())
    }
    fetchFile('http://www.mn.cis.iwate-u.ac.jp/~nakaya/report/Data.csv')
  }, [])

  return [file]
}
