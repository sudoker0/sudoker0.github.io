"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_watch_1 = __importDefault(require("node-watch"));
const pug_1 = require("pug");
const promises_1 = require("fs/promises");
const node_dir_1 = __importDefault(require("node-dir"));
const path_1 = __importDefault(require("path"));
const PUG_FILE = /(?<!^\_.*)\.pug$/;
const IGNORED_DIR = /(node_modules)|(\.git)/;
function render(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const p = path_1.default.parse(path);
        if (!PUG_FILE.test(p.base))
            return false;
        yield (0, promises_1.writeFile)(`${p.dir}${p.dir == "" ? "" : path_1.default.sep}${p.base.replace(PUG_FILE, ".html")}`, (0, pug_1.renderFile)(path, {
            doctype: "html",
            pretty: false,
            self: true,
            string: {}
        }), { encoding: "utf-8", });
        console.log("Compiled: " + path);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Now compiling");
    node_dir_1.default.files(".", (_e, f) => {
        for (const e of f) {
            if (IGNORED_DIR.test(e))
                continue;
            const p = path_1.default.parse(e);
            if (!PUG_FILE.test(p.base))
                continue;
            render(e);
        }
    });
    if (process.argv[2] == "--watch") {
        console.log("Now watching for changes");
        (0, node_watch_1.default)(".", {
            recursive: true,
            filter(f, skip) {
                if (IGNORED_DIR.test(f))
                    return skip;
                return /\.pug$/.test(f);
            },
        }, (_ev, path) => {
            render(path);
        });
    }
}))();
//# sourceMappingURL=compilePug.js.map