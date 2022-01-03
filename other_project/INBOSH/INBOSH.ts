/*
* It has No name But its Online SHell
* Also known as: INBOSH or IN-BOSH
*
* Copyright (C) 2021 @QuanMCPC
* Released under the MIT license
*
* A number of codes are from the `MSDOS.html` project I made a while ago.
*/

const buildNumber = "0.0.1-alpha.1+20210301111500";

/**
 * A special string created for the terminal.
 */
class TerminalString extends String {
    overlayedByCursor: boolean = false;
    endOfLine: boolean = false;

    constructor({ str = "", isOverlayedByCursor = false, isEndOfLine = false }: { str?: string, isOverlayedByCursor?: boolean, isEndOfLine?: boolean }) {
        super(str);
        this.overlayedByCursor = isOverlayedByCursor;
        this.endOfLine = isEndOfLine;
    }
}

/**
 * For doing complicate math.
 *
 * Credit (Cause not my code):
 * @author https://stackoverflow.com/users/5459839/trincot
 * @see https://stackoverflow.com/a/47761792/11418759
 */
class Calculation {
    _symbols: {symbol?: string, f?: any, notation?: string, precedence?: number, rightToLeft?: boolean};
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
    defineOperator(symbol: string, f: any, notation = "func", precedence = 0, rightToLeft = false) {
        if (notation === "func") precedence = 0;
        this._symbols[symbol] = Object.assign({}, this._symbols[symbol], {
            [notation]: { symbol, f, notation, precedence, rightToLeft, argCount: 1 + (notation === "infix" ? 1 : 0) },
            symbol,
            regSymbol: symbol.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') + (/\w$/.test(symbol) ? "\\b" : "")
        });
    }
    last(...a: number[]) { return a[a.length-1] }
    negation(a: number) { return -a }
    addition(a: number, b: number) { return a + b }
    subtraction(a: number, b: number) { return a - b }
    multiplication(a: number, b: number) { return a * b }
    division(a: number, b: number) { return a / b }
    factorial(a: number) {
        if (a % 1 || !( + a >= 0)) return NaN
        if (a > 170) return Infinity;
        let b = 1;
        while (a > 1) b *= a--;
        return b;
    }
    calculate(expression: string): number | string {
        let match: RegExpExecArray;
        const values = [],
            operators = [this._symbols["("].prefix],
            exec = () => {
                let op = operators.pop();
                values.push(op.f(...[].concat(...values.splice(-op.argCount))));
                return op.precedence;
            },
            error = (msg: string) => {
                let notation = match ? match.index : expression.length;
                return `${msg} at ${notation}:\\n${expression}\\n${' '.repeat(notation)}^`;
            },
            pattern = new RegExp(
                "\\d+(?:\\.\\d+)?|"
                + Object.keys(this._symbols).map(e => this._symbols[e])
                    .sort((a, b) => b.symbol.length - a.symbol.length)
                    .map(val => val.regSymbol).join('|')
                + "|(\\S)", "g"
            );
        let afterValue = false;
        pattern.lastIndex = 0;
        do {
            match = pattern.exec(expression);
            const [token, bad] = match || [")", undefined],
                notNumber = this._symbols[token],
                notNewValue = notNumber && !notNumber.prefix && !notNumber.func,
                notAfterValue = !notNumber || !notNumber.postfix && !notNumber.infix;
            if (bad || (afterValue ? notAfterValue : notNewValue)) return error("Syntax error");
            if (afterValue) {
                const curr = notNumber.postfix || notNumber.infix;
                do {
                    const prev = operators[operators.length-1];
                    if (((curr.precedence - prev.precedence) || prev.rightToLeft) > 0) break;
                } while (exec());
                afterValue = curr.notation === "postfix";
                if (curr.symbol !== ")") {
                    operators.push(curr);
                    if (afterValue) exec();
                }
            } else if (notNumber) {
                operators.push(notNumber.prefix || notNumber.func);
                if (notNumber.func) {
                    match = pattern.exec(expression);
                    if (!match || match[0] !== "(") return error("Function needs parentheses")
                }
            } else {
                values.push(+token);
                afterValue = true;
            }
        } while (match && operators.length);
        return operators.length
            ? error("Missing closing parenthesis") : match
            ? error("Too many closing parentheses") : values.pop()
    }
}

/**
 * Utility that is important for WCOS v2
 */
