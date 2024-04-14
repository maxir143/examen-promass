import React, { useEffect, useState } from "react"
import { Trash } from "."
import { useToken } from "../hooks"

export function BotonEliminarPost({
  id,
  authorId,
}: {
  id: number
  authorId: number
}) {
  const [fetching, setFetching] = useState<boolean>(false)
  const [userId, setUserId] = useState<number | null>(null)
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

  useEffect(() => {
    if (!token) return
    setFetching(true)
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const { id } = await res.json()
        setUserId(id)
      })
      .catch((e: any) => console.error(e?.message))
      .finally(() => {
        setFetching(false)
      })
  }, [token])

  if (!token || fetching || userId != authorId) return

  return (
    <>
      <button
        disabled={fetching}
        aria-busy={fetching}
        onClick={() => handleDelete(id)}
        className="btn btn-sm btn-square dark:btn-outline btn-error text-white"
      >
        <Trash />
      </button>
    </>
  )
}
