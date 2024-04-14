import type { APIRoute } from "astro"
import { getUserFromToken } from "../../utils/jwt"
import { Posts, db, eq, and, Users, or, like, desc } from "astro:db"

export const POST: APIRoute = async ({ request }) => {
  const { content, title, token } = await request.json()

  // revisar que exista contenido para el post
  if (!content || !title) {
    return new Response("Publicación incompleta.", { status: 400 })
  }

  const { id } = getUserFromToken(token)
  // obtener información del author
  if (!id) {
    return new Response("Favor de iniciar sesión de nuevo.", {
      status: 401,
    })
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

  return new Response("Publicado exitosamente.", { status: 200 })
}

export const DELETE: APIRoute = async ({ request }) => {
  const { id, token } = await request.json()
  // obtener información del cuerpo de la llamada
  if (!id || !token) {
    return new Response("Falta información.", { status: 400 })
  }

  const { id: authorId } = getUserFromToken(token)
  // obtener información del author
  if (!authorId) {
    return new Response("Favor de iniciar sesión de nuevo.", { status: 401 })
  }

  // eliminar post
  return await db
    .delete(Posts)
    .where(and(eq(Posts.id, id), eq(Posts.authorId, authorId)))
    .then(({ rowsAffected }: any) => {
      if (rowsAffected == 0) {
        return new Response("No tienes permiso de eliminar este post.", {
          status: 401,
        })
      }
      return new Response("Eliminado exitosamente.", { status: 200 })
    })
    .catch(() => new Response("Error al eliminar post.", { status: 500 }))
}

export const GET: APIRoute = async ({ url }) => {
  const search = url.searchParams.get("search") || ""
  console.log(search)
  const posts = await db
    .select()
    .from(Posts)
    .where(
      or(like(Posts.content, `%${search}%`), like(Posts.title, `%${search}%`))
    )
    .leftJoin(Users, eq(Posts.authorId, Users.id))
    .orderBy(desc(Posts.date))
    .then((response: any) => {
      return response.map(({ Posts, Users }: { Posts: any; Users: any }) => ({
        ...Posts,
        author: Users?.name,
      }))
    })
    .catch(() => new Response("Error al eliminar post.", { status: 500 }))
  if (posts.length == 0) {
    return new Response("No se encontraron resultados.", { status: 404 })
  }

  return new Response(JSON.stringify(posts), { status: 200 })
}