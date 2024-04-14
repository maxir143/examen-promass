import React from "react"
import { ChevronRight } from "./iconos"

export type TEntrada = {
  id?: number
  title?: string
  content?: string
}

export function Entrada({ title, content, id }: TEntrada) {
  function getEntry(entryId: number) {
    location.href = `post/${entryId}`
  }
  return (
    <li className="card flex flex-col gap-2 items-stretch bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white p-3">
      <div className="flex gap-1 items-baseline font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 pt-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>

        <h3 className="text-2xl card-title">{title}</h3>
      </div>
      <p className="text-start card-body">
        {/* Truncar a 70 caracteres */}
        {content?.slice(0, 70).trimEnd()}...
      </p>
      <button onClick={() => id && getEntry(id)} className="btn">
        {"Continuar leyendo"} <ChevronRight />
      </button>
    </li>
  )
}
