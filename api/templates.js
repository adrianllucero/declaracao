const { csfx, ubec, unica } = require('../templates');

export default function handler(req, res) {
  const templates = [csfx, ubec, unica];
  res.status(200).json(templates.map(t => ({ id: t.id, nome: t.nome })));
}