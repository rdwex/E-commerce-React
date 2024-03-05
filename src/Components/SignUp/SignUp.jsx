import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  let navigate = useNavigate()

  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(true)

  function sendData(values) {
    setLoading(false)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        console.log(data)
        if (data.message == 'success') {
          navigate('/signin')
        }
      }).catch((Error) => {
        console.log();
        setErrors(Error.response.data.message);
        setLoading(true);

      })

  }

  // function validate(values) {

  //   let myError = {}

  //   if (!values.name) {
  //     myError.name = "Name is required."
  //   }
  //   if (!values.email) {
  //     myError.email = "Email is required."
  //   }
  //   if (!/^[A-Z][A-Za-z0-9@]{6,30}$/.test(values.password)) {
  //     myError.password = "Password must be at least 6 characters long."
  //   }

  //   if (!(values.rePassword == values.password)) {
  //     myError.rePassword = "re-Password is incorrect"
  //   }
  //   if (!values.phone) {
  //     myError.phone = "Phone is required."
  //   }
  //   console.log(myError);

  //   return myError
  // }

  function validationSchema() {
    let schema = new Yup.object({
      name: Yup.string()
        .min(2, "2 characters required")
        .max(30, "max is 30")
        .required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .matches(/^[A-Z][A-Za-z0-9@]{6,30}$/)
        .required(),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")])
        .required(),
    });

    return schema;
  }

  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate
    validationSchema,
    onSubmit: (values) => {
      sendData(values);
    },
  });

  return (
    <>
      <div className="w-75 m-auto pt-5">
        <h2>Register Now</h2>
        <form className="pt-3" onSubmit={register.handleSubmit}>
          <label htmlFor="Name">Name</label>
          <input
            value={register.values.name}
            name="name"
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            type="text"
            className="form-control mb-3"
            id="name"
          />
          {register.errors.name && register.touched.name ? (
            <div className="alert alert-danger">{register.errors.name}</div>
          ) : (
            ""
          )}

          <label htmlFor="Email">Email</label>
          <input
            value={register.values.email}
            name="email"
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            type="email"
            className="form-control mb-3"
            id="email"
          />
          {register.errors.email && register.touched.email ? (
            <div className="alert alert-danger">{register.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="Password">Password</label>
          <input
            value={register.values.password}
            name="password"
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            type="password"
            className="form-control mb-3"
            id="password"
          />
          {register.errors.password && register.touched.password ? (
            <div className="alert alert-danger">{register.errors.password}</div>
          ) : (
            ""
          )}

          <label htmlFor="RePassword">RePassword</label>
          <input
            value={register.values.rePassword}
            name="rePassword"
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            type="password"
            className="form-control mb-3"
            id="rePassword"
          />
          {register.errors.rePassword && register.touched.rePassword ? (
            <div className="alert alert-danger">
              {register.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="Phone">Phone</label>
          <input
            value={register.values.phone}
            name="phone"
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            type="phone"
            className="form-control mb-3"
            id="phone"
          />
          {register.errors.phone && register.touched.phone ? (
            <div className="alert alert-danger">{register.errors.phone}</div>
          ) : (
            ""
          )}

          <button
            disabled={!(register.dirty && register.isValid)}
            type="submit"
            className="btn bg-main text-white"
          >
            {loading ? 'Sign Up' : 'loading...'}
          </button>
          {errors ? <div className="alert alert-danger my-3">{errors}</div> : ''}


        </form>
      </div>
    </>
  );
}
