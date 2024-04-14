import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { object, string } from "yup"

type NewPost = {
  title: string
  content: string
}

const validationSchema = object({
  title: string()
    .required("campo requerido.")
    .min(1, "mínimo 1 carácter.")
    .max(100, "máximo 100 caracteres."),
  content: string()
    .required("campo requerido.")
    .min(100, "mínimo 100 caracteres.")
    .max(10000000, "máximo 10000000 caracteres."),
})

export function NuevaEntrada() {
  const [message, setMessage] = useState<string>("")
  const [token, setToken] = useState<string | null>()

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  return (
    <Formik
      validationSchema={validationSchema}
      validateOnChange
      onSubmit={(values: NewPost, { setSubmitting }) => {
        setSubmitting(true)
        fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            ...values,
            token,
          }),
        })
          .then(async (res: any) => {
            if (res.ok) return (location.href = "/")
            const message = await res.text()
            setMessage(message)
          })
          .catch(() => {
            setMessage("error al publicar post")
          })
          .finally(() => {
            setSubmitting(false)
          })
      }}
      initialValues={{ title: "", content: "" }}
    >
      {({ isSubmitting, values }) => (
        <Form className="w-full flex flex-col gap-7">
          <div className="w-full flex flex-col gap-1">
            <h5 className="flex justify-between items-start">
              <p>Titulo</p> <p>{`( ${values.title.length} / 100 )`}</p>
            </h5>
            <Field
              type="text"
              name="title"
              className="input input-bordered"
              placeholder="La fascinante historia del chocolate"
              maxLength={100}
              minLength={1}
              required
            />
            <div className="text-sm text-red-500">
              <ErrorMessage name="title" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <h5 className="flex justify-end items-start">
              <p>{`( ${values.content.length} / 1,000,000 )`}</p>
            </h5>
            <Field
              name="content"
              as={"textarea"}
              placeholder="El chocolate, ese delicioso manjar que conquista paladares a nivel mundial..."
              className="textarea textarea-bordered min-h-[150px]"
              maxLength={1000000}
              minLength={100}
              required
            />
            <div className="text-sm text-red-500">
              <ErrorMessage name="content" />
            </div>
          </div>
          {message && <small className="text-red-500">{message}</small>}
          <button
            type="submit"
            className="btn dark:btn-outline btn-primary"
            disabled={isSubmitting}
          >
            Nueva entrada
          </button>
        </Form>
      )}
    </Formik>
  )
}
