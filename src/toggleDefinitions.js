var copyStatus = false;
var copyButtonExists = false;
var onFirstRow = false;
var doesSecondOpenParenthesisExist = false;
var noExampleSentenceForDefinition = false;
var definitionOnlyTakesUpOneRow = false;
var fdExists = true;
var ftExists = true;
var fsExists = true;
var ntExists = true;
var nsExists = true;
var isTextHidden = true;
var isClickSelected = false;
var languageAbbreviations = ["en", "es", "fr", "pt", "it", "de", "nl", "sv", "ru",
							"pl", "ro", "cz", "gr", "tr", "zh", "ja", "ko", "ar", "is"];// didn't do ca
var languageCombinations = [];
var ToWrd = [];
var languageCombinationInPage;
var FrEx;
var FrWrd;
var tableRow;
var tableRowIndexes = [];
var tableRowIndexesCount;
var tableData;
var strong;
var tempCopyToClipboardArray = [];
var rowStartIndexes = [];
var rowDataStartIndexes = [];
var buttonVariable;
var rowStartIndexesCount = 0;
var strongIndexes = [];
var strongIndexesCount = 0;
var strongRowIndexes = [];
var foreignSentenceIndexes = [];
var foreignSentenceIndexesCount;
var foreignSentenceRowIndexes = [];
var foreignSentenceRowIndexesCount;
var notePublRowIndexes = [];
var notePublRowTouchingStrongIndexes = [];
var findNearestRowStartIndex = 0;
var headerRowIndexes = [];
var headerRowOffsetCount = 0;
var ToWrdDef, ToEx, To2, dsense, pos2_tooltip, ph, dataPh, notePubl, isSomethingImportantMissing;
ToWrdDef = [];
var definitions2 = [];
var exampleSentences2 = [];
var helperDefinitions2 = [];
var dsense = [];
var dsense2 = [];
var dsenseTopRow = [];
var dsenseTopRow2 = [];
var pos2_tooltip_2 = [];
var ph2 = [];
var dataPh2 = [];
var isSomethingImportantMissing = [];
var isSomethingImportantMissingRowIndexes = [];
var def = "";
var countNewRows = 0;
var countNewRowsSentence = 0;
var countNewRowsNotes = 0;
var modifiedRows = [];
var htmlThatButtonRemoved = "";
var currentRowTheCopyButtonIsOn;
var textThatIsBeingReplaced = "";
var idOrder = ["fd","b1","ft","b2","fs","b3","nt","b4","ns","b5"];
var idWhichTrue = ["ft","b2","fs"];
var headerWord;

var exampleSentenceRowIndexes = [];
var nativeTranslationsRowIndexes = [];
var nativeSentencesRowIndexes = [];
var helperNativeTranslationsRowIndexes = [];

var capitalize = true;
var fdTooltips;
var ntTooltips;
var hntEnabled;
var hntParenthesis;
var ftParenthesis;
var ntSameRow;

var fdCapitalize;
var ftCapitalize;
var ntCapitalize;

var hoverOrClickAttributeName = "onclick";
var click;
var hover;

var hideTextPlaceholder = "[...]";

function createCopyButton(index) {
	return "<button class=\"blueButton\" id=\"copyButton" + index + "\">Copy</button>";
}
function createCopyHeaderWordButton() {
	return "<button class=\"blueButton\" id=\"copyHeaderWord\">Copy</button><a id=\"copyHeaderWordSpace\">&nbsp;&nbsp;&nbsp;</a>";
}
function createNewRow(index) {
	return "<tr id=\"newRow" + index + "\"><td></td><td></td><td></td></tr>";
}
function notEqualToNegativeOne(num) {
	return num != -1;
}
function notEqualToZero(num) {
	return num != 0;
}

function addBackslashBeforeApostrophe(text) {
	if (text.includes("\'")) {
		for (let i = 0; i < text.length-1; i++) {
			if (text.substring(i, i+1) == "\'") {
				text = text.substring(0, i) + "\\\'" + text.substring(i+1, text.length);;
				i++;
			}
		}
		return text;
	} else {
		return text;
	}
}
function addBackslashBeforeDoubleApostrophe(text) {
	if (text.includes("\"")) {
		for (let i = 0; i < text.length-1; i++) {
			if (text.substring(i, i+1) == "\"") {
				text = text.substring(0, i) + "\\\"" + text.substring(i+1, text.length);;
				i++;
			}
		}
		return text;
	} else {
		return text;
	}
}

function removeBackslashBeforeApostrophe(text) {
	if (text.includes("\\")) {
		for (let i = 0; i < text.length-1; i++) {
			if (text.substring(i, i+1) == "\\") {
				text = text.substring(0, i) + text.substring(i+1, text.length);;
			}
		}
		return text;
	} else {
		return text;
	}
}

function isLetter(str) {// https://stackoverflow.com/a/9862788
  return str.length === 1 && str.match(/[a-z]/i);
}

function removeCopyAtEnd(text) {
    if (text.length >= 4 && text.substring(text.length-4) == "Copy") {
        return text.substring(0, text.length-4);
    } else {
        return text;
    }
}

function capitalizeFirstLetter(text) {
	var returnThis;
	if (text.length > 1) {
		if (!isLetter(text.substring(0, 1))) {
			returnThis = text.substring(0, 1) + text.substring(1, 2).toUpperCase();
			if (text.length > 2)
				 returnThis += text.substring(2);
		} else {
			returnThis = text.substring(0, 1).toUpperCase() + text.substring(1);
		}
	} else {
		returnThis = text.toUpperCase();
	}
	return returnThis;
}

chrome.storage.local.get(['radio1', 'radio2'], function(variable) {
	if (variable.radio1 == true)
		hideTextPlaceholder = "[...]";
	else if (variable.radio2 == true)
		hideTextPlaceholder = "{...}";
});

