import React from "react"
import { useSearchBar } from "../hooks"

export function BarraDeBusqueda({ defaultValue }: { defaultValue: string }) {
  const { searchWord, setSearchWord } = useSearchBar(defaultValue, (word) => {
    word != defaultValue && (location.href = "?search=" + word)
  })

  return (
    <label className="input input-bordered flex items-center gap-2 flex-grow w-full">
      <input
        type="text"
        className="grow"
        placeholder="chocolate, música, salud..."
        value={searchWord}
        onChange={(event) => setSearchWord(event.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  )
}
