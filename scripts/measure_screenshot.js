const fs = require('fs');

const imgPath = 'C:/Users/DELL/.gemini/antigravity/brain/af50b963-76f6-4abb-8716-70a2289d5e07/.user_uploaded/media_1794822894699_cd1f3116.jpg';

try {
  const buf = fs.readFileSync(imgPath);
  console.log('Image buffer size:', buf.length);
  // Find JPEG dimensions
  let offset = 2;
  while (offset < buf.length) {
    if (buf[offset] !== 0xFF) break;
    const marker = buf[offset + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buf.readUInt16BE(offset + 5);
      const width = buf.readUInt16BE(offset + 7);
      console.log(`User Screenshot Resolution: ${width}x${height}`);
      break;
    }
    offset += 2 + buf.readUInt16BE(offset + 2);
  }
} catch (e) {
  console.error(e);
}
