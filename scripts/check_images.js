const fs = require('fs');

const files = [
  'public/media/story-01-first-meet.jpg',
  'public/media/story-02-first-date.jpg',
  'public/media/story-03-adventures.png',
  'public/media/story-04-proposal.png',
  'public/media/story-05-engaged.png'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    console.log(f, fs.statSync(f).size);
  } else {
    console.log(f, 'MISSING');
  }
}
