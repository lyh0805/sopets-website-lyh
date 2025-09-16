const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Ensure the features directory exists
const featuresDir = path.join(process.cwd(), 'public', 'features');
if (!fs.existsSync(featuresDir)) {
  fs.mkdirSync(featuresDir, { recursive: true });
}

// Image configuration
const images = [
  { name: 'roaming', color: '#4C1D95' }, // Purple
  { name: 'personality', color: '#1D4ED8' }, // Blue
  { name: 'customization', color: '#047857' }, // Green
  { name: 'cross_device', color: '#B91C1C' }, // Red
];

// Create images with 19:6 aspect ratio
const width = 1900;
const height = 600;

images.forEach(({ name, color }) => {
  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // Add some visual interest with a gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgba(0,0,0,0.2)');
  gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.4)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add a pattern of circles
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 100 + 50;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(featuresDir, `${name}.jpg`), buffer);
  console.log(`Generated ${name}.jpg`);
});

console.log('All feature images generated successfully!'); 