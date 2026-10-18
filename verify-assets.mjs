// Confere se TODA mídia citada em src/data/media.json existe em public/ (respeitando maiúsculas/minúsculas).
// Sai com erro (exit 1) se faltar algo, para o deploy falhar de forma visível em vez de subir sem fotos.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'src/data/media.json'), 'utf8'));

const paths = new Set();
const collect = (v) => {
  if (Array.isArray(v)) v.forEach(collect);
  else if (v && typeof v === 'object') Object.values(v).forEach(collect);
  else if (typeof v === 'string' && v.startsWith('/assets/')) paths.add(v);
};
collect(data);

// Checagem sensível a maiúsculas: compara cada segmento com o que realmente existe no disco.
function existsExact(urlPath) {
  let dir = join(root, 'public');
  for (const seg of urlPath.split('/').filter(Boolean)) {
    let names;
    try { names = readdirSync(dir); } catch { return false; }
    if (!names.includes(seg)) return false;
    dir = join(dir, seg);
  }
  return statSync(dir).isFile() && statSync(dir).size > 0;
}

const missing = [...paths].filter((p) => !existsExact(p));
if (missing.length) {
  console.error('\n❌ Mídias referenciadas que NÃO existem em public/:');
  missing.forEach((m) => console.error('   - ' + m));
  process.exit(1);
}
console.log(`✅ ${paths.size} arquivos de mídia conferidos em public/ — nenhum faltando.`);
