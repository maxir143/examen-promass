# Examen Front React 

### para Grupo Promass

> Maximiliano Valentin Lopez

Blog en cumplimiento con los siguientes requisitos:
- [x] Alta de entradas
- [x] Mostrar un listado de entradas
- [x] Búsquedas de entradas
- [x] Entradas individuales
- [x] API REST con SQL
- [ ] ~~Extra - Modo offline~~

#### Recursos utilizados para el desarrollo: 
- [Base de datos SQL](https://www.freesqldatabase.com) [^1]
- ORM [drizzle](https://orm.drizzle.team/)
- Framework [Astro](https://astro.build/)
- Datos de usuario locales con [JWT](https://jwt.io/)
- Datos de prueba [google gemini](https://gemini.google.com/)


## Como iniciar el proyecto
1. instalación
``` 
  pnpm install | npm install | yarn install
```
2. crear el archivo .env en la raíz del proyecto con las siguientes variables:
``` 
  DB_HOST
  DB_NAME
  DB_USERNAME
  DB_PASSWORD
  DB_PORT

  TOKEN_SECRET
```
3. correr servidor de desarrollo
``` 
  npm run dev
```
4. abrir proyecto en el navegador: [http://localhost:4321/](http://localhost:4321/)

[^1]: La base de datos que se usa para el proyecto es gratuita por lo que podría presentar intermitencia, si se gusta probar con una base local, es una base MySQL los comandos de tablas de encuentra en: "drizzle/0000_deep_plazm.sql" y se puede ingresar la información del servidor local por medio del archivo .env.