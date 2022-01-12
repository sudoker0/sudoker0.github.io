var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const buildNumber = "0.0.5-alpha+20220112170700";
class TerminalString extends String {
    constructor({ str = "", isOverlayedByCursor = false, isEndOfLine = false }) {
        super(str);
        this.overlayedByCursor = false;
        this.endOfLine = false;
        this.overlayedByCursor = isOverlayedByCursor;
        this.endOfLine = isEndOfLine;
    }
}
class Calculation {
    constructor() {
        this._symbols = {};
        this.defineOperator("!", this.factorial, "postfix", 6);
        this.defineOperator("^", Math.pow, "infix", 5, true);
        this.defineOperator("*", this.multiplication, "infix", 4);
        this.defineOperator("/", this.division, "infix", 4);
        this.defineOperator("+", this.last, "prefix", 3);
        this.defineOperator("-", this.negation, "prefix", 3);
        this.defineOperator("+", this.addition, "infix", 2);
        this.defineOperator("-", this.subtraction, "infix", 2);
        this.defineOperator(",", Array.of, "infix", 1);
        this.defineOperator("(", this.last, "prefix");
        this.defineOperator(")", null, "postfix");
        this.defineOperator("min", Math.min);
        this.defineOperator("sqrt", Math.sqrt);
    }
    defineOperator(symbol, f, notation = "func", precedence = 0, rightToLeft = false) {
        if (notation === "func")
            precedence = 0;
        this._symbols[symbol] = Object.assign({}, this._symbols[symbol], {
            [notation]: { symbol, f, notation, precedence, rightToLeft, argCount: 1 + (notation === "infix" ? 1 : 0) },
            symbol,
            regSymbol: symbol.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + (/\w$/.test(symbol) ? "\\b" : "")
        });
    }
    last(...a) { return a[a.length - 1]; }
    negation(a) { return -a; }
    addition(a, b) { return a + b; }
    subtraction(a, b) { return a - b; }
    multiplication(a, b) { return a * b; }
    division(a, b) { return a / b; }
    factorial(a) {
        if (a % 1 || !(+a >= 0))
            return NaN;
        if (a > 170)
            return Infinity;
        let b = 1;
        while (a > 1)
            b *= a--;
        return b;
    }
    calculate(expression) {
        let match;
        const values = [], operators = [this._symbols["("].prefix], exec = () => {
            let op = operators.pop();
            values.push(op.f(...[].concat(...values.splice(-op.argCount))));
            return op.precedence;
        }, error = (msg) => {
            let notation = match ? match.index : expression.length;
            return `${msg} at ${notation}:\\n${expression}\\n${' '.repeat(notation)}^`;
        }, pattern = new RegExp("\\d+(?:\\.\\d+)?|"
            + Object.keys(this._symbols).map(e => this._symbols[e])
                .sort((a, b) => b.symbol.length - a.symbol.length)
                .map(val => val.regSymbol).join('|')
            + "|(\\S)", "g");
        let afterValue = false;
        pattern.lastIndex = 0;
        do {
            match = pattern.exec(expression);
            const [token, bad] = match || [")", undefined], notNumber = this._symbols[token], notNewValue = notNumber && !notNumber.prefix && !notNumber.func, notAfterValue = !notNumber || !notNumber.postfix && !notNumber.infix;
            if (bad || (afterValue ? notAfterValue : notNewValue))
                return error("Syntax error");
            if (afterValue) {
                const curr = notNumber.postfix || notNumber.infix;
                do {
                    const prev = operators[operators.length - 1];
                    if (((curr.precedence - prev.precedence) || prev.rightToLeft) > 0)
                        break;
                } while (exec());
                afterValue = curr.notation === "postfix";
                if (curr.symbol !== ")") {
                    operators.push(curr);
                    if (afterValue)
                        exec();
                }
            }
            else if (notNumber) {
                operators.push(notNumber.prefix || notNumber.func);
                if (notNumber.func) {
                    match = pattern.exec(expression);
                    if (!match || match[0] !== "(")
                        return error("Function needs parentheses");
                }
            }
            else {
                values.push(+token);
                afterValue = true;
            }
        } while (match && operators.length);
        return operators.length
            ? error("Missing closing parenthesis") : match
            ? error("Too many closing parentheses") : values.pop();
    }
}
const util = {
    getId: (elementId) => {
        return document.getElementById(elementId);
    },
    getTextWidth: (canvas, text, font) => {
        const context = canvas.getContext("2d");
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    },
    calculateAvaliableColsAndRows: (canvas, textWidth, textHeight, terminalMargin = 0) => {
        var availCol = Math.floor((canvas.width - terminalMargin * 2) / textWidth);
        var availRow = Math.floor((canvas.height - terminalMargin * 2) / textHeight);
        return { availCol, availRow };
    },
    drawTerminal: (terminal, ctx, screenData, font, terminalMargin = 0, bgColor, fgColor) => {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, terminal.width, terminal.height);
        ctx.fillStyle = fgColor;
        ctx.font = font;
        for (let i = 0; i < screenData.length; i++) {
            for (let j = 0; j < screenData[i].length; j++) {
                ctx.fillText(screenData[i][j].valueOf(), terminalMargin + j * textWidth, terminalMargin + i * textHeight + textHeight);
            }
        }
    },
    drawScrollBar: (scrollBar, ctx, scrollBarThumbHeight, y, sbColor, sbThumbColor) => {
        ctx.fillStyle = sbThumbColor;
        ctx.fillRect(0, 0, scrollBar.width, scrollBar.height);
        ctx.fillStyle = sbColor;
        ctx.fillRect(0, Math.min(scrollBar.height - Math.round(scrollBarThumbHeight), Math.max(0, Math.round(y))), scrollBar.width, Math.round(scrollBarThumbHeight));
    },
    wrapTerminalContent: (displayContent, maxCols) => {
        let wrappedContent = [];
        let currentLine = [];
        for (let i = 0; i < displayContent.length; i++) {
            for (let j = 0; j < displayContent[i].length; j++) {
                if (currentLine.length === maxCols) {
                    wrappedContent.push(currentLine);
                    currentLine = [];
                }
                currentLine.push(displayContent[i][j]);
            }
            if (currentLine.length > 0 || displayContent[i].length <= 0) {
                wrappedContent.push(currentLine);
                currentLine = [];
            }
        }
        return wrappedContent;
    },
    cutToFit: (wrappedContent, maxRows, caretPos) => {
        if (caretPos.y - maxRows >= 0) {
            wrappedContent = wrappedContent.slice(caretPos.y - maxRows + 1, caretPos.y + 1);
        }
        else {
            wrappedContent = wrappedContent.slice(0, maxRows);
        }
        return wrappedContent;
    },
    findString: (arr) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j].overlayedByCursor) {
                    return { x: j, y: i };
                }
            }
        }
        return null;
    },
    analyzeCommand: (command) => {
        var total_func = [];
        var listcommand = util.escapeString(command)
            .replace(/("([^"]*)")|('([^']*)')|(`([^`]*)`)/g, (_, ...p1) => {
            var p2 = (p1[1] || p1[3] || p1[5]) || "";
            return "\"" + p2.split("").map((x) => { return `{#n6[${x.charCodeAt(0)}]}`; }).join("") + "\"";
        })
            .replace(/\s+/g, ' ')
            .trim()
            .split(/(\s*\w*\(.*?\))(?:;)/g)
            .filter((x) => { return x.trim().length > 0; });
        listcommand.forEach((x) => {
            x = x.trim();
            var command;
            var _arguments;
            x.replace(/(^\w+)\s*(\(.*\))$/gm, (_m, p1, p2, _o, _str) => {
                command = p1;
                var arg = p2.substring(1, p2.length - 1).split(/\s*,\s*/g);
                console.log(arg);
                _arguments = {};
                var args = arg.map((v) => {
                    var _args = v.split(/\s*=\s*/g);
                    return {
                        name: _args[0],
                        value: _args[1]
                    };
                });
                args.forEach(x => _arguments[x.name] = x.value);
                return p1 + p2;
            });
            total_func.push({
                command: command,
                args: _arguments
            });
        });
        total_func.forEach((x) => {
            for (const i in x.args) {
                x.args[i] = util.unescapeString(x.args[i]);
            }
        });
        return total_func;
    },
    removeStringIndicator: (str) => {
        return str.replace(/(((^\")|(^\')|(^\`))(.*)((\"$)|(\'$)|(\`$)))/g, "$6");
    },
    checkArgs: (validArgs, inputArgs) => {
        var extra = [], missing = [];
        inputArgs.forEach((v) => { if (validArgs.indexOf(v) <= -1) {
            extra.push(v);
        } });
        extra = extra.filter(s => s.trim() != "");
        validArgs.forEach((v) => { if (inputArgs.indexOf(v) <= -1) {
            missing.push(v);
        } });
        missing = missing.filter(s => s.trim() != "");
        return {
            extra: extra,
            missing: missing
        };
    },
    saveAs: (blob, fileName) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
        a.remove();
    },
    escapeString: (str) => { return str.replace(/\\([^n])/g, (_, p1) => { return `{#n6[${p1.charCodeAt(0)}]}`; }); },
    unescapeString: (str) => { return str === null || str === void 0 ? void 0 : str.replace(/{#n6\[(\d*)\]}/g, (_, p1) => { return String.fromCharCode(parseInt(p1)); }); },
    migrateObj: (oldObj, newObj) => {
        oldObj = Object.keys(newObj).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: oldObj[key] == null || oldObj[key] == undefined ? newObj[key] : oldObj[key] })), {});
        return oldObj;
    },
    areArraysEqualSets: (a1, a2) => {
        const superSet = {};
        for (const i of a1) {
            const e = i + typeof i;
            superSet[e] = 1;
        }
        for (const i of a2) {
            const e = i + typeof i;
            if (!superSet[e]) {
                return false;
            }
            superSet[e] = 2;
        }
        for (let e in superSet) {
            if (superSet[e] === 1) {
                return false;
            }
        }
        return true;
    },
    varStrWithStr: (str) => {
        str = str.replace(/{@([a-zA-Z0-9_]+?)}/g, (_, $1) => {
            for (const value in window["INBOSH_VARIABLES"]) {
                if (value == $1) {
                    return window["INBOSH_VARIABLES"][value].value;
                }
            }
        });
        return str;
    },
    openFile: () => {
        return new Promise((resolve, reject) => {
            const readFile = function (e) {
                var file = e.target["files"][0];
                if (!file) {
                    return null;
                }
                var reader = new FileReader();
                reader.onload = function (e) {
                    var contents = e.target.result;
                    document.body.removeChild(fileInput);
                    resolve(contents);
                };
                reader.onerror = function (e) {
                    reject(e);
                };
                reader.readAsText(file);
            };
            const fileInput = document.createElement("input");
            fileInput.type = 'file';
            fileInput.style.display = 'none';
            fileInput.onchange = readFile;
            fileInput.accept = ".ibs";
            document.body.appendChild(fileInput);
            fileInput.click();
        });
    },
    verifyProdKey: (p) => { if (!(/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(p))) {
        return false;
    } p = p.replace(/\-/g, ""); var a = p.replace(/\-/g, "").split("").map(x => parseInt(x, 16)); const s = (num) => { for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0)
            return false; return num > 1; }; const o = (k) => { var y = 0; var h = k.length; var o = h % 2; for (var i = 0; i < h; ++i) {
        var q = parseInt(k.charAt(i), 16);
        if (i % 2 == o) {
            q *= 2;
            if (q > 9)
                q -= 9;
        }
        y += q;
    } return (y % 10) == 0; }; var v = Math.floor((a.filter((x, i) => i % 2 == 0 && i != 0).reduce((a, b) => a + b, 0) + a.filter((_, i) => i % 2 == 1 && i != 15).reduce((a, b) => a + b, 0)) % 10); if ((v != a[0]) || ((a[1] + a[2] + a[3]) % 7 != 0) || (Math.ceil(Math.sqrt((a[4] + a[5]) * 5 + 9)) % 2 != 0) || ((a[3] + a[4]) % 2 == 0) || (((a[6] + a[8]) * a[7]) % 12 != 0) || (!s(a[14])) || (!o(p))) {
        return false;
    } return true; }
};
const $terminal = util.getId("terminal");
const $terminalCtx = $terminal.getContext("2d");
const $scrollbar = util.getId("scrollbar");
const $scrollbarCtx = $scrollbar.getContext("2d");
const font = "20px Inconsolata";
const textWidth = util.getTextWidth($terminal, "#", font);
const textHeight = 20;
const terminalMargin = 5;
const regexCheck = {
    string: /(^\"[^\"]*\"(.*?)$)|(^\'[^\']*\'(.*?)$)|(^\`[^\`]*\`(.*?)$)/,
    number: /^[+-]?(\d+\.?\d*|\.\d+)(.*?)$/,
    boolean: /true|false/,
};
var commandHistory = {
    history: [],
    current_index: 0,
};
var terminalContent = [[new TerminalString({ isEndOfLine: true, isOverlayedByCursor: true })]];
var displayContent = [[]];
var availSpace;
var charThatCaretsAreOn = new TerminalString({});
var caretPos = {
    x: 0,
    y: 0
};
var cursorPos = {
    x: 0,
    y: 0
};
var prevCaretPos = {
    x: 0,
    y: 0
};
var scrollbarConfig = {
    y: 0,
    height: 0,
    leftClick: false,
};
var state = {
    ready: false,
    commandRunning: false,
    allowInput: true,
    movingPage: false,
    insertedNumberOfLetters: 0,
    command: "",
};
var config = {
    configVersion: buildNumber,
    debounceResize: true,
    debounceResizeTime: 100,
    enableScrollBar: true,
    scrollBarWidth: 20,
    scrollBar_AmountToScroll: 5,
    commandPrompt: "> ",
    showBootScreen: true,
    foregroundColor: "#ffffff",
    backgroundColor: "#000000",
    cursorColor: "#ffffff",
    scrollBarColor: "#808080",
    scrollBarThumbColor: "#404040",
};
window["INBOSH_VARIABLES"] = {};
const commandList = [
    {
        name: "test",
        args: [
            {
                name: "a1",
                type: "string | number",
            },
            {
                name: "a2",
                type: "boolean",
            },
            {
                name: "a3",
                type: "number",
                optionalValue: "1",
            },
        ],
        description: "This is a test command",
        func: (args) => __awaiter(this, void 0, void 0, function* () {
            console.log(args);
            for (var i in args) {
                yield insertString([`${i}: ${args[i]}`], true);
            }
        })
    },
    {
        name: "help",
        args: [
            {
                name: "command",
                type: "string",
                optionalValue: "\"\"",
            }
        ],
        description: "Display a list of avaliable commands or for a specific command",
        func: (args) => __awaiter(this, void 0, void 0, function* () {
            const _ = (i) => __awaiter(this, void 0, void 0, function* () {
                yield insertString([
                    `Command: ${i.name} ${!!i.flag ? "[" : ""}${(!!i.flag ? i.flag : []).join(", ")}${!!i.flag ? "]" : ""}`,
                    `Syntax: ${i.name}(${i.args.map(x => x.name + (x.optionalValue ? "?" : "") + ": " + x.type).join(", ")})`,
                    `Description: ${i.description}`,
                    `------------------------------`
                ], true);
            });
            const header = [`==============================`, `INBOSH v${buildNumber} - Help Page`, `Flag that might appear on certain command:`, ` - [ND]: Won't work if the command is entered directly into the terminal`, `------------------------------`];
            const footer = [`==============================`];
            commandList.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
            if (args["command"] == undefined || args["command"] == "") {
                yield insertString(header, true);
                for (var i of commandList) {
                    _(i);
                }
                yield insertString(footer, true);
            }
            else {
                var j = commandList[commandList.map(x => x.name).indexOf(util.removeStringIndicator(args["command"]))];
                if (j == undefined) {
                    yield insertString([`[ERROR]: Command ${args["command"]} not found.`], true);
                }
                else {
                    yield insertString(header, true);
                    yield _(j);
                    yield insertString(footer, true);
                }
            }
        })
    },
    {
        name: "var",
        args: [
            {
                name: "name",
                type: "string",
            },
            {
                name: "value",
                type: "string | number | boolean",
            },
        ],
        description: "Set a variable",
        func: (args) => __awaiter(this, void 0, void 0, function* () {
            args["name"] = util.removeStringIndicator(args["name"]);
            if (args["name"] == undefined) {
                yield insertString([`[ERROR]: Variable name not specified.`], true);
            }
            else if (args["value"] == undefined) {
                yield insertString([`[ERROR]: Variable value not specified.`], true);
            }
            else if (args["name"].match(/[^a-zA-Z0-9_]/)) {
                yield insertString([`[ERROR]: Variable name must only contain letters, numbers, and underscores.`], true);
            }
            else {
                var i = args["name"];
                console.log(i);
                var j = args["value"];
                var k = "";
                if (!(j.match(regexCheck.string) || j.match(regexCheck.number) || j.match(regexCheck.boolean))) {
                    yield insertString([`[ERROR]: Variable value must be a string, number, or boolean.`], true);
                }
                j = util.removeStringIndicator(j);
                if (j == undefined) {
                    yield insertString([`[ERROR]: Variable value not specified.`], true);
                }
                else {
                    window["INBOSH_VARIABLES"][i] = {
                        value: j,
                        type: k
                    };
                    yield insertString([`[SUCCESS]: Variable ${i} set to ${j}`], true);
                }
            }
        })
    },
    {
        name: "print",
        args: [
            {
                name: "value",
                type: "string | number | boolean",
            },
        ],
        description: "Print the provided value to the terminal",
        func: (args) => __awaiter(this, void 0, void 0, function* () {
            if (args["value"] == undefined) {
                yield insertString([`[ERROR]: Value not specified.`], true);
            }
            else {
                var i = args["value"];
                if (!(i.match(regexCheck.string) || i.match(regexCheck.number) || i.match(regexCheck.boolean))) {
                    yield insertString([`[ERROR]: Value must be a string, number, or boolean.`], true);
                }
                i = util.removeStringIndicator(util.varStrWithStr(util.escapeString(i)));
                if (i == undefined) {
                    yield insertString([`[ERROR]: Value not specified.`], true);
                }
                else {
                    yield insertString(util.unescapeString(i).split("\\n"), true);
                }
            }
        })
    },
    {
        name: "calc",
        args: [
            {
                name: "expression",
                type: "string",
            },
            {
                name: "varname",
                type: "string",
            }
        ],
        description: "Calculate using the provided expression and store the result in the provided variable",
        func: (args) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            if (args["expression"] == undefined) {
                yield insertString([`[ERROR]: Value not specified.`], true);
            }
            else {
                var i = args["expression"];
                var j = args["varname"];
                if (!(i.match(regexCheck.string) || i.match(regexCheck.number) || i.match(regexCheck.boolean))) {
                    yield insertString([`[ERROR]: Value must be a string, number, or boolean.`], true);
                    return;
                }
                if (!(j.match(regexCheck.string) || j.match(regexCheck.number) || j.match(regexCheck.boolean))) {
                    yield insertString([`[ERROR]: Variable name must be a string, number, or boolean.`], true);
                    return;
                }
                i = util.removeStringIndicator(i);
                j = util.removeStringIndicator(j);
                if (i == undefined) {
                    yield insertString([`[ERROR]: Value not specified.`], true);
                }
                else {
                    i = util.varStrWithStr(i);
                    var calc = new Calculation();
                    var result = calc.calculate(i);
                    if (result == undefined || typeof result == "string") {
                        var error = (_b = result) === null || _b === void 0 ? void 0 : _b.split("\\n");
                        yield insertString([`[ERROR]: ${error[0]}`].concat(error.slice(-(error.length - 1))), true);
                    }
                    else {
                        yield insertString([`[SUCCESS]: ${i} = ${result}`], true);
                        window["INBOSH_VARIABLES"][j] = {
                            value: `${result}`,
                            type: "number"
                        };
                    }
                }
            }
        })
    },
    {
        name: "clear",
        args: [],
        description: "Clear the terminal",
        func: (_) => __awaiter(this, void 0, void 0, function* () {
            terminalContent = [[new TerminalString({ isEndOfLine: true, isOverlayedByCursor: true })]];
            caretPos = {
                x: 0,
                y: 0
            };
        })
    },
    {
        name: "drawline",
        args: [
            {
                name: "x1",
                type: "number",
            },
            {
                name: "y1",
                type: "number",
            },
            {
                name: "x2",
                type: "number",
            },
            {
                name: "y2",
                type: "number",
            },
            {
                name: "color",
                type: "string",
            },
            {
                name: "thickness",
                type: "number",
            },
        ],
        description: "Draw a line on the terminal",
        flag: ["ND"],
        func: (args) => __awaiter(this, void 0, void 0, function* () {
            $terminalCtx.strokeStyle = util.removeStringIndicator(args["color"]);
            $terminalCtx.lineWidth = parseInt(args["thickness"]);
            $terminalCtx.beginPath();
            $terminalCtx.moveTo(parseInt(args["x1"]), parseInt(args["y1"]));
            $terminalCtx.lineTo(parseInt(args["x2"]), parseInt(args["y2"]));
            $terminalCtx.stroke();
        })
    },
    {
        name: "drawrect",
        args: [
            {
                name: "x",
                type: "number",
            },
            {
                name: "y",
                type: "number",
            },
            {
                name: "width",
                type: "number",
            },
            {
                name: "height",
                type: "number",
            },
            {
                name: "color",
                type: "string",
            }
        ],
        description: "Draw a rectangle on the terminal",
        flag: ["ND"],
        func: (args) => __awaiter(this, void 0, void 0, function* () {
            $terminalCtx.fillStyle = util.removeStringIndicator(args["color"]);
            $terminalCtx.fillRect(parseInt(args["x"]), parseInt(args["y"]), parseInt(args["width"]), parseInt(args["height"]));
        })
    },
    {
        name: "drawcircle",
        args: [
            {
                name: "x",
                type: "number",
            },
            {
                name: "y",
                type: "number",
            },
            {
                name: "radius",
                type: "number",
            },
            {
                name: "color",
                type: "string",
            }
        ],
        description: "Draw a circle on the terminal",
        flag: ["ND"],
        func: (args) => __awaiter(this, void 0, void 0, function* () {
            $terminalCtx.fillStyle = util.removeStringIndicator(args["color"]);
            $terminalCtx.beginPath();
            $terminalCtx.arc(parseInt(args["x"]), parseInt(args["y"]), parseInt(args["radius"]), 0, 2 * Math.PI);
            $terminalCtx.fill();
        })
    },
    {
        name: "drawtext",
        args: [
            {
                name: "x",
                type: "number",
            },
            {
                name: "y",
                type: "number",
            },
            {
                name: "text",
                type: "string",
            },
            {
                name: "color",
                type: "string",
            },
            {
                name: "font",
                type: "string",
            },
            {
                name: "size",
                type: "number",
            }
        ],
        description: "Draw the provided text on the terminal",
        flag: ["ND"],
        func: (args) => __awaiter(this, void 0, void 0, function* () {
            $terminalCtx.fillStyle = util.removeStringIndicator(args["color"]);
            $terminalCtx.font = `${parseInt(args["size"])}px ${util.removeStringIndicator(args["font"])}`;
            $terminalCtx.fillText(util.removeStringIndicator(args["text"]), parseInt(args["x"]), parseInt(args["y"]));
        })
    },
    {
        name: "drawimage",
        args: [
            {
                name: "x",
                type: "number",
            },
            {
                name: "y",
                type: "number",
            },
            {
                name: "image",
                type: "string",
            },
            {
                name: "width",
                type: "number",
            },
            {
                name: "height",
                type: "number",
            }
        ],
        description: "Draw an image on the terminal",
        flag: ["ND"],
        func: (args) => __awaiter(this, void 0, void 0, function* () {
            var img = new Image();
            img.src = util.removeStringIndicator(args["image"]);
            img.onload = () => {
                $terminalCtx.drawImage(img, parseInt(args["x"]), parseInt(args["y"]), parseInt(args["width"]), parseInt(args["height"]));
            };
        })
    },
];
function drawCaret() {
    cursorPos = util.findString(displayContent);
    charThatCaretsAreOn = displayContent[cursorPos.y][cursorPos.x] || new TerminalString({});
    var coords = util.findString(util.cutToFit(displayContent, availSpace.availRow, cursorPos));
    $terminalCtx.fillStyle = config.cursorColor;
    $terminalCtx.fillRect(Math.max(1, coords.x * textWidth) + terminalMargin, coords.y * textHeight + terminalMargin + 3, textWidth, textHeight);
    $terminalCtx.fillStyle = "black";
    $terminalCtx.fillText(charThatCaretsAreOn.valueOf(), terminalMargin + coords.x * textWidth, terminalMargin + coords.y * textHeight + textHeight);
}
function insertString(str, newline = false) {
    return new Promise((resolve, _) => {
        if (newline) {
            terminalContent[caretPos.y][caretPos.x].overlayedByCursor = false;
            terminalContent.push([new TerminalString({ isEndOfLine: true })]);
            caretPos.y += 1;
            caretPos.x = 0;
        }
        terminalContent[caretPos.y][caretPos.x].overlayedByCursor = false;
        str.forEach((string, index) => {
            console.log(string, index);
            var stringArray = string.split("").map(x => new TerminalString({ str: x }));
            terminalContent[caretPos.y].splice(caretPos.x, 0, ...stringArray);
            caretPos.x += stringArray.length;
            if (index >= str.length - 1) {
                terminalContent[caretPos.y][caretPos.x].overlayedByCursor = true;
            }
            else {
                terminalContent.push([new TerminalString({ isEndOfLine: true })]);
                caretPos.y += 1;
                caretPos.x = 0;
            }
        });
        scrollbarConfig.height = availSpace.availRow / terminalContent.length * $scrollbar.height;
        scrollbarConfig.y = Math.max(0, caretPos.y - availSpace.availRow + 1) / terminalContent.length * $scrollbar.height;
        util.drawScrollBar($scrollbar, $scrollbarCtx, scrollbarConfig.height, scrollbarConfig.y, config.scrollBarColor, config.scrollBarThumbColor);
        displayContent = util.wrapTerminalContent(terminalContent, availSpace.availCol);
        cursorPos = util.findString(displayContent);
        util.drawTerminal($terminal, $terminalCtx, util.cutToFit(displayContent, availSpace.availRow, cursorPos), font, terminalMargin, config.backgroundColor, config.foregroundColor);
        drawCaret();
        resolve(true);
    });
}
function handleScrollbar() {
    scrollbarConfig.y = Math.min($scrollbar.height - Math.floor(availSpace.availRow / displayContent.length * $scrollbar.height), Math.max(0, scrollbarConfig.y));
    util.drawScrollBar($scrollbar, $scrollbarCtx, scrollbarConfig.height, scrollbarConfig.y, config.scrollBarColor, config.scrollBarThumbColor);
    var data = util.wrapTerminalContent(displayContent, availSpace.availCol);
    util.drawTerminal($terminal, $terminalCtx, util.cutToFit(data, availSpace.availRow, { x: 0, y: Math.ceil(Math.min(scrollbarConfig.y / $scrollbar.height * displayContent.length + availSpace.availRow, displayContent.length)) - 1 }), font, terminalMargin, config.backgroundColor, config.foregroundColor);
}
function bothResizeAndLoad(action) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(action);
        $terminal.width = window.innerWidth + (config.enableScrollBar ? -config.scrollBarWidth : 0);
        $terminal.height = window.innerHeight - 25;
        if (config.enableScrollBar) {
            $scrollbar.width = config.scrollBarWidth;
            $scrollbar.height = window.innerHeight - 25;
            $scrollbarCtx.fillStyle = config.scrollBarColor;
            $scrollbarCtx.fillRect(0, 0, config.scrollBarWidth, window.innerHeight);
        }
        else {
            $scrollbar.style.display = "none";
        }
        availSpace = util.calculateAvaliableColsAndRows($terminal, textWidth, textHeight, terminalMargin);
        displayContent = util.wrapTerminalContent(terminalContent, availSpace.availCol);
        if (action === "resize")
            cursorPos = util.findString(displayContent);
        util.drawTerminal($terminal, $terminalCtx, util.cutToFit(displayContent, availSpace.availRow, cursorPos), font, terminalMargin, config.backgroundColor, config.foregroundColor);
        scrollbarConfig.height = availSpace.availRow / terminalContent.length * $scrollbar.height;
        scrollbarConfig.y = Math.max(0, caretPos.y - availSpace.availRow + 1) / terminalContent.length * $scrollbar.height;
        util.drawScrollBar($scrollbar, $scrollbarCtx, scrollbarConfig.height, scrollbarConfig.y, config.scrollBarColor, config.scrollBarThumbColor);
        if (action === "load") {
            yield insertString([`INBOSH - It has No name But it's Online SHell (v${buildNumber})`, "[NOTE]: This is an Alpha release, so expect a lot of bug and updates every day (± Infinite %)", "Copyright (C) 2021 QuanMCPC's Home.", "Type \"help()\" for a list of commands."]);
            yield insertString(["", config.commandPrompt], true);
        }
        drawCaret();
        if (config.debounceResize) {
            util.getId("recalibrating").style.display = "none";
        }
    });
}
function main(command) {
    var _b;
    return __awaiter(this, void 0, void 0, function* () {
        const _ = () => {
            state.allowInput = true;
            state.commandRunning = false;
            state.command = "";
            state.insertedNumberOfLetters = 0;
        };
        if (command.trim().startsWith("#")) {
            _();
            return;
        }
        ;
        var _result = util.analyzeCommand(command);
        for (const result of _result) {
            if (command.trim() == "") {
                _();
                return;
            }
            console.log(commandList, result.command);
            if (commandList.map(x => x.name).indexOf(result.command) <= -1) {
                yield insertString([`[ERROR]: Command "${command}" not found.`], true);
                _();
                return;
            }
            var check = util.checkArgs(commandList[commandList.map(x => x.name).indexOf(result.command)].args.map(x => x.name), Object.keys(result.args));
            var optionalArg = commandList[commandList.map(x => x.name).indexOf(result.command)].args.filter(x => x.optionalValue).map(x => x.name);
            check.missing = check.missing.filter(x => optionalArg.indexOf(x) <= -1);
            var _m = `For more information, type \`help(command="${result.command}")\` for how to use the command or just \`help()\` for the whole list of commands.`;
            if (check.extra.length > 0) {
                yield insertString([`The following argument(s): [${check.extra.map(x => `"${x}"`).join(", ")}] is not valid.`, _m], true);
            }
            else if (check.missing.length > 0) {
                yield insertString([`The following argument(s): [${check.missing.map(x => `"${x}"`).join(", ")}] is required.`, _m], true);
            }
            else {
                var status = "";
                for (var i in result.args) {
                    var type;
                    for (var j in regexCheck) {
                        if (regexCheck[j].test(result.args[i])) {
                            result.args[i].replace(regexCheck[j], (_a, ...p) => {
                                var value = (p[1] || p[3] || p[5]) || "";
                                if (value.trim() != "") {
                                    insertString([`[ERROR]: Unexpected argument value: "${value}" in argument: "${i}"`], true).then(_);
                                    status = "error";
                                }
                                return value;
                            });
                            type = j;
                            break;
                        }
                    }
                    var commandData = commandList[commandList.map(x => x.name).indexOf(result.command)];
                    console.log(commandData.args, type);
                    if (status == "error")
                        return;
                    if (((_b = commandData.args[commandData.args.map(x => x.name).indexOf(i)]) === null || _b === void 0 ? void 0 : _b.type.split("|").map(x => x.trim()).indexOf(type)) <= -1) {
                        yield insertString([`[ERROR]: Command "${result.command}" requires the argument "${i}" as type "${commandData.args[commandData.args.map(x => x.name).indexOf(i)].type}".`], true);
                        _();
                        return;
                    }
                }
                console.table(result.args);
                yield commandList[commandList.map(x => x.name).indexOf(result.command)].func(result.args);
            }
        }
        _();
    });
}
document.querySelector("div#loading button").onclick = () => { util.getId("loading").style.display = "none"; };
util.getId("settings_cancel").onclick = () => { util.getId("settings").style.display = "none"; };
util.getId("settings_button").onclick = () => { util.getId("settings").style.display = "flex"; };
util.getId("settings_save").onclick = () => {
    document.querySelectorAll("input.changeConfig").forEach((x) => {
        config[x.getAttribute("data-settingName")] = x.type === "checkbox" ? x.checked : x.type === "number" ? parseInt(x.value) : x.value;
    });
    util.getId("settings").style.display = "none";
    localStorage.setItem("INBOSH_DATA_CONFIG", JSON.stringify(config));
    window.location.reload();
};
util.getId("settings_reset").onclick = () => {
    localStorage.removeItem("INBOSH_DATA_CONFIG");
    window.location.reload();
};
util.getId("enableFullscreen").onclick = () => __awaiter(this, void 0, void 0, function* () {
    if (document.fullscreenElement) {
        yield document.exitFullscreen();
        util.getId("enableFullscreen").innerText = "[O] Fullscreen";
    }
    else {
        yield document.documentElement.requestFullscreen();
        util.getId("enableFullscreen").innerText = "[X] Fullscreen";
    }
});
util.getId("dumpConsole").onclick = () => {
    var terminalstr_to_str = terminalContent.map(x => x.map(y => y.valueOf()));
    var dumpstr = terminalstr_to_str.map(x => x.join("")).join("\n");
    var blob = new Blob([dumpstr], { type: "text/plain;charset=utf-8" });
    util.saveAs(blob, "INBOSH_DUMP.txt");
};
util.getId("runScript").onclick = () => __awaiter(this, void 0, void 0, function* () {
    const result = yield util.openFile();
    if (typeof result === "string") {
        for (const command of result.split("\n")) {
            yield main(command);
        }
    }
});
util.getId("about_button").onclick = () => {
    util.getId("about").style.display = "flex";
};
util.getId("about_ok").onclick = () => {
    util.getId("about").style.display = "none";
};
util.getId("documentation_button").onclick = () => {
    util.getId("documentation").style.display = "flex";
};
util.getId("documentation_ok").onclick = () => {
    util.getId("documentation").style.display = "none";
};
var key;
util.getId("activate_start_dialog_activate").onclick = () => {
    key = util.getId("licenseKey").value;
    if (util.verifyProdKey(key)) {
        util.getId("activateSucessful").style.display = "flex";
    }
    else {
        util.getId("activateFailed").style.display = "flex";
    }
};
util.getId("activate_start_dialog_continue").onclick = () => {
    if (confirm("Are you ABSOLUTELY sure you want to continue without ACTIVATING?")) {
        util.getId("activate_start_dialog").style.display = "none";
    }
};
util.getId("activateSucessful_ok").onclick = () => {
    localStorage.setItem("INBOSH_LICENSE_KEY", key);
    key = "";
    location.reload();
};
util.getId("activateFailed_ok").onclick = () => {
    util.getId("activateFailed").style.display = "none";
};
util.getId("activate_button").onclick = () => {
    state.ready = false;
    util.getId("activate_start_dialog").style.display = "flex";
};
util.getId("remove_key_button").onclick = () => {
    if (confirm("Are you ABSOLUTELY sure you want to remove your license key?")) {
        localStorage.removeItem("INBOSH_LICENSE_KEY");
        key = "";
        location.reload();
    }
};
var resizeTimeout;
window.addEventListener("resize", () => {
    if (!state.ready)
        return;
    if (config.debounceResize) {
        util.getId("recalibrating").style.display = "flex";
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => { bothResizeAndLoad("resize"); }, config.debounceResizeTime);
    }
    else {
        bothResizeAndLoad("resize");
    }
});
window.addEventListener("load", () => {
    if (util.verifyProdKey(localStorage.getItem("INBOSH_LICENSE_KEY") || "")) {
        util.getId("activate_start_dialog").style.display = "none";
        util.getId("activate_button").style.display = "none";
        util.getId("remove_key_button").style.display = "block";
    }
    util.getId("posting").style.display = 'none';
    setTimeout(() => {
        var button = document.querySelector("div#loading button");
        button.style.opacity = "1";
        button.style.pointerEvents = "auto";
    }, 3250);
    if (!localStorage.getItem("INBOSH_DATA_CONFIG")) {
        localStorage.setItem("INBOSH_DATA_CONFIG", JSON.stringify(config));
    }
    var oldConfig = JSON.parse(localStorage.getItem("INBOSH_DATA_CONFIG"));
    if (oldConfig["configVersion"] != buildNumber || !(util.areArraysEqualSets(Object.keys(oldConfig), Object.keys(config)))) {
        config = util.migrateObj(oldConfig, config);
        config.configVersion = buildNumber;
        localStorage.setItem("INBOSH_DATA_CONFIG", JSON.stringify(config));
    }
    else {
        config = JSON.parse(localStorage.getItem("INBOSH_DATA_CONFIG"));
    }
    document.querySelectorAll("input.changeConfig").forEach((x) => {
        switch (x.type) {
            case "checkbox":
                x.checked = config[x.getAttribute("data-settingName")];
                break;
            case "number":
                x.value = config[x.getAttribute("data-settingName")].toString();
                break;
            default:
                x.value = config[x.getAttribute("data-settingName")];
                break;
        }
    });
    if (config.showBootScreen) {
        util.getId("loading").style.display = "flex";
    }
    $terminalCtx.fillStyle = config.backgroundColor;
    $terminalCtx.fillRect(0, 0, $terminal.width, $terminal.height);
    console.log("%cOk, so you might ask: Why didn't I remove all of this `console.log` mess?", "color: orange; font-size: 1.5rem; font-weight: bold;");
    console.log("%cTo put it simply: I'm lazy and I don't feel motivated enough to remove it.", "color: lightgreen; font-size: 1.5rem; font-weight: bold;");
    state.ready = true;
    bothResizeAndLoad("load");
});
$scrollbar.addEventListener("mousedown", (e) => {
    if (!state.ready)
        return;
    scrollbarConfig.leftClick = true;
});
document.addEventListener("mousemove", (e) => {
    if (!state.ready)
        return;
    if (e.x > document.body.clientWidth - config.scrollBarWidth * 6 && e.x < document.body.clientWidth && e.y > scrollbarConfig.y && e.y < scrollbarConfig.y + scrollbarConfig.height && scrollbarConfig.leftClick) {
        scrollbarConfig.y += e.movementY;
        handleScrollbar();
    }
    else {
        scrollbarConfig.leftClick = false;
    }
});
document.addEventListener("mouseup", () => {
    if (!state.ready)
        return;
    scrollbarConfig.leftClick = false;
    drawCaret();
});
document.addEventListener("keydown", (e) => {
    if (!state.ready)
        return;
    if (!state.allowInput) {
        return;
    }
    prevCaretPos.x = caretPos.x;
    prevCaretPos.y = caretPos.y;
    console.log(e.key);
    switch (e.key) {
        case "PageUp":
            if (config.enableScrollBar) {
                scrollbarConfig.y -= config.scrollBar_AmountToScroll;
                handleScrollbar();
                state.movingPage = true;
            }
            break;
        case "PageDown":
            if (config.enableScrollBar) {
                scrollbarConfig.y += config.scrollBar_AmountToScroll;
                handleScrollbar();
                state.movingPage = true;
            }
            break;
        case "ArrowUp":
            break;
        case "ArrowDown":
            break;
        case "ArrowLeft":
            if (state.insertedNumberOfLetters <= 0)
                break;
            if (caretPos.x > 0) {
                caretPos.x--;
            }
            else if (caretPos.y > 0) {
                caretPos.y--;
                caretPos.x = terminalContent[caretPos.y].length - 1;
            }
            state.insertedNumberOfLetters--;
            break;
        case "ArrowRight":
            if (caretPos.x < terminalContent[caretPos.y].length - 1) {
                caretPos.x++;
                state.insertedNumberOfLetters++;
            }
            else if (caretPos.y < terminalContent.length - 1) {
                caretPos.y++;
                state.insertedNumberOfLetters++;
                caretPos.x = 0;
            }
            break;
        case "Home":
            caretPos.x = config.commandPrompt.length;
            state.insertedNumberOfLetters = 0;
            break;
        case "End":
            caretPos.x = terminalContent[caretPos.y].length - 1;
            state.insertedNumberOfLetters = terminalContent[caretPos.y].length - config.commandPrompt.length - 1;
            break;
        case "Enter":
            commandHistory.history.push(state.command);
            commandHistory.current_index = commandHistory.history.length;
            state.commandRunning = true;
            state.allowInput = false;
            main(state.command).then(() => {
                insertString(["", config.commandPrompt], true);
            });
            break;
        case "Backspace":
            if (caretPos.x == 0 && caretPos.y == 0 || state.insertedNumberOfLetters <= 0)
                break;
            if (caretPos.x <= 0) {
                caretPos.x = terminalContent[caretPos.y - 1].length - 1;
                caretPos.y--;
                var deleted = terminalContent.splice(caretPos.y + 1, 1);
                terminalContent[caretPos.y].pop();
                terminalContent[caretPos.y].push(...deleted[0]);
            }
            else {
                terminalContent[caretPos.y].splice(caretPos.x - 1, 1);
                caretPos.x--;
            }
            var acommand = state.command.split("");
            acommand.splice(state.insertedNumberOfLetters - 1, 1);
            state.command = acommand.join("");
            state.insertedNumberOfLetters--;
            break;
        default:
            if (e.key.length == 1 && !(e.ctrlKey || e.metaKey || e.altKey)) {
                terminalContent[caretPos.y].splice(caretPos.x, 0, new TerminalString({ str: e.key }));
                caretPos.x++;
                state.insertedNumberOfLetters++;
                var acommand = state.command.split("");
                acommand.splice(state.insertedNumberOfLetters - 1, 0, e.key);
                state.command = acommand.join("");
            }
            break;
    }
    if (!state.movingPage) {
        scrollbarConfig.y = Math.max(0, cursorPos.y - availSpace.availRow + 1) / displayContent.length * $scrollbar.height;
        scrollbarConfig.height = availSpace.availRow / displayContent.length * $scrollbar.height;
        util.drawScrollBar($scrollbar, $scrollbarCtx, scrollbarConfig.height, scrollbarConfig.y, config.scrollBarColor, config.scrollBarThumbColor);
        displayContent = util.wrapTerminalContent(terminalContent, availSpace.availCol);
        cursorPos = util.findString(displayContent);
        util.drawTerminal($terminal, $terminalCtx, util.cutToFit(displayContent, availSpace.availRow, cursorPos), font, terminalMargin, config.backgroundColor, config.foregroundColor);
        try {
            terminalContent[prevCaretPos.y][prevCaretPos.x].overlayedByCursor = false;
        }
        catch (e) { }
        try {
            terminalContent[caretPos.y][caretPos.x].overlayedByCursor = true;
        }
        catch (e) { }
        drawCaret();
    }
    else {
        state.movingPage = false;
    }
});
//# sourceMappingURL=INBOSH.js.map