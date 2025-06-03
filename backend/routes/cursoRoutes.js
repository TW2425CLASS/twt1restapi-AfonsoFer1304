const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");

/**
 * @openapi
 * /cursos:
 *   get:
 *     summary: Lista todos os cursos
 *     description: Retorna uma lista de todos os cursos registados
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 */
router.get("/", cursoController.getCursos);

/**
 * @openapi
 * /cursos/{id}:
 *   get:
 *     summary: Detalhes de um curso
 *     description: Retorna os detalhes de um curso pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do curso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do curso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 */
router.get("/:id", cursoController.getCursoById);

/**
 * @openapi
 * /cursos:
 *   post:
 *     summary: Cria um novo curso
 *     description: Cria um curso com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       201:
 *         description: Curso criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 */
router.post("/", cursoController.createCurso);

/**
 * @openapi
 * /cursos/{id}:
 *   put:
 *     summary: Atualiza um curso existente
 *     description: Atualiza os dados de um curso pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do curso
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       200:
 *         description: Curso atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 */
router.put("/:id", cursoController.updateCurso);

/**
 * @openapi
 * /cursos/{id}:
 *   delete:
 *     summary: Apaga um curso
 *     description: Remove um curso pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do curso
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Curso apagado
 */
router.delete("/:id", cursoController.deleteCurso);

module.exports = router;