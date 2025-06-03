const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema({
  nomeDoCurso: String,
});

module.exports = mongoose.model("Curso", cursoSchema);