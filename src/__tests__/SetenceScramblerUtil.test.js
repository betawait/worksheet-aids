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
    describe("when no options are set", () => {
      let scrambleFunction = null;
      beforeEach(() => {
        scrambleFunction = anArrayOfWords => {
          return anArrayOfWords.reverse();
        };
        util = new SentenceScramblerUtil(scrambleFunction);
      });

      test("remove first capitilsation", () => {
        expect(util.scrambleSentence("This is a sentence")).toEqual([
          "sentence",
          "a",
          "is",
          "this"
        ]);
      });
      test("preserve capitilsation of I", () => {
        expect(
          util.scrambleSentence("I know I should preserve capitals")
        ).toEqual(["capitals", "preserve", "should", "I", "know", "I"]);
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
  describe("sanitizeInput", () => {});
});
