const fs = require('fs');

function findBox(buffer, boxType) {
  let offset = 0;
  while (offset < buffer.length - 8) {
    const size = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    if (type === boxType) {
      return { offset, size };
    }
    if (size === 0 || size === 1) break;
    offset += size;
  }
  return null;
}

try {
  const fd = fs.openSync('public/videos/background-video.mp4', 'r');
  const buffer = Buffer.alloc(1024 * 1024); // 1MB
  fs.readSync(fd, buffer, 0, buffer.length, 0);
  fs.closeSync(fd);
  
  // Search for 'tkhd' in the buffer
  for (let i = 0; i < buffer.length - 84; i++) {
    if (buffer.toString('ascii', i, i + 4) === 'tkhd') {
      const version = buffer.readUInt8(i + 4);
      let widthOffset = i + (version === 1 ? 88 : 76);
      let heightOffset = widthOffset + 4;
      if (heightOffset + 4 <= buffer.length) {
        const width = buffer.readUInt32BE(widthOffset) >> 16;
        const height = buffer.readUInt32BE(heightOffset) >> 16;
        if (width > 0 && height > 0) {
          console.log(`Track found: ${width}x${height}`);
        }
      }
    }
  }
} catch (e) {
  console.error(e);
}
