const myString = {
  /**
   * Returns a copy of the string with the first letter capitalized
   * @returns {string} capitalized word
   */
  capitalize: (str) => {
    if (typeof(str) !== "string" || str.length < 1) return "";
    return str[0].toUpperCase() + str.slice(1);
  }
}

module.exports = myString;