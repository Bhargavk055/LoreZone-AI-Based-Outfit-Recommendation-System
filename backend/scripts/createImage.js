const fs = require('fs');
const path = require('path');

// Minimal 1x1 pixel PNG
const pngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

fs.writeFileSync(path.join(__dirname, 'test_image.png'), pngBuffer);
console.log('✅ Created test_image.png');
