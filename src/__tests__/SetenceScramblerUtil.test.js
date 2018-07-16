import SentenceScramblerUtil from "../utils/SentenceScramblerUtil";

describe("SentenceScramblerUtil", () => {
  let util = null;

  beforeEach(() => {
    util = new SentenceScramblerUtil();
  });
  describe("canScramble", () => {
    test("sentences that can't be scrambled", () => {
      const unscrambleableSentences = [
        "abcde",
        "defgh",
        "124nXF%",
        "",
        "-----"
      ];
      unscrambleableSentences.forEach(aSentence => {
        expect(util.canScramble(aSentence)).toBeFalsy();
      });
    });
    test("sentences that can be scrambled", () => {
      const scrambleableSentences = [
        "a b",
        "a b c",
        "This is a sample sentence",
        'This "sentence" has some punctuation!'
      ];
      scrambleableSentences.forEach(aSentence => {
        expect(util.canScramble(aSentence)).toBeTruthy();
      });
    });
  });
  describe("scrambleSentence", () => {
    let scrambleFunction = null;
    beforeEach(() => {
      scrambleFunction = anArrayOfWords => {
        return anArrayOfWords.reverse();
      };
      util = new SentenceScramblerUtil({
        aScramblerFunction: scrambleFunction
      });
    });

    describe("when no options are set", () => {
      test("remove first capitilisation", () => {
        expect(util.scrambleSentence("This is a sentence")).toEqual([
          "sentence",
          "a",
          "is",
          "this"
        ]);
      });
      test("preserve capitilisation of I", () => {
        expect(
          util.scrambleSentence("I know I should preserve capitals")
        ).toEqual(["capitals", "preserve", "should", "I", "know", "I"]);
      });
      test("preserve capitilisation of Mrs and Mr", () => {
        expect(util.scrambleSentence("Mrs and Mr Jones live here")).toEqual([
          "here",
          "live",
          "Jones",
          "Mr",
          "and",
          "Mrs"
        ]);
      });
      test("keep commas joined", () => {
        expect(
          util.scrambleSentence("Commas, when you think about it, are hard")
        ).toEqual([
          "hard",
          "are",
          "it,",
          "about",
          "think",
          "you",
          "when",
          "commas,"
        ]);
      });
      test("full stops are preserved", () => {
        expect(
          util.scrambleSentence("Sentences end with a full stop.")
        ).toEqual(["stop.", "full", "a", "with", "end", "sentences"]);
      });
      test("question marks are preserved", () => {
        expect(
          util.scrambleSentence("May sentences end with a question mark?")
        ).toEqual([
          "mark?",
          "question",
          "a",
          "with",
          "end",
          "sentences",
          "may"
        ]);
      });
    });
    describe("when option is set to strip full stops", () => {
      beforeEach(() => {
        util = new SentenceScramblerUtil({
          aScramblerFunction: scrambleFunction,
          shouldStripFullStops: true
        });
      });
      test("Check that full stop is removed", () => {
        expect(util.scrambleSentence("I had a full stop.")).toEqual([
          "stop",
          "full",
          "a",
          "had",
          "I"
        ]);
      });
      test("Check that full stop isn't removed from Mr.", () => {
        expect(util.scrambleSentence("Mr. Smith has arrived")).toEqual([
          "arrived",
          "has",
          "Smith",
          "Mr."
        ]);
      });
    });

    test("remove first capitilisation", () => {
      expect(util.scrambleSentence("This is a sentence")).toEqual([
        "sentence",
        "a",
        "is",
        "this"
      ]);
    });
    describe("when option is set to tokenize question marks", () => {
      beforeEach(() => {
        util = new SentenceScramblerUtil({
          aScramblerFunction: scrambleFunction,
          shouldTokenizeQuestionMarks: true
        });
      });
      test("Check that question mark is removed", () => {
        expect(util.scrambleSentence("Should this be separate?")).toEqual([
          "?",
          "separate",
          "be",
          "this",
          "should"
        ]);
      });
    });
  });
  describe("maybeLowercaseAWord", () => {
    test("Lowercase a word with a leading capital", () => {
      expect(util.maybeLowercaseAWord("Leading")).toEqual("leading");
    });
    test("Don't lowercase a word with all capitals", () => {
      expect(util.maybeLowercaseAWord("ABC")).toEqual("ABC");
    });
    test("Don't lowercase a word with more than one capital", () => {
      expect(util.maybeLowercaseAWord("CamelCase")).toEqual("CamelCase");
    });
    test("Don't lowercase a word with more than one capital that is hyphenated", () => {
      expect(util.maybeLowercaseAWord("Hyphenated-Proper-Noun")).toEqual(
        "Hyphenated-Proper-Noun"
      );
    });
  });
});
