const fs = require('fs');
const path = require('path');

// Create both directories
const dirs = [
  'C:\\Users\\tomba\\source\\repos\\Portfolio-1\\src\\app\\data',
  'C:\\Users\\tomba\\source\\repos\\Portfolio-1\\src\\assets\\img\\projects'
];

dirs.forEach(dir => {
  try {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  } catch (err) {
    console.error(`✗ Failed to create ${dir}: ${err.message}`);
  }
});

// Verify both directories exist
console.log('\nVerifying directories:');
dirs.forEach(dir => {
  try {
    const stats = fs.statSync(dir);
    if (stats.isDirectory()) {
      console.log(`✓ Confirmed: ${dir}`);
    }
  } catch (err) {
    console.error(`✗ Directory not found: ${dir}`);
  }
});
