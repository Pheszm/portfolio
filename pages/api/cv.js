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

    // Tagged by size + mtime so replacing the PDF invalidates every cached copy.
    // It used to be sent as `immutable`, which told browsers and the CDN never to
    // revalidate, so an updated CV could keep serving stale for an hour.
    const etag = `"${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}"`;

    res.setHeader('Content-Type', 'application/pdf');
    // dompdf-style: stream inline (Attachment = 0)
    res.setHeader('Content-Disposition', 'inline; filename="Gallardo_CV.pdf"');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('ETag', etag);
    res.setHeader('Last-Modified', stat.mtime.toUTCString());
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');

    // Unchanged since the visitor's copy: skip the body, keep the fast path.
    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end();
    }

    res.setHeader('Content-Length', stat.size);

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
