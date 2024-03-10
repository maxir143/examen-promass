import { useEffect, useState } from "react"

export function useToken() {
  const [token, setToken] = useState<string | null>()

  function closeSession() {
    localStorage.removeItem("token")
    location.reload()
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  return { token, closeSession }
}
