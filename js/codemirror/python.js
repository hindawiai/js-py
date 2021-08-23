// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  function wordRegexp(words) {
    return new RegExp("^((" + words.join(")|(") + "))\\b");
  }

  //update here for code highlighters
  var wordOperators = wordRegexp(["and", "or", "not", "is"]);
  var commonKeywords = ["as", "assert", "break", "class", "continue",
                        "def", "del", "elif", "else", "except", "finally",
                        "for", "from", "global", "if", "import",
                        "lambda", "pass", "raise", "return",
                        "try", "while", "with", "yield", "in",
                       "मुख्य","प्राथमिक\.स","भाग\.स","निश्चित\.स","मूलप्रण\.स","पट्टपन\.स","प्रकार\.स","सूची\.स","डॉस\.स","त्रुटिसं\.स","भग्न\.स","पन\.स","सीमा\.स","क्षेत्र\.स","गणित\.स","स्मृति\.स","क्रिया\.स","समलाँघ\.स","संकेत\.स","मानकतर्क\.स","मानकघोष\.स","मानकपन\.स","मानककोष\.स","माला\.स","स्थिति\.स","समय\.स","ब_समय\.स","अणु","पूर्ण","\#घोषणा","\#या_अगर","\#अन्यथा","\#पूर्ण_अगर","\#त्रुटि","\#अगर","\#अगर_घोषित","\#अगर_अघोषित","\#समावेश","\#पंक्ति","\#आशय","\#अघोषित","बफ_मान","अक्षर_बिट","अक्षर_उच्च","अक्षर_न्यून","शिशु_उच्च","घड़ी_टिक","द्विग_भग्न","द्विग_अंतर","द्विग_पूर्ण","द्विग_उच्च","द्विग_न्यून","सूची","गलत_तर्क","खातापूर्ण","दुस्फल","निकास_त्रुटि","निकास_सफल","खाता","खातानाम_उच्च","भग्न_भग्न","भग्न_अंतर","भग्न_पूर्ण","भग्न_उच्च","भग्न_न्यून","भग्न_आधार","ख_खोलो_उच्च","विशाल_मान","अनन्त","पूर्णांक_उच्च","पूर्णांक_न्यून","द_द्वि_भग्न","द_द्वि_अंतर","द_द्वि_पूर्ण","द_द्वि_उच्च","द_द्वि_न्यून","दीर्घ_उच्च","दीर्घ_न्यून","ब_क्षणिक","न_अंक","न_संशोधन","शून्य","अक्रम_उच्च","च_अक्षर_उच्च","च_अक्षर_न्यून","प्रस्तुत_से","अंत_से","शुरू_से","लघु_उच्च","लघु_न्यून","संक_पात","संक_भ_त्रुटि","संक_अवैध","संक_विघ्न","संक_अंश","संक_इति","संक_पूर्व","संक_त्रुटि","संक_छोड़ो","क्षणिक_उच्च","अच_अक्षर_उच्च","अच_पूर्णांक_उच्च","अच_दीर्घ_उच्च","अच_लघु_उच्च","\\च","\\म","\\प","\\न","\\ल","\\ट","\\ख","\\ष","__दिन__","__खाता__","__पंक्ति__","__मानक__","__समय__","पात","असल","समय_ठीक","यंत्र","निश्चित","निकास_पर","म_से_भ","म_से_प","म_से_द","स्वतः","अवरोध","द्वा_खोज","सुस्मृति","हाल","उच्चमान","अक्षर","स_बदलो","साफ_त्रुटि","घड़ी","घड़ी_प्रकार","बंद","बंद_सूची","स्थिर","जारी","स_समय","शेष","स_अंतर","स_नाम","भाग","भाग_प्रकार","करो","द्विगुन","अन्यथा","क्रमागत","त्रुटि_सं","निकास","बाह्य","भ_असल","ख_बंद","ख_पूर्ण","ख_त्रुटि","ख_साफ","ख_अक्षर_लो","ख_स्थान_लो","ख_माला_लो","भग्न","न्यूनमान","भ_शेष","ख_खोलो","क्रम","विभाजन","ख_स्थान_प्रकार","ख_लिखो","ख_अक्षर_दो","ख_माला_दो","ख_पढ़ो","मुक्त","ख_व_खोलो","मित्र","ख_पूछो","ख_जाओ","ख_स्थान_दो","ख_स्थिति","ख_बताओ","ख_डालो","अ_लो","अक्षर_लो","दो_पर्या","माला_लो","स_जमट","जाओ","अगर","अंतरभूत","पूर्णांक","है_अक्षर_अंक","है_अक्षर","है_नियंत्रण","है_अंक","है_सीमित","है_चित्र","है_छोटा","है_अष्टक","है_छाप","है_विराम","है_खाली","है_बड़ा","है_षष्ठादशक","लाँघ_बफ","समाप्त","द_असल","स्था_बदल","द_भाग","द_भाग_प्रकार","क्षेत्र_बदलो","स_स्थानीय","दीर्घ","दीर्घ_लाँघ","दो_स्मृति","स_प्रथम","स_भेद","स_नकल","स_हटाओ","स_रखो","सूची_गढ़ो","स_गढ़ो","दुरत्व","खोलो","सूची_खोलो","चालक","छोड़ो","लिखो_त्रुटि","घात","म_लिखो","निजी","रक्षित","सूचक_भेद_प्रकार","खुला","अ_दो","अक्षर_दो","माला_दो","क्विक","उठाओ","अक्रम","पढ़ो","सूची_पढ़ो","पुनः_स्मृति","रेजिस्टर","हटाओ","नाम","वापस","शुरुआत","सूची_शुरु","सूची_हटाओ","म_पूछो","रखो_बफ","बनाओ_लाँघ","रखो_क्षेत्र","रखो_भबफ","लघु","संक_पूर्ण_प्रकार","संकेत","चिन्हित","संक_बाकी","संक_रोको","माप_प्रकार","माप","प्र_लिखो","वर्ग_मूल","बेक्रम","माला_पूछो","अटल","मानक_त्रुटि","मानक_निवेश","मानक_निकास","म_जोड़ो","म_अक्षर","म_भेद","म_नकल","म_खोज","म_त्रुटि","स_माला","म_माप","म_जोड़न","म_भेदन","म_नकलन","म_खोजप","म_अखोज","म_माला","म_से_भग्न","म_मोहर","म_से_दीर्घ","म_से_अदीर्घ","काष्ठा","चयन","प्रणाली","ढाँचा","समय","समय_प्रकार","बार","पंचांग","क्षणिक_ख","क्षणिक","छोटे","बड़े","प्रकार","अक्षर_वापस","जोड़","अचिन्हित","बहु_तर्क","बहु_पूर्ण","बहु_सूची","बहु_शुरू","भख_लिखो","भव","व्योम","अस्थिर","भ_लिखो","भम_लिखो","रुको","ब_अक्षर_प्रकार","जबतक","ग_लिखो","समय_लो","समय_रखो"];
  var commonBuiltins = ["abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr",
                        "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod",
                        "enumerate", "eval", "filter", "float", "format", "frozenset",
                        "getattr", "globals", "hasattr", "hash", "help", "hex", "id",
                        "input", "int", "isinstance", "issubclass", "iter", "len",
                        "list", "locals", "map", "max", "memoryview", "min", "next",
                        "object", "oct", "open", "ord", "pow", "property", "range",
                        "repr", "reversed", "round", "set", "setattr", "slice",
                        "sorted", "staticmethod", "str", "sum", "super", "tuple",
                        "type", "vars", "zip", "__import__", "NotImplemented",
                        "Ellipsis", "__debug__"];
  var py2 = {builtins: ["apply", "basestring", "buffer", "cmp", "coerce", "execfile",
                        "file", "intern", "long", "raw_input", "reduce", "reload",
                        "unichr", "unicode", "xrange", "False", "True", "None"],
             keywords: ["exec", "print"]};
  var py3 = {builtins: ["ascii", "bytes", "exec", "print"],
             keywords: ["nonlocal", "False", "True", "None"]};

  CodeMirror.registerHelper("hintWords", "python", commonKeywords.concat(commonBuiltins));

  function top(state) {
    return state.scopes[state.scopes.length - 1];
  }

  CodeMirror.defineMode("python", function(conf, parserConf) {
    var ERRORCLASS = "error";

    var singleDelimiters = parserConf.singleDelimiters || new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]");
    var doubleOperators = parserConf.doubleOperators || new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))");
    var doubleDelimiters = parserConf.doubleDelimiters || new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))");
    var tripleDelimiters = parserConf.tripleDelimiters || new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))");

    if (parserConf.version && parseInt(parserConf.version, 10) == 3){
        // since http://legacy.python.org/dev/peps/pep-0465/ @ is also an operator
        var singleOperators = parserConf.singleOperators || new RegExp("^[\\+\\-\\*/%&|\\^~<>!@]");
        var identifiers = parserConf.identifiers|| new RegExp("^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*");
    } else {
        var singleOperators = parserConf.singleOperators || new RegExp("^[\\+\\-\\*/%&|\\^~<>!]");
        var identifiers = parserConf.identifiers|| new RegExp("^[_A-Za-z][_A-Za-z0-9]*");
    }

    var hangingIndent = parserConf.hangingIndent || conf.indentUnit;

    var myKeywords = commonKeywords, myBuiltins = commonBuiltins;
    if(parserConf.extra_keywords != undefined){
      myKeywords = myKeywords.concat(parserConf.extra_keywords);
    }
    if(parserConf.extra_builtins != undefined){
      myBuiltins = myBuiltins.concat(parserConf.extra_builtins);
    }
    if (parserConf.version && parseInt(parserConf.version, 10) == 3) {
      myKeywords = myKeywords.concat(py3.keywords);
      myBuiltins = myBuiltins.concat(py3.builtins);
      var stringPrefixes = new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))", "i");
    } else {
      myKeywords = myKeywords.concat(py2.keywords);
      myBuiltins = myBuiltins.concat(py2.builtins);
      var stringPrefixes = new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))", "i");
    }
    var keywords = wordRegexp(myKeywords);
    var builtins = wordRegexp(myBuiltins);

    // tokenizers
    function tokenBase(stream, state) {
      // Handle scope changes
      if (stream.sol() && top(state).type == "py") {
        var scopeOffset = top(state).offset;
        if (stream.eatSpace()) {
          var lineOffset = stream.indentation();
          if (lineOffset > scopeOffset)
            pushScope(stream, state, "py");
          else if (lineOffset < scopeOffset && dedent(stream, state))
            state.errorToken = true;
          return null;
        } else {
          var style = tokenBaseInner(stream, state);
          if (scopeOffset > 0 && dedent(stream, state))
            style += " " + ERRORCLASS;
          return style;
        }
      }
      return tokenBaseInner(stream, state);
    }

    function tokenBaseInner(stream, state) {
      if (stream.eatSpace()) return null;

      var ch = stream.peek();

      // Handle Comments
      if (ch == "#") {
        stream.skipToEnd();
        return "comment";
      }

      // Handle Number Literals
      if (stream.match(/^[0-9\.]/, false)) {
        var floatLiteral = false;
        // Floats
        if (stream.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)) { floatLiteral = true; }
        if (stream.match(/^\d+\.\d*/)) { floatLiteral = true; }
        if (stream.match(/^\.\d+/)) { floatLiteral = true; }
        if (floatLiteral) {
          // Float literals may be "imaginary"
          stream.eat(/J/i);
          return "number";
        }
        // Integers
        var intLiteral = false;
        // Hex
        if (stream.match(/^0x[0-9a-f]+/i)) intLiteral = true;
        // Binary
        if (stream.match(/^0b[01]+/i)) intLiteral = true;
        // Octal
        if (stream.match(/^0o[0-7]+/i)) intLiteral = true;
        // Decimal
        if (stream.match(/^[1-9]\d*(e[\+\-]?\d+)?/)) {
          // Decimal literals may be "imaginary"
          stream.eat(/J/i);
          // TODO - Can you have imaginary longs?
          intLiteral = true;
        }
        // Zero by itself with no other piece of number.
        if (stream.match(/^0(?![\dx])/i)) intLiteral = true;
        if (intLiteral) {
          // Integer literals may be "long"
          stream.eat(/L/i);
          return "number";
        }
      }

      // Handle Strings
      if (stream.match(stringPrefixes)) {
        state.tokenize = tokenStringFactory(stream.current());
        return state.tokenize(stream, state);
      }

      // Handle operators and Delimiters
      if (stream.match(tripleDelimiters) || stream.match(doubleDelimiters))
        return null;

      if (stream.match(doubleOperators) || stream.match(singleOperators))
        return "operator";

      if (stream.match(singleDelimiters))
        return null;

      if (stream.match(keywords) || stream.match(wordOperators))
        return "keyword";

      if (stream.match(builtins))
        return "builtin";

      if (stream.match(/^(self|cls)\b/))
        return "variable-2";

      if (stream.match(identifiers)) {
        if (state.lastToken == "def" || state.lastToken == "class")
          return "def";
        return "variable";
      }

      // Handle non-detected items
      stream.next();
      return ERRORCLASS;
    }

    function tokenStringFactory(delimiter) {
      while ("rub".indexOf(delimiter.charAt(0).toLowerCase()) >= 0)
        delimiter = delimiter.substr(1);

      var singleline = delimiter.length == 1;
      var OUTCLASS = "string";

      function tokenString(stream, state) {
        while (!stream.eol()) {
          stream.eatWhile(/[^'"\\]/);
          if (stream.eat("\\")) {
            stream.next();
            if (singleline && stream.eol())
              return OUTCLASS;
          } else if (stream.match(delimiter)) {
            state.tokenize = tokenBase;
            return OUTCLASS;
          } else {
            stream.eat(/['"]/);
          }
        }
        if (singleline) {
          if (parserConf.singleLineStringErrors)
            return ERRORCLASS;
          else
            state.tokenize = tokenBase;
        }
        return OUTCLASS;
      }
      tokenString.isString = true;
      return tokenString;
    }

    function pushScope(stream, state, type) {
      var offset = 0, align = null;
      if (type == "py") {
        while (top(state).type != "py")
          state.scopes.pop();
      }
      offset = top(state).offset + (type == "py" ? conf.indentUnit : hangingIndent);
      if (type != "py" && !stream.match(/^(\s|#.*)*$/, false))
        align = stream.column() + 1;
      state.scopes.push({offset: offset, type: type, align: align});
    }

    function dedent(stream, state) {
      var indented = stream.indentation();
      while (top(state).offset > indented) {
        if (top(state).type != "py") return true;
        state.scopes.pop();
      }
      return top(state).offset != indented;
    }

    function tokenLexer(stream, state) {
      var style = state.tokenize(stream, state);
      var current = stream.current();

      // Handle '.' connected identifiers
      if (current == ".") {
        style = stream.match(identifiers, false) ? null : ERRORCLASS;
        if (style == null && state.lastStyle == "meta") {
          // Apply 'meta' style to '.' connected identifiers when
          // appropriate.
          style = "meta";
        }
        return style;
      }

      // Handle decorators
      if (current == "@"){
        if(parserConf.version && parseInt(parserConf.version, 10) == 3){
            return stream.match(identifiers, false) ? "meta" : "operator";
        } else {
            return stream.match(identifiers, false) ? "meta" : ERRORCLASS;
        }
      }

      if ((style == "variable" || style == "builtin")
          && state.lastStyle == "meta")
        style = "meta";

      // Handle scope changes.
      if (current == "pass" || current == "return")
        state.dedent += 1;

      if (current == "lambda") state.lambda = true;
      if (current == ":" && !state.lambda && top(state).type == "py")
        pushScope(stream, state, "py");

      var delimiter_index = current.length == 1 ? "[({".indexOf(current) : -1;
      if (delimiter_index != -1)
        pushScope(stream, state, "])}".slice(delimiter_index, delimiter_index+1));

      delimiter_index = "])}".indexOf(current);
      if (delimiter_index != -1) {
        if (top(state).type == current) state.scopes.pop();
        else return ERRORCLASS;
      }
      if (state.dedent > 0 && stream.eol() && top(state).type == "py") {
        if (state.scopes.length > 1) state.scopes.pop();
        state.dedent -= 1;
      }

      return style;
    }

    var external = {
      startState: function(basecolumn) {
        return {
          tokenize: tokenBase,
          scopes: [{offset: basecolumn || 0, type: "py", align: null}],
          lastStyle: null,
          lastToken: null,
          lambda: false,
          dedent: 0
        };
      },

      token: function(stream, state) {
        var addErr = state.errorToken;
        if (addErr) state.errorToken = false;
        var style = tokenLexer(stream, state);

        state.lastStyle = style;

        var current = stream.current();
        if (current && style)
          state.lastToken = current;

        if (stream.eol() && state.lambda)
          state.lambda = false;
        return addErr ? style + " " + ERRORCLASS : style;
      },

      indent: function(state, textAfter) {
        if (state.tokenize != tokenBase)
          return state.tokenize.isString ? CodeMirror.Pass : 0;

        var scope = top(state);
        var closing = textAfter && textAfter.charAt(0) == scope.type;
        if (scope.align != null)
          return scope.align - (closing ? 1 : 0);
        else if (closing && state.scopes.length > 1)
          return state.scopes[state.scopes.length - 2].offset;
        else
          return scope.offset;
      },

      closeBrackets: {triples: "'\""},
      lineComment: "#",
      fold: "indent"
    };
    return external;
  });

  CodeMirror.defineMIME("text/x-python", "python");

  var words = function(str) { return str.split(" "); };

  CodeMirror.defineMIME("text/x-cython", {
    name: "python",
    extra_keywords: words("by cdef cimport cpdef ctypedef enum except"+
                          "extern gil include nogil property public"+
                          "readonly struct union DEF IF ELIF ELSE")
  });

});
