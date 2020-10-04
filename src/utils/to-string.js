/*******************************************************************************
 *
 *    Copyright (c) 2020 Haixing Hu
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * Converts a value or object to string.
 * 
 * For 'string', 'number', 'boolean' values, it will returns their string 
 * representations; for 'object' values, it will returns their JSON coding.
 * 
 * @param {in} value 
 *     the value to be converted.
 * @return 
 *     the string representation of the value.
 * @author Haixing Hu
 */
export default function toString(value) {
  switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
      return value;
    case 'object':
    default:
      if (value === null) {
        return '[null]';
      }
      if (value instanceof String) {
        return value;
      }
      if (value instanceof Number) {
        return value;
      }
      if (value instanceof Boolean) {
        return value;
      }
      return JSON.stringify(value);
  }
}