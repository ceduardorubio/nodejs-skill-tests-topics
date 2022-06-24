import util from "util";
import fs from "fs";

fs.stat(".", (err, stats) => {
    if (err) {
        console.log(err);
    } else {
        console.log(stats);
    }
});

const stat = util.promisify(fs.stat);
stat('.').then((stats) => {
    console.log(stats);
}).catch((error) => {
    console.log(error);
});