export default class SentenceScramblerUtil {
  constructor({
    aScramblerFunction = null,
    shouldTokenizeQuestionMarks = false,
    shouldStripFullStops = false,
    shouldUseExplicitSeparators = false
  } = {}) {
    if (aScramblerFunction) {
      this.shuffleArray = aScramblerFunction;
    } else {
      this.shuffleArray = this.defaultScramblerFunction;
    }

    this.shouldTokenizeQuestionMarks = shouldTokenizeQuestionMarks;
    this.shouldStripFullStops = shouldStripFullStops;
    this.shouldUseExplicitSeparators = shouldUseExplicitSeparators;
  }

  canScramble(aSentence) {
    let sanitizedInputString = this.sanitizeInput(aSentence);
    let words = null;
    if (this.shouldUseExplicitSeparators) {
      words = sanitizedInputString.split("/");
    } else {
      words = sanitizedInputString.split(" ");
    }
    return words.length > 1;
  }

  scrambleSentence(aSentence) {
    let words = this.tokenizeWords(aSentence);
    words = this.maybeLowercaseWordsInArray(words);
    this.shuffleArray(words);
    return words;
  }

  tokenizeWords(aSentence) {
    let sanitizedInputString = this.sanitizeInput(aSentence);
    if (this.shouldUseExplicitSeparators) {
      return sanitizedInputString.split("/").map(aPart => aPart.trim());
    } else {
      return sanitizedInputString.split(" ");
    }
  }

  //from comments on https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/25984542
  defaultScramblerFunction(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
  }

  maybeLowercaseWordsInArray(array) {
    return array.map((aWord, index) => {
      if (index === 0) {
        return this.maybeLowercaseAWord(aWord);
      } else {
        return aWord;
      }
    });
  }

  maybeLowercaseAWord(aWord) {
    if (aWord.length > 1) {
      if (this.countUppercaseLetters(aWord) > 1) return aWord;
      if (this.shouldRetainCapitalisation(aWord)) return aWord;
      return aWord.toLowerCase();
    } else if (aWord.length === 1 && aWord !== "I") {
      return aWord.toLowerCase();
    } else {
      return aWord;
    }
  }

  countUppercaseLetters(aString) {
    const stringArray = Array.from(aString);
    let numUppercaseLetters = 0;
    stringArray.forEach(aChar => {
      if (aChar.toLowerCase() !== aChar) {
        numUppercaseLetters++;
      }
    });
    return numUppercaseLetters;
  }

  shouldRetainCapitalisation(aString) {
    const exceptions = ["I", "Mr", "Mrs", "Mrs.", "Mr.", "Dr.", "Dr", "Doctor"];
    return exceptions.indexOf(aString) !== -1;
  }

  sanitizeInput(inputString) {
    let sanitizedInput = inputString.trim();

    if (this.shouldUseExplicitSeparators) {
      return sanitizedInput;
    }

    if (this.shouldStripFullStops) {
      sanitizedInput = sanitizedInput.replace(/\.$/, "");
    }
    if (this.shouldTokenizeQuestionMarks) {
      sanitizedInput = sanitizedInput.replace(/(\w)(\?)/, "$1 ?");
    }
    return sanitizedInput;
  }
}
