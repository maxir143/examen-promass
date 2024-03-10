import React from "react"
import { Entrada, type TEntrada } from "./entrada"

type TListaEntradas = { entradas: Array<Partial<TEntrada>> }

export function ListaEntradas({ entradas }: TListaEntradas) {
  return (
    <ul className="flex flex-col gap-3 w-full">
      {entradas.length == 0 ? (
        <li className="flex justify-center items-center border border-zinc-500 rounded-md  py-3 min-h-[50vh]">
          No se encontraron entradas
        </li>
      ) : (
        entradas.map(({ title, content, id }) => (
          <Entrada key={id} id={id} title={title} content={content} />
        ))
      )}
    </ul>
  )
}
