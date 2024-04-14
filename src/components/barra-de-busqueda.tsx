import React from "react"
import { useSearchBar } from "../hooks"
import { IconoTache, IconoLupa } from "./iconos"

export function BarraDeBusqueda({ defaultValue }: { defaultValue: string }) {
  const { searchWord, setSearchWord } = useSearchBar(defaultValue, (word) => {
    if (word != defaultValue) {
      if (word == "") {
        location.href = "/"
      } else {
        location.href = "?search=" + word
      }
    }
  })

  return (
    <div className="flex gap-3">
      <label className="input input-bordered flex items-center gap-2 flex-grow w-full">
        <input
          type="text"
          className="grow"
          placeholder="chocolate, música, salud..."
          value={searchWord}
          onChange={(event) => setSearchWord(event.target.value)}
        />
        <IconoLupa />
      </label>
      {searchWord && (
        <button
          onClick={() => setSearchWord("")}
          className="btn btn-circle dark:btn-outline btn-error text-white"
        >
          <IconoTache />
        </button>
      )}
    </div>
  )
}
