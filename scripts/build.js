const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const filesToCopy = ['index.html'];

filesToCopy.forEach((file) => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(distDir, file);

  fs.copyFileSync(srcPath, destPath);
});

console.log('Build completed. Files copied to dist/.');

