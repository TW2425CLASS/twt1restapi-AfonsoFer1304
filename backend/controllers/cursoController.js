const Curso = require("../models/Curso");

// GET Todos os cursos
exports.getCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Curso por ID
exports.getCursoById = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) {
      return res.status(404).json({ msg: "Curso não encontrado" });
    }
    res.json(curso);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST Novo curso
exports.createCurso = async (req, res) => {
  try {
    const curso = new Curso(req.body);
    await curso.save();
    res.status(201).json(curso);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT Atualizar curso
exports.updateCurso = async (req, res) => {
  try {
    const cursoAtualizado = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cursoAtualizado) {
      return res.status(404).json({ msg: "Curso não encontrado" });
    }
    res.json(cursoAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Eliminar curso
exports.deleteCurso = async (req, res) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.id);
    if (!curso) {
      return res.status(404).json({ msg: "Curso não encontrado" });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};