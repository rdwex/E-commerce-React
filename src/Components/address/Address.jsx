import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { storeContext } from "../Context/storeContext";

export default function Address() {
    let navigate = useNavigate()
    let { id } = useParams()

    let [btnloading, setBtnLoading] = useState(true)
    let { pay } = useContext(storeContext)


    // function sendData(values) {
    //     axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
    //         .then(({ data }) => {
    //             console.log(data)
    //             if (data.message == 'success') {
    //                 localStorage.setItem('token', data.token);
    //                 navigate('/home')
    //             }
    //         }).catch((Error) => {
    //             console.log();
    //             setErrors(Error.response.data.message);

    //         })

    // }

    async function payOnline(value) {
        let data = await pay(id, value)
        console.log(data);
        if (data.status == 'success') {
            window.location.href = data.session.url
        }
    }


    let address = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: (value) => {
            payOnline(value);
        },
    });

    return (
        <>
            <div className="w-75 m-auto pt-5 mt-5">
                <h2>Address Now</h2>
                <form className="pt-3" onSubmit={address.handleSubmit}>
                    <label htmlFor="Details">Details</label>

                    <textarea value={address.values.details}
                        name="details"
                        onBlur={address.handleBlur}
                        onChange={address.handleChange}
                        type="text"
                        className="form-control mb-3"
                        id="details" cols="20" rows="5"></textarea>

                    <label htmlFor="Phone">Phone Number</label>
                    <input
                        value={address.values.phone}
                        name="phone"
                        onBlur={address.handleBlur}
                        onChange={address.handleChange}
                        type="phone"
                        className="form-control mb-3"
                        id="phone"
                    />

                    <label htmlFor="City">City </label>
                    <input
                        value={address.values.city}
                        name="city"
                        onBlur={address.handleBlur}
                        onChange={address.handleChange}
                        type="text"
                        className="form-control mb-3"
                        id="city"
                    />

                    <button
                        type="submit"
                        className="btn bg-main text-white mb-3"
                    >
                        Order Now
                    </button>
                </form>
            </div>
        </>
    );
}
