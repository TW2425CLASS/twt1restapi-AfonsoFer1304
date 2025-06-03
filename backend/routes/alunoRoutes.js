const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");

/**
 * @openapi
 * /alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     description: Retorna uma lista de todos os alunos registados
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 */
router.get("/", alunoController.getAlunos);

/**
 * @openapi
 * /alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     description: Cria um aluno com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: Aluno criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 */
router.post("/", alunoController.createAluno);

/**
 * @openapi
 * /alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno existente
 *     description: Atualiza os dados de um aluno pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do aluno
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 */
router.put("/:id", alunoController.updateAluno);

/**
 * @openapi
 * /alunos/{id}:
 *   delete:
 *     summary: Apaga um aluno
 *     description: Remove um aluno pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do aluno
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Aluno apagado
 */
router.delete("/:id", alunoController.deleteAluno);

module.exports = router;