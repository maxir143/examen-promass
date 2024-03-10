import React from "react"
import { useToken } from "../hooks"

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
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0.1px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7ZM12 1C8.68629 1 6 3.68629 6 7C6 10.3137 8.68629 13 12 13C15.3137 13 18 10.3137 18 7C18 3.68629 15.3137 1 12 1ZM15 18C15 16.3431 16.3431 15 18 15C18.4631 15 18.9018 15.105 19.2934 15.2924L15.2924 19.2934C15.105 18.9018 15 18.4631 15 18ZM16.7066 20.7076L20.7076 16.7066C20.895 17.0982 21 17.5369 21 18C21 19.6569 19.6569 21 18 21C17.5369 21 17.0982 20.895 16.7066 20.7076ZM18 13C15.2386 13 13 15.2386 13 18C13 20.7614 15.2386 23 18 23C20.7614 23 23 20.7614 23 18C23 15.2386 20.7614 13 18 13ZM12 14C12.0843 14 12.1683 14.0013 12.252 14.0039C11.8236 14.6189 11.4914 15.3059 11.2772 16.0431C8.30431 16.4 6 18.9309 6 22H4C4 17.5817 7.58172 14 12 14Z" />
        </svg>
      </button>
    </div>
  )
}
