const fs = require('fs');

function inspectMp4(path) {
  const fd = fs.openSync(path, 'r');
  const buf = Buffer.alloc(4096);
  fs.readSync(fd, buf, 0, 4096, 0);
  fs.closeSync(fd);
  
  // Look for ftyp and major brand
  const ftypIdx = buf.indexOf('ftyp');
  let brand = 'unknown';
  if (ftypIdx !== -1) {
    brand = buf.toString('ascii', ftypIdx + 4, ftypIdx + 8);
  }
  return { brand, size: fs.statSync(path).size };
}

for (const f of ['public/videos/reelform.mp4', 'public/videos/reel2.mp4', 'public/videos/reel3.mp4', 'public/videos/reel4.mp4', 'public/videos/reel5.mp4']) {
  console.log(f, inspectMp4(f));
}
