import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useState } from "react"
import { object, string } from "yup"
import { IconoUsuario, IconoLLave } from "./iconos"

type Values = {
  user: string
  password: string
}

const validationSchema = object({
  user: string().required("campo requerido.").min(2, "Mínimo 2 caracteres."),
  password: string()
    .required("campo requerido.")
    .min(4, "Mínimo 4 caracteres."),
})

export function InicioSesion() {
  const [message, setMessage] = useState<string>("")

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          user: "",
          password: "",
        }}
        onSubmit={(values: Values, { setSubmitting }) => {
          setMessage("")
          fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(values),
          })
            .then(async (res: any) => {
              if (res.ok) {
                const { token } = await res.json()
                if (token) {
                  // salvar token en localStorage
                  localStorage.setItem("token", token)
                  location.href = "/"
                }
                return
              }
              const message = await res.text()
              setMessage(message)
            })
            .catch(() => {})
            .finally(() => {
              setSubmitting(false)
            })
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="max-w-96 flex-col flex gap-8">
              <label className="input input-bordered flex items-center gap-2">
                <IconoUsuario />
                <Field
                  type="text"
                  className="grow"
                  name="user"
                  placeholder="pedro@promass.com"
                  autoComplete="username"
                />
                <div className="text-sm text-red-500">
                  <ErrorMessage name="user" />
                </div>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <IconoLLave />
                <Field
                  type="password"
                  className="grow"
                  name="password"
                  placeholder="123456"
                  autoComplete="current-password"
                />
                <div className="text-sm text-red-500">
                  <ErrorMessage name="password" />
                </div>
              </label>
              {message && <small className="text-red-500">{message}</small>}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Iniciar sesión
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