function addArticles(text, textWithoutTooltips, language) {
    text = removeCopyAtEnd(text);
    textWithoutTooltips = removeCopyAtEnd(textWithoutTooltips);

    console.log("text: " + text);
    console.log("textWithoutTooltips: " + textWithoutTooltips);
    console.log("language: " + language);

	switch(language) {
	  case "en":// why is Portuguese here instead of returning the variable "text"? WordReference is a scuffed site, and I'm lazy
	  return addArticlesPortuguese(text, textWithoutTooltips, language);
      case "es":
      return addArticlesSpanish(text, textWithoutTooltips, language);
      break;
      case "fr":
      return addArticlesFrench(text, textWithoutTooltips, language);
      break;
      case "it":
	  return addArticlesItalian(text, textWithoutTooltips, language);
	  break;
	  case "pr":
      return addArticlesPortuguese(text, textWithoutTooltips, language);
	  break;
      default:
      return "Error in addArticles(): languageCombination of " + language + " was not found.";
    }
}
function startsWithVowel(text) {
	return text.substring(0, 1) == "a" || text.substring(0, 1) == "e" || text.substring(0, 1) == "i" ||
			text.substring(0, 1) == "o" || text.substring(0, 1) == "u";
}
function startsWithConsonant(text) {
	return !startsWithVowel(text);
}
function addArticlesHelper(text, partToCutOff, article, language) {
	console.log("partToCutOff length: " + partToCutOff);
	console.log("article: " + article);
	text = text.substring(0, text.length-partToCutOff);


	var textAddToThis = "";
	// https://stackoverflow.com/a/881111
	for (let i = 0; i <= (text.match(/,/g) || []).length; i++) {
	    if (language == "es" && (text.split(", ")[i].substring(0, 3) == "el " || text.split(", ")[i].substring(0, 3) == "la "
	                || text.split(", ")[i].substring(0, 4) == "los " || text.split(", ")[i].substring(0, 4) == "las ")) {
            if (article == "el")
                textAddToThis += "el " + text.split(", ")[i].substring(3) + ", ";
            if (article == "la")
                textAddToThis += "la " + text.split(", ")[i].substring(3) + ", ";
            if (article == "los")
                textAddToThis += "los " + text.split(", ")[i].substring(4) + ", ";
            if (article == "las")
                textAddToThis += "las " + text.split(", ")[i].substring(4) + ", ";
        } else if (language == "fr" && (text.split(", ")[i].substring(0, 3) == "le " || text.split(", ")[i].substring(0, 3) == "la "
                    || text.split(", ")[i].substring(0, 4) == "les " || text.split(", ")[i].substring(0, 4) == "las ")) {
            if (article == "le")
                textAddToThis += "le " + text.split(", ")[i].substring(3) + ", ";
            if (article == "la")
                textAddToThis += "la " + text.split(", ")[i].substring(3) + ", ";
            if (article == "les")
                textAddToThis += "les " + text.split(", ")[i].substring(4) + ", ";
            if (article == "las")
                textAddToThis += "las " + text.split(", ")[i].substring(4) + ", ";
        } else if (language == "fr" && (article == "le" || article == "la") && startsWithVowel(text.split(", ")[i]))// french
			textAddToThis += "l'" + text.split(", ")[i] + ", ";
		else if (language == "it" && (text.split(", ")[i].substring(0, 2) == "gn" || text.split(", ")[i].substring(0, 2) == "ps" ||
			text.split(", ")[i].substring(0, 2) == "pn" || text.split(", ")[i].substring(0, 1) == "x" ||
			text.split(", ")[i].substring(0, 1) == "y" || text.split(", ")[i].substring(0, 1) == "z" ||
			(text.split(", ")[i].substring(0, 1) == "s" && startsWithVowel(text.split(", ")[i].substring(1, 2))))) {// italian
			if (article == "il")
				textAddToThis += "lo " + text.split(", ")[i] + ", ";
			else if (article == "i")
				textAddToThis += "gli " + text.split(", ")[i] + ", ";
		} else if (language == "it" && startsWithConsonant(text)) {// italian
			if (article == "il")
				textAddToThis += "il " + text.split(", ")[i] + ", ";
			if (article == "la")
				textAddToThis += "la " + text.split(", ")[i] + ", ";
			if (article == "i")
				textAddToThis += "i " + text.split(", ")[i] + ", ";
			if (article == "le")
				textAddToThis += "le " + text.split(", ")[i] + ", ";
		} else if (language == "it" && startsWithVowel(text)) {// italian
			if (article == "il")
				textAddToThis += "l'" + text.split(", ")[i] + ", ";
			if (article == "i")
				textAddToThis += "gli" + text.split(", ")[i] + ", ";
			if (article == "la")
				textAddToThis += "l'" + text.split(", ")[i] + ", ";
			if (article == "le")
				textAddToThis += "le" + text.split(", ")[i] + ", ";
		} else
			textAddToThis += article + " " + text.split(", ")[i] + ", ";// default
	}

    return textAddToThis.substring(0, textAddToThis.length-2);
}

function addArticlesSpanish(text, textWithoutTooltips, language) {
	var mascDefArt = "el";
	var mascDefArtPlural = "los";
	var femDefArt = "la";
	var femDefArtPlural = "las";

	var mascAbbrv = "nm";
	var femAbbrv = "nf";
	var masc = "m";
	var fem = "f";

	if (text.substring(text.length-7) == " " + mascAbbrv + ", " + femAbbrv) {
		text = text.substring(0, text.length-7);
		return mascDefArt + " " + text.split(", ")[0] + ", " + femDefArt + " " + text.split(", ")[1];
	} else if (text.substring(text.length-16) == " loc nom inv " + masc + "/" + fem) {
		text = text.substring(0, text.length-16);
		return mascDefArt + " " + text + ", " + femDefArt + " " + text;
	} else if (text.substring(text.length-12) == " loc nom " + masc + "pl") {
		return addArticlesHelper(text, 12, mascDefArtPlural, language);
	} else if (text.substring(text.length-12) == " loc nom " + fem + "pl") {
		return addArticlesHelper(text, 12, femDefArtPlural, language);
	} else if (text.substring(text.length-15) == " loc " + mascAbbrv + ", loc " + femAbbrv) {
		text = text.substring(0, text.length-15);
		return mascDefArt + " " + text.split(", ")[0] + ", " + femDefArt + " " + text.split(", ")[1];
	} else if (text.substring(text.length-10) == " loc nom " + masc) {
		return addArticlesHelper(text, 10, mascDefArt, language);
	} else if (text.substring(text.length-10) == " loc nom " + fem) {
		return addArticlesHelper(text, 10, femDefArt, language);
	} else if (text.substring(text.length-4) == " n" + masc + fem) {
		text = text.substring(0, text.length-4);
		return mascDefArt + " " + text.split(", ")[0] + ", " + femDefArt + " " + text.split(", ")[1];
	} else if (text.substring(text.length-3) == " n" + masc) {
		return addArticlesHelper(text, 3, mascDefArt, language);
	} else if (text.substring(text.length-3) == " n" + fem) {
		return addArticlesHelper(text, 3, femDefArt, language);
	} else if (text.substring(text.length-13) == " n" + masc + " + loc adj") {
		return addArticlesHelper(text, 13, mascDefArt, language);
	} else if (text.substring(text.length-13) == " n" + fem + " + loc adj") {
		return addArticlesHelper(text, 13, femDefArt, language);
	} else if (text.substring(text.length-9) == " n" + masc + " + adj") {
		return addArticlesHelper(text, 9, mascDefArt, language);
	} else if (text.substring(text.length-9) == " n" + fem + " + adj") {
		return addArticlesHelper(text, 9, femDefArt, language);
	} else if (text.substring(text.length-12) == " n" + masc + " + adj " + masc + fem) {
		return addArticlesHelper(text, 12, mascDefArt, language);
	} else if (text.substring(text.length-12) == " n" + fem + " + adj " + masc + fem) {
		return addArticlesHelper(text, 12, femDefArt, language);
	} else {
		return textWithoutTooltips;
	}
}
function addArticlesFrench(text, textWithoutTooltips, language) {
	/**
	le   masculine singular
    la   feminine singular
    l'    m or f in front of a vowel or h muet
    les  m or f plural

    nm, nf
	**/
	var mascDefArt = "le";
	var mascDefArtPlural = "les";
	var femDefArt = "la";
	var femDefArtPlural = "les";

	var mascAbbrv = "nm";
	var femAbbrv = "nf";
	var masc = "m";
	var fem = "f";

	if (text.substring(text.length-7) == " " + mascAbbrv + ", " + femAbbrv) {
		text = text.substring(0, text.length-7);
		return mascDefArt + " " + text.split(", ")[0] + ", " + femDefArt + " " + text.split(", ")[1];
	} else if (text.substring(text.length-16) == " loc nom inv " + masc + "/" + fem) {
		text = text.substring(0, text.length-16);
		return mascDefArt + " " + text + ", " + femDefArt + " " + text;
	} else if (text.substring(text.length-12) == " loc nom " + masc + "pl") {
		return addArticlesHelper(text, 12, mascDefArtPlural, language);
	} else if (text.substring(text.length-12) == " loc nom " + fem + "pl") {
		return addArticlesHelper(text, 12, femDefArtPlural, language);
	} else if (text.substring(text.length-15) == " loc " + mascAbbrv + ", loc " + femAbbrv) {
		text = text.substring(0, text.length-15);
		return mascDefArt + " " + text.split(", ")[0] + ", " + femDefArt + " " + text.split(", ")[1];
	} else if (text.substring(text.length-10) == " loc nom " + masc) {
		return addArticlesHelper(text, 10, mascDefArt, language);
	} else if (text.substring(text.length-10) == " loc nom " + fem) {
		return addArticlesHelper(text, 10, femDefArt, language);
	} else if (text.substring(text.length-4) == " n" + masc + fem) {
		text = text.substring(0, text.length-4);
		return mascDefArt + " " + text.split(", ")[0] + ", " + femDefArt + " " + text.split(", ")[1];
	} else if (text.substring(text.length-3) == " n" + masc) {
		return addArticlesHelper(text, 3, mascDefArt, language);
	} else if (text.substring(text.length-3) == " n" + fem) {
		return addArticlesHelper(text, 3, femDefArt, language);
	} else if (text.substring(text.length-13) == " n" + masc + " + loc adj") {
		return addArticlesHelper(text, 13, mascDefArt, language);
	} else if (text.substring(text.length-13) == " n" + fem + " + loc adj") {
		return addArticlesHelper(text, 13, femDefArt, language);
	} else if (text.substring(text.length-9) == " n" + masc + " + adj") {
		return addArticlesHelper(text, 9, mascDefArt, language);
	} else if (text.substring(text.length-9) == " n" + fem + " + adj") {
		return addArticlesHelper(text, 9, femDefArt, language);
	} else if (text.substring(text.length-12) == " n" + masc + " + adj " + masc + fem) {
		return addArticlesHelper(text, 12, mascDefArt, language);
	} else if (text.substring(text.length-12) == " n" + fem + " + adj " + masc + fem) {
		return addArticlesHelper(text, 12, femDefArt, language);
	} else if (text.substring(text.length-10) == " grupo nom") {
		return addArticlesHelper(text, 10, mascDefArt, language);
	} else if (text.substring(text.length-10) == " nm + prép") {// all french abbreviations found:
		return addArticlesHelper(text, 10, mascDefArt, language);
	} else if (text.substring(text.length-10) == " nf + prép") {
		return addArticlesHelper(text, 10, femDefArt, language);
	} else if (text.substring(text.length-5) == " nmpl") {
		return addArticlesHelper(text, 5, mascDefArtPlural, language);
	} else if (text.substring(text.length-5) == " nfpl") {
		return addArticlesHelper(text, 5, femDefArtPlural, language);
	} else if (text.substring(text.length-7) == " nm inv") {
		return addArticlesHelper(text, 7, mascDefArt, language);
	} else if (text.substring(text.length-7) == " nf inv") {
        return addArticlesHelper(text, 7, femDefArt, language);
    } else if (text.substring(text.length-10) == " nm propre") {
        return addArticlesHelper(text, 10, mascDefArt, language);
    } else if (text.substring(text.length-10) == " nf propre") {
        return addArticlesHelper(text, 10, femDefArt, language);
    } else {
        return textWithoutTooltips;
	}
}
function addArticlesItalian(text, textWithoutTooltips, language) {
	/**
	Masculine
	Singular	Plural	Rule
    IL			I		+ any consonant
    LO			GLI		+ gn, ps, pn, z, x, y, (s + consonant)
    L'			GLI		+ any vowel

	Feminine
    Singular	Plural	Rule
    LA			LE		+ any consonant
    L'			LE		+ any vowel

    nm, nf
	**/
	var mascDefArt = "il";
	var mascDefArtPlural = "i";
	var femDefArt = "la";
	var femDefArtPlural = "le";

	var mascAbbrv = "nm";
	var femAbbrv = "nf";
	var masc = "m";
	var fem = "f";

	if (text.substring(text.length-7) == " " + mascAbbrv + ", " + femAbbrv) {
		text = text.substring(0, text.length-7);
		return mascDefArt + " " + text.split(", ")[0] + ", " + femDefArt + " " + text.split(", ")[1];
	} else if (text.substring(text.length-16) == " loc nom inv " + masc + "/" + fem) {
		text = text.substring(0, text.length-16);
		return mascDefArt + " " + text + ", " + femDefArt + " " + text;
	} else if (text.substring(text.length-12) == " loc nom " + masc + "pl") {
		return addArticlesHelper(text, 12, mascDefArtPlural, language);
	} else if (text.substring(text.length-12) == " loc nom " + fem + "pl") {
		return addArticlesHelper(text, 12, femDefArtPlural, language);
	} else if (text.substring(text.length-15) == " loc " + mascAbbrv + ", loc " + femAbbrv) {
		text = text.substring(0, text.length-15);
		return mascDefArt + " " + text.split(", ")[0] + ", " + femDefArt + " " + text.split(", ")[1];
	} else if (text.substring(text.length-10) == " loc nom " + masc) {
		return addArticlesHelper(text, 10, mascDefArt, language);
	} else if (text.substring(text.length-10) == " loc nom " + fem) {
		return addArticlesHelper(text, 10, femDefArt, language);
	} else if (text.substring(text.length-4) == " n" + masc + fem) {
		text = text.substring(0, text.length-4);
		if (text.split(", ")[1] == null) {
			return mascDefArt + " " + text + ", " + femDefArt + " " + text;
		} else {
			return mascDefArt + " " + text.split(", ")[0] + ", " + femDefArt + " " + text.split(", ")[1];
		}
	} else if (text.substring(text.length-3) == " n" + masc) {
		return addArticlesHelper(text, 3, mascDefArt, language);
	} else if (text.substring(text.length-3) == " n" + fem) {
		return addArticlesHelper(text, 3, femDefArt, language);
	} else if (text.substring(text.length-13) == " n" + masc + " + loc adj") {
		return addArticlesHelper(text, 13, mascDefArt, language);
	} else if (text.substring(text.length-13) == " n" + fem + " + loc adj") {
		return addArticlesHelper(text, 13, femDefArt, language);
	} else if (text.substring(text.length-9) == " n" + masc + " + adj") {
		return addArticlesHelper(text, 9, mascDefArt, language);
	} else if (text.substring(text.length-9) == " n" + fem + " + adj") {
		return addArticlesHelper(text, 9, femDefArt, language);
	} else if (text.substring(text.length-12) == " n" + masc + " + adj " + masc + fem) {
		return addArticlesHelper(text, 12, mascDefArt, language);
	} else if (text.substring(text.length-12) == " n" + fem + " + adj " + masc + fem) {
		return addArticlesHelper(text, 12, femDefArt, language);
	} else if (text.substring(text.length-10) == " grupo nom") {
		return addArticlesHelper(text, 10, mascDefArt, language);
	} else if (text.substring(text.length-5) == " nmpl") {// italian start
		return addArticlesHelper(text, 5, mascDefArtPlural, language);
	} else if (text.substring(text.length-5) == " nfpl") {
		return addArticlesHelper(text, 5, femDefArtPlural, language);
	} else
		return textWithoutTooltips;
}
function addArticlesPortuguese(text, textWithoutTooltips, language) {
	// sm, sf, o, a, os, as
	var mascDefArt = "o";
	var mascDefArtPlural = "os";
	var femDefArt = "a";
	var femDefArtPlural = "as";

	var mascAbbrv = "sm";
	var femAbbrv = "sf";
	var masc = "m";
	var fem = "f";

	if (text.substring(text.length-4) == " s" + masc + fem) {
		text = text.substring(0, text.length-4);
		return mascDefArt + " " + text.split(", ")[0] + ", " + femDefArt + " " + text.split(", ")[1];
	} else if (text.substring(text.length-3) == " s" + masc) {
		return addArticlesHelper(text, 3, mascDefArt, language);
	} else if (text.substring(text.length-3) == " s" + fem) {
		return addArticlesHelper(text, 3, femDefArt, language);
	} else if (text.substring(text.length-13) == " s" + masc + " + loc adj") {
		return addArticlesHelper(text, 13, mascDefArt, language);
	} else if (text.substring(text.length-13) == " s" + fem + " + loc adj") {
		return addArticlesHelper(text, 13, femDefArt, language);
	} else if (text.substring(text.length-9) == " s" + masc + " + adj") {
		return addArticlesHelper(text, 9, mascDefArt, language);
	} else if (text.substring(text.length-9) == " s" + fem + " + adj") {
		return addArticlesHelper(text, 9, femDefArt, language);
	} else if (text.substring(text.length-12) == " s" + masc + " + adj " + masc + fem) {
		return addArticlesHelper(text, 12, mascDefArt, language);
	} else if (text.substring(text.length-12) == " s" + fem + " + adj " + masc + fem) {
		return addArticlesHelper(text, 12, femDefArt, language);
	}  else if (text.substring(text.length-10) == " grupo nom") {
		return addArticlesHelper(text, 10, mascDefArt, language);
	} else {
		return textWithoutTooltips;
	}
}

// get every combination of language abbreviation combos: enes, esen, enzh, zhen, etc...
for (let i = 0; i < languageAbbreviations.length; i++) {
	for (let j = 0; j < languageAbbreviations.length; j++) {
    	languageCombinations.push(languageAbbreviations[i] + languageAbbreviations[j] + ":");
    }
}

// have the status of toggleDefinitions and toggleCopy change when the respective button is clicked
chrome.storage.local.get(['toggleDefinitions', 'toggleCopy', 'fdStatus', 'b1Status', 'ftStatus',
						'b2Status', 'ntStatus', 'b3Status', 'fsStatus',
						'b4Status', 'nsStatus', 'b5Status', 'currentHTML', 'dontShowAgain', 'hasDOMeverBeenLoaded',
						'hover', 'click', 'capitalize'], function(variable) {
	click = variable.click;
	hover = variable.hover;
	capitalize = variable.capitalize;
	if (hover)
		hoverOrClickAttributeName = "onmouseenter";
	else if (click)
		hoverOrClickAttributeName = "onclick";

	if (variable.toggleDefinitions == null) {
		chrome.storage.local.set({toggleDefinitions: false}, function() {});
		restoreDefinitions();
	} else if (variable.toggleDefinitions == true) {
		chrome.storage.local.set({toggleDefinitions: true}, function() {});
		//restoreDefinitions();
	} else if (variable.toggleDefinitions == false) {
		chrome.storage.local.set({toggleDefinitions: false}, function() {});
		removeDefinitions();
	}

	if (variable.toggleCopy == null) {
		chrome.storage.local.set({toggleCopy: false}, function() {});
		copyStatus = true;
	} else if (variable.toggleCopy == true) {
		chrome.storage.local.set({toggleCopy: true}, function() {});
		copyStatus = false;
	} else if (variable.toggleCopy == false) {
		chrome.storage.local.set({toggleCopy: false}, function() {});
		copyStatus = true;
	}
    headerWord = document.querySelector(".headerWord");
    var copyHeaderWordButton = createCopyHeaderWordButton();
    headerWord.insertAdjacentHTML('afterend', copyHeaderWordButton);

	if (copyStatus == true) {
		document.getElementById("copyHeaderWord").style.visibility = "visible";
		document.getElementById("copyHeaderWordSpace").style.visibility = "visible";
		copyHeaderWord.onclick = async function(e) {
			console.log("Copy header word button clicked");
			if (capitalize == true)
				clipboardHoldText = capitalizeFirstLetter(headerWord.outerHTML.replace( /(<([^>]+)>)/ig, ''));
			else
				clipboardHoldText = headerWord.outerHTML.replace( /(<([^>]+)>)/ig, '');
			console.log("capitalize: " + capitalize);
			console.log("Text copied:\n" + clipboardHoldText);
			navigator.clipboard.writeText(clipboardHoldText);
		}
	  } else {
		document.getElementById("copyHeaderWord").style.visibility = "hidden";
		document.getElementById("copyHeaderWordSpace").style.visibility = "hidden";
	  }

	if (idWhichTrue != null && variable.hasDOMeverBeenLoaded != null) {
		idWhichTrue = [];
		if (variable.fdStatus == true)
			idWhichTrue.push("fd");
		if (variable.ftStatus == true)
			idWhichTrue.push("ft");
		if (variable.fsStatus == true)
			idWhichTrue.push("fs");
		if (variable.ntStatus == true)
			idWhichTrue.push("nt");
		if (variable.nsStatus == true)
			idWhichTrue.push("ns");

		if (variable.b1Status == true)
			idWhichTrue.push("b1");
		if (variable.b2Status == true)
			idWhichTrue.push("b2");
		if (variable.b3Status == true)
			idWhichTrue.push("b3");
		if (variable.b4Status == true)
			idWhichTrue.push("b4");
		if (variable.b5Status == true)
			idWhichTrue.push("b5");
	}

	if (idOrder != null && variable.hasDOMeverBeenLoaded != null) {
		idOrder = [];
		for (let i = 0; i < variable.currentHTML.length; i++) {// lazy programming moment
			if (variable.currentHTML.substring(i, i+2) == "id" && variable.currentHTML.substring(i+6, i+7) == "\"") {
				idOrder.push(variable.currentHTML.substring(i+4, i+6));
			}
		}
	}

	console.log("idWhichTrue: " + idWhichTrue + "\nidOrder: " + idOrder);
});
chrome.storage.local.get(['capitalize', 'fdTooltips', 'hntParenthesis', 'ftParenthesis', 'ntSameRow', 'hntEnabled',
							'fdCapitalize', 'ftCapitalize', 'ntCapitalize'], function(variable) {
	capitalize = variable.capitalize;
	fdTooltips = variable.fdTooltips;
	hntParenthesis = variable.hntParenthesis;
	ftParenthesis = variable.ftParenthesis;
	ntSameRow = variable.ntSameRow;
	hntEnabled = variable.hntEnabled;

	fdCapitalize = variable.fdCapitalize;
	ftCapitalize = variable.ftCapitalize;
	ntCapitalize = variable.ntCapitalize;
});

function removeAttributes(text) {
	text = text.replace("&quot;", "\"");
	text = text.replace("\';\" onmouseleave=\"this.innerHTML=\'" + hideTextPlaceholder + "\';\">" + hideTextPlaceholder, "");
	text = text.replace(" " + hoverOrClickAttributeName + "=\"this.innerHTML=\'", ">");
	return text;
}
function removeAttributesV2(text) {
	text = text.replace(" " + hoverOrClickAttributeName + "=\"this.innerHTML=\'\';\" onmouseleave=\"this.innerHTML=\'\'\" style=\"text-align:right\"", "\"");
	text = text.replace(" " + hoverOrClickAttributeName + "=\"this.innerHTML=\'", ">");
	text = text.replace("&quot;", "\"");
	text = text.replace("\';\" onmouseleave=\"this.innerHTML=\'" + hideTextPlaceholder + "\';\">" + hideTextPlaceholder, "");
	text = text.replace("&quot;", "\"");
	return text;
}
function removeAttributesV3(text) {
	text = text.replace(" " + hoverOrClickAttributeName + "=\"this.innerHTML=\'", ">");
	text = text.replace("\';\" onmouseleave=\"this.innerHTML=\'" + hideTextPlaceholder + "\'\" style=\"text-align:right\">" + hideTextPlaceholder, "");
	text = text.replace("&quot;", "\"");
	text = text.replace("\';\" onmouseleave=\"this.innerHTML=\'" + hideTextPlaceholder + "\';\">" + hideTextPlaceholder, "");
	text = text.split("\';\" onmouseleave=\"this.innerHTML=\'")[0] + text.split("\';\" style=\"text-align:right\">(<i>formal</i>)")[1];
	return text;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.toggleDefinitionsKey == true) {
      	chrome.storage.local.set({toggleDefinitions: !request.toggleDefinitionsKey}, function() {});
      	removeDefinitions();
      } else if (request.toggleDefinitionsKey == false) {
      	chrome.storage.local.set({toggleDefinitions: !request.toggleDefinitionsKey}, function() {});
      	restoreDefinitions();
      }
	  if (request.toggleCopyKey == true) {
	  	chrome.storage.local.set({toggleCopy: !request.toggleCopyKey}, function() {});
	  	copyStatus = true;
	  } else if (request.toggleCopyKey == false) {
	  	chrome.storage.local.set({toggleCopy: !request.toggleCopyKey}, function() {});
	  	copyStatus = false;
	  }

	  chrome.storage.local.get(['toggleDefinitions', 'toggleCopy', 'fdStatus', 'b1Status', 'ftStatus',
								'b2Status', 'ntStatus', 'b3Status', 'fsStatus',
								'b4Status', 'nsStatus', 'b5Status', 'currentHTML', 'dontShowAgain', 'hasDOMeverBeenLoaded'], function(variable) {
		if (idWhichTrue != null && variable.hasDOMeverBeenLoaded != null) {
			idWhichTrue = [];
			if (variable.fdStatus == true)
				idWhichTrue.push("fd");
			if (variable.ftStatus == true)
				idWhichTrue.push("ft");
			if (variable.fsStatus == true)
				idWhichTrue.push("fs");
			if (variable.ntStatus == true)
				idWhichTrue.push("nt");
			if (variable.nsStatus == true)
				idWhichTrue.push("ns");

			if (variable.b1Status == true)
				idWhichTrue.push("b1");
			if (variable.b2Status == true)
				idWhichTrue.push("b2");
			if (variable.b3Status == true)
				idWhichTrue.push("b3");
			if (variable.b4Status == true)
				idWhichTrue.push("b4");
			if (variable.b5Status == true)
				idWhichTrue.push("b5");
		}
		if (idOrder != null && variable.hasDOMeverBeenLoaded != null) {
			idOrder = [];
			for (let i = 0; i < variable.currentHTML.length; i++) {
				if (variable.currentHTML.substring(i, i+2) == "id" && variable.currentHTML.substring(i+6, i+7) == "\"") {
					idOrder.push(variable.currentHTML.substring(i+4, i+6));
				}
			}
		}

		if (copyStatus == true) {
            document.getElementById("copyHeaderWord").style.visibility = "visible";
            document.getElementById("copyHeaderWordSpace").style.visibility = "visible";
            copyHeaderWord.onclick = async function(e) {
                console.log("Copy header word button clicked");
                if (capitalize == true)
                    clipboardHoldText = capitalizeFirstLetter(headerWord.outerHTML.replace( /(<([^>]+)>)/ig, ''));
                else
                    clipboardHoldText = headerWord.outerHTML.replace( /(<([^>]+)>)/ig, '');
                console.log("capitalize: " + capitalize);
                console.log("Text copied:\n" + clipboardHoldText);
                navigator.clipboard.writeText(clipboardHoldText);
            }
          } else {
            document.getElementById("copyHeaderWord").style.visibility = "hidden";
            document.getElementById("copyHeaderWordSpace").style.visibility = "hidden";
          }

	  });
	  console.log("idWhichTrue: " + idWhichTrue + "\nidOrder: " + idOrder);

	  chrome.storage.local.get(['capitalize', 'fdTooltips', 'hntParenthesis', 'ftParenthesis', 'ntSameRow', 'hntEnabled',
	  	'fdCapitalize', 'ftCapitalize', 'ntCapitalize'], function(variable) {
      	capitalize = variable.capitalize;
      	fdTooltips = variable.fdTooltips;
      	hntParenthesis = variable.hntParenthesis;
      	ftParenthesis = variable.ftParenthesis;
      	ntSameRow = variable.ntSameRow;
      	hntEnabled = variable.hntEnabled;

      	fdCapitalize = variable.fdCapitalize;
		ftCapitalize = variable.ftCapitalize;
		ntCapitalize = variable.ntCapitalize;
      });

      chrome.storage.local.get(['radio1', 'radio2'], function(variable) {
      	if (variable.radio1 == true)
      		hideTextPlaceholder = "[...]";
      	else if (variable.radio2 == true)
      		hideTextPlaceholder = "{...}";
      });
    }
);

