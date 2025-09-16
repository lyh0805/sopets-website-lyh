const fs = require('fs');
const path = require('path');

const createDirectories = () => {
  const directories = [
    'public/assets/pets',
    'public/assets/backgrounds',
    'public/assets/animations',
    'src/app/components/layout',
    'src/app/components/home',
    'src/app/components/mint',
    'src/app/components/auth',
    'src/app/lib/auth',
    'src/app/lib/blockchain',
    'src/app/lib/animations',
  ];

  directories.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};

const createPlaceholderFiles = () => {
  const files = [
    'public/assets/pets/.gitkeep',
    'public/assets/backgrounds/.gitkeep',
    'public/assets/animations/.gitkeep',
  ];

  files.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, '');
      console.log(`Created file: ${file}`);
    }
  });
};

const main = () => {
  console.log('Initializing project structure...');
  createDirectories();
  createPlaceholderFiles();
  console.log('Project structure initialized successfully!');
};

main(); 