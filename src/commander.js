import { program } from "commander";

program
    .option("-m, --mode <mode>", "environment mode", "development")
    .option("-p, --port <port>", "server port", 8080)
    .option("-d, --debug", "debug mode", false)
    .parse();


console.log("options", program.opts())
console.log("others", program.args)


export default program;