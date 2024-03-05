import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Verify() {
    const [errors, setErrors] = useState('')

    let navigate = useNavigate()

    function sendValidation(num) {
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", num)
            .then(({ data }) => {
                console.log(data)
                if (data.status == 'Success') {
                    // localStorage.setItem('token', data.token);
                    navigate('/restPassword')
                    console.log(data)

                }
            }).catch((Error) => {
                console.log();
                setErrors(Error.response.data.statusMsg);

            })

    }

    function validationSchema2() {
        let schema = new Yup.object({
            resetCode: Yup.string().required(),

        });
        return schema;
    }

    let login = useFormik({
        initialValues: {
            resetCode: "",
        },
        // validate
        validationSchema2,
        onSubmit: (values) => {

            sendValidation(values);
        },
    });

    return (
        <>
            <div className="w-75 m-auto pt-5">
                <h2>Forgot Password</h2>
                <p>A code will be sent to you</p>

                <form className="pt-3" onSubmit={login.handleSubmit}>
                    <label htmlFor="ResetCode">Code</label>
                    <input
                        value={login.values.resetCode}
                        name="resetCode"
                        onBlur={login.handleBlur}
                        onChange={login.handleChange}
                        type="text"
                        className="form-control mb-3"
                    />
                    {login.errors.resetCode && login.touched.resetCode ? (
                        <div className="alert alert-danger">{login.errors.resetCode}</div>
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
