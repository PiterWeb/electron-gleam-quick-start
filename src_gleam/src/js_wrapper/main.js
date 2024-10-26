import electron from "electron";

const {BrowserWindow, app} = electron;

/**
 * Get a new BrowserWindow instance
 * @param {Electron.BrowserWindowConstructorOptions} options - BrowserWindow options
 * @returns {BrowserWindow}
 */
export function getBrowserWindow(options) {
    return new BrowserWindow(options);
}

/**
 * Load a file in a BrowserWindow
 * @param {BrowserWindow} window - BrowserWindow instance
 */
export function loadFile(window, file) {
    window.loadFile(file);
}

/**
 * App when ready
 * @param {Function} createWindow - Function to create a window
 * @returns {void}
 */
export function appWhenReady(createWindow) {
    if (!app) return console.error("Error: Electron app is not defined");

    app.whenReady()
        .then(() => {
            createWindow();

            app.on("activate", function () {
                if (BrowserWindow.getAllWindows().length === 0) createWindow();
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

/**
 * App on window all closed
 * @param {Function} callback - Callback function
 * @returns {void}
 */
export function onWindowAllClosed(callback) {
    if (!app) return console.error("Error: Electron app is not defined");

    app.on("window-all-closed", function () {
        callback();
        if (process.platform !== "darwin") app.quit();
    });
}
