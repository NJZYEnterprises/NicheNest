const prisma = require('./connection.cjs');

const myPrisma = {
  /** Converts any JS value into the datatype corresponding w/ given Prisma type */
  convert(value, type) {
    // validate type string
    if (typeof (type) != "string") {
      console.error("convertPrismaType:type should be a string");
      return value;
    }
    // don't convert null or undefined
    if (value == null) return value;

    switch (type) {
      // TODO: Boolean, DateTime
      case "String": return value.toString();
      case "Int":
      case "Float": return Number(value);
      default:
        console.error(`convertPrismaType:type(${type}) not expected:`);
        return value;
    }
  },
  /** Returns a valid copy of the given object for the given table 
   * - only keeps keys that also exist in the table
   * - converts all values to the type prisma expects for the key
   */
  validate(tableName, entryObj) {
    if (typeof (entryObj) !== "object") return {};
    if (typeof (tableName) !== "string") return {};

    const allowedFields = Object.entries(prisma[tableName].fields);

    const result = {};
    for (const [key, value] of allowedFields) {
      result[key] = this.convert(entryObj[key], value?.typeName);
    }

    return result;
  }
}

module.exports = myPrisma;