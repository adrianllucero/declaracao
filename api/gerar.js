import { gerarPdf } from '../services/pdfService';
import csfx from '../templates/csfx';
import ubec from '../templates/ubec';
import unica from '../templates/unica';

const templates = [csfx, ubec, unica];

export default async function handler(req, res) {
  try {
    const { templateId, dados } = req.body;
    const template = templates.find(t => t.id === templateId);
    if (!template) return res.status(404).send('Template não encontrado');

    const buffer = await gerarPdf(template, dados);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');
    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao gerar PDF');
  }
}