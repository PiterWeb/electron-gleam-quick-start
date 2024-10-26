import fs from 'fs';
import path from 'path';

async function copyFolder(src, dest) {
    await fs.promises.mkdir(dest, { recursive: true }); // Crea el destino si no existe

    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyFolder(srcPath, destPath); // Copia recursivamente la subcarpeta
        } else {
            await fs.promises.copyFile(srcPath, destPath); // Copia el archivo
        }
    }
}

copyFolder('./src_gleam/src/js_wrapper', './src_gleam/build/dev/javascript/main/js_wrapper')