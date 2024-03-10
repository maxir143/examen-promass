import type { APIRoute } from "astro"
import { getUserFromToken } from "../../utils/jwt"
import { db } from "../../db/connection"
import { posts } from "../../db/schema"

export const POST: APIRoute = async ({ request }) => {
  const { content, title, token } = await request.json()

  // revisar que exista contenido para el post
  if (!content || !title) {
    return new Response("publicación incompleta", { status: 400 })
  }

  const { id } = getUserFromToken(token)
  // obtener información del author
  if (!id) {
    return new Response("favor de iniciar sesión de nuevo", { status: 400 })
  }

  // crear post
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
