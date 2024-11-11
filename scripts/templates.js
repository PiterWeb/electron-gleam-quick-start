import "console";

const templates = ["lustre"];

console.info("\x1b[30mTemplates loaded: \x1b[0m \n", templates, "\n");

if (templates.length === 0) {
    console.error("No templates found.");
    process.exit(1);
}

console.info("\x1b[30mSelect template:\r\t\x1b[0m");

templates.forEach((template, index) => {
    console.info(`- \x1b[32m${template}\x1b[0m \x1b[34m[${index}]\x1b[0m`);
});

console.info("\n");
console.info(
    "\x1b[44mEnter the number of the template you want to use:\x1b[0m"
);

let template = null;

process.stdin.once("data", async (data) => {
    try {
        const strData = data.toString().trim();

        if (!isNumeric(strData)) {
            throw new Error("Invalid input. Please enter a number.");
        }

        const index = parseInt(data.toString());

        template = templates[index];

        if (!template) {
            throw new Error("Invalid template index.");
        }
    } catch (error) {
        console.error(`\x1b[41m${error.message}\x1b[0m`);
        process.exit(1);
    }

    console.info("\n");
    console.info(
        `\x1b[44mSelected template:\x1b[0m \x1b[32m${template}\x1b[0m`
    );

    const { main } = await import(`./template_${template}.js`);

    await main();

});

function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
}
