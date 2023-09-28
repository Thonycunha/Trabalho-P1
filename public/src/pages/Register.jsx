import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import styles from "../index.module.css";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const generateError = (err) => toast.error(err,{
    position: "bottom-right",
  }) 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/register", {
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
      <h2>register</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="name"
            name="name"
            placeholder="name"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
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
          Already have a account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
