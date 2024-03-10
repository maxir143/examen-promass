import type { APIRoute } from "astro"
import bcrypt from "bcrypt"
import { db } from "../../db/connection"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"
import { getTokenFromUser } from "../../utils"

export const POST: APIRoute = async ({ request }) => {
  const { user, password } = await request.json()

  // No admitir capos vacíos
  if (!user || !password) {
    return new Response(null, { status: 400 })
  }

  // buscar si el usuario ya existe
  const userFromDB = await db.select().from(users).where(eq(users.name, user))

  if (userFromDB.length > 0) {
    // comprobar contraseñas
    const auth = await bcrypt.compare(password, userFromDB[0].password)

    if (auth) {
      const token = getTokenFromUser({
        id: userFromDB[0].id,
        name: userFromDB[0].name,
      })

      return new Response(
        JSON.stringify({
          token,
        })
      )
    }
    // regresar error de contraseña
    return new Response(JSON.stringify({ message: "contrasena incorrecta" }), {
      status: 400,
    })
  }

  // hash para la contraseña
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  // registrar usuario
  return await db
    .insert(users)
    .values({ name: user, password: hashPassword })
    .then(async () => {
      const newUser = await db.select().from(users).where(eq(users.name, user))
      const token = getTokenFromUser({
        id: newUser[0].id,
        name: newUser[0].name,
      })

      return new Response(
        JSON.stringify({
          token,
        })
      )
    })
    .catch((e) => {
      console.error(e?.message)
      return new Response(JSON.stringify({ message: e?.message }), {
        status: 400,
      })
    })
}
