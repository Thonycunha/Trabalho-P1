const express = require("express");

const todosRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

todosRoutes.post("/todos", async (req, res) => {
  const { name, id_usuario } = req.body;
  const todo = await prisma.todo.create({
    data: {
      name,
      status: false,
      id_usuario,
    },
  });
  return res.status(201).json(todo);
});

todosRoutes.get("/todos/:id_usuario", async (req, res) => {
  const { id_usuario } = req.params;

  const todos = await prisma.todo.findMany({
    where: {
      id_usuario: id_usuario,
    },
  });
  return res.status(200).json(todos);
});


todosRoutes.put("/todos", async (req, res) => {
  const { id, name, status } = req.body;

  if (!id) {
    return res.status(400).json("ID é obrigatório");
  }

  const TodoExists = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!TodoExists) return res.status(400).json("ID não existe");

  const todos = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      name,
      status,
    },
  });
  return res.status(200).json(todos);
});

todosRoutes.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const intId = parseInt(id);

  if (!intId) {
    return res.status(400).json("ID é obrigatório");
  }

  const TodoExists = await prisma.todo.findUnique({
    where: {
        id: intId,
    },
  });

  if (!TodoExists) return res.status(400).json("ID não existe");

  const todos = await prisma.todo.delete({
    where: {
        id: intId,
    },
  });
  return res.status(200).json(todos);
});

module.exports = todosRoutes;
