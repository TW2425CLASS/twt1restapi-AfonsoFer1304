// docs/swaggerOptions.js
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestão de Alunos",
      version: "1.0.0",
      description: "Documentação automática da API RESTful",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      schemas: {
        Aluno: {
          type: "object",
          properties: {
            _id: { type: "string" },
            nome: { type: "string" },
            apelido: { type: "string" },
            curso: { type: "string" },
            anoCurricular: { type: "integer" }
          },
          required: ["nome", "apelido", "curso", "anoCurricular"]
        },
        Curso: {
          type: "object",
          properties: {
            _id: { type: "string" },
            nomeDoCurso: { type: "string" }
          },
          required: ["nomeDoCurso"]
        }
      }
    }
  },
  apis: ["./routes/*.js"], // Caminho para os ficheiros de rotas
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;