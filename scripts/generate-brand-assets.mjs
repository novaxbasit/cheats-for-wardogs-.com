import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const brandDir = path.join(root, 'public/images/brand');
const publicDir = path.join(root, 'public');

function resolveSource(argvPath) {
  if (argvPath && fs.existsSync(argvPath)) return path.resolve(argvPath);
  const png = path.join(brandDir, 'brand-logo-source.png');
  if (fs.existsSync(png)) return png;
  const webp = path.join(brandDir, 'brand-logo.webp');
  if (fs.existsSync(webp)) return webp;
  throw new Error('Pass a source image path or add public/images/brand/brand-logo-source.png');
}

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

function resizeSquare(input, size) {
  return sharp(input).resize(size, size, { fit: 'contain', background: transparent });
}

async function main() {
  const source = resolveSource(process.argv[2]);
  fs.mkdirSync(brandDir, { recursive: true });

  const masterWebp = path.join(brandDir, 'brand-logo.webp');
  await resizeSquare(source, 512).webp({ quality: 88, effort: 4 }).toFile(masterWebp);
  console.log(`Wrote ${path.relative(root, masterWebp)}`);

  for (const width of [32, 64, 128, 512]) {
    const output = path.join(brandDir, `brand-logo-${width}.webp`);
    await resizeSquare(source, width).webp({ quality: 85, effort: 4 }).toFile(output);
    console.log(`Wrote ${path.relative(root, output)}`);
  }

  await resizeSquare(source, 32).png().toFile(path.join(publicDir, 'favicon-32.png'));
  await resizeSquare(source, 16).png().toFile(path.join(publicDir, 'favicon-16.png'));
  await resizeSquare(source, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await resizeSquare(source, 32).toFile(path.join(publicDir, 'favicon.ico'));

  console.log('Brand logo and favicon assets updated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
