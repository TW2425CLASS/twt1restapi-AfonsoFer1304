const Aluno = require("../models/Aluno");

// GET (Todos os alunos)
exports.getAlunos = async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
};

// POST (Novo aluno)
exports.createAluno = async (req, res) => {
  const aluno = new Aluno(req.body);
  await aluno.save();
  res.status(201).json(aluno);
};

// PUT (Atualizar aluno)
exports.updateAluno = async (req, res) => {
  const alunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(alunoAtualizado);
};

// DELETE (Eliminar aluno)
exports.deleteAluno = async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
