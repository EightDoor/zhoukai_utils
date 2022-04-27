
// console.log mdn 介绍 https://developer.mozilla.org/zh-CN/docs/Web/API/Console
const commStyle = "font-size: 15px;font-weight: 'bold';"
class LogUtils {
  constructor() {

  }

  private isStartTime = false;

  private timeFun() {
    if (this.isStartTime) {
      console.timeEnd();
      console.timeLog();
      this.isStartTime = false;
    }
  }
   /**
   * success
   * @param val
  */
  startTime(title?: string) {
    this.isStartTime = true;
    console.log(`%c打印耗时 -> ${title}`, commStyle)
    console.time();
  }
  s (val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? "" + ' -> 【success】'} ->`);
    console.log(val);
    console.groupEnd();
  }
  /**
   * info
   * @param val
   */
  i(val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? "" + ' -> 【info】'} ->`);
    console.log(val);
    console.groupEnd();
  }

  /**
   * debug
   * @param val
   */
  d(val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? "" + ' -> 【debug】'} ->`);
    console.log(val);
    console.groupEnd();
  }
  /**
   * error
   * @param val
   */
  e(val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? "" + ' -> 【error】'} ->`);
    console.error(val);
    console.groupEnd();
  }
  /**
   * warn
   * @param val
   * @param title
   */
  w(val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? "" + ' -> 【warn】'} ->`);
    console.warn(val);
    console.groupEnd();
  }
  /**
   * trace
   * @param val
   * @param title
   */
  trace (val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? "" + ' -> 【trace】'} ->`);
    console.trace(val);
    console.groupEnd();
  }
  /**
   * table
   * @param val
   * @param title
   */
  table (val: any, title?: string) {
    this.timeFun();
    console.group(`${title ?? "" + ' -> 【trace】'} ->`);
    console.trace(val);
    console.groupEnd();
  }
}

const log = new LogUtils();

export default log
