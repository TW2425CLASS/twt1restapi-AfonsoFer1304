const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Aluno = require('../models/Aluno');
const Curso = require('../models/Curso');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔌 Ligado ao MongoDB Atlas");

    // Limpar coleções
    await Aluno.deleteMany();
    await Curso.deleteMany();
    console.log("🗑️ Coleções limpas");

    // Caminho correto para o bd.json dentro de /backend/mock-data
    const dataPath = path.join(__dirname, '../mock-data/bd.json');

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Inserir cursos
    const cursosInseridos = await Curso.insertMany(
      data.cursos.map(curso => ({ nomeDoCurso: curso.nomeDoCurso }))
    );
    console.log(`✅ ${cursosInseridos.length} curso(s) inserido(s)`);

    // Inserir alunos
    const alunosInseridos = await Aluno.insertMany(data.alunos);
    console.log(`✅ ${alunosInseridos.length} aluno(s) inserido(s)`);

    console.log("🎉 Migração concluída com sucesso!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Erro durante a migração:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

migrate();