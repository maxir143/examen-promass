import React, { useState } from "react"
import { IconoTache } from "."
import { useToken } from "../hooks"

export function BotonEliminarPost({ id }: { id: number }) {
  const [fetching, setFetching] = useState<boolean>(false)
  const { token } = useToken()

  async function handleDelete(id: number) {
    setFetching(true)
    fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ id, token }),
    })
      .then((response) => {
        if (response.ok) {
          location.href = "/"
        }
      })
      .catch((e) => {
        console.error(e?.message)
      })
      .finally(() => {
        setFetching(false)
      })
  }

  return (
    <>
      <button
        disabled={fetching}
        aria-busy={fetching}
        onClick={() => handleDelete(id)}
        className="btn btn-square dark:btn-outline btn-error text-white"
      >
        <IconoTache />
      </button>
    </>
  )
}
