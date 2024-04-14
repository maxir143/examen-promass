import type { APIRoute } from "astro"
import { getUserFromToken } from "../../utils/jwt"
import { Posts, db, eq, and } from "astro:db"

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
    .insert(Posts)
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

export const DELETE: APIRoute = async ({ request }) => {
  const { id, token } = await request.json()
  // obtener información del cuerpo de la llamada
  if (!id || !token) {
    return new Response("falta información", { status: 400 })
  }

  const { id: authorId } = getUserFromToken(token)
  // obtener información del author
  if (!authorId) {
    return new Response("favor de iniciar sesión de nuevo", { status: 400 })
  }

  // eliminar post
  return await db
    .delete(Posts)
    .where(and(eq(Posts.id, id), eq(Posts.authorId, authorId)))
    .then(({ rowsAffected }: any) => {
      if (rowsAffected == 0) {
        return new Response(
          JSON.stringify({
            message: "No tienes permiso de eliminar este post",
          }),
          { status: 401 }
        )
      }
      return new Response(
        JSON.stringify({
          message: "eliminado exitosamente",
        }),
        { status: 200 }
      )
    })
    .catch(() => new Response("Error al eliminar post", { status: 500 }))
}
