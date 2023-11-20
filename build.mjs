//@ts-check
import pug from "pug"
import * as sass from "sass"
import typescript from "typescript"

import chalk from "chalk"
import {
    existsSync,
    mkdirSync,
    readdirSync,
    statSync,
    copyFileSync,
    writeFileSync,
    readFileSync,
    rmSync,
    rmdirSync
} from "fs"
import { extname, join, parse, sep as pathSeparator } from "path"
import { emptyDirSync } from "fs-extra"

/**
 * @param  {...string} content
 */
function errorReport(...content) {
    console.log(chalk.bgRed.white.bold('[ERROR]'), chalk.redBright(content.join("\n")))
}

/**
 * @param  {...string} content
 */
function logReport(...content) {
    console.log(chalk.bgCyan.white.bold('[LOG]'), chalk.cyanBright(content.join("\n")))
}

/**
 * Recursive copy everything in a directory
 * @param {string} source
 * @param {string} target
 */
function recursiveCopy(source, target) {
    logReport(`Copying from "${source}" to "${target}"`)

    if (!existsSync(source)) {
        errorReport(`Source directory "${source}" does not exist.`)
        return
    }

    if (!existsSync(target)) {
        mkdirSync(target)
    }

    const items = readdirSync(source)
    for (const i of items) {
        const sourcePath = join(source, i)
        const targetPath = join(target, i)

        if (statSync(sourcePath).isDirectory()) {
            recursiveCopy(sourcePath, targetPath)
        } else {
            logReport(` - ${sourcePath} -> ${targetPath}`)
            copyFileSync(sourcePath, targetPath)
        }
    }
}

/**
 * @param {string} dir The path to the directory
 * @param {string} ext The file extension
 * @param {string[]} filesList
 */
function listFiles(dir, ext = "", filesList = []) {
    const items = readdirSync(dir)
    for (const i of items) {
        const filePath = join(dir, i)
        if (statSync(filePath).isDirectory()) {
            listFiles(filePath, ext, filesList)
        } else {
            if (extname(filePath) == `.${ext}`) {
                filesList.push(filePath)
            }
        }
    }
    return filesList
}

/**
 * @param {string} path
 */
function compilePugFile(path) {
    logReport(`Compiling Pug source: "${path}"`)
    const PUG_FILE = /(?<!^\_.*)\.pug$/
    const p = parse(path)

    if (!PUG_FILE.test(p.base)) {
        logReport(`Ignored: "${path}" due to being in the list of ignored files.`)
        return
    }

    try {
        const content = pug.renderFile(path, {
            doctype: "html",
            pretty: false,
            self: true,
            string: {
                // Foundation for i18n
            }
        })
        writeFileSync(
            `${p.dir}${p.dir == "" ? "" : pathSeparator}${p.base.replace(PUG_FILE, ".html")}`,
            content,
            { encoding: "utf-8", })
        logReport(`Compiled: "${path}"`)
    }
    catch(e) {
        errorReport(
            "Unable to compile Pug file into HTML file, details is attached below:",
            "----------PUG_ERROR_LOG_BEGIN----------",
            `AFFECTED_FILE: ${path}`,
            e,
            "----------PUG_ERROR_LOG_END------------"
        )
    }
}

/**
 * @param {string} path
 */
function compileSCSSFile(path) {
    logReport(`Compiling SCSS source: "${path}"`)
    const SCSS_FILE = /(?<!^\_.*)\.scss$/
    const p = parse(path)

    if (!SCSS_FILE.test(p.base)) {
        logReport(`Ignored: "${path}" due to being in the list of ignored files.`)
        return
    }

    try {
        const content = sass.compile(path, { style: "compressed", sourceMap: true })
        writeFileSync(
            `${p.dir}${p.dir == "" ? "" : pathSeparator}${p.base.replace(SCSS_FILE, ".css")}`,
            content.css,
            { encoding: "utf-8", })
        logReport(`Compiled: "${path}"`)
    } catch (e) {
        errorReport(
            "Unable to compile SCSS file into CSS file, details is attached below:",
            "----------SCSS_ERROR_LOG_BEGIN----------",
            `AFFECTED_FILE: ${path}`,
            e,
            "----------SCSS_ERROR_LOG_END------------"
        )
    }
}

/**
 * @param {string} path
 * @param {string} confFilePath
 */
function compileTSFile(path, confFilePath) {
    logReport(`Compiling TypeScript source: "${path}"`)
    const TS_FILE = /(?<!^\_.*)\.ts$/
    const p = parse(path)

    if (!TS_FILE.test(p.base)) {
        logReport(`Ignored: "${path}" due to being in the list of ignored files.`)
        return
    }

    try {
        const sourceContent = readFileSync(path, 'utf8')
        const confContent = readFileSync(confFilePath, 'utf8')
        const tsConfig = JSON.parse(confContent)

        const content = typescript.transpileModule(sourceContent, {
            compilerOptions: tsConfig
        })

        writeFileSync(
            `${p.dir}${p.dir == "" ? "" : pathSeparator}${p.base.replace(TS_FILE, ".js")}`,
            content.outputText,
            { encoding: "utf-8", })
        logReport(`Compiled: "${path}"`)
    } catch (e) {
        errorReport(
            "Unable to compile TypeScript file into JavaScript file, details is attached below:",
            "----------TS_ERROR_LOG_BEGIN----------",
            `AFFECTED_FILE: ${path}`,
            e,
            "----------TS_ERROR_LOG_END------------"
        )
    }
}

/**
 * @param {string} path
 */
async function deleteSourceFile(path) {
    logReport(`Deleting source file in: "${path}"`)
    const sourceFileExt = ["pug", "scss", "ts"]
    for (const i of sourceFileExt) {
        const files = listFiles("dist", i)

        for (const j of files) {
            logReport(` - ${j}`)
            rmSync(j)
        }
    }
}

/**
 * @param {string} path
 */
function deleteEmptyDir(path) {
    logReport(`Deleting empty directory in: "${path}"`)
    try {
        const items = readdirSync(path)
        for (const i of items) {
            const itemPath = join(path, i)
            if (statSync(itemPath).isDirectory()) {
                deleteEmptyDir(itemPath)

                const subItems = readdirSync(itemPath)
                if (subItems.length == 0) {
                    rmdirSync(itemPath)
                    logReport(` - ${itemPath}`)
                }
            }
        }
    } catch (e) {

    }
}

async function main() {
    //? Remove all contents from `dist` (if there's any)
    try {
        logReport(`Compiled file detected, now deleting.`)
        emptyDirSync("dist")
    } catch (e) {
        errorReport("Unable to clear content of `dist`, details is attached below:", e)
    }

    logReport("--------------------")

    //? Copy the content of `src` to `dist`
    try {
        recursiveCopy("src", "dist")
    } catch (e) {
        errorReport("Unable to copy content from `src` to `dist`, details is attached below:", e)
    }

    logReport("--------------------")

    //? Compile Pug file to HTML file
    const pugFiles = listFiles("dist", "pug")
    for (const i of pugFiles) {
        compilePugFile(i)
    }

    logReport("--------------------")

    //? Compile SCSS file to CSS file
    const scssFile = listFiles("dist", "scss")
    for (const i of scssFile) {
        compileSCSSFile(i)
    }

    logReport("--------------------")

    //? Compile TS file to JS file
    const tsFile = listFiles("dist", "ts")
    for (const i of tsFile) {
        compileTSFile(i, "tsconfig.json")
    }

    logReport("--------------------")
    //? Delete all source file and empty directory in the dist directory
    deleteSourceFile("dist")
    deleteEmptyDir("dist")
}

await main()