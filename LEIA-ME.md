# Pacote de mídia – Lu Corrêa Animal Care

Tudo que o site precisa de fotos, logo e vídeos, já com nomes seguros para a Vercel (minúsculas, sem espaço, sem acento).

## Conteúdo
- `public/assets/images/` – 8 fotos (JPG otimizado)
- `public/assets/logo/` – logo com fundo transparente (PNG), logo com fundo branco, ícone 512, apple-touch-icon e favicon
- `public/assets/videos/` – 5 vídeos verticais (720x1280) + pôster (capa) de cada um
- `src/data/media.json` – lista central de TODAS as mídias (caminho, texto alternativo, proporção, foco da imagem e uso sugerido)
- `scripts/verify-assets.mjs` – confere se cada mídia citada existe em `public/`; falha o build se faltar algo

## Como colocar no GitHub
1. Descompacte o ZIP.
2. No repositório, clique em **Add file → Upload files** e arraste as pastas `public`, `src` e `scripts` (o GitHub mantém a estrutura de pastas).
   - Se o repositório já tiver `public/` ou `src/`, as pastas se mesclam; não apague nada existente.
3. Clique em **Commit changes**.
4. Confira no GitHub que `public/assets/images/` lista as 8 fotos. Se aparecem lá, a Vercel as publica.

## Ligar a verificação ao build (package.json)
```json
"scripts": {
  "prebuild": "node scripts/verify-assets.mjs"
}
```
(Se já existir `prebuild`, junte com `&&`.)

## Teste depois do deploy
Abra `https://SEU-SITE.vercel.app/assets/images/lu-retrato-com-bulldog.jpg`. Se abrir a foto, os arquivos estão publicados.

## Atenção
- **Next.js e Vite:** use caminhos que começam com `/assets/...` (exatamente como no `media.json`).
- **Vídeos:** use `muted`, `playsInline`, `loop` e `poster` para tocar no celular. `atendimento-05` traz o texto "QUEM AMA CUIDA DA SAÚDE" gravado no vídeo e um bloco branco no topo; revise se quer usá-lo.
- **`lu-retrato-sereno.jpg`** tem só 763x1146 px (foi recortada de um post do Instagram); use em tamanho pequeno ou peça o arquivo original ao fotógrafo.
- Os vídeos `atendimento-01` a `04` já trazem a marca d'água da logo.
