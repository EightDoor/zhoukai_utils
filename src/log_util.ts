
// console.log mdn 介绍 https://developer.mozilla.org/zh-CN/docs/Web/API/Console

const log = {
  isStartTime: false,
  timeFun() {
    if (this.isStartTime) {
      console.timeEnd();
      console.timeLog();
      this.isStartTime = false;
    }
  },
   /**
   * success
   * @param val
  */
  startTime() {
    this.isStartTime = true;
    console.time();
  },
  s (val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? 'success'} ->`);
    console.log(val);
    console.groupEnd();
  },

  /**
   * info
   * @param val
   */
  i(val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? 'info'} ->`);
    console.info(val);
    console.groupEnd();
  },

  /**
   * debug
   * @param val
   */
  d(val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? 'debug'} ->`);
    console.debug(val);
    console.groupEnd();
  },
  /**
   * error
   * @param val
   */
  e(val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? 'error'} ->`);
    console.error(val);
    console.groupEnd();
  },
  /**
   * warn
   * @param val
   * @param title
   */
  w(val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? 'warn'} ->`);
    console.warn(val);
    console.groupEnd();
  },
  /**
   * trace
   * @param val
   * @param title
   */
  trace (val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? 'trace'} ->`);
    console.trace(val);
    console.groupEnd();
  },
}


export default log
