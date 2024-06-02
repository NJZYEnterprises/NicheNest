const myString = {
  validate: (str) => {
    return typeof (str) === "string" && str.length > 0
  },
  /**
   * Returns a copy of the string with the first letter capitalized
   * @returns {string} capitalized word
   */
  capitalize: (str) => {
    if (!myString.validate(str)) return "";
    return str[0].toUpperCase() + str.slice(1);
  },
  /** 
   * This function converts a sentence (words separated by spaces) to a single word in camel case 
   * Example: Foo bar => fooBar
   */
  toCamelCase: (sentence) => {
    if (!myString.validate(sentence)) return "";

    const words = sentence.split(' ');
    words[0] = words[0].toLowerCase();
    for (let i = 1; i < words.length; i++) {
      words[i] = myString.capitalize(words[i].toLowerCase());
    }
    return words.join('');
  },
  /** 
   * This function splits a word into a sentence based on capital letters following lower case letters 
   * Example: fooBar => foo Bar
   */
  splitByCapital: (word) => {
    if (!myString.validate(word)) return "";

    return word.split(/(?<=[a-z])(?=[A-Z])/);
  },
}

module.exports = myString;