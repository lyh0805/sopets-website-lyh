const fs = require('fs');
const { createCanvas } = require('canvas');

// Create pets directory if it doesn't exist
if (!fs.existsSync('public/pets')) {
  fs.mkdirSync('public/pets', { recursive: true });
}

// Generate 14 placeholder pet images
for (let i = 0; i < 14; i++) {
  // Create a 400x400 canvas (same size as typical pet images)
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 80%)`;
  ctx.fillRect(0, 0, 400, 400);

  // Draw a simple pet shape
  ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`;
  ctx.beginPath();
  ctx.arc(200, 200, 100, 0, Math.PI * 2);
  ctx.fill();

  // Add some details
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(170, 170, 20, 0, Math.PI * 2);
  ctx.arc(230, 170, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(170, 170, 10, 0, Math.PI * 2);
  ctx.arc(230, 170, 10, 0, Math.PI * 2);
  ctx.fill();

  // Add pet number
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`Pet ${i}`, 200, 250);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`public/pets/pet_${i}.png`, buffer);
}

console.log('Generated 14 placeholder pet images in public/pets/'); 