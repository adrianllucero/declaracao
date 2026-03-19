// api/templates.js
const csfx = require('../templates/csfx');
const ubec = require('../templates/ubec');
const unica = require('../templates/unica');
const unica = require('../templates/prominas');

export default function handler(req, res) {
    const templates = [csfx, ubec, unica, prominas];
    res.status(200).json(templates.map(t => ({ id: t.id, nome: t.nome })));
}