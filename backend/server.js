// server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestão de Alunos",
      version: "1.0.0",
      description: "Documentação automática da API RESTful"
    },
    servers: [
      { url: "http://localhost:3000/api" }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/alunos", require("./routes/alunoRoutes"));
app.use("/api/cursos", require("./routes/cursoRoutes"));

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🔌 Ligado ao MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Servidor a correr na porta ${PORT}`);
      console.log(`Documentação da API: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error("❌ Erro ao ligar ao MongoDB:", err);
  });