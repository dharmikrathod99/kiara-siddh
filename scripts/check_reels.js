const fs = require('fs');

const reels = [
  'public/videos/reel1.mp4',
  'public/videos/reel2.mp4',
  'public/videos/reel3.mp4',
  'public/videos/reel4.mp4',
  'public/videos/reel5.mp4'
];

for (const r of reels) {
  if (fs.existsSync(r)) {
    console.log(r, fs.statSync(r).size);
  } else {
    console.log(r, 'MISSING');
  }
}