try {
	ToWrd = document.getElementsByClassName('ToWrd');
	ToEx = document.getElementsByClassName("ToEx");
	To2 = document.getElementsByClassName("To2");
	dsense = document.getElementsByClassName("dsense");
	pos2_tooltip = document.getElementsByClassName("POS2 tooltip");

	FrEx = document.getElementsByClassName("FrEx");
	FrWrd = document.getElementsByClassName("FrWrd");
	tableRow = document.getElementsByTagName("tr");
	tableData = document.getElementsByTagName("td");
	strong = document.getElementsByTagName("strong");
	ph = document.getElementsByClassName("ph");
	notePubl = document.getElementsByClassName("notePubl");
	isSomethingImportantMissing = document.getElementsByClassName("even more");

	for (i = 0; i < ToWrd.length; i++) {
		if (!ToWrd[i].innerHTML.includes("sLang_")) {
			ToWrdDef.push(ToWrd[i]);
		}
	}
}
catch (exception_var) {
	console.log(exception_var);
}

// fill up the second array beforehand to ensure that later on, the first array doesn't draw from an empty array
try {
	for (i = 0; i < ToWrdDef.length; i++) {
		definitions2.push(ToWrdDef[i].innerHTML);
	}
	for (i = 0; i < ToEx.length; i++) {
		exampleSentences2.push(ToEx[i].innerHTML);
	}
	for (i = 0; i < pos2_tooltip.length; i++) {
		pos2_tooltip_2.push(pos2_tooltip[i].innerHTML);
	}
	for (i = 0; i < dsense.length; i++) {
		dsense2.push(dsense[i].innerHTML);
	}
}
catch (exception_var) {
	console.log(exception_var);
}

// hides some html elements with either [...], {...} or a blank
function removeDefinitions() {
	try {
		isTextHidden = true;
        for (i = 0; i < ToWrdDef.length; i++) {
			ToWrdDef[i].setAttribute(hoverOrClickAttributeName, "this.innerHTML='" + addBackslashBeforeApostrophe(ToWrdDef[i].innerHTML) + "';");
			ToWrdDef[i].setAttribute("onmouseleave", "this.innerHTML='" + hideTextPlaceholder + "';");
			ToWrdDef[i].innerHTML = hideTextPlaceholder;
        }
        for (i = 0; i < ToEx.length; i++) {
			ToEx[i].setAttribute(hoverOrClickAttributeName, "this.innerHTML='" + addBackslashBeforeApostrophe(ToEx[i].innerHTML) + "';");
			ToEx[i].setAttribute("onmouseleave", "this.innerHTML='" + hideTextPlaceholder + "';");
			ToEx[i].innerHTML = hideTextPlaceholder;
		}
		for (i = 0; i < pos2_tooltip.length; i++) {
			pos2_tooltip[i].innerHTML = "";
		}
		for (i = 0; i < dsense.length; i++) {
			dsense[i].setAttribute(hoverOrClickAttributeName, "this.innerHTML='" + addBackslashBeforeApostrophe(dsense[i].innerHTML) + "';");
			dsense[i].setAttribute("onmouseleave", "this.innerHTML='" + hideTextPlaceholder + "'");
			dsense[i].setAttribute("style", "text-align:right");
			dsense[i].innerHTML = hideTextPlaceholder;
		}
		console.log("removed ToWrdDef: " + ToWrdDef.length + ", removed ToEx: " + ToEx.length +
					", removed pos2_tooltip: " + pos2_tooltip.length + ", removed dsense: " + dsense.length);
    }
    catch (exception_var) {
    	console.log("removeDefinitions() failed: " + exception_var);
    }
}
// restores some html elements to their original text after they have been hidden
function restoreDefinitions() {
	try {
		isTextHidden = false;
        for (i = 0; i < ToWrdDef.length; i++) {
        	ToWrdDef[i].innerHTML = definitions2[i];
        	ToWrdDef[i].setAttribute(hoverOrClickAttributeName, "this.innerHTML='" + addBackslashBeforeApostrophe(definitions2[i]) + "';");
			ToWrdDef[i].setAttribute("onmouseleave", "this.innerHTML='" + addBackslashBeforeApostrophe(definitions2[i]) + "';");
        }
        for (i = 0; i < ToEx.length; i++) {
			ToEx[i].innerHTML = exampleSentences2[i];
			ToEx[i].setAttribute(hoverOrClickAttributeName, "this.innerHTML='" + addBackslashBeforeDoubleApostrophe(addBackslashBeforeApostrophe(exampleSentences2[i])) + "';");
            ToEx[i].setAttribute("onmouseleave", "this.innerHTML='" + addBackslashBeforeDoubleApostrophe(addBackslashBeforeApostrophe(exampleSentences2[i])) + "';");
		}
		for (i = 0; i < pos2_tooltip.length; i++) {
			pos2_tooltip[i].innerHTML = pos2_tooltip_2[i];
			pos2_tooltip[i].setAttribute(hoverOrClickAttributeName, "this.innerHTML='" + addBackslashBeforeApostrophe(pos2_tooltip_2[i]) + "';");
			pos2_tooltip[i].setAttribute("onmouseleave", "this.innerHTML='" + addBackslashBeforeApostrophe(pos2_tooltip_2[i]) + "';");
		}
		for (i = 0; i < dsense.length; i++) {
			dsense[i].innerHTML = dsense2[i];
			dsense[i].setAttribute(hoverOrClickAttributeName, "this.innerHTML='" + addBackslashBeforeApostrophe(dsense2[i]) + "';");
			dsense[i].setAttribute("onmouseleave", "this.innerHTML='" + addBackslashBeforeApostrophe(dsense2[i]) + "';");
		}
		console.log("restored ToWrdDef: " + definitions2.length + ", restored ToEx: " + exampleSentences2.length +
        					", restored pos2_tooltip: " + pos2_tooltip_2.length + ", restored dsense: " + dsense2.length);
    }
    catch (exception_var) {
    	console.log("restoreDefinitions() failed: " + exception_var);
    }
}


