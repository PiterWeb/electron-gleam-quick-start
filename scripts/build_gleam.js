import child_process from "child_process";
const { exec } = child_process;

exec("cd ./src_gleam & gleam build -t javascript", (error, stdout, stderr) => {
    if (stderr) {
        console.error(stderr);
        return;
    }
    console.log(stdout);
});
