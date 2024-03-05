import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const [errors, setErrors] = useState('')

    let navigate = useNavigate()

    function sendCode(values) {
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
            .then(({ data }) => {
                console.log(data)
                if (data.statusMsg == 'success') {
                    localStorage.setItem('token', data.token);
                    navigate('/verify')
                }
            }).catch((Error) => {
                console.log();
                setErrors(Error.response.data.statusMsg);

            })

    }

    function validationSchema() {
        let schema = new Yup.object({
            email: Yup.string().email().required(),

        });
        return schema;
    }

    let login = useFormik({
        initialValues: {
            email: "",
        },
        // validate
        validationSchema,
        onSubmit: (values) => {

            sendCode(values);
        },
    });

    return (
        <>
            <div className="w-75 m-auto pt-5">
                <h2>Forgot Password</h2>
                <p>A code will be sent to you</p>

                <form className="pt-3" onSubmit={login.handleSubmit}>
                    <label htmlFor="Email">Email</label>
                    <input
                        value={login.values.email}
                        name="email"
                        onBlur={login.handleBlur}
                        onChange={login.handleChange}
                        type="email"
                        className="form-control mb-3"
                    />
                    {login.errors.email && login.touched.email ? (
                        <div className="alert alert-danger">{login.errors.email}</div>
                    ) : (
                        ""
                    )}
                    <button
                        type="submit"
                        className="btn bg-main text-white mb-3"
                    >
                        Verify
                    </button>
                </form>
            </div>
        </>
    )
}
