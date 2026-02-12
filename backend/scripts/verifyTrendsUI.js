const fs = require('fs');

const path = 'c:/Users/korup/OneDrive/Desktop/LoreZone-main/LoreZone-main/frontend/src/pages/Trends.js';
const content = fs.readFileSync(path, 'utf8');

if (content.includes('.masonry-grid') && content.includes('column-count')) {
    console.log('✅ Masonry layout detected in Trends.js');
} else {
    console.error('❌ Masonry layout NOT found in Trends.js');
}
