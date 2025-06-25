require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 3000;

// Detectar ambiente
const isProduction = process.env.NODE_ENV === "production";

// Base URL para Swagger (usar variável ou fallback)
const baseUrl = isProduction
  ? process.env.BASE_URL || `https://tw-restapi-afonsofer1304.onrender.com`
  : `http://localhost:${PORT}`;

// Configuração Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestão de Alunos",
      version: "1.0.0",
      description: "Documentação automática da API RESTful",
    },
    servers: [
      { url: `${baseUrl}/api` }
    ],
  },
  apis: ["./routes/*.js"], // ajuste conforme a localização dos seus arquivos de rota
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Middlewares
app.use(cors());
app.use(express.json());

// Documentação da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/api/alunos", require("./routes/alunoRoutes"));
app.use("/api/cursos", require("./routes/cursoRoutes"));

// Conexão com MongoDB e inicialização do servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🔌 Ligado ao MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Servidor a correr na porta ${PORT}`);
      console.log(`Documentação da API: ${baseUrl}/api-docs`);
    });
  })
  .catch(err => {
    console.error("❌ Erro ao ligar ao MongoDB:", err);
  });
