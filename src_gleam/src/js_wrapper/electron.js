import electron from "electron";

const { BrowserWindow, app } = electron;

/**
 * Get a new BrowserWindow instance
 * @param {Electron.BrowserWindowConstructorOptions} options - BrowserWindow options
 * @returns {BrowserWindow}
 */
export function getBrowserWindow(options) {
    const optionsJS = mapGleamToJSObject(options);

    return new BrowserWindow(optionsJS);
}

/**
 * Map Gleam object to JavaScript object
 * @template T
 * @param {T} obj - Gleam object
 * @returns {T} - JavaScript object
 */
function mapGleamToJSObject(obj) {
    /** @type {Object} */
    const objJS = {};

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const element = obj[key];

            if (element instanceof Object) {
                if (element.constructor.name === "None") continue;
            }

            if (Object.hasOwnProperty.call(element, "0")) {
                if (element["0"] instanceof Object) {
                    if (element["0"].constructor.name === "None") {
                        objJS[snakeToCamel(key)] = undefined;
                    } else
                        objJS[snakeToCamel(key)] = mapGleamToJSObject(
                            element["0"]
                        );
                } else objJS[snakeToCamel(key)] = element["0"] || undefined;

                continue;
            }

            objJS[snakeToCamel(key)] = mapGleamToJSObject(element);
        }
    }

    return objJS;
}

function snakeToCamel(str) {
    return str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace("-", "").replace("_", "")
        );
}

/**
 * Load a file in a BrowserWindow
 * @param {BrowserWindow} window - BrowserWindow instance
 * @param {string} file - File path
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
