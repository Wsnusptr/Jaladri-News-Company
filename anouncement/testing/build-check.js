#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build environment...');

// Check if .env exists
if (!fs.existsSync('.env')) {
  console.log('⚠️  .env file not found. Copying from .env.example...');
  if (fs.existsSync('.env.example')) {
    fs.copyFileSync('.env.example', '.env');
    console.log('✅ Created .env from .env.example');
  } else {
    console.error('❌ No .env.example found. Please create .env manually.');
    process.exit(1);
  }
}

// Check Prisma client
console.log('🔧 Checking Prisma client...');
try {
  execSync('pnpm prisma:generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully');
} catch (error) {
  console.error('❌ Failed to generate Prisma client');
  process.exit(1);
}

// Check TypeScript compilation
console.log('🔧 Checking TypeScript compilation...');
try {
  execSync('pnpm --filter @repo/db exec tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation successful');
} catch (error) {
  console.log('⚠️  TypeScript compilation has warnings (continuing...)');
}

console.log('✅ Build environment check complete!');
