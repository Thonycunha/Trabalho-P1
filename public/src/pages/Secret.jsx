import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import styles from "../App.module.css";

export default function Secret() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:3000",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        }
        sessionStorage.setItem("nome", data.nome);
        sessionStorage.setItem("email", data.user);
        getTodos();
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);
  const logOut = () => {
    sessionStorage.clear();
    removeCookie("jwt");
    navigate("/login");
  };

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisbility, setInputVisility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  const nome = sessionStorage.getItem("nome");
  const email = sessionStorage.getItem("email");

  async function handleWithNewButton() {
    setInputVisility(!inputVisbility);
  }

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisility(true);
  }

  async function getTodos() {
    const email = sessionStorage.getItem("email");
    const response = await axios.get(`http://localhost:3333/todos/${email}`);
    setTodos(response.data);
  }

  async function editTodo() {
    const response = await axios.put("http://localhost:3333/todos", {
      id: selectedTodo.id,
      name: inputValue,
    });
    setSelectedTodo();
    setInputVisility(false);
    getTodos();
    setInputValue("");
  }

  async function createTodo() {
    console.log(email);
    const response = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
      id_usuario: email,
    });
    getTodos();
    setInputVisility(!inputVisbility);
    setInputValue("");
  }

  async function modifyStatusTodo(todo) {
    const response = await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  }

  async function deleteTodo(todo) {
    const response = await axios.delete(
      `http://localhost:3333/todos/${todo.id}`
    );
    getTodos();
  }

  const Todos = ({ todos }) => {
    return (
      <div className={styles.todos}>
        {todos.map((todos) => {
          return (
            <div className={styles.todo}>
              <button
                onClick={() => {
                  modifyStatusTodo(todos);
                }}
                className={styles.checkbox}
                style={{ backgroundColor: todos.status ? "#A879E6" : "white" }}
              ></button>
              <p>{todos.name}</p>
              <button
                onClick={() => handleWithEditButtonClick(todos)}
                className={styles.botaoespecifico}
              >
                <AiOutlineEdit />
              </button>
              <button
                onClick={() => {
                  deleteTodo(todos);
                }}
                className={styles.botaoespecifico}
              >
                <AiOutlineDelete />
              </button>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className={styles.Secret}>
      <header className={styles.containerTodo}>
        <div className={styles.header}>
          <h1>{nome}</h1>
        </div>
        <Todos todos={todos}></Todos>
        <input
          value={inputValue}
          style={{ display: inputVisbility ? "block" : "none" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className={styles.inputName}
        ></input>
        <button
          onClick={
            inputVisbility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className={styles.newTaskButton}
        >
          {" "}
          {inputVisbility ? "Confirmar" : "Nova Tarefa"}
        </button>
        <button className={styles.newTaskButton} onClick={(event) => {logOut()}}> Deslogar </button>
      </header>
    </div>
  );
}
