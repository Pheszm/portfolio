import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { folder } = req.query;

  if (!folder || typeof folder !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid folder parameter' });
  }

  // Prevent path traversal and ensure only safe folder names
  const sanitized = folder.replace(/[^a-zA-Z0-9_\-\/]/g, '');
  if (sanitized !== folder || folder.includes('..')) {
    return res.status(400).json({ error: 'Invalid folder name' });
  }

  const baseDir = path.join(process.cwd(), 'public', 'WorksAssets');
  const targetDir = path.join(baseDir, folder);

  try {
    // Ensure the directory is within baseDir
    const relative = path.relative(baseDir, targetDir);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      return res.status(400).json({ error: 'Folder is out of bounds' });
    }

    if (!fs.existsSync(targetDir)) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    const entries = fs.readdirSync(targetDir, { withFileTypes: true });
    const exts = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg']);
    const files = entries
      .filter((e) => e.isFile() && exts.has(path.extname(e.name).toLowerCase()))
      .map((e) => `/WorksAssets/${folder}/${e.name}`);

    // Sort for stable ordering
    files.sort();

    return res.status(200).json({ images: files });
  } catch (err) {
    console.error('Error reading folder', folder, err);
    return res.status(500).json({ error: 'Failed to read images' });
  }
}
