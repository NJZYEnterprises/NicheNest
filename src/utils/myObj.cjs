
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
  },
  /**
   * Checks key against existing object keys, 
   * and returns a new key with some number added to denote a duplicate
   * used in case duplicate keys from different sources need to be retained with distinct values
   * @param {Object} obj to check key against
   * @param {String} key to check object for
   * @param {Number | default} maxDuplicates number of times to retry naming the key
   * @returns 
   */
  numberDuplicateKey: (obj, key, maxDuplicates = 1000) => {
    for (let i = 2; i <= maxDuplicates; i++) {
      if (!obj.hasOwnProperty(key)) return key;
      
      const prevIStr = (i-1).toString();
      if (key.endsWith(prevIStr)) key = key.slice(0, -prevIStr.length);
      key = key + i.toString();
    }
  },
  /**
   * Flattens all sub-objects from values by combining key names 
   * with the name of the sub-object + its property name, 
   * such that no value in the flattened object will be a nested object by the end
   * CAUTION: directly modifies the object
   * @param {Object} obj to flatten 
   * @param {Function | undefined} joinKeysFn callback function to customize the method 
   * by which object key name and sub-object key name are joined parameters: (key, subKey)
   * @returns the given object, which has been modified to be flat
   */
  flatten: (obj, joinKeysFn) => {
    if (typeof(joinKeysFn) !== "function")
      joinKeysFn = (key, subKey) => [key, subKey].join("_");
    
    let flattenQ = []
    const resetQ = () => {
      flattenQ = Object.keys(obj).filter(key => typeof(obj[key]) === "object");
      console.log("flattenQ:", flattenQ);
    }
    resetQ();
    while (flattenQ.length > 0) {
      for (const flattenKey of flattenQ) {
        for (const subKey in obj[flattenKey]) {
          const newKey = myObj.numberDuplicateKey(obj, joinKeysFn(flattenKey, subKey));
          obj[newKey] = obj[flattenKey][subKey];
        }
        delete obj[flattenKey];
      }
      
      resetQ();
    }
    
    return obj;
  }
}

module.exports = myObj;