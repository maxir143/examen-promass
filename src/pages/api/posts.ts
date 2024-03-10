import type { APIRoute } from "astro"
import { getUserFromToken } from "../../utils/jwt"
import { db } from "../../db/connection"
import { posts } from "../../db/schema"

export const POST: APIRoute = async ({ request }) => {
  const { content, title, token } = await request.json()

  if (!content || !title) {
    return new Response("publicacion incompleta", { status: 400 })
  }

  const { id } = getUserFromToken(token)

  if (!id) {
    return new Response("favor de inicar sesion de nuevo", { status: 400 })
  }

  await db
    .insert(posts)
    .values({
      date: new Date(),
      content,
      title,
      authorId: id,
    })
    .catch(() => {
      return new Response("Error al publicar post", { status: 400 })
    })

  return new Response(
    JSON.stringify({
      message: "Publicado exitosamente",
    })
  )
}
