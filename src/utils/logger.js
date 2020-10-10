/*******************************************************************************
 *
 *    Copyright (c) 2020 Haixing Hu
 *    All rights reserved.
 *
 ******************************************************************************/
import VConsole from 'vconsole';
import format from '@/utils/format';

/**
 * A map used to mapping the logging levels to numeric values.
 *
 * @author Haixing Hu
 */
const LOG_LEVEL_VALUE = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4,
};

const DEBUG = (process.env.NODE_ENV != 'production');

/**
 * The default logging level.
 *
 * @author Haixing Hu
 */
const DEFAULT_LOG_LEVEL = (DEBUG ? 'DEBUG' : 'INFO');

/**
 * Initialize the vConsole in the debugging mode.
 *
 * @author Haixing Hu
 */
const vconsole = (DEBUG ? new VConsole() : null);

vconsole; // avoid unused variable

/**
 * A simple implementation of logging channels, which print the message to the
 * browser console.
 *
 * @author Haixing Hu
 */
class ConsoleChannel {
  /**
   * Logs a message.
   *
   * @param {in} message
   *    the message to be logged.
   */
  log(message) {
    console.log(message);
  }
}

/**
 * A simple class of loggers.
 *
 * @param {in} level
 *    the logging level.
 * @param {in} channel
 *    the channel used to output the logging messages.
 * @author Haixing Hu
 */
class Logger {
  constructor(level = DEFAULT_LOG_LEVEL, channel = new ConsoleChannel()) {
    this.level = level;
    this.channel = channel;
    this.log = this._log;
    this.debug = this._debug;
    this.info = this._info;
    this.warn = this._warn;
    this.error = this._error;
  }

  /**
   * Disables this logger.
   */
  disable() {
    this.log = () => {};
    this.debug = () => {};
    this.info = () => {};
    this.warn = () => {};
    this.error = () => {};
  }

  /**
   * Enables this logger.
   */
  enable() {
    this.log = this._log;
    this.debug = this._debug;
    this.info = this._info;
    this.warn = this._warn;
    this.error = this._error;
  }

  /**
   * Enables or disables this logger.
   *
   * @param {in} enabled
   *    whether to enable this logger.
   */
  setEnabled(enabled) {
    if (enabled) {
      this.enable();
    } else {
      this.disable();
    }
  }

  /**
   * Logs a message.
   *
   * @param {in} level
   *     the logging leve.
   * @param {in} message
   *     the message or message template, which may contain zero or more
   *     placeholders, e.g., '{0}', '{1}', ...
   * @param {in} args
   *     the array of parameters used to format the message.
   * @author Haixing Hu
   */
  _log(level, message, args) {
    if (LOG_LEVEL_VALUE[level] < LOG_LEVEL_VALUE[this.level]) {
      return;
    }
    message = format(message, args);
    this.channel.log(`[${level}] ${message}`);
  }

  /**
   * Logs a message in the DEBUG level.
   *
   * @param {in} message
   *     the message or message template, which may contain zero or more
   *     placeholders, e.g., '{0}', '{1}', ...
   * @param vargs
   *     the parameters used to format the message.
   * @author Haixing Hu
   */
  _debug(message, ...args) {
    this._log('DEBUG', message, args);
  }

  /**
   * Logs a message in the INFO level.
   *
   * @param {in} message
   *     the message or message template, which may contain zero or more
   *     placeholders, e.g., '{0}', '{1}', ...
   * @param {in} parameters
   *     the parameters used to format the message.
   * @author Haixing Hu
   */
  _info(message, ...args) {
    this.log('INFO', message, args);
  }

  /**
   * Logs a message in the WARN level.
   *
   * @param {in} message
   *     the message or message template, which may contain zero or more
   *     placeholders, e.g., '{0}', '{1}', ...
   * @param {in} parameters
   *     the parameters used to format the message.
   * @author Haixing Hu
   */
  _warn(message, ...args) {
    this.log('WARN', message, args);
  }

  /**
   * Logs a message in the ERROR level.
   *
   * @param {in} message
   *     the message or message template, which may contain zero or more
   *     placeholders, e.g., '{0}', '{1}', ...
   * @param {in} parameters
   *     the parameters used to format the message.
   * @author Haixing Hu
   */
  _error(message, ...args) {
    this.log('ERROR', message, args);
  }
}

/**
 * A predefined default constructed logger object.
 *
 * @author Haixing Hu
 */
const logger = new Logger();

//  Exports names
export {
  ConsoleChannel,
  Logger,
  logger as default,
};
