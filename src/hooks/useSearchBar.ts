import { useEffect, useState } from "react"

export function useSearchBar(
  defaultValue: string,
  callback: (searchWord: string) => void
) {
  const [searchWord, setSearchWord] = useState<string>(defaultValue)

  useEffect(() => {
    const timeout = setTimeout(() => {
      callback && callback(searchWord ?? "")
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [searchWord])

  return { searchWord, setSearchWord }
}
