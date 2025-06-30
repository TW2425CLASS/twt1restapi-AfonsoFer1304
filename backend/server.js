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
      { url: "https://tw-restapi-afonsofer1304.onrender.com/api" },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(express.json());

// Servir frontend estático (se tiver)
// Muda o "public" para a pasta que tem o teu frontend build
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
app.use("/api/alunos", require("./routes/alunoRoutes"));
app.use("/api/cursos", require("./routes/cursoRoutes"));

// Rota fallback para o frontend SPA (single page app)
// Usa "*" para capturar todas as rotas que não são API
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Conectar ao MongoDB e iniciar servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🔌 Ligado ao MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor a correr na porta ${PORT}`);
      console.log(
        `📘 Documentação da API disponível em: https://tw-restapi-afonsofer1304.onrender.com/api-docs`
      );
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao ligar ao MongoDB:", err);
  });
