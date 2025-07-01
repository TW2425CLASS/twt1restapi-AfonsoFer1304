require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestão de Alunos",
      version: "1.0.0",
      description: "Documentação automática da API RESTful",
    },
    servers: [
      { url: "https://tw-restapi-afonsofer1304.onrender.com/api" }, // BACKEND URL
    ],
  },
  apis: ["./routes/*.js"], // Swagger vai ler as anotações nos ficheiros de rotas
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Middlewares
app.use(cors({
  origin: "https://twrestapi-app.onrender.com", // Permite apenas o teu frontend
}));
app.use(express.json());

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Servir frontend estático
app.use(express.static(path.join(__dirname, "../frontend")));

// Rotas da API
app.use("/api/alunos", require("./routes/alunoRoutes"));
app.use("/api/cursos", require("./routes/cursoRoutes"));

// Fallback para SPA (qualquer rota que não comece por /api ou /api-docs)
app.get(/^\/(?!api|api-docs).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Conexão com MongoDB e arranque do servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🔌 Ligado ao MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor a correr na porta ${PORT}`);
      console.log(`📘 API docs: https://tw-restapi-afonsofer1304.onrender.com/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao ligar ao MongoDB:", err);
  });
