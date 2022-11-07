import watch from "node-watch"
import { renderFile } from "pug"
import { writeFile } from "fs/promises"
import dir from "node-dir"
import npath from "path"
const PUG_FILE = /(?<!^\_.*)\.pug$/
const IGNORED_DIR = /(node_modules)|(\.git)/

async function render(path: string) {
    const p = npath.parse(path);
    if (!PUG_FILE.test(p.base)) return false;
    try {
        const content = renderFile(path, {
            doctype: "html",
            pretty: false,
            self: true,
            string: {
                // Foundation for i18n
            }
        })
        await writeFile(`${p.dir}${p.dir == "" ? "" : npath.sep}${p.base.replace(PUG_FILE, ".html")}`, content, { encoding: "utf-8", })
        console.log("Compiled: " + path);
    }
    catch(e) {
        console.error(
            "Error: An error has occurred which make the process of rendering Pug file into HTML file unable to finish. Detail of the error will be attached below:\n\n",
            "----------ERROR_LOG_BEGIN----------\n",
            `AFFECTED_FILE: ${path}\n`,
            e,
            "----------ERROR_LOG_END----------\n"
        )
    }
}

(async () => {
    console.log("Now compiling")
    dir.files(".", (_e, f) => {
        for (const e of f) {
            if (IGNORED_DIR.test(e)) continue;
            const p = npath.parse(e);
            if (!PUG_FILE.test(p.base)) continue;
            render(e);
        }
    })
    if (process.argv[2] == "--watch") {
        console.log("Now watching for changes")
        watch(".", {
            recursive: true,
            filter(f, skip) {
                if (IGNORED_DIR.test(f)) return skip;
                return /\.pug$/.test(f);
            },
        }, (_ev, path) => {
            render(path);
        })
    }
})();