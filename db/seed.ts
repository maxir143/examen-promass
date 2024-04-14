import { db, Users, Posts } from "astro:db"

// https://astro.build/db/seed
export default async function seed() {
  const newUser = await db.insert(Users).values([
    {
      id: 1,
      name: "admin",
      email: "admin@yupmail.com",
      password: "test",
    },
  ])

  await db.insert(Posts).values([
    {
      id: 1,
      title: "La Protección Inesperada",
      content:
        "Un hombre llamado Tomas, siempre considerado precavido, jamás pensó necesitar un seguro de vida. Sin embargo, un accidente inesperado lo dejó postrado en cama, incapaz de trabajar y con una familia que mantener. Afortunadamente, la póliza que adquirió años atrás cubrió sus gastos médicos y proporcionó un ingreso estable a sus seres queridos, demostrando el valor de estar preparado ante lo imprevisible.",
      authorId: newUser?.id ?? 1,
      date: new Date(),
    },
    {
      id: 2,
      title: "El Rescate Oportuno",
      content:
        "Una familia disfrutaba de sus vacaciones en la playa cuando una tormenta azotó de repente. Su auto quedó atrapado en la inundación, pero gracias al seguro de viaje que habían contratado, recibieron asistencia inmediata, incluyendo remolque y alojamiento en un hotel seguro. La compañía de seguros se encargó de todo, permitiéndoles continuar su viaje sin mayores preocupaciones.",
      authorId: newUser?.id ?? 1,
      date: new Date(),
    },
    {
      id: 3,
      title: "La Tranquilidad del Seguro",
      content:
        "Sofia, una joven emprendedora, invirtió en un pequeño negocio que rápidamente ganó popularidad. Sin embargo, un incendio arrasó con su local, dejando en peligro su sueño. Afortunadamente, el seguro contra incendios que había adquirido le permitió reconstruir el negocio y retomar sus actividades, brindándole la tranquilidad necesaria para enfrentar la adversidad.",
      authorId: newUser?.id ?? 1,
      date: new Date(),
    },
    {
      id: 4,
      title: "El Héroe Invisible",
      content:
        "Don Manuel, un señor de edad avanzada, vivía solo en su casa. Un día, mientras realizaba reparaciones en el techo, sufrió una aparatosa caída. Gracias al seguro de accidentes personales que tenía contratado, recibió atención médica oportuna y la rehabilitación necesaria para recuperarse por completo. La póliza se convirtió en su héroe invisible, velando por su bienestar en un momento crucial.",
      authorId: newUser?.id ?? 1,
      date: new Date(),
    },
    {
      id: 5,
      title: "La Confianza Recompensada",
      content:
        "Emma, una agricultora dedicada, enfrentaba una temporada de sequía que amenazaba con arruinar su cosecha. Afortunadamente, el seguro agrícola que había contratado le brindó la protección necesaria para compensar las pérdidas y seguir adelante. La confianza depositada en la compañía de seguros se vio recompensada, permitiéndole superar un momento difícil y proteger su sustento.",
      authorId: newUser?.id ?? 1,
      date: new Date(),
    },
  ])
}
