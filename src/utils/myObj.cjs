
const myObj = {
  /** Remove all fields from obj which contain a null or undefined value */
  trim: (obj) => {
    const entries = Object.entries(obj);
    for (const [key, value] of entries) {
      if (value == null) delete obj[key];
    }
    return obj;
  },
  /**
   * Copy specific fields from an object
   * @param {Array} keys for fields kept during copy
   * @returns {Object} new paritally copied version
   */
  // Object.prototype.unwrap = (keys) => {
  unwrap: (obj, keys) => {
    if (typeof (obj) !== "object" || !Array.isArray(keys)) return {};
    const result = {};
    keys.forEach(k => result[k] = obj[k]);
    return result;
  }
}

module.exports = myObj;