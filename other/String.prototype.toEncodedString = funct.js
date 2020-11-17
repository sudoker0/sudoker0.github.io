String.prototype.toEncodedString = function () {
    var ostr = this.toString().replace(/\s+/g, '');
    if (ostr.length < 8) {
        console.error("Password must be at least 8 characters long with no spaces.");
        return null;
    };
    var x, nstr = '',
        len = ostr.length;
    for (x = 0; x < len; ++x) {
        nstr += (255 - ostr.charCodeAt(x)).toString(36).toUpperCase().toPaddedString(2, '0');
    };
    return nstr;
};
String.prototype.fromEncodedString = function () {
    var ostr = this.toString();
    var x, nstr = '',
        len = ostr.length;
    for (x = 0; x < len; x += 2) {
        nstr += String.fromCharCode(255 - parseInt(ostr.substr(x, 2), 36));
    };
    return nstr;
};
Number.prototype.toPaddedString = function (len, pad) {
    len = (len) ? Number(len) : 2;
    if (isNaN(len)) {
        console.error("Padded String 'length' argument is not numeric.");
        return null;
    };
    var dflt = (isNaN(this.toString())) ? " " : "0";
    pad = (pad) ? pad.toString().substr(0, 1) : dflt;
    var str = this.toString();
    if (dflt == "0") {
        while (str.length < len) str = pad + str;
    } else {
        while (str.length < len) str += pad;
    };
    return str;
};
String.prototype.toPaddedString = Number.prototype.toPaddedString;


String.prototype.toEncodedString = function () {
    var ostr = this.toString().replace(/\s+/g, '');
    if (ostr.length < 8) {
        console.error("Password must be at least 8 characters long with no spaces.");
        return null;
    };
    var x, nstr = '',
        len = ostr.length;
    for (x = 0; x < len; ++x) {
        nstr += (255 - ostr.charCodeAt(x)).toString(36).toUpperCase().toPaddedString(2, '0');
    };
    return nstr;
};
String.prototype.fromEncodedString = function () {
    var ostr = this.toString();
    var x, nstr = '',
        len = ostr.length;
    for (x = 0; x < len; x += 2) {
        nstr += String.fromCharCode(255 - parseInt(ostr.substr(x, 2), 36));
    };
    return nstr;
};
Number.prototype.toPaddedString = function (len, pad) {
    len = (len) ? Number(len) : 2;
    if (isNaN(len)) {
        console.error("Padded String 'length' argument is not numeric.");
        return null;
    };
    var dflt = (isNaN(this.toString())) ? " " : "0";
    pad = (pad) ? pad.toString().substr(0, 1) : dflt;
    var str = this.toString();
    if (dflt == "0") {
        while (str.length < len) str = pad + str;
    } else {
        while (str.length < len) str += pad;
    };
    return str;
};
String.prototype.toPaddedString = Number.prototype.toPaddedString;

const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
}

const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
}

function encrypt(plainmessage, key) {
    return cipher(key)(plainmessage).toEncodedString();
}
function decrypt(encryptedmessage, key) {
    return decipher(key)(encryptedmessage.fromEncodedString());
}