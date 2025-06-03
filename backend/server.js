// API real a ser implementada
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/alunos", require("./routes/alunoRoutes"));
app.use("/api/cursos", require("./routes/cursoRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Ligado ao MongoDB Atlas");
    console.log("http://localhost:3000/api/alunos");
    app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));
  })
  .catch(err => console.error("Erro ao ligar ao MongoDB:", err));
