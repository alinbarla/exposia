const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../public/exposia logo.png');
const outputDir = path.join(__dirname, '../public');

// Favicon sizes needed
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'favicon.ico', size: 32 }, // ICO format
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'web-app-manifest-192x192.png', size: 192 },
  { name: 'web-app-manifest-512x512.png', size: 512 },
];

async function generateFavicons() {
  try {
    // Check if logo exists
    if (!fs.existsSync(logoPath)) {
      console.error(`Logo file not found: ${logoPath}`);
      process.exit(1);
    }

    console.log('Generating favicons...');

    for (const { name, size } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      if (name.endsWith('.ico')) {
        // For ICO, we'll create a PNG first, then convert
        // Note: sharp doesn't directly support ICO, so we'll create PNG and rename
        // Most browsers accept PNG as favicon.ico
        await sharp(logoPath)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .png()
          .toFile(outputPath);
        console.log(`✓ Generated ${name} (${size}x${size})`);
      } else {
        await sharp(logoPath)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .png()
          .toFile(outputPath);
        console.log(`✓ Generated ${name} (${size}x${size})`);
      }
    }

    // Also create favicon.svg if we want (optional)
    // For now, we'll keep the existing favicon.svg or create a simple one
    
    console.log('\n✅ All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

