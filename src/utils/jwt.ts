import jwt from "jsonwebtoken"

export function getUserFromToken(token: string): {
  name: string
  id: number
  iat: EpochTimeStamp
} {
  const data: any = jwt.decode(token)
  return { id: data?.id, name: data?.name, iat: data?.iat }
}

export function getTokenFromUser(user: { name: string; id: number }) {
  return jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    import.meta.env.TOKEN_SECRET
  )
}
