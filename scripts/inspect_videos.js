const fs = require('fs');

function getMp4Resolution(filePath) {
  const buf = fs.readFileSync(filePath);
  // Search for 'tkhd' atom
  for (let i = 0; i < buf.length - 84; i++) {
    if (buf.toString('ascii', i, i + 4) === 'tkhd') {
      // version is at i + 4
      const version = buf[i + 4];
      const offset = version === 1 ? i + 88 : i + 76;
      if (offset + 8 <= buf.length) {
        const width = buf.readUInt32BE(offset) / 65536;
        const height = buf.readUInt32BE(offset + 4) / 65536;
        if (width > 0 && height > 0) {
          return { width, height };
        }
      }
    }
  }
  return null;
}

const videos = [
  'public/videos/reelform.mp4',
  'public/videos/reel2.mp4',
  'public/videos/reel3.mp4',
  'public/videos/reel4.mp4',
  'public/videos/reel5.mp4',
  'src/videos/reelform.mp4'
];

for (const v of videos) {
  if (fs.existsSync(v)) {
    console.log(v, getMp4Resolution(v), 'size:', fs.statSync(v).size);
  } else {
    console.log(v, 'NOT FOUND');
  }
}
