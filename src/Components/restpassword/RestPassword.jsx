import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RestPassword() {

    let navigate = useNavigate()

    function sendRestPassword(values) {
        axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
            .then(({ data }) => {
                console.log(data)
                if (data.token) {
                    // localStorage.setItem('token', data.token);
                    navigate('/signin')
                    console.log(data)

                }
            }).catch((Error) => {
                console.log(Error.response.data.message);
                // setErrors(Error.response.data.statusMsg);

            })

    }

    function validationSchema2() {
        let schema = new Yup.object({
            email: Yup.string().email().required(),
            newPassword: Yup.string(),

        });
        return schema;
    }

    let register = useFormik({
        initialValues: {

            email: "",
            newPassword: "",
        },
        // validate
        validationSchema2,
        onSubmit: (values) => {

            sendRestPassword(values);
        },
    });

    return (
        <>
            <div className="w-75 m-auto pt-5">
                <h2>Forgot Password</h2>
                <p>A code will be sent to you</p>

                <form className="pt-3" onSubmit={register.handleSubmit}>
                    <label htmlFor="Email">Email</label>
                    <input
                        value={register.values.email}
                        onBlur={register.handleBlur}
                        onChange={register.handleChange}
                        name="email"
                        type="email"
                        className="form-control mb-3"
                    />

                    <label htmlFor="newPassword">New Password</label>
                    <input
                        value={register.values.newPassword}
                        onBlur={register.handleBlur}
                        onChange={register.handleChange}
                        name="newPassword"
                        type="password"
                        className="form-control mb-3"
                    />

                    <button
                        type="submit"
                        className="btn bg-main text-white mb-3"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}