const util = {
    /**
     * Get the element with the given id.
     * @param elementId The name of the element
     * @returns The element with the given id
     */
    getId: (elementId: string) => {
        return document.getElementById(elementId);
    },
    /**
     * Get the text width of the given text.
     * @param canvas The canvas element to use for measuring text
     * @param text The text to measure
     * @param font The font to use
     * @returns The width of the text
     */
    getTextWidth: (canvas: HTMLCanvasElement, text: string, font: string) => {
        const context = canvas.getContext("2d");
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    },
    /**
     * Get the avaliable cols and rows of the terminal.
     * @param canvas The canvas element to use for calculating
     * @param textWidth The width of the text
     * @param textHeight The height of the text
     * @param terminalMargin The margin of the terminal
     * @returns The avaliable cols and rows
     */
    calculateAvaliableColsAndRows: (canvas: HTMLCanvasElement, textWidth: number, textHeight: number, terminalMargin: number = 0) => {
        var availCol = Math.floor((canvas.width - terminalMargin * 2) / textWidth);
        var availRow = Math.floor((canvas.height - terminalMargin * 2) / textHeight);
        return { availCol, availRow };
    },
    /**
     * Draw the provided text to the terminal.
     * @param ctx The context of the canvas
     * @param screenData The data to draw
     * @param font The font to use
     * @param terminalMargin The margin of the terminal
     */
    drawTerminal: (terminal: HTMLCanvasElement, ctx: CanvasRenderingContext2D, screenData: TerminalString[][], font: string, terminalMargin: number = 0, bgColor: string, fgColor: string) => {
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
    /**
     * Draw the scroll bar
     * @param scrollBar The scroll bar to use
     * @param ctx The context of the canvas
     * @param scrollBarThumbHeight The height of the scroll bar thumb
     * @param y The y coordinate of the scroll bar thumb
     */
    drawScrollBar: (scrollBar: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scrollBarThumbHeight: number, y: number, sbColor: string, sbThumbColor: string) => {
        ctx.fillStyle = sbThumbColor;
        ctx.fillRect(0, 0, scrollBar.width, scrollBar.height);
        ctx.fillStyle = sbColor;
        ctx.fillRect(0, Math.min(scrollBar.height - Math.round(scrollBarThumbHeight), Math.max(0, Math.round(y))), scrollBar.width, Math.round(scrollBarThumbHeight));
    },
    /**
     * Wrap the provided content to the given number of cols.
     * @param displayContent The content to wrap
     * @param maxCols The maximum number of columns
     * @returns The wrapped content
     */
    wrapTerminalContent: (displayContent: TerminalString[][], maxCols: number) => {
        let wrappedContent: TerminalString[][] = [];
        let currentLine: TerminalString[] = [];
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
    cutToFit: (wrappedContent: TerminalString[][], maxRows: number, caretPos: { x: number, y: number }) => {
        if (caretPos.y - maxRows >= 0) {
            wrappedContent = wrappedContent.slice(caretPos.y - maxRows + 1, caretPos.y + 1);
        } else {
            wrappedContent = wrappedContent.slice(0, maxRows);
        }
        return wrappedContent;
    },
    /**
     * Get the position of the string.
     * @param str The string to find
     * @param arr The array to find
     * @returns The index of the string
     */
    findString: (arr: TerminalString[][]) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j].overlayedByCursor) {
                    return { x: j, y: i };
                }
            }
        }
        return null;
    },
    /**
     * Analyze the command and return data about it.
     * @param command The command to analyze
     * @returns The result of the analysis
     * @example
     * Input: test(a1 = "1", a2 = "2", a3 = "3")
     * Output:
     * {
     *     command: "test",
     *     args: {
     *         a1: "1",
     *         a2: "2",
     *         a3: "3"
     *     }
     * }
     */
    analyzeCommand: (command: string): { command: string, args: Object } => {
        var total_func = {
            command: "",
            args: {}
        }
        command
            .replace(/\s+/g,' ')
            .trim()
            .replace(/(^\w+)\s*(\(.*\))$/gm, (_m: string, p1: string, p2: string, _o: number, _str: string) => {
                total_func.command = p1;
                var arg = p2.substring(1, p2.length - 1).split(/\s*,\s*/g);
                console.log(arg)
                arg.forEach((v) => {
                    var args = v.split(/\s*=\s*/g);
                    total_func.args[args[0]] = args[1]
                })
                return p1 + p2;
            })
        return total_func;
    },
    /**
     * Remove the string indicator
     * @param str The string to remove the indicator from
     * @returns The string without the indicator
     */
    removeStringIndicator: (str: string) => {
        return str.replace(/(((^\")|(^\')|(^\`))(.*)((\"$)|(\'$)|(\`$)))/g, "$6");
    },
    /**
     * Check for arguments
     * @param validArgs The valid arguments (Use `Object.keys(validArgs)` to get the keys)
     * @param inputArgs The input arguments to check
     * @returns Result of the check
     */
    checkArgs: (validArgs: string[], inputArgs: string[]) => {
        var extra: string[] = [], missing: string[] = [];
        inputArgs.forEach((v) => { if (validArgs.indexOf(v) <= -1) { extra.push(v) } });
        extra = extra.filter(s => s.trim() != "")
        validArgs.forEach((v) => { if (inputArgs.indexOf(v) <= -1) { missing.push(v) } });
        missing = missing.filter(s => s.trim() != "")
        return {
            extra: extra,
            missing: missing
        };
    },
    /**
     * Save file to user's computer
     * @param blob The blob to download
     * @param fileName The name of the file to download
     */
    saveAs: (blob: Blob, fileName: string) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
        a.remove();
    },
    escapeString: (str: string) => { return str.replace(/\\([^n])/g, "{#n=[$1]}") },
    unescapeString: (str: string) => { return str.replace(/{#n=\[(.)\]}/g, "$1") },
}

//#region Init variables that are very important

const $terminal = util.getId("terminal") as HTMLCanvasElement;
const $terminalCtx = $terminal.getContext("2d");

const $scrollbar = util.getId("scrollbar") as HTMLCanvasElement;
const $scrollbarCtx = $scrollbar.getContext("2d");

const font = "20px Inconsolata";
const textWidth = util.getTextWidth($terminal, "#", font);
const textHeight = 20;
const terminalMargin = 5;

const regexCheck = {
    string: /(^\"[^\"]*[^\"]\"$)|(^\'[^\']*[^\']\'$)|(^\`[^\`]*[^\`]\`$)/,
    number: /^[+-]?(\d+\.?\d*|\.\d+)$/,
    boolean: /true|false/,
}

var terminalContent: TerminalString[][] = [[new TerminalString({isEndOfLine: true, isOverlayedByCursor: true})]];
var displayContent: TerminalString[][] = [[]];

var availSpace: { availCol: number, availRow: number };

var charThatCaretsAreOn = new TerminalString({});

var caretPos = {
    x: 0,
    y: 0
};

var cursorPos = {
    x: 0,
    y: 0
}

var prevCaretPos = {
    x: 0,
    y: 0
};

var scrollbarConfig = {
    y: 0,
    height: 0,
    leftClick: false,
}

var state = {
    commandRunning: false,
    allowInput: true,
    movingPage: false,
    insertedNumberOfLetters: 0,
    command: "",
}

var config = {
    debounceResize: true,
    debounceResizeTime: 100,
    enableScrollBar: true,
    scrollBarWidth: 20,
    scrollBar_AmountToScroll: 5,
    commandPrompt: "> ",
    showBootScreen: true,
    foregroundColor: "#fff",
    backgroundColor: "#000",
    cursorColor: "#fff",
    scrollBarColor: "rgb(128, 128, 128)",
    scrollBarThumbColor: "rgb(64, 64, 64)"
}

window["INBOSH_VARIABLES"] = {}

//#endregion

//#region Command list

/**
 * List of commands that you can use in the terminal.
 *
 * Syntax:
 * ```text
 * * name: The name of the command
 * * args: The arguments that the command takes
 *    * name: The name of the argument
 *    * type: The type of the argument
 *    * optionalValue: The optional value of the argument (which will mark the argument as optional)
 * * func: The function that the command runs
 * * description: The description of the command
 * ```
 */
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
        func: async (args: Object) => {
            console.log(args)
            for(var i in args) {
                await insertString([`${i}: ${args[i]}`], true);
            }
        }
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
        func: async (args: Object) => {
            const _ = async (i: { name: string; args: ({ name: string; type: string; optionalValue?: string; })[]; description: string; flag?: string[]; func: (args: Object) => Promise<void>; }) => {
                await insertString(
                    [
                        `Command: ${i.name} ${!!i.flag ? "[" : ""}${(!!i.flag ? i.flag : []).join(", ")}${!!i.flag ? "]" : ""}`,
                        `Syntax: ${i.name}(${i.args.map(x => x.name + (x.optionalValue ? "?" : "") + ": " + x.type).join(", ")})`,
                        `Description: ${i.description}`,
                        `------------------------------`
                    ], true
                );
            }
            const header = [`==============================`, `INBOSH v${buildNumber} - Help Page`, `Flag that might appear on certain command:`, ` - [ND]: Won't work if the command is entered directly into the terminal` , `------------------------------`]
            const footer = [`==============================`]
            commandList.sort((a, b) => {
                if (a.name > b.name) { return 1 }
                if (a.name < b.name) { return -1 }
                return 0;
            })
            if (args["command"] == undefined || args["command"] == "") {
                await insertString(header, true);
                for (var i of commandList) { _(i) }
                await insertString(footer, true);
            } else {
                var j = commandList[commandList.map(x => x.name).indexOf(util.removeStringIndicator(args["command"]))]
                if (j == undefined) {
                    await insertString([`[ERROR]: Command ${args["command"]} not found.`], true);
                } else {
                    await insertString(header, true);
                    await _(j);
                    await insertString(footer, true);
                }
            }
        }
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
        func: async (args: Object) => {
            args["name"] = util.removeStringIndicator(args["name"])
            if (args["name"] == undefined) {
                await insertString([`[ERROR]: Variable name not specified.`], true);
            } else if (args["value"] == undefined) {
                await insertString([`[ERROR]: Variable value not specified.`], true);
            } else if (args["name"].match(/[^a-zA-Z0-9_]/)) {
                await insertString([`[ERROR]: Variable name must only contain letters, numbers, and underscores.`], true);
            } else {
                var i: string = args["name"];
                console.log(i)
                var j: string = args["value"];
                var k = ""
                if (!(j.match(regexCheck.string) || j.match(regexCheck.number) || j.match(regexCheck.boolean))) {
                    await insertString([`[ERROR]: Variable value must be a string, number, or boolean.`], true);
                }
                j = util.removeStringIndicator(j);
                if (j == undefined) {
                    await insertString([`[ERROR]: Variable value not specified.`], true);
                } else {
                    // window[i] = j;
                    window["INBOSH_VARIABLES"][i] = {
                        value: j,
                        type: k
                    };
                    await insertString([`[SUCCESS]: Variable ${i} set to ${j}`], true);
                }
            }
        }
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
        func: async (args: Object) => {
            const varStrWithStr = (str: string) => {
                str = str.replace(/{@([a-zA-Z0-9_]+?)}/g, (_, $1) => {
                    for (const value in window["INBOSH_VARIABLES"]) {
                        if (value == $1) {
                            return window["INBOSH_VARIABLES"][value].value;
                        }
                    }
                })
                return str;
            }
            if (args["value"] == undefined) {
                await insertString([`[ERROR]: Value not specified.`], true);
            } else {
                var i: string = args["value"];
                if (!(i.match(regexCheck.string) || i.match(regexCheck.number) || i.match(regexCheck.boolean))) {
                    await insertString([`[ERROR]: Value must be a string, number, or boolean.`], true);
                }
                i = util.removeStringIndicator(varStrWithStr(util.escapeString(i)));
                if (i == undefined) {
                    await insertString([`[ERROR]: Value not specified.`], true);
                } else {
                    await insertString(util.unescapeString(i).split("\\n"), true);
                }
            }
        }
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
        func: async (args: Object) => {
            if (args["expression"] == undefined) {
                await insertString([`[ERROR]: Value not specified.`], true);
            } else {
                var i: string = args["expression"];
                var j: string = args["varname"]
                if (!(i.match(regexCheck.string) || i.match(regexCheck.number) || i.match(regexCheck.boolean))) {
                    await insertString([`[ERROR]: Value must be a string, number, or boolean.`], true);
                    return;
                }
                if (!(j.match(regexCheck.string) || j.match(regexCheck.number) || j.match(regexCheck.boolean))) {
                    await insertString([`[ERROR]: Variable name must be a string, number, or boolean.`], true);
                    return;
                }
                i = util.removeStringIndicator(i);
                j = util.removeStringIndicator(j);
                if (i == undefined) {
                    await insertString([`[ERROR]: Value not specified.`], true);
                } else {
                    var calc = new Calculation();
                    var result = calc.calculate(i);
                    if (result == undefined || typeof result == "string") {
                        var error = (result as string)?.split("\\n")
                        await insertString([`[ERROR]: ${error[0]}`].concat(error.slice(-(error.length - 1))), true);
                    } else {
                        await insertString([`[SUCCESS]: ${i} = ${result}`], true);
                        window["INBOSH_VARIABLES"][j] = {
                            value: `\"${result}\"`,
                            type: "number"
                        };
                    }
                }
            }
        }
    },
    {
        name: "clear",
        args: [],
        description: "Clear the terminal",
        func: async (_: Object) => {
            terminalContent = [[new TerminalString({isEndOfLine: true, isOverlayedByCursor: true})]];
            caretPos = {
                x: 0,
                y: 0
            }
        }
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
        func: async (args: Object) => {
            $terminalCtx.strokeStyle = util.removeStringIndicator(args["color"]);
            $terminalCtx.lineWidth = parseInt(args["thickness"]);
            $terminalCtx.beginPath();
            $terminalCtx.moveTo(parseInt(args["x1"]), parseInt(args["y1"]));
            $terminalCtx.lineTo(parseInt(args["x2"]), parseInt(args["y2"]));
            $terminalCtx.stroke();
        }
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
        func: async (args: Object) => {
            $terminalCtx.fillStyle = util.removeStringIndicator(args["color"]);
            $terminalCtx.fillRect(parseInt(args["x"]), parseInt(args["y"]), parseInt(args["width"]), parseInt(args["height"]));
        }
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
        func: async (args: Object) => {
            $terminalCtx.fillStyle = util.removeStringIndicator(args["color"]);
            $terminalCtx.beginPath();
            $terminalCtx.arc(parseInt(args["x"]), parseInt(args["y"]), parseInt(args["radius"]), 0, 2 * Math.PI);
            $terminalCtx.fill();
        }
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
        func: async (args: Object) => {
            $terminalCtx.fillStyle = util.removeStringIndicator(args["color"]);
            $terminalCtx.font = `${parseInt(args["size"])}px ${util.removeStringIndicator(args["font"])}`;
            $terminalCtx.fillText(util.removeStringIndicator(args["text"]), parseInt(args["x"]), parseInt(args["y"]));
        }
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
        func: async (args: Object) => {
            var img = new Image();
            img.src = util.removeStringIndicator(args["image"]);
            img.onload = () => {
                $terminalCtx.drawImage(img, parseInt(args["x"]), parseInt(args["y"]), parseInt(args["width"]), parseInt(args["height"]));
            }
        }
    },
]

//#endregion

//#region Command that require outside variables

function drawCaret() {
    cursorPos = util.findString(displayContent);
    charThatCaretsAreOn = displayContent[cursorPos.y][cursorPos.x] || new TerminalString({});
    var coords = util.findString(util.cutToFit(displayContent, availSpace.availRow, cursorPos));
    $terminalCtx.fillStyle = config.cursorColor;
    $terminalCtx.fillRect(Math.max(1, coords.x * textWidth) + terminalMargin, coords.y * textHeight + terminalMargin + 3, textWidth, textHeight);
    $terminalCtx.fillStyle = "black";
    $terminalCtx.fillText(charThatCaretsAreOn.valueOf(), terminalMargin + coords.x * textWidth, terminalMargin + coords.y * textHeight + textHeight);
}

function insertString(str: string[], newline: boolean = false): Promise<Boolean> {
    return new Promise((resolve, _) => {
        if (newline) {
            terminalContent[caretPos.y][caretPos.x].overlayedByCursor = false;
            terminalContent.push([new TerminalString({isEndOfLine: true})]);
            caretPos.y += 1;
            caretPos.x = 0;
        }

        terminalContent[caretPos.y][caretPos.x].overlayedByCursor = false;
        str.forEach((string, index) => {
            console.log(string, index)
            var stringArray = string.split("").map(x => new TerminalString({ str: x }));
            terminalContent[caretPos.y].splice(caretPos.x, 0, ...stringArray);
            caretPos.x += stringArray.length;
            if (index >= str.length - 1) {
                terminalContent[caretPos.y][caretPos.x].overlayedByCursor = true;
            } else {
                terminalContent.push([new TerminalString({isEndOfLine: true})]);
                caretPos.y += 1;
                caretPos.x = 0;
            }
        });

        scrollbarConfig.height = availSpace.availRow / terminalContent.length * $scrollbar.height;
        scrollbarConfig.y = Math.max(0, caretPos.y - availSpace.availRow + 1) / terminalContent.length * $scrollbar.height
        util.drawScrollBar($scrollbar, $scrollbarCtx, scrollbarConfig.height, scrollbarConfig.y, config.scrollBarColor, config.scrollBarThumbColor);

        displayContent = util.wrapTerminalContent(terminalContent, availSpace.availCol);
        cursorPos = util.findString(displayContent);
        util.drawTerminal($terminal, $terminalCtx, util.cutToFit(displayContent, availSpace.availRow, cursorPos), font, terminalMargin, config.backgroundColor, config.foregroundColor);

        // handleScrollbar();
        drawCaret();
        resolve(true);
    })
}

function handleScrollbar() {
    scrollbarConfig.y = Math.min($scrollbar.height - Math.floor(availSpace.availRow / displayContent.length * $scrollbar.height), Math.max(0, scrollbarConfig.y));
    util.drawScrollBar($scrollbar, $scrollbarCtx, scrollbarConfig.height, scrollbarConfig.y, config.scrollBarColor, config.scrollBarThumbColor);
    var data = util.wrapTerminalContent(displayContent, availSpace.availCol);
    util.drawTerminal($terminal, $terminalCtx, util.cutToFit(data, availSpace.availRow, { x: 0, y: Math.ceil(Math.min(scrollbarConfig.y / $scrollbar.height * displayContent.length + availSpace.availRow, displayContent.length)) - 1 }), font, terminalMargin, config.backgroundColor, config.foregroundColor);
}

async function bothResizeAndLoad(action: string) {
    console.log(action)
    $terminal.width = window.innerWidth + ( config.enableScrollBar ? -config.scrollBarWidth : 0 );
    $terminal.height = window.innerHeight - 25;

    if (config.enableScrollBar) {
        $scrollbar.width = config.scrollBarWidth;
        $scrollbar.height = window.innerHeight - 25;

        $scrollbarCtx.fillStyle = config.scrollBarColor;
        $scrollbarCtx.fillRect(0, 0, config.scrollBarWidth, window.innerHeight);
    } else {
        $scrollbar.style.display = "none";
    }

    availSpace = util.calculateAvaliableColsAndRows($terminal, textWidth, textHeight, terminalMargin);
    displayContent = util.wrapTerminalContent(terminalContent, availSpace.availCol);

    if (action === "resize") cursorPos = util.findString(displayContent);

    util.drawTerminal($terminal, $terminalCtx, util.cutToFit(displayContent, availSpace.availRow, cursorPos), font, terminalMargin, config.backgroundColor, config.foregroundColor);

    scrollbarConfig.height = availSpace.availRow / terminalContent.length * $scrollbar.height;
    scrollbarConfig.y = Math.max(0, caretPos.y - availSpace.availRow + 1) / terminalContent.length * $scrollbar.height
    util.drawScrollBar($scrollbar, $scrollbarCtx, scrollbarConfig.height, scrollbarConfig.y, config.scrollBarColor, config.scrollBarThumbColor);

    // handleScrollbar();
    if (action === "load") {
        await insertString([`INBOSH - It has No name But it's Online SHell (v${buildNumber})`, "[NOTE]: This is an Alpha release, expect a lot of bug.", "Copyright (C) 2021 QuanMCPC's Home.", "Type \"help()\" for a list of commands."]);
        await insertString(["", config.commandPrompt], true);
    }
    drawCaret();

    if (config.debounceResize) { util.getId("recalibrating").style.display = "none" }
}

async function main(command: string) {
    var result = util.analyzeCommand(command)
    var _ = async () => {
        state.allowInput = true;
        state.commandRunning = false;
        state.command = "";
        state.insertedNumberOfLetters = 0;
    }

    if (command.trim() == "") {
        await _();
        return;
    }
    if (commandList.map(x => x.name).indexOf(result.command) <= -1) {
        await insertString([`[ERROR]: Command "${command}" not found.`], true);
        await _();
        return;
    }

    var check = util.checkArgs(commandList[commandList.map(x => x.name).indexOf(result.command)].args.map(x => x.name), Object.keys(result.args))
    var optionalArg = commandList[commandList.map(x => x.name).indexOf(result.command)].args.filter(x => x.optionalValue).map(x => x.name);
    check.missing = check.missing.filter(x => optionalArg.indexOf(x) <= -1);
    var _m = `For more information, type \`help(command="${result.command}")\` for how to use the command or just \`help()\` for the whole list of commands.`
    if (check.extra.length > 0) {
        await insertString([`The following argument(s): [${check.extra.map(x => `"${x}"`).join(", ")}] is not valid.`, _m], true);
    } else if (check.missing.length > 0) {
        await insertString([`The following argument(s): [${check.missing.map(x => `"${x}"`).join(", ")}] is required.`, _m], true);
    } else {
        for (var i in result.args) {
            var type: string;
            for (var j in regexCheck) {
                if ((regexCheck[j] as RegExp).test(result.args[i])) {
                    type = j;
                    break;
                }
            }
            var commandData = commandList[commandList.map(x => x.name).indexOf(result.command)]
            console.log(commandData.args, type)
            if (commandData.args[commandData.args.map(x => x.name).indexOf(i)]?.type.split("|").map(x => x.trim()).indexOf(type) <= -1) {
                await insertString([`[ERROR]: Command "${result.command}" requires the argument "${i}" as type "${commandData.args[commandData.args.map(x => x.name).indexOf(i)].type}".`], true);
                await _();
                return;
            }
        }
        await commandList[commandList.map(x => x.name).indexOf(result.command)].func(result.args);
    }
    await _();
}

//#endregion

//#region UI handling stuff

(document.querySelector("div#loading button") as HTMLButtonElement).onclick = () => { util.getId("loading").style.display = "none"; }
(util.getId("settings_cancel") as HTMLButtonElement).onclick = () => { util.getId("settings").style.display = "none" }
(util.getId("settings_button") as HTMLButtonElement).onclick = () => { util.getId("settings").style.display = "flex" }
(util.getId("settings_save") as HTMLButtonElement).onclick = () => {
    (document.querySelectorAll("input.changeConfig") as NodeListOf<HTMLInputElement>).forEach((x: HTMLInputElement) => {
        config[x.getAttribute("data-settingName")] = x.type === "checkbox" ? x.checked : x.type === "number" ? parseInt(x.value) : x.value;
    })

    util.getId("settings").style.display = "none"
    localStorage.setItem("INBOSH_DATA_CONFIG", JSON.stringify(config));

    window.location.reload();
}
(util.getId("settings_reset") as HTMLButtonElement).onclick = () => {
    localStorage.removeItem("INBOSH_DATA_CONFIG");
    window.location.reload();
}

(util.getId("enableFullscreen") as HTMLButtonElement).onclick = async () => {
    if (document.fullscreenElement) {
        await document.exitFullscreen();
        util.getId("enableFullscreen").innerText = "[O] Fullscreen";
    } else {
        await document.documentElement.requestFullscreen();
        util.getId("enableFullscreen").innerText = "[X] Fullscreen";
    }
}

(util.getId("dumpConsole") as HTMLButtonElement).onclick = () => {
    var terminalstr_to_str = terminalContent.map(x => x.map(y => y.valueOf()))
    var dumpstr = terminalstr_to_str.map(x => x.join("")).join("\n")
    var blob = new Blob([dumpstr], { type: "text/plain;charset=utf-8" });
    util.saveAs(blob, "INBOSH_DUMP.txt");
}

//#endregion

//#region Event Listeners

var resizeTimeout: number;
window.addEventListener("resize", () => {
    if (config.debounceResize) {
        util.getId("recalibrating").style.display = "flex";
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => { bothResizeAndLoad("resize") }, config.debounceResizeTime);
    } else {
        bothResizeAndLoad("resize");
    }
})

window.addEventListener("load", () => {
    if (localStorage.getItem("INBOSH_DATA_CONFIG")) {
        config = JSON.parse(localStorage.getItem("INBOSH_DATA_CONFIG"));
        (document.querySelectorAll("input.changeConfig") as NodeListOf<HTMLInputElement>).forEach((x: HTMLInputElement) => {
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
    } else {
        localStorage.setItem("INBOSH_DATA_CONFIG", JSON.stringify(config));
    }

    if (config.showBootScreen) {
        util.getId("loading").style.display = "flex";
    }

    $terminalCtx.fillStyle = config.backgroundColor;
    $terminalCtx.fillRect(0, 0, $terminal.width, $terminal.height);
    console.log("%cOk, so you might ask: Why didn't I remove all of this `console.log` mess?", "color: orange; font-size: 1.5rem; font-weight: bold;");
    console.log("%cTo put it simply: I'm lazy and I don't feel motivated enough to remove it.", "color: lightgreen; font-size: 1.5rem; font-weight: bold;");
    bothResizeAndLoad("load");
})

$scrollbar.addEventListener("mousedown", (e) => {
    scrollbarConfig.leftClick = true;
})

document.addEventListener("mousemove", (e) => {
    if (e.x > document.body.clientWidth - config.scrollBarWidth * 6 && e.x < document.body.clientWidth && e.y > scrollbarConfig.y && e.y < scrollbarConfig.y + scrollbarConfig.height && scrollbarConfig.leftClick) {
        scrollbarConfig.y += e.movementY;
        handleScrollbar();
    } else {
        scrollbarConfig.leftClick = false;
    }
})

document.addEventListener("mouseup", () => {
    scrollbarConfig.leftClick = false;
    drawCaret()
})

document.addEventListener("keydown", (e) => {
    if (!state.allowInput) { return }
    prevCaretPos.x = caretPos.x;
    prevCaretPos.y = caretPos.y;
    console.log(e.key);
    switch (e.key) {

        case "PageUp":
            if (config.enableScrollBar) {
                scrollbarConfig.y -= config.scrollBar_AmountToScroll
                handleScrollbar();
                state.movingPage = true;
            }
            break;

        case "PageDown":
            if (config.enableScrollBar) {
                scrollbarConfig.y += config.scrollBar_AmountToScroll
                handleScrollbar();
                state.movingPage = true;
            }
            break;

        case "ArrowUp":
            break;

        case "ArrowDown":
            break;

        case "ArrowLeft":
            if (state.insertedNumberOfLetters <= 0) break
            if (caretPos.x > 0) {
                caretPos.x--;
            } else if (caretPos.y > 0) {
                caretPos.y--;
                caretPos.x = terminalContent[caretPos.y].length - 1;
            }
            state.insertedNumberOfLetters--;
            break;

        case "ArrowRight":
            if (caretPos.x < terminalContent[caretPos.y].length - 1) {
                caretPos.x++;
                state.insertedNumberOfLetters++;
            } else if (caretPos.y < terminalContent.length - 1) {
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
            // caretPos.y++;
            // caretPos.x = 0;
            // terminalContent.splice(caretPos.y, 0, [new TerminalString({isEndOfLine: true})]);
            state.commandRunning = true;
            state.allowInput = false;

            // test(fda); test1(fdsa)
            main(state.command).then(() => {
                insertString(["", config.commandPrompt], true);
            })
            break;

        case "Backspace":
            if (caretPos.x == 0 && caretPos.y == 0 || state.insertedNumberOfLetters <= 0) break;
            if (caretPos.x <= 0) {
                caretPos.x = terminalContent[caretPos.y - 1].length - 1;
                caretPos.y--;
                var deleted = terminalContent.splice(caretPos.y + 1, 1);
                terminalContent[caretPos.y].pop();
                terminalContent[caretPos.y].push(...deleted[0]);
            } else {
                terminalContent[caretPos.y].splice(caretPos.x - 1, 1);
                caretPos.x--;
            }
            var acommand = state.command.split("")
            acommand.splice(state.insertedNumberOfLetters - 1, 1);
            state.command = acommand.join("");
            state.insertedNumberOfLetters--;
            break;

        default:
            if (e.key.length == 1 && !(e.ctrlKey || e.metaKey || e.altKey)) {
                terminalContent[caretPos.y].splice(caretPos.x, 0, new TerminalString({str: e.key}));
                caretPos.x++;
                state.insertedNumberOfLetters++;
                var acommand = state.command.split("")
                acommand.splice(state.insertedNumberOfLetters - 1, 0, e.key)
                state.command = acommand.join("")
            }
            break;
    }

    if (!state.movingPage) {
        scrollbarConfig.y = Math.max(0, cursorPos.y - availSpace.availRow + 1) / displayContent.length * $scrollbar.height
        scrollbarConfig.height = availSpace.availRow / displayContent.length * $scrollbar.height;
        util.drawScrollBar($scrollbar, $scrollbarCtx, scrollbarConfig.height, scrollbarConfig.y, config.scrollBarColor, config.scrollBarThumbColor);

        displayContent = util.wrapTerminalContent(terminalContent, availSpace.availCol);
        cursorPos = util.findString(displayContent);
        util.drawTerminal($terminal, $terminalCtx, util.cutToFit(displayContent, availSpace.availRow, cursorPos), font, terminalMargin, config.backgroundColor, config.foregroundColor);

        try { terminalContent[prevCaretPos.y][prevCaretPos.x].overlayedByCursor = false } catch(e) {}
        try { terminalContent[caretPos.y][caretPos.x].overlayedByCursor = true; } catch(e) {}
        drawCaret();
    } else {
        state.movingPage = false;
    }
});

//#endregion