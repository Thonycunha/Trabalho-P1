import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import styles from "../index.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const generateError = (err) => toast.error(err,{
    position: "bottom-right",
  }) 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/login", {
        ...values,
      },{
        withCredentials:true,
      });
      if (data) {
        if (data.errors) {
          for (const error of data.errors) {
            generateError(error);
          }
        } else {
          navigate('/')
        }
      }
    } catch (err) {}
  };
  return (
    <div className={styles.container}>
      <h2>login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have a account? <Link to="/register">Register</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