try {
	for (let k = 0; k < tableRow.length; k++) {
		if (tableRow[k].outerHTML.includes("FrEx")) {
			foreignSentenceRowIndexes.push(k);
		} else {
			foreignSentenceRowIndexes.push(-1);
		}
		if (tableRow[k].outerHTML.includes("<td>")) {
			tableRowIndexes.push(k);
		}
		if (tableRow[k].outerHTML.includes("<strong>") && tableRow[k].outerHTML.includes("FrWrd")) {
			strongRowIndexes.push(k);
		}
		if (tableRow[k].outerHTML.includes("sMainMeanings") || tableRow[k].outerHTML.includes("sAddTrans")
			|| tableRow[k].outerHTML.includes("sCmpdForms") || tableRow[k].outerHTML.includes("wrtopsection")) {
			headerRowIndexes.push(k);
		}
		if (tableRow[k].outerHTML.includes("notePubl")) {
			notePublRowIndexes.push(k);
			if (strongRowIndexes.includes(k - 1)) {
				notePublRowTouchingStrongIndexes.push(k);
			}
		}
		if (tableRow[k].outerHTML.includes("WRsug")) {
			isSomethingImportantMissingRowIndexes.push(k);
		}
		if (tableRow[k].outerHTML.includes("class=\"ToEx\"")) {
			exampleSentenceRowIndexes.push(k);
		}

		for (let i = 0; i < languageCombinations.length; i++) {
			if (tableRow[k].outerHTML.includes("id=\"" + languageCombinations[i])) {
				rowStartIndexes.push(k);
				languageCombinationInPage = languageCombinations[i];
				console.log("languageCombinationInPage: " + languageCombinationInPage);
			}
		}
	}
	strongRowIndexes.shift();
	foreignSentenceRowIndexes = foreignSentenceRowIndexes.filter(notEqualToNegativeOne);
    foreignSentenceRowIndexes = foreignSentenceRowIndexes.filter(notEqualToZero);
    notePublRowIndexes.shift();
    isSomethingImportantMissingRowIndexes.shift();
    if (rowStartIndexes[0] == 0 && rowStartIndexes[1] == 0)
    	rowStartIndexes.shift();

	for (i = 0; i < ph.length; i++) {
		if(languageCombinationInPage == "esen:") {
			if (ph[i].innerHTML == "Principal Translations") {
				ph[i].innerHTML = "Traducciones Principales";
			}
			if (ph[i].innerHTML == "Additional Translations") {
				ph[i].innerHTML = "Traducciones Adicionales";
			}
			if (ph[i].innerHTML == "Compound Forms:") {// why is there a colon at the end of this?
				ph[i].innerHTML = "Traducciones Compuestos";
			}
		} else if (languageCombinationInPage == "iten:") {
			if (ph[i].innerHTML == "Principal Translations/Traduzioni principali") {
				ph[i].innerHTML = "Traduzioni principali";
			}
			if (ph[i].innerHTML == "Compound Forms/Forme composte") {
				ph[i].innerHTML = "Forme composte";
			}
		} else if (languageCombinationInPage == "enit:") {
			if (ph[i].innerHTML == "Principal Translations/Traduzioni principali") {
				ph[i].innerHTML = "Principal Translations";
			}
			if (ph[i].innerHTML == "Compound Forms/Forme composte") {
				ph[i].innerHTML = "Compound Forms";
			}
		}
	}

	for (let k = 0; k < tableData.length; k++) {
		if (tableData[k].outerHTML.includes("<td>")) {// get location of each data in row
			rowDataStartIndexes.push(k);
		}
		if (tableData[k].outerHTML.includes("<strong>")) {// get location of each definition (in bold)
			strongIndexes.push(k);
		} else {
			strongIndexes.push(-1);
		}
		if (tableData[k].outerHTML.includes("FrEx")) {
			foreignSentenceIndexes.push(k);
		} else {
			foreignSentenceIndexes.push(-1);
		}
	}
	//console.log("headerRowIndexes before shift: " + headerRowIndexes);
	tableRowIndexes.pop();
	tableRowIndexes.pop();
	headerRowIndexes.shift();
	strongIndexes.shift();
	strongIndexes.shift();
	strongIndexes.shift();
	while (strongIndexes[0] == -1) {
		strongIndexes.shift();
	}
	strongIndexes = strongIndexes.filter(notEqualToNegativeOne);
	foreignSentenceIndexes = foreignSentenceIndexes.filter(notEqualToNegativeOne);
	foreignSentenceIndexes.shift();
	exampleSentenceRowIndexes.shift();

	// add an additional row to account for "is something missing" sentence
	tableRowIndexes.push(tableRowIndexes[tableRowIndexes.length-1]+1);

	console.log("isSomethingImportantMissingRowIndexes: " + isSomethingImportantMissingRowIndexes);
	console.log("notePublRowTouchingStrongIndexes: " + notePublRowTouchingStrongIndexes);
	console.log("notePublRowIndexes: " + notePublRowIndexes);
	console.log("strongRowIndexes: " + strongRowIndexes);
	console.log("foreignSentenceRowIndexes: " + foreignSentenceRowIndexes);
	console.log("tableRowIndexes: " + tableRowIndexes);
	console.log("tableRowIndexes.length: " + tableRowIndexes.length);
	console.log("rowDataStartIndexes: " + rowDataStartIndexes);
	console.log("rowDataStartIndexes.length:" + rowDataStartIndexes.length);
	console.log("strongIndexes: " + strongIndexes);
	console.log("strongIndexes.length: " + strongIndexes.length);
	console.log("FrEx.length: " + FrEx.length);
	console.log("foreignSentenceIndexes: " + foreignSentenceIndexes);
	console.log("foreignSentenceIndexes.length: " + foreignSentenceIndexes.length);
	console.log("rowStartIndexes: " + rowStartIndexes);
	console.log("rowStartIndexes.length: " + rowStartIndexes.length);
	console.log("foreignSentenceRowIndexes: " + foreignSentenceRowIndexes);
	console.log("foreignSentenceRowIndexes.length: " + foreignSentenceRowIndexes.length);
	console.log("headerRowIndexes: " + headerRowIndexes);

	var foreignDefinitions = [], foreignDefinitionsNoTooltip = [],
	foreignTranslations = [], foreignTranslationsNoParenthesis = [],
	helperNativeTranslations = [], helperNativeTranslationsNoParenthesis = [],
	nativeTranslations = [], nativeTranslationsNoTooltip = [],
	nativeSentences = [],
	foreignSentences = []
	;

	for (let k = 3; k < tableRowIndexes[tableRowIndexes.length-1]; k++) {
		if (tableRow[k].outerHTML.includes("<strong>") && !tableRow[k].outerHTML.includes("wrtopsection")) {
//			console.log("(1)  " + tableRow[k].outerHTML.split("<td class=\"FrWrd\">")[1].split("</td>")[0].replace( /(<([^>]+)>)/ig, ''));
//			console.log("(1)# " + tableRow[k].outerHTML.split("<strong>")[1].split("</strong>")[0].replace( /(<([^>]+)>)/ig, '').replace('⇒', ''));
//			console.log("(2) " + (tableRow[k].outerHTML.split("</td>")[1].substring(5).split(")")[0] + ")").replace( /(<([^>]+)>)/ig, ''));
//			console.log("(2)# " + (tableRow[k].outerHTML.split("</td>")[1].substring(5).split(")")[0] + ")").replace( /(<([^>]+)>)/ig, '').replace('(', '').replace(')', ''));
		}
		if (tableRow[k].outerHTML.includes("class=\"dsense\"")) {
//			console.log("(2.5) " + tableRow[k].outerHTML.split("<span class=\"dsense\">")[1].split("</td>")[0].replace( /(<([^>]+)>)/ig, ''));
//			console.log("(2.5)#" + tableRow[k].outerHTML.split("<span class=\"dsense\">")[1].split("</td>")[0].replace( /(<([^>]+)>)/ig, '').replace('(', '').replace(')', ''));
			helperNativeTranslationsRowIndexes.push(k);
		}
		if ((tableRow[k].outerHTML.includes("<td class=\"ToWrd\">") || tableRow[k].outerHTML.includes("<td class=\"ToWrd\" "))&& !tableRow[k].outerHTML.includes("langHeader")) {
//			console.log("(3)  " + tableRow[k].outerHTML.split("<td class=\"ToWrd\">")[1].replace( /(<([^>]+)>)/ig, '').split("⇒").join(""));
//			console.log("(3)# " + tableRow[k].outerHTML.split("<td class=\"ToWrd\">")[1].split("<em class")[0].split("⇒").join("").replace( /(<([^>]+)>)/ig, ''));
			nativeTranslationsRowIndexes.push(k);
		}
		if (tableRow[k].outerHTML.includes("class=\"FrEx\">")) {
//			console.log("(4)  " + tableRow[k].outerHTML.split("<span dir=\"ltr\">")[1].split("</span>")[0]);
		}
		if (tableRow[k].outerHTML.includes("class=\"ToEx\">") || tableRow[k].outerHTML.includes("class=\"ToEx Ar\">")) {
//			console.log("(5)  " + tableRow[k].outerHTML.split("<i>")[1].split("</i>")[0].replace( /(<([^>]+)>)/ig, ''));
			nativeSentencesRowIndexes.push(k);
		}
	}
    console.log("nativeSentencesRowIndexes: " + nativeSentencesRowIndexes);
    console.log("nativeTranslationsRowIndexes: " + nativeTranslationsRowIndexes);

	// copy button
	for (let k = rowStartIndexes[1]; k <= tableRowIndexes[tableRowIndexes.length-1]; k++) {
		tableRow[k].onmouseenter = async function(e) {
			findNearestRowStartIndex = k;
			while (!rowStartIndexes.includes(findNearestRowStartIndex)) {
				findNearestRowStartIndex--;
				rowStartIndexesCount++;
			}

			if (copyStatus
			&& !tableRow[k].outerHTML.includes("langHeader")
			&& !tableRow[k].outerHTML.includes("wrtopsection")) {
				// account for going past bold headers
				for (let p = 0; p < headerRowIndexes.length; p++) {
					if (k > headerRowIndexes[p]) {
						headerRowOffsetCount = p;
					} else if (k < headerRowIndexes[0]){
						headerRowOffsetCount = 0;
					}
				}
				// first row of definition
				if (tableRow[k].outerHTML.includes(languageCombinationInPage)) {
					console.log("Row: " + k);
					onFirstRow = true;
					if (!(currentRowTheCopyButtonIsOn == strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3)) {
						// if there is a note on this row, store it and put it back when the button goes away
						if (tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3].innerHTML.substring(0, 3) === "<i>" ||
						    tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3].innerHTML.includes("sNext100")) {
							htmlThatButtonRemoved = tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3].innerHTML;
						} else {
							htmlThatButtonRemoved = "";
						}
					}

					if (rowStartIndexes.includes(k+1)) {
						console.log("There are no example sentences for this definition.");
						definitionOnlyTakesUpOneRow = true;
						htmlThatButtonRemoved = tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 0].innerHTML;
						currentRowTheCopyButtonIsOn = strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 0;
                        tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 0].innerHTML = htmlThatButtonRemoved + createCopyButton(k);
					} else {
						definitionOnlyTakesUpOneRow = false;
						currentRowTheCopyButtonIsOn = strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3;
                        tableData[strongIndexes[rowStartIndexes.indexOf(k)-1 + headerRowOffsetCount] + 3].innerHTML = createCopyButton(k) + htmlThatButtonRemoved;
					}

					buttonVariable = document.getElementById("copyButton" + k);
					rowStartIndexesCount = 0;
					copyButtonExists = true;
				} else {// subsequent rows of definition
					console.log("Row: " + k);
					onFirstRow = false;
					definitionOnlyTakesUpOneRow = false;
					if (!(currentRowTheCopyButtonIsOn == strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1 + headerRowOffsetCount] + 3)) {
						// if there is a note on this row, store it and put it back when the button goes away
						if (tableData[strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1 + headerRowOffsetCount] + 3].innerHTML.substring(0, 3) === "<i>") {
							htmlThatButtonRemoved = tableData[strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1 + headerRowOffsetCount] + 3].innerHTML;
						} else {
							htmlThatButtonRemoved = "";
						}
					}

					currentRowTheCopyButtonIsOn = strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1 + headerRowOffsetCount] + 3;
					tableData[strongIndexes[rowStartIndexes.indexOf(k-rowStartIndexesCount)-1 + headerRowOffsetCount] + 3].innerHTML = createCopyButton(k) + htmlThatButtonRemoved;

					buttonVariable = document.getElementById("copyButton" + k);
					rowStartIndexesCount = 0;
					copyButtonExists = true;

				}
			}

			const sendMessageButton = document.getElementById('copyButton' + k);
			sendMessageButton.onclick = async function(e) {
				console.log("Copy button clicked");
				console.log("idOrder: " + idOrder);
				console.log("idWhichTrue: " + idWhichTrue);
				console.log("k (current row): " + k);

				// find the previous rowStartIndex from the current row copy was clicked on
				var currentFdRow = k;
				for (let i = k; i < rowStartIndexes[rowStartIndexes.length-1] + 10; i++) {
					if (rowStartIndexes.includes(currentFdRow)) {
						break;
					} else {
						currentFdRow--;
					}
				}
				console.log("currentFdRow: " + currentFdRow);
				var currentFtRow = currentFdRow;

				var currentFsRows = [];
				var currentFsRow = currentFdRow;
				for (let i = k; i < rowStartIndexes[rowStartIndexes.length-1] + 10; i++) {
					if (foreignSentenceRowIndexes.includes(currentFsRow)) {
						currentFsRows.push(currentFsRow);
					}
					currentFsRow++;
					if (rowStartIndexes.includes(currentFsRow)) {
						if (currentFsRows == []) {
							fsExists = false;
						}
						break;
					}
				}
				console.log("currentFsRows: " + currentFsRows);

				var currentNtRows = [];
				var currentNtRow = currentFdRow;
				for (let i = k; i < rowStartIndexes[rowStartIndexes.length-1] + 10; i++) {
					if (nativeTranslationsRowIndexes.includes(currentNtRow)) {// if nt found on a row
						currentNtRows.push(currentNtRow);
					}
					currentNtRow++;
					if (rowStartIndexes.includes(currentNtRow)) {// if definition row found
						break;
					}
				}
				console.log("currentNtRows: " + currentNtRows);

				var currentNsRows = [];
				var currentNsRow = currentFdRow;
				for (let i = k; i < rowStartIndexes[rowStartIndexes.length-1] + 10; i++) {
					if (nativeSentencesRowIndexes.includes(currentNsRow)) {
						currentNsRows.push(currentNsRow);
					}
					currentNsRow++;
					if (rowStartIndexes.includes(currentNsRow)) {// if definition row found
						if (currentNsRows == []) {
							nsExists = false;
						}
						break;
					}
				}
				console.log("currentNsRows: " + currentNsRows);
				var currentHntRows = [];
				var currentHntRow = currentFdRow;
				for (let i = k; i < rowStartIndexes[rowStartIndexes.length-1] + 10; i++) {
					if (helperNativeTranslationsRowIndexes.includes(currentHntRow)) {
						currentHntRows.push(currentHntRow);
					}
					currentHntRow++;
					if (rowStartIndexes.includes(currentHntRow)) {// if definition row found

						break;
					}
				}
				console.log("currentHntRows: " + currentHntRows);

				chrome.storage.local.get(['capitalize', 'fdTooltips', 'hntEnabled', 'hntParenthesis', 'ftParenthesis', 'ntSameRow', 'hntEnabled',
										'fdCapitalize', 'ftCapitalize', 'ntCapitalize'], function(variable) {
					capitalize = variable.capitalize;
					fdTooltips = variable.fdTooltips;
					hntEnabled = variable.hntEnabled;
					hntParenthesis = variable.hntParenthesis;
					ftParenthesis = variable.ftParenthesis;
					ntSameRow = variable.ntSameRow;
					hntEnabled = variable.hntEnabled;

					fdCapitalize = variable.fdCapitalize;
					ftCapitalize = variable.ftCapitalize;
					ntCapitalize = variable.ntCapitalize;
                });

				var noTextWasCollected = false;
				var clipboardHoldText = "";
				for (let i = 0; i < idOrder.length; i++) {
					for (let j = 0; j < idWhichTrue.length; j++) {
						if (idOrder[i].includes(idWhichTrue[j])) {
							if (idOrder[i] == "fd") {
							    var fdNoAbbr = tableRow[currentFdRow].outerHTML.split("<strong>")[1].split("</strong>")[0].replace( /(<([^>]+)>)/ig, '').replace('⇒', '');
                                var fdWithAbbr = tableRow[currentFdRow].outerHTML.split("<td class=\"FrWrd\">")[1].split("</td>")[0].split("<i>")[0].replace( /(<([^>]+)>)/ig, '').replace('⇒', '');

								if (fdTooltips == true) {
									if (fdCapitalize == true)
										clipboardHoldText += capitalizeFirstLetter(addArticles(fdWithAbbr, fdNoAbbr, languageCombinationInPage.substring(0, 2)));
									else
										clipboardHoldText += addArticles(fdWithAbbr, fdNoAbbr, languageCombinationInPage.substring(0, 2));
								} else {
									if (fdCapitalize == true)
										clipboardHoldText += capitalizeFirstLetter(fdNoAbbr);
									else
										clipboardHoldText += fdNoAbbr;
								}
								clipboardHoldText = removeBackslashBeforeApostrophe(clipboardHoldText);
								clipboardHoldText += "\n";
							} else if (idOrder[i] == "ft") {
							    var cutOffLength = 5;
							    if (languageCombinationInPage == "enar:")
							        cutOffLength = 17;

								if (ftParenthesis == true) {
									if (ftCapitalize == true)
										clipboardHoldText += capitalizeFirstLetter((tableRow[currentFtRow].outerHTML.split("</td>")[1].substring(cutOffLength).split(")")[0] + ")").replace( /(<([^>]+)>)/ig, ''));
									else
										clipboardHoldText += (tableRow[currentFtRow].outerHTML.split("</td>")[1].substring(cutOffLength).split(")")[0] + ")").replace( /(<([^>]+)>)/ig, '');
								} else {
									if (ftCapitalize == true)
										clipboardHoldText += capitalizeFirstLetter((tableRow[currentFtRow].outerHTML.split("</td>")[1].substring(cutOffLength).split(")")[0] + ")").replace( /(<([^>]+)>)/ig, '').replace('(', '').replace(')', ''));
									else
										clipboardHoldText += (tableRow[currentFtRow].outerHTML.split("</td>")[1].substring(cutOffLength).split(")")[0] + ")").replace( /(<([^>]+)>)/ig, '').replace('(', '').replace(')', '');
								}
                                clipboardHoldText = removeBackslashBeforeApostrophe(clipboardHoldText);
                                clipboardHoldText += "\n";

							} else if (idOrder[i] == "fs" && fsExists) {
								for (let r = 0; r < currentFsRows.length; r++) {
									clipboardHoldText += tableRow[currentFsRows[r]].outerHTML.split("<span dir=\"ltr\">")[1].split("</span>")[0] + "\n";
								}
								clipboardHoldText = removeBackslashBeforeApostrophe(clipboardHoldText);
							} else if (idOrder[i] == "nt") {
							    var rForHnt = 0;
							    console.log("currentNtRows.length: " + currentNtRows.length);
								for (let r = 0; r < currentNtRows.length; r++) {
									var currentTableRow = tableRow[currentNtRows[r]].outerHTML;
									console.log("currentNtRows[r]: " + currentNtRows[r]);
									console.log("currentHntRows[r]: " + currentHntRows[r]);
									// make sure that currentHntRows is the same length as currentNtRows
									if (currentNtRows[r]  == currentHntRows[rForHnt]) {
										if (hntEnabled == true) {
											if (hntParenthesis == true) {
												clipboardHoldText += removeAttributesV3(currentTableRow).split("<span class=\"dsense\">")[1].split("</td>")[0].replace( /(<([^>]+)>)/ig, '');
											} else {
												clipboardHoldText += removeAttributesV3(currentTableRow).split("<span class=\"dsense\">")[1].split("</td>")[0].replace( /(<([^>]+)>)/ig, '').replace('(', '').replace(')', '');
											}
											clipboardHoldText += " ";
										}
										rForHnt++;
									}
									var splitWithThis;
                                    if (removeAttributesV2(currentTableRow).includes("<td class=\"ToWrd\" onclick=\"this.innerHTML=\'"))
                                        splitWithThis = "<td class=\"ToWrd\" onclick=\"this.innerHTML=\'";
                                    else if (currentTableRow.includes("<td class=\"ToWrd\" dir=\"rtl\">"))
                                        splitWithThis = "<td class=\"ToWrd\" dir=\"rtl\">";
                                    else
                                        splitWithThis = "<td class=\"ToWrd\">";

									if (ntSameRow == true) {
                                        if (ntCapitalize)
                                            clipboardHoldText += capitalizeFirstLetter(removeAttributesV2(currentTableRow).split(splitWithThis)[1].split(" <em class")[0].split("⇒").join("").replace( /(<([^>]+)>)/ig, ''));
                                        else
                                            clipboardHoldText += removeAttributesV2(currentTableRow).split(splitWithThis)[1].split(" <em class")[0].split("⇒").join("").replace( /(<([^>]+)>)/ig, '');
										clipboardHoldText += ", ";
									} else {
                                        if (ntCapitalize)
                                            clipboardHoldText += capitalizeFirstLetter(removeAttributesV2(currentTableRow).split(splitWithThis)[1].split("<em class")[0].split("⇒").join("").replace( /(<([^>]+)>)/ig, ''));
                                        else
                                            clipboardHoldText += removeAttributesV2(currentTableRow).split(splitWithThis)[1].split("<em class")[0].split("⇒").join("").replace( /(<([^>]+)>)/ig, '');
										clipboardHoldText += "\n";
									}
								}
								if (ntSameRow == true)
									clipboardHoldText = clipboardHoldText.substring(0, clipboardHoldText.length-2);

								clipboardHoldText += "\n";
								clipboardHoldText = removeBackslashBeforeApostrophe(clipboardHoldText);
							} else if (idOrder[i] == "ns" && nsExists) {
								for (let r = 0; r < currentNsRows.length; r++) {
									var currentTableRow = tableRow[currentNsRows[r]].outerHTML;
                                    clipboardHoldText += removeBackslashBeforeApostrophe((removeAttributesV2(currentTableRow).split("><i>")[1].split("</tr>")[0].replace( /(<([^>]+)>)/ig, '')).replace("&quot;", "").replace("&quot;", "").replace("&quot;", "").replace("&quot;", "")) + "\n";
								}
							} else if (idOrder[i] == "b1" || idOrder[i] == "b2" || idOrder[i] == "b3" || idOrder[i] == "b4" || idOrder[i] == "b5")
								clipboardHoldText += "\n";
						}
					}
				}
				// reset "exists" values for the next copy
				fsExists = true;
				nsExists = true;
				// cut off the last \n since all copies will end in \n
				clipboardHoldText = clipboardHoldText.substring(0, clipboardHoldText.length-1);
				// if clipboardHoldText contains nothing or a bunch of \n's, then nothing was copied
				if (clipboardHoldText == "" || clipboardHoldText == "\n" ||
					clipboardHoldText == "\n\n" || clipboardHoldText == "\n\n\n" ||
					clipboardHoldText == "\n\n\n\n" || clipboardHoldText == "\n\n\n\n\n") {
					// didn't even try to copy anything
					if (idWhichTrue.includes("b1") || idWhichTrue.includes("b2") || idWhichTrue.includes("b3") ||
					    idWhichTrue.includes("b4") || idWhichTrue.includes("b5"))
					    clipboardHoldText = "Nothing copied. Check the copy settings. Are there only spaces checked, or is nothing checked at all?";
					else {
					    // tried to copy text but nothing was there
					    clipboardHoldText = "";
					}
				}
				navigator.clipboard.writeText(clipboardHoldText);
				console.log("Text copied:\n" + clipboardHoldText);
			}
		}
	}
	// remove copy button when mouse goes to another definition
	for (let m = rowStartIndexes[1]; m <= tableRowIndexes[tableRowIndexes.length-1]; m++) {
		tableRow[m].onmouseleave = async function(e) {
			buttonVariable.outerHTML = "";
            buttonVariable = "";
            copyButtonExists = false;
            onFirstRow = false;
		}
	}
}
catch (err) {
 	console.log(err);
}