import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//.env должен быть в директории из которой запускается процесс
dotenv.config();

if (!process.env.OPENAPI_URL) {
  throw new Error('OPENAPI_URL is not set');
}

const OPENAPI_URL = process.env.OPENAPI_URL;

const OUT = path.resolve(__dirname, 'openapi.json');

/**
 * OpenAPI 3.0 не принимают `const` в части схем — заменяем на `enum: [value]`.
 */
function replaceConstWithEnum(node) {
  if (node === null || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const item of node) replaceConstWithEnum(item);
    return;
  }
  for (const key of Object.keys(node)) {
    if (key === 'const') continue;
    replaceConstWithEnum(node[key]);
  }
  if (Object.prototype.hasOwnProperty.call(node, 'const')) {
    if (!Object.prototype.hasOwnProperty.call(node, 'enum')) {
      node.enum = [node.const];
    }
    delete node.const;
  }
}

const res = await fetch(OPENAPI_URL);

if (!res.ok) {
  throw new Error(`OpenAPI fetch failed: ${res.status} ${res.statusText} (${OPENAPI_URL})`);
}

const spec = await res.json();

replaceConstWithEnum(spec);
fs.writeFileSync(OUT, `${JSON.stringify(spec, null, 2)}\n`, 'utf8');
console.info(`Wrote ${path.relative(process.cwd(), OUT)}`);
