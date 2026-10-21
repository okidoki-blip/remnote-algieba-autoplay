import {build} from 'esbuild';
import {mkdir,writeFile,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await build({entryPoints:['index.tsx','playback.tsx','setup.tsx'],bundle:true,loader:{'.css':'text'},outdir:'dist',format:'iife',platform:'browser',target:'es2020',minify:true,define:{'process.env.NODE_ENV':'"production"'}});
await writeFile('dist/index.html','<!doctype html><html><head><meta charset="utf-8"></head><body><script>const name=new URLSearchParams(location.search).get("widgetName");if(["index","playback","setup"].includes(name)){const s=document.createElement("script");s.src=name+".js";document.body.appendChild(s);}else{document.body.textContent="Flashcard Audio Autoplay — load this address through RemNote’s development plugin interface.";}</script></body></html>');
for(const name of ['manifest.json','snippet.css','README.md']) await copyFile(name,'dist/'+name);
await writeFile('dist/.nojekyll','');
