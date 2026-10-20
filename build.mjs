import {build} from 'esbuild';
import {mkdir, writeFile, copyFile} from 'node:fs/promises';
await mkdir('dist', {recursive:true});
await build({entryPoints:['index.tsx','playback.tsx'],bundle:true,loader:{'.css':'text'},outdir:'dist',format:'iife',platform:'browser',target:'es2020',minify:true,define:{'process.env.NODE_ENV':'"production"'}});
await writeFile('dist/index.html', `<!doctype html><html><head><meta charset="utf-8"></head><body><script>
const name=new URLSearchParams(location.search).get('widgetName');
if(['index','playback'].includes(name)){const s=document.createElement('script');s.src=name+'.js';document.body.appendChild(s);}
</script></body></html>`);
await copyFile('manifest.json','dist/manifest.json');
await copyFile('snippet.css','dist/snippet.css');
await copyFile('README.md','dist/README.md');

