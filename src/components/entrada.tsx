import React from "react"

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
      <div className="flex justify-between items-baseline font-bold">
        <h3 className="text-2xl card-title">{title}</h3>
      </div>
      <p className="text-start card-body">
        {/* Truncar a 70 caracteres */}
        {content?.slice(0, 70).trimEnd()}...
      </p>
      <button onClick={() => id && getEntry(id)} className="btn">
        {"Continuar leyendo >"}
      </button>
    </li>
  )
}
