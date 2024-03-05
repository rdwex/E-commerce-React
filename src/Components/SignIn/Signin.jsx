import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    let navigate = useNavigate()

    const [errors, setErrors] = useState('')

    function sendData(values) {
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            .then(({ data }) => {
                console.log(data)
                if (data.message == 'success') {
                    localStorage.setItem('token', data.token);
                    navigate('/home')
                }
            }).catch((Error) => {
                console.log();
                setErrors(Error.response.data.message);

            })

    }

    function validationSchema() {
        let schema = new Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string()
                .matches(/^[A-Z][A-Za-z0-9@]{6,30}$/)
                .required()
        });
        return schema;
    }

    let login = useFormik({
        initialValues: {
            email: "",
            password: ""
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
                <h2>Login Now</h2>
                <form className="pt-3" onSubmit={login.handleSubmit}>
                    <label htmlFor="Email">Email</label>
                    <input
                        value={login.values.email}
                        name="email"
                        onBlur={login.handleBlur}
                        onChange={login.handleChange}
                        type="email"
                        className="form-control mb-3"
                        id="email"
                    />
                    {login.errors.email && login.touched.email ? (
                        <div className="alert alert-danger">{login.errors.email}</div>
                    ) : (
                        ""
                    )}
                    <label htmlFor="Password">Password</label>
                    <input
                        value={login.values.password}
                        name="password"
                        onBlur={login.handleBlur}
                        onChange={login.handleChange}
                        type="password"
                        className="form-control mb-3"
                        id="password"
                    />
                    {login.errors.password && login.touched.password ? (
                        <div className="alert alert-danger">{login.errors.password}</div>
                    ) : (
                        ""
                    )}
                    <button
                        disabled={!(login.dirty && login.isValid)}
                        type="submit"
                        className="btn bg-main text-white mb-3"
                    >
                        Sign In
                    </button>
                    {errors ? <div className="alert alert-danger my-3">{errors}</div> : ''}
                </form>
                <Link className="forgot-password fw-bolder text-black" to="/forgotPassword">Forgot Password</Link>
            </div>
        </>
    );
}
