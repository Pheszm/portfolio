import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const filePath = path.join(process.cwd(), 'public', 'Gallardo_CV.pdf');

  try {
    const stat = fs.statSync(filePath);

    res.setHeader('Content-Type', 'application/pdf');
    // dompdf-style: stream inline (Attachment = 0)
    res.setHeader('Content-Disposition', 'inline; filename="Gallardo_CV.pdf"');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'public, max-age=3600, immutable');

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.status(500).end('Error reading file');
      } else {
        res.end();
      }
    });

    stream.pipe(res);
  } catch (e) {
    if (e && e.code === 'ENOENT') {
      return res.status(404).json({ error: 'File not found' });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
