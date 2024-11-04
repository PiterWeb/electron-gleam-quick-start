/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

async function preload() {
    const module = await import('./src_gleam/build/dev/javascript/main/preload.mjs');
    module.preload();
  }
  
preload();