// api/templates.js
const csfx = require('../templates/csfx');
const ubec = require('../templates/ubec');
const unica = require('../templates/unica');

export default function handler(req, res) {
    const templates = [csfx, ubec, unica];
    res.status(200).json(templates.map(t => ({ id: t.id, nome: t.nome })));
}