"use strict";

String.prototype.toEncodedString = function () {
  var ostr = this.toString().replace(/\s+/g, '');

  if (ostr.length < 8) {
    console.error("Password must be at least 8 characters long with no spaces.");
    return null;
  }

  ;
  var x,
      nstr = '',
      len = ostr.length;

  for (x = 0; x < len; ++x) {
    nstr += (255 - ostr.charCodeAt(x)).toString(36).toUpperCase().toPaddedString(2, '0');
  }

  ;
  return nstr;
};

String.prototype.fromEncodedString = function () {
  var ostr = this.toString();
  var x,
      nstr = '',
      len = ostr.length;

  for (x = 0; x < len; x += 2) {
    nstr += String.fromCharCode(255 - parseInt(ostr.substr(x, 2), 36));
  }

  ;
  return nstr;
};

Number.prototype.toPaddedString = function (len, pad) {
  len = len ? Number(len) : 2;

  if (isNaN(len)) {
    console.error("Padded String 'length' argument is not numeric.");
    return null;
  }

  ;
  var dflt = isNaN(this.toString()) ? " " : "0";
  pad = pad ? pad.toString().substr(0, 1) : dflt;
  var str = this.toString();

  if (dflt == "0") {
    while (str.length < len) {
      str = pad + str;
    }
  } else {
    while (str.length < len) {
      str += pad;
    }
  }

  ;
  return str;
};

String.prototype.toPaddedString = Number.prototype.toPaddedString;

String.prototype.toEncodedString = function () {
  var ostr = this.toString().replace(/\s+/g, '');

  if (ostr.length < 8) {
    console.error("Password must be at least 8 characters long with no spaces.");
    return null;
  }

  ;
  var x,
      nstr = '',
      len = ostr.length;

  for (x = 0; x < len; ++x) {
    nstr += (255 - ostr.charCodeAt(x)).toString(36).toUpperCase().toPaddedString(2, '0');
  }

  ;
  return nstr;
};

String.prototype.fromEncodedString = function () {
  var ostr = this.toString();
  var x,
      nstr = '',
      len = ostr.length;

  for (x = 0; x < len; x += 2) {
    nstr += String.fromCharCode(255 - parseInt(ostr.substr(x, 2), 36));
  }

  ;
  return nstr;
};

Number.prototype.toPaddedString = function (len, pad) {
  len = len ? Number(len) : 2;

  if (isNaN(len)) {
    console.error("Padded String 'length' argument is not numeric.");
    return null;
  }

  ;
  var dflt = isNaN(this.toString()) ? " " : "0";
  pad = pad ? pad.toString().substr(0, 1) : dflt;
  var str = this.toString();

  if (dflt == "0") {
    while (str.length < len) {
      str = pad + str;
    }
  } else {
    while (str.length < len) {
      str += pad;
    }
  }

  ;
  return str;
};

String.prototype.toPaddedString = Number.prototype.toPaddedString;

var cipher = function cipher(salt) {
  var textToChars = function textToChars(text) {
    return text.split('').map(function (c) {
      return c.charCodeAt(0);
    });
  };

  var byteHex = function byteHex(n) {
    return ("0" + Number(n).toString(16)).substr(-2);
  };

  var applySaltToChar = function applySaltToChar(code) {
    return textToChars(salt).reduce(function (a, b) {
      return a ^ b;
    }, code);
  };

  return function (text) {
    return text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
  };
};

var decipher = function decipher(salt) {
  var textToChars = function textToChars(text) {
    return text.split('').map(function (c) {
      return c.charCodeAt(0);
    });
  };

  var applySaltToChar = function applySaltToChar(code) {
    return textToChars(salt).reduce(function (a, b) {
      return a ^ b;
    }, code);
  };

  return function (encoded) {
    return encoded.match(/.{1,2}/g).map(function (hex) {
      return parseInt(hex, 16);
    }).map(applySaltToChar).map(function (charCode) {
      return String.fromCharCode(charCode);
    }).join('');
  };
};

function encrypt(plainmessage, key) {
  return cipher(key)(plainmessage).toEncodedString();
}

function decrypt(encryptedmessage, key) {
  return decipher(key)(encryptedmessage.fromEncodedString());
}