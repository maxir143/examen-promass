import type { APIRoute } from "astro"
import { getUserFromToken } from "../../utils/jwt"

//this endpoint is to get user data from user token
export const POST: APIRoute = async ({ request }) => {
  const { token } = await request.json()

  if (!token) return new Response("falta token.", { status: 400 })

  const { id, name } = getUserFromToken(token)

  if (!id || !name)
    return new Response(
      "token mal formado, favor de iniciar sesión de nuevo.",
      {
        status: 404,
      }
    )

  return new Response(
    JSON.stringify({
      message: "éxito.",
      id,
      name,
    })
  )
}
