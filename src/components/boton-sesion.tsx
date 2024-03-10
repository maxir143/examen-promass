import React from "react"
import { useToken } from "../hooks"
import { IconoCerrarSesion } from "./iconos/icono-cerrar-sesion"

export function BotonSesion() {
  const { token, closeSession } = useToken()

  if (!token)
    return (
      <a className="btn dark:btn-outline btn-success text-white" href="/login">
        iniciar sesión
      </a>
    )

  return (
    <div className="flex gap-3 w-full">
      <a
        className="btn dark:btn-outline btn-primary flex-grow text-white"
        href="/new-entry"
      >
        + nueva entrada
      </a>
      <button
        className="btn dark:btn-outline btn-error btn-square text-white"
        onClick={closeSession}
      >
        <IconoCerrarSesion />
      </button>
    </div>
  )
}
