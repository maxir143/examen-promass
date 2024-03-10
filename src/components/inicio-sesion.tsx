import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useState } from "react"
import { object, string } from "yup"

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
          fetch("api/login", {
            method: "POST",
            body: JSON.stringify(values),
          })
            .then(async (res: any) => {
              const { message = "", token } = await res.json()
              setMessage(message)
              if (token) {
                // salvar token en localStorage
                localStorage.setItem("token", token)
                location.href = "/"
              }
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
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
