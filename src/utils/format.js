/*******************************************************************************
 *
 *    Copyright (c) 2020 Haixing Hu
 *    All rights reserved.
 *
 ******************************************************************************/
import toString from '@/utils/to-string';

/**
 * Format a string with arguments. The string can have placeholders in the form 
 * of '{0}', '{1}', ... 
 * 
 * @param {in} str 
 *     the string to be formated, which could contain placeholders.
 * @param {in} args 
 *     the arguments used to format the string.
 * @return the formatted result.
 * @author Haixing Hu
 */
export default function format(str, args) {
  if (args) {
    for (let i = 0; i < args.length; ++i) {
      const regexp = new RegExp(`\\{${i}\\}`, 'gm');
      const value = toString(args[i]);
      str = str.replace(regexp, value);
    }
  }
  return str;
}