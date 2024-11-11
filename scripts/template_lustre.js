import child_process from "child_process";
const { exec } = child_process;

export async function main() {

    exec("cd ./src_gleam & gleam add lustre & gleam add --dev lustre_dev_tools", (error, stdout, stderr) => {
        if (stderr) {
            console.error(stderr);
            return;
        }
        console.log(stdout);

        

    })

}
