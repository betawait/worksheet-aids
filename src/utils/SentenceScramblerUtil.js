export default class SentenceScramblerUtil {
  canScramble(aSentence) {
    let sanitizedInputString = this.sanitizeInput(aSentence);
    let words = sanitizedInputString.split(" ");
    return words.length > 1;
  }

  scrambleSentence(aSentence) {
    let sanitizedInputString = this.sanitizeInput(aSentence);
    let words = sanitizedInputString.split(" ");
    this.shuffleArray(words);
    return this.maybeLowercaseWordsInArray(words);
  }

  //from comments on https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/25984542
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
  }

  maybeLowercaseWordsInArray(array) {
    return array.map(aWord => {
      if (aWord.length > 1) {
        return aWord.toLowerCase();
      } else if (aWord.length === 1 && aWord !== "I") {
        return aWord.toLowerCase();
      } else {
        return aWord;
      }
    });
  }

  sanitizeInput(inputString) {
    return inputString.trim(); //.replace("?","").replace(".","")
  }
}
