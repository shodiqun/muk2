const fs = require('fs');
const path = require('path');

const distIndex = path.join(__dirname, '..', 'dist', 'index.html');

if (fs.existsSync(distIndex)) {
  console.log('Test passed: dist/index.html exists.');
  process.exit(0);
} else {
  console.error('Test failed: dist/index.html does not exist.');
  process.exit(1);
}

