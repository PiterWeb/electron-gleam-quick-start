import fs from 'fs';
import path from 'path';

async function copyFolder(src, dest) {
    await fs.promises.mkdir(dest, { recursive: true }); // Create the folders if it doesn't exist

    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyFolder(srcPath, destPath); // Copy the folder recursively
        } else {
            await fs.promises.copyFile(srcPath, destPath); // Copy the file
        }
    }
}

// Copies the wrapper folder to the build folder
copyFolder('./src_gleam/src/js_wrapper', './src_gleam/build/dev/javascript/main/js_wrapper')