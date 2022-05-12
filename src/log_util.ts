// console.log mdn 介绍 https://developer.mozilla.org/zh-CN/docs/Web/API/Console
const commStyle = "font-size: 15px;font-weight: 'bold';";

type LogType =
  | "table"
  | "log"
  | "info"
  | "warn"
  | "error"
  | "trace"
  | "table"
  | "debug";
export interface ILogUtilOptions {
  logStatus?: boolean | undefined;
  level?: "info" | "debug" | "error";
}
/**
 * LogUtils class
 */
class LogUtil {
  /**
   * 是否启用
   * @param logStatus
   */
  private data: ILogUtilOptions = { logStatus: true, level: "debug" };

  constructor(data?: ILogUtilOptions) {
    if (data) {
      Object.assign(this.data, data);
    }
  }
  /**
   * 是否使用开始时间
   */
  private isStartTime = false;

  /**
   * 时间记录函数
   */
  private timeFun() {
    if (this.isStartTime && this.data.logStatus) {
      console.timeEnd();
      console.timeLog();
      this.isStartTime = false;
    }
  }

  /**
   * 是否运行在浏览器当中
   * @returns
   */
  private isWindow() {
    return typeof window !== "undefined";
  }

  /**
   * 根据level不同、打印console
   * @param title
   * @param val
   * @param type
   */
  private pintValue(title?: string, val?: any, type?: LogType) {
    if (this.data.logStatus) {
      if (this.data.level === "info") {
        if (type !== "debug") {
          this.printValueLog(title, val, type);
        }
      } else if (this.data.level === "debug") {
        this.printValueLog(title, val, type);
      } else if (this.data.level === "error") {
        if (type === "error") {
          this.printValueLog(title, val, type);
        }
      }
    }
  }
  /**
   * 打印console值
   * @param title
   * @param val
   * @param type
   */
  private printValueLog(title?: string, val?: string, type?: LogType) {
    this.timeFun();

    if (!this.isWindow()) {
      const chalk = require("chalk");

      // chalk;
      this.formatChalkVal(chalk, title ?? "", val, type);
    } else {
      console.group(`${title ?? "" + " -> 【success】"} ->`);
      console[type ?? "log"](val);
      console.groupEnd();
    }
  }

  /**
   * 处理不同类型，展示不同的颜色值
   * @param type
   */
  private formatChalkVal(chalk: any, title: string, val: any, type?: LogType) {
    switch (type) {
      case "log":
        this.formatChalkColor(chalk, title, [0, 191, 255], val);
        return;
      case "info":
        this.formatChalkColor(chalk, title, [216, 191, 216], val);
        return;
      case "warn":
        this.formatChalkColor(chalk, title, [255, 165, 0], val);
        return;
      case "error":
        this.formatChalkColor(chalk, title, [255, 0, 0], val);
        return;
      default:
        this.formatChalkColor(chalk, title, [127, 255, 170], val);
    }
  }
  /**
   * node 格式化输出颜色
   * @param title
   * @param color
   * @param val
   */
  private formatChalkColor(
    chalk: any,
    title: string,
    color: number[],
    val: string
  ) {
    const baseChalk = chalk.bold;
    console.group(
      chalk.rgb(
        color[0],
        color[1],
        color[2]
      )(`${title ?? "" + " -> 【success】"} ->`)
    );
    console.log(
      baseChalk.rgb(color[0], color[1], color[2])(JSON.stringify(val))
    );
    console.groupEnd();
  }
  /**
   * 开始记录耗时
   * @param title
   */
  startTime(title?: string) {
    if (this.data.logStatus) {
      this.isStartTime = true;
      console.log(`%c执行耗时 -> ${title}`, commStyle);
      console.time();
    }
  }

  /**
   * 成功
   * @param val
   * @param title
   */
  s(val: any, title?: string) {
    this.pintValue(`${title ?? "" + " -> 【success】"} ->`, val, "log");
  }
  /**
   * 信息
   * @param val
   * @param title
   */
  i(val: any, title?: string) {
    this.pintValue(`${title ?? "" + " -> 【info】"} ->`, val, "info");
  }

  /**
   * 调试
   * @param val
   * @param title
   */
  d(val: any, title?: string) {
    this.pintValue(`${title ?? "" + " -> 【debug】"} ->`, val, "debug");
  }
  /**
   * 错误
   * @param val
   * @param title
   */
  e(val: any, title?: string) {
    this.pintValue(`${title ?? "" + " -> 【error】"} ->`, val, "error");
  }
  /**
   * 警告
   * @param val
   * @param title
   */
  w(val: any, title?: string) {
    this.pintValue(`${title ?? "" + " -> 【warn】"} ->`, val, "warn");
  }
  /**
   * 打印堆栈跟踪
   * @param val
   * @param title
   */
  trace(val: any, title?: string) {
    this.pintValue(`${title ?? "" + " -> 【trace】"} ->`, val, "trace");
  }
  /**
   * 将数据以表格的形式显示
   * @param val
   * @param title
   */
  table(val: any, title?: string) {
    this.pintValue(`${title ?? "" + " -> 【table】"} ->`, val, "table");
  }

  /**
   * 清空控制台
   */
  clear() {
    console.clear();
  }
}

export default LogUtil;
