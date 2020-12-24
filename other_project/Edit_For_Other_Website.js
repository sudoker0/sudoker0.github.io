/*
===================================
Edit (But for Other Website)
-----------------------------
If anyone want to use the edit program (In my console project) in your website. Here it is!
How to use:
    + Load the JS file into your html
    + Before initialize the editor, please read the note by typing initialize_editor(<any_id>) to see the note
    + To Initialize the editor, run: initialize_editor(<insert_id>, true) (Replace the <insert_id> with the id that you want the editor to sit into, the "true" stated that you have accepted the risk)
    + To open the editor, run open_editor();
    + To close the editor, run close_editor();
    + To Un-Initialize, run uninitialize_editor();
-----------------------------
Copyright (C) 2020 Quan_MCPC
*/
function initialize_editor(parentId, acceptRisk) {
    if (acceptRisk) {
        if (!!document.getElementById(parentId)) {
            if (!document.getElementsByClassName("moNndhEOCbPJu65PiwZQ0L2N0QFMkp4zpHawfJIY6c7R7AY4MJK0oVKY2CelpMou")[0]) {
                console.log("%cSo you have accepted the risk. Be careful!", "color: white; background-color: red")
                var s = '<div id="editor" class="moNndhEOCbPJu65PiwZQ0L2N0QFMkp4zpHawfJIY6c7R7AY4MJK0oVKY2CelpMou"> <div id="editor_bar" style="text-align: center;"><button style="position: absolute; left: 10px" onclick="exit_edit()">Close</button>Edit Document In Terminal [Edit]</div><div id="editor_overlay" style="position: absolute; display: none; width: 100%; height: 93%; background-color: rgba(0, 0, 0, 0.3); z-index: 1;"></div><div id="editor_menu"> <div id="edit_file_dropdown" class="edit_dropdown"> <a rel="noreferrer" href="#" class="edit_button" id="file_edit">File</a> <div id="edit_file_menu" class="test123"> <a rel="noreferrer" onclick="editor_new()" href="#" class="edit_button_1"><b>New</b></a> <a rel="noreferrer" onclick="editor_open()" href="#" class="edit_button_1"><b>Open</b></a> <a rel="noreferrer" onclick="editor_save()" href="#" class="edit_button_1"><b>Download</b></a> <a rel="noreferrer" onclick="editor_exit()" href="#" class="edit_button_1"><b>Reset and Exit</b></a> </div></div><div id="edit_edit_dropdown" class="edit_dropdown"> <a rel="noreferrer" href="#" class="edit_button" id="edit_edit">Edit</a> <div id="edit_edit_menu" class="test123"> <a rel="noreferrer" onclick="editor_cut_text()" href="#" class="edit_button_1"><b>Cut Selected Text</b></a> <a rel="noreferrer" onclick="editor_copy_text()" href="#" class="edit_button_1"><b>Copy Selected Text</b></a> <a rel="noreferrer" onclick="editor_paste_text()" href="#" class="edit_button_1"><b>Paste [Deprecated]</b></a> <a rel="noreferrer" onclick="editor_selectall_text()" href="#" class="edit_button_1"><b>Select All</b></a> <a rel="noreferrer" onclick="editor_undo_text()" href="#" class="edit_button_1"><b>Undo</b></a> <a rel="noreferrer" onclick="editor_redo_text()" href="#" class="edit_button_1"><b>Redo</b></a> <a rel="noreferrer" onclick="editor_td_text()" href="#" class="edit_button_1"><b>Time/Date</b></a> </div></div><div id="edit_search_dropdown" class="edit_dropdown"> <a rel="noreferrer" href="#" class="edit_button" id="search_edit">Search</a> <div id="edit_search_menu" class="test123"> <a rel="noreferrer" onclick="editor_find()" href="#" class="edit_button_1"><b>Find</b></a> <a rel="noreferrer" onclick="editor_replace()" href="#" class="edit_button_1"><b>Replace</b></a> <a rel="noreferrer" onclick="editor_gotoline()" href="#" class="edit_button_1"><b>Go to line</b></a> <a rel="noreferrer" onclick="editor_search_with_google()" href="#" class="edit_button_1"><b>Search selected text with Google</b></a> </div></div><div id="edit_about_dropdown" class="edit_dropdown"> <a rel="noreferrer" href="#" class="edit_button" id="about_edit">Help</a> <div id="edit_about_menu" class="test123"> <a rel="noreferrer" onclick="editor_about()" href="#" class="edit_button_1"><b>About</b></a> </div></div></div><div style="background-color: black; line-height: 23px; vertical-align: middle; text-align: center; color: white; width: 738px; height: 23px; border: 6px double rgb(156, 156, 156)" id="editor_filename">UNTITLED 1</div><textarea id="editor_input" style="width: 735px; height: 80%; bottom: 0px; position: absolute; z-index: -1; resize: none; outline: none; background-color: black; color: white; border: 6px double rgb(197, 197, 197);"></textarea> <div id="editor_save" style="z-index: 3; display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; height: 150px; color: white; border: 6px double white"> <p style="text-align: center;">Download Document</p><center> <label for="editor_save_name" style="text-align: center">Download file as: </label> <input placeholder="Filename" id="editor_save_name" style="outline: none"> <br><br><button onclick="editor_save1()">Download file</button><button onclick="editor_cancel_save()">Cancel</button> </center> </div><div id="editor_open" style="z-index: 3; display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; height: 150px; color: white; border: 6px double white"> <p style="text-align: center;">Open Document</p><center> <label for="editor_open_name" style="text-align: center">Load file: </label> <input id="editor_open_name" type="file"> <br><br><button onclick="editor_load1()">Load file</button><button onclick="editor_cancel_load()">Cancel</button> </center> </div><div id="editor_find" style="bottom: 0; right: 0; padding: 5px 5px; z-index: 3; display: none; position: absolute; width: 360px; height: 25px; color: white; border: 6px double white"> <label for="editor_find_name" style="text-align: center">Find: </label> <input placeholder="Find word" id="editor_find_name" style="outline: none; border: 2px solid gray; width: 80px;"> <button onclick="editor_find1()">Find</button><button onclick="editor_cancel_find()">Cancel</button> <input type="checkbox" id="editor_wrap_around"><label for="editor_wrap_around">Wrap Around</label> </div><div id="editor_replace" style="bottom: 0; right: 0; padding: 5px 5px; z-index: 3; display: none; position: absolute; width: 685px; height: 25px; color: white; border: 6px double white"> <label for="editor_find_replace_name" style="text-align: center">Find:&nbsp;</label> <input onkeydown="editor_replace_find_replace()" placeholder="Find word" id="editor_find_replace_name" style="outline: none; border: 2px solid gray; width: 80px;"> <label for="editor_replace_find_name" style="text-align: center">Replace:&nbsp;</label> <input onkeydown="editor_replace_find_replace()" placeholder="Replace with" id="editor_replace_find_name" style="outline: none; border: 2px solid gray; width: 80px;"> <button onclick="editor_find2()">Find</button><button onclick="editor_replace1()">Replace</button><button onclick="editor_replace2()">Replace all</button><button onclick="editor_cancel_replace()">Cancel</button> <input type="checkbox" id="editor_wrap_around1"><label for="editor_wrap_around1">Wrap Around</label> </div><div id="editor_gotoline" style="bottom: 0; right: 0; padding: 5px 5px; z-index: 3; display: none; position: absolute; width: 310px; height: 25px; color: white; border: 6px double white"> <label for="editor_goto_input" style="text-align: center">Line number:&nbsp;</label> <input type="number" placeholder="Number" id="editor_goto_input" style="outline: none; border: 2px solid gray; width: 80px;"> <button onclick="editor_goto()">Go to</button><button onclick="editor_cancel_gotoline()">Cancel</button> </div><div id="editor_about" style="z-index: 3; display: none; position: absolute; width: 400px; height: 275px; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: gray; border: 6px double white"> <p style="text-align: center">About EDIT (Edit Document In Terminal)</p><p style="text-align: center">Version: 1.4</p><p style="text-align: center">Release Date: Friday, 23th 2020</p><p style="text-align: center">First release: Wednesday, 9th, 2020</p><p style="text-align: center">Copyright (C) 2020 Quan_MCPC</p><p style="text-align: center">Source code are free to copy, modify and publish. Just remember to include my Copyright</p><center> <button onclick="editor_about_close()">OK</button> </center> </div></div>';
                document.getElementById(parentId).innerHTML += s;
                var s1 = '<style id="CO9ddjOBdmvS6GhtgsR1IeOBcyxmNzWxphpdFwJJP3BLYGiWUJNbof4X4frKDY0F">#editor{display: none; background-color: rgb(0, 0, 255); width: 750px; height: 550px; border: 3px solid white; position: absolute; z-index: 9; font-size: 16px;}#editor_bar{padding: 10px; cursor: move; z-index: 10; background-color: rgba(0, 255, 136, 0.5); color: #fff;}#editor_menu{padding: 1px; z-index: 11; background-color: rgb(70, 70, 70); color: #fff;}#editor_menu > div{display:inline-block;}.edit_button{background-color: rgb(70, 70, 70); border: none; color: rgb(255, 255, 255); width: 80px; height: 20px; text-decoration: none; display: inline-block; font-size: 16px; margin-right: -1px; margin-left: -1px; margin-top: -1px; margin-bottom: -1px; cursor: context-menu; text-align: center; border: 0px solid}.edit_button:hover{background-color: rgb(0, 0, 0);}.edit_button_1{margin-left: 1px; width: 248px; height: 19px; color: rgb(201, 201, 201);}.edit_button_1:hover{background-color: rgb(0, 0, 0);}#edit_file_menu, #edit_edit_menu, #edit_search_menu, #edit_about_menu{position: absolute; background-color: rgb(175, 175, 175); text-align: left; width: 250px; padding: 2px 0px; margin: 0px -1px; border: 4px double black; display: none;}#edit_file_menu a, #edit_edit_menu a, #edit_search_menu a, #edit_about_menu a{color: rgb(236, 236, 236); display: block; text-align: left; text-decoration: none;}#editor_input::-webkit-scrollbar{display: none;}#editor_input{-ms-overflow-style: none; /* IE and Edge */ scrollbar-width: none; /* Firefox */}#edit_file_dropdown:hover #edit_file_menu{display: block;}#edit_edit_dropdown:hover #edit_edit_menu{display: block;}#edit_search_dropdown:hover #edit_search_menu{display: block;}#edit_about_dropdown:hover #edit_about_menu{display: block;}.edit_button_1{cursor: context-menu;}button{background-color: #707070; border: none; color: white; padding: 2px 10px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 0px 1px; cursor: pointer;}</style>';
                document.getElementsByTagName("head")[0].innerHTML += s1;
                dragElement1(document.getElementById("editor"));
                console.info("EDIT has been Initialized successfully!");
            } else {
                console.error("Failed to Initialize EDIT");
                console.error("Error: EDIT has already been initialized")
            }
        } else {
            console.error("Failed to Initialize EDIT");
            console.error("Error: No ID with name:", parentId ,"exist. Please check the name again")
        }
    } else {
        console.error("Failed to Initialize EDIT");
        console.info("Please read this carefully:\n  + By using EDIT, that mean you have accepted the risk that style, script, id, class name that started with \"editor\" can cause the script to malfunction.\n  + Even though this script is free to use and distribute, please remember to keep my copyright info.\nOnce you have read the note carefully, type: initialize_editor(<insert_id>, true) (Replace <insert_id> with the id that you want the edit to sit on)")
    }
}
function open_editor() {
    let edit = document.querySelector("#editor");
    edit.style.display = "block";
}
function close_editor() {
    let edit_1 = document.querySelector("#editor");
    edit_1.style.display = "none";
}
function uninitialize_editor() {
    if (!document.getElementsByClassName("moNndhEOCbPJu65PiwZQ0L2N0QFMkp4zpHawfJIY6c7R7AY4MJK0oVKY2CelpMou")[0] || !document.getElementById("CO9ddjOBdmvS6GhtgsR1IeOBcyxmNzWxphpdFwJJP3BLYGiWUJNbof4X4frKDY0F")) {
        console.error("Failed to Un-Initialize EDIT");
        console.error("Error: EDIT is nowhere to be found!");
    } else {
        document.getElementsByClassName("moNndhEOCbPJu65PiwZQ0L2N0QFMkp4zpHawfJIY6c7R7AY4MJK0oVKY2CelpMou")[0].remove();
        document.getElementById("CO9ddjOBdmvS6GhtgsR1IeOBcyxmNzWxphpdFwJJP3BLYGiWUJNbof4X4frKDY0F").remove();
        console.info("EDIT has been Un-Initialized successfully!");
    }
}
function dragElement1(elmnt1) {
    if (document.getElementById(elmnt1.id + "_bar")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt1.id + "_bar").onmousedown = dragMouseDown1;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown1;
    }
    function dragMouseDown1(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3_1 = e.clientX;
        pos4_1 = e.clientY;
        document.onmouseup = closeDragElement1;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag1;
    }
    function elementDrag1(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1_1 = pos3_1 - e.clientX;
        pos2_1 = pos4_1 - e.clientY;
        pos3_1 = e.clientX;
        pos4_1 = e.clientY;
        // set the element's new position:
        test_1_1 = (elmnt1.offsetTop - pos2_1);
        test_2_1 = (elmnt1.offsetLeft - pos1_1);
        if (test_2_1 <= 0 || test_1_1 <= 0 || window.innerWidth - 757 < test_2_1 || window.innerHeight - 557 < test_1_1) {
        } else {
            elmnt1.style.top = (elmnt1.offsetTop - pos2_1) + "px";
            elmnt1.style.left = (elmnt1.offsetLeft - pos1_1) + "px";
        }
    }
    function closeDragElement1() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function exit_edit() {
    let edit_1 = document.querySelector("#editor");
    edit_1.style.display = "none";
}
var start_1 = 0;
window.count_1 = 0;
var start_2 = 0;
window.count_2 = 0;
var start_3 = 0;
var v3 = 1;
window.console_output = true;
var open_window = false;
var save_window = false;
function editor_search_with_google() {
    var highlight = document.getSelection();
    window.open("https://www.google.com/search?q=" + highlight, "_blank")
}
function editor_replace_find_replace() {
    window.start_1 = 0; window.start_2 = 0; window.start_3 = 0; window.count_1 = 0; window.count_2 = 0;
}
function editor_td_text() {
    var td = new Date();
    document.getElementById("editor_input").value += td;
}
function editor_cancel_gotoline() {
    let close = document.querySelector("#editor_gotoline");
    close.style.display = "none";
    document.querySelector("#editor_overlay").style.display = "none";
}
function editor_goto() {
    var a = document.getElementById("editor_input");
    var b = document.getElementById("editor_goto_input").value;
    selectTextareaLine3(a, b);
}
function editor_gotoline() {
    let open = document.querySelector("#editor_gotoline");
    open.style.display = "block";
    document.querySelector("#editor_overlay").style.display = "block";
}
function editor_about() {
    let open = document.querySelector("#editor_about");
    open.style.display = "block";
    document.querySelector("#editor_overlay").style.display = "block";
}
function editor_about_close() {
    let close = document.querySelector("#editor_about");
    close.style.display = "none";
    document.querySelector("#editor_overlay").style.display = "none";
}
function editor_new() {
    var check = document.getElementById("editor_input").value;
    if (check == '') {
        document.getElementById("editor_input").value = '';
        v3++;
        document.getElementById("editor_filename").innerHTML = "UNTITLED " + v3;
    } else {
        var confirm1 = confirm("There is some text in the editor. If you already downloaded the document, press Ok to create new document, if not, press Cancel, download the document then press Ok to create new document");
        if (confirm1) {
            document.getElementById("editor_input").value = '';
            v3++;
            document.getElementById("editor_filename").innerHTML = "UNTITLED " + v3;
        } else {
            throw new Error("This is not an error");
        }
    }
}
function editor_replace() {
    let open = document.querySelector("#editor_replace");
    open.style.display = "block";
    document.querySelector("#editor_overlay").style.display = "block";
}
function editor_cancel_replace() {
    let close = document.querySelector("#editor_replace");
    close.style.display = "none";
    document.querySelector("#editor_overlay").style.display = "none";
    window.start_1 = 0; window.start_2 = 0; window.start_3 = 0; window.count_1 = 0; window.count_2 = 0;
}
function editor_replace2() {
    if (document.getElementById("editor_find_replace_name").value !== "") {
        var a = confirm("Are you sure that you want to replace ALL OCCURRENCES?");
        if (a) {
            const search = document.getElementById("editor_find_replace_name").value;
            const replace_with = document.getElementById("editor_replace_find_name").value;
            const input = document.getElementById("editor_input").value;
            const output = input.split(search).join(replace_with);
            document.getElementById("editor_input").value = output;
        } else {
            throw new Error("This is not an error")
        }
    } else {
        alert("Do not leave the search box empty!");
        throw new Error("This is not an error");
    }
}
function editor_replace1() {
    if (document.getElementById("editor_find_replace_name").value !== "") {
        editor_find3();
        var el = document.getElementById("editor_input");
        var el_1 = document.getElementById("editor_replace_find_name").value;
        replaceSelectedText(el, el_1);
    } else {
        alert("Do not leave the search box empty!");
        throw new Error("This is not an error");
    }
}
function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;
    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();
        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");
            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());
            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);
            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;
                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    } return {
        start: start,
        end: end
    };
}
function replaceSelectedText(el, text) {
    var sel = getInputSelection(el), val = el.value;
    el.value = val.slice(0, sel.start) + text + val.slice(sel.end);
}
function editor_find1() {
    if (document.getElementById("editor_find_name").value !== "") {
        var sel = document.getElementById('editor_find_name');
        var tarea = document.getElementById('editor_input');
        selectTextareaLine(tarea, sel.value);
    } else {
        alert("Do not leave the search box empty!");
        throw new Error("This is not an error");
    }
}
function editor_find2() {
    if (document.getElementById("editor_find_replace_name").value !== "") {
        var sel = document.getElementById('editor_find_replace_name');
        var tarea = document.getElementById('editor_input');
        selectTextareaLine1(tarea, sel.value);
    } else {
        alert("Do not leave the search box empty!");
        throw new Error("This is not an error");
    }
}
function editor_find3() {
    var sel = document.getElementById('editor_find_replace_name');
    var tarea = document.getElementById('editor_input');
    selectTextareaLine2(tarea, sel.value);
}
function selectTextareaLine3(tarea,lineNum) {
    lineNum--; // array starts at 0
    if (lineNum > -1) {
        var lines = tarea.value.split("\n");
        // calculate start/end
        var startPos = 0, endPos = tarea.value.length;
        for(var x = 0; x < lines.length; x++) {
            if(x == lineNum) {
                break;
            }
            startPos += (lines[x].length+1);
        }
        var endPos = lines[lineNum].length+startPos;
        // do selection
        // Chrome / Firefox
        if(typeof(tarea.selectionStart) != "undefined") {
            tarea.focus();
            tarea.selectionStart = startPos;
            tarea.selectionEnd = endPos;
            var textLines = tarea.value.substr(0, tarea.selectionStart).split("\n");
            var currentLineNumber = textLines.length;
            if (currentLineNumber >= 29) {
                var calc = (currentLineNumber - 29) * 15 + 30;
                tarea.scrollTop = calc;
            } else {
                tarea.scrollTop = 0;
            }
            return true;
        }
        // IE
        if (document.selection && document.selection.createRange) {
            tarea.focus();
            tarea.select();
            var range = document.selection.createRange();
            range.collapse(true);
            range.moveEnd("character", endPos);
            range.moveStart("character", startPos);
            range.select();
            return true;
        }
        return false;
    } else {
        alert("A line number can't be a negative number");
        return false;
    }
}
function selectTextareaLine2(tarea, word_1) {
    if (tarea.value.indexOf(word_1, window.start_3) > -1) {
        const words_1 = tarea.value.split(" ");
        // calculate start/end
        const startPos_1 = tarea.value.indexOf(word_1, window.start_3), endPos_1 = startPos_1 + word_1.length
        if (typeof(tarea.selectionStart) != "undefined") {
            tarea.focus();
            tarea.selectionStart = startPos_1;
            tarea.selectionEnd = endPos_1;
            count_1++;
            window.start_3 = tarea.value.indexOf(word_1, window.start_3) + 1;
            var textLines = tarea.value.substr(0, tarea.selectionStart).split("\n");
            var currentLineNumber = textLines.length;
            if (currentLineNumber >= 29) {
                var calc = (currentLineNumber - 29) * 15 + 30;
                tarea.scrollTop = calc;
            } else {
                tarea.scrollTop = 0;
            }
            return true;
        }
    } else {
        alert("End of line reached!");
        throw new Error("Do not panic! This is not a error");
    }
    // IE
    if (document.selection && document.selection.createRange) {
        tarea.focus();
        tarea.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", endPos_1);
        range.moveStart("character", startPos_1);
        range.select();
        return true;
    }
    return false;
}
function selectTextareaLine(tarea, word_1) {
    if (tarea.value.indexOf(word_1, window.start_1) > -1) {
        const words_1 = tarea.value.split(" ");
        // calculate start/end
        const startPos_1 = tarea.value.indexOf(word_1, window.start_1), endPos_1 = startPos_1 + word_1.length
        if (typeof(tarea.selectionStart) != "undefined") {
            tarea.focus();
            tarea.selectionStart = startPos_1;
            tarea.selectionEnd = endPos_1;
            count_1++;
            window.start_1 = tarea.value.indexOf(word_1, window.start_1) + 1;
            var textLines = tarea.value.substr(0, tarea.selectionStart).split("\n");
            var currentLineNumber = textLines.length;
            if (currentLineNumber >= 29) {
                var calc = (currentLineNumber - 29) * 15 + 30;
                tarea.scrollTop = calc;
            } else {
                tarea.scrollTop = 0;
            }
            return true;
        }
    } else {
        if (document.getElementById("editor_wrap_around").checked) {
            window.start_1 = 0;
        } else {
            alert("End of line reached!");
            throw new Error("Do not panic! This is not a error");
        }
    }
    // IE
    if (document.selection && document.selection.createRange) {
        tarea.focus();
        tarea.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", endPos_1);
        range.moveStart("character", startPos_1);
        range.select();
        return true;
    }
    return false;
}
function selectTextareaLine1(tarea, word_2) {
    if (tarea.value.indexOf(word_2, window.start_2) > -1) {
        const words_2 = tarea.value.split(" ");
        // calculate start/end
        const startPos_2 = tarea.value.indexOf(word_2, window.start_2), endPos_2 = startPos_2 + word_2.length
        if (typeof(tarea.selectionStart) != "undefined") {
            tarea.focus();
            tarea.selectionStart = startPos_2;
            tarea.selectionEnd = endPos_2;
            count_2++;
            window.start_2 = tarea.value.indexOf(word_2, window.start_2) + 1;
            var textLines = tarea.value.substr(0, tarea.selectionStart).split("\n");
            var currentLineNumber = textLines.length;
            if (currentLineNumber >= 29) {
                var calc = (currentLineNumber - 29) * 15 + 30;
                tarea.scrollTop = calc;
            } else {
                tarea.scrollTop = 0;
            }
            return true;
        }
    } else {
        if (document.getElementById("editor_wrap_around1").checked) {
            window.start_2 = 0;
        } else {
            alert("End of line reached!");
            throw new Error("Do not panic! This is not a error");
        }
    }
    // IE
    if (document.selection && document.selection.createRange) {
        tarea.focus();
        tarea.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", endPos_2);
        range.moveStart("character", startPos_2);
        range.select();
        return true;
    }
    return false;
}
function editor_find() {
    let open = document.querySelector("#editor_find");
    open.style.display = "block";
    document.querySelector("#editor_overlay").style.display = "block";
}
function editor_cancel_find() {
    let close = document.querySelector("#editor_find");
    close.style.display = "none";
    document.querySelector("#editor_overlay").style.display = "none";
    window.start_1 = 0; window.start_2 = 0; window.start_3 = 0; window.count_1 = 0; window.count_2 = 0;
}
function editor_cut_text() {
    var cut_sel = document.getSelection();
    if (!document.execCommand('cut')) {
        alert("Sorry! Browser not support or document.execCommand is not supported");
        return false;
    } else {
        document.execCommand('cut');
    }
}
function editor_copy_text() {
    var copy_sel = document.getSelection();
    if (!document.execCommand('copy')) {
        alert("Sorry! Browser not support or document.execCommand is not supported");
        return false;
    } else {
        document.execCommand('copy');
    }
}
function editor_paste_text() {
    if (!document.execCommand('paste')) {
        alert("Sorry! Due to security concern, document.execCommand('paste') is no longer support on major browser and only work in Internet Explorer");
        return false;
    } else {
        var editor_pasteTest = document.querySelector("#editor_input");
        editor_pasteTest.focus();
        document.execCommand('paste');
        navigator.clipboard.readText()
    }
}
function editor_undo_text() {
    if (!document.execCommand('undo')) {
        alert("Sorry! Browser not support or document.execCommand is not supported");
        return false;
    } else {
        document.execCommand('undo');
    }
}
function editor_redo_text() {
    if (!document.execCommand('redo')) {
        alert("Sorry! Browser not support or document.execCommand is no longer supported");
        return false;
    } else {
        document.execCommand('redo');
    }
}
function editor_selectall_text() {
    document.getElementById("editor_input").focus();
    document.getElementById("editor_input").select();
}
function editor_exit() {
    /*let close = document.querySelector("#editor");
    close.style.display = "none";*/
    if (confirm("WARNING: Unlike the close button up the top that only close the window but still keep the progress. Reset and Close will reset your progress [including the console log] and close the window. Please download any document that you're currently writing!\r\n Are you sure you want to continue?")) {
        window.location.reload(true);
    }
}
function editor_open() {
    let open = document.querySelector("#editor_open");
    open.style.display = "block";
    document.querySelector("#editor_overlay").style.display = "block";
}
function editor_cancel_save() {
    let cancel1 = document.querySelector("#editor_save");
    cancel1.style.display = "none";
    document.querySelector("#editor_overlay").style.display = "none";
}
function editor_cancel_load() {
    let cancel = document.querySelector("#editor_open");
    cancel.style.display = "none";
    document.querySelector("#editor_overlay").style.display = "none";
}
function editor_save() {
    let save = document.querySelector("#editor_save");
    save.style.display = "block";
    document.querySelector("#editor_overlay").style.display = "block";
}
function editor_load1() {
    var fileToLoad = document.getElementById("editor_open_name").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("editor_input").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
    let cancel = document.querySelector("#editor_open");
    cancel.style.display = "none";
    document.querySelector("#editor_overlay").style.display = "none";
    //document.getElementById("editor_filename").innerHTML = "File: " + document.getElementById("editor_open_name").value.replace(/fakepath/, '');
    var fullPath = document.getElementById('editor_open_name').value;
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        document.getElementById("editor_filename").innerHTML = "File: " + filename;
    }
}
function editor_save1() {
    var textToSave = document.getElementById("editor_input").value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    if (document.getElementById("editor_save_name").value == "") {
        var fileNameToSaveAs = "DEFAULT";
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    } else {
        var fileNameToSaveAs = document.getElementById("editor_save_name").value;
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    let cancel1 = document.querySelector("#editor_save");
    cancel1.style.display = "none";
    document.getElementById("editor_filename").innerHTML = "File: " + document.getElementById("editor_save_name").value;
    document.querySelector("#editor_overlay").style.display = "none";
}
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}