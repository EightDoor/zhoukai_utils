// console.log mdn 介绍 https://developer.mozilla.org/zh-CN/docs/Web/API/Console
const commStyle = 'font-size: 15px;font-weight: \'bold\';'

type LogType =
  | 'table'
  | 'log'
  | 'info'
  | 'warn'
  | 'error'
  | 'trace'
  | 'debug'
export interface ILogUtilOptions {
  logStatus?: boolean | undefined
  level?: 'info' | 'debug' | 'error'
}
/**
 * LogUtils class
 */
class LogUtil {
  /**
   * 是否启用
   * @param logStatus
   */
  private data: ILogUtilOptions = { logStatus: true, level: 'debug' }

  constructor(data?: ILogUtilOptions) {
    if (data)
      Object.assign(this.data, data)
  }

  /**
   * 是否使用开始时间
   */
  private isStartTime = false

  /**
   * 时间记录函数
   */
  private timeFun() {
    if (this.isStartTime && this.data.logStatus) {
      console.timeEnd()
      console.timeLog()
      this.isStartTime = false
    }
  }

  /**
   * 是否运行在浏览器当中
   * @returns
   */
  private isWindow() {
    return typeof window !== 'undefined'
  }

  /**
   * 根据level不同、打印console
   * @param title
   * @param val
   * @param type
   */
  private pintValue(title?: string, val?: any, type?: LogType) {
    if (this.data.logStatus) {
      if (this.data.level === 'info') {
        if (type !== 'debug')
          this.printValueLog(title, val, type)
      }
      else if (this.data.level === 'debug') {
        this.printValueLog(title, val, type)
      }
      else if (this.data.level === 'error') {
        if (type === 'error')
          this.printValueLog(title, val, type)
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
    this.timeFun()

    if (!this.isWindow()) {
      const chalk = require('chalk')

      // chalk;
      this.formatChalkVal(chalk, title ?? '', val, type)
    }
    else {
      let typeVal: any = 'log'
      if (type !== 'debug')
        typeVal = type
      else
        typeVal = 'log'

      if (this.isObject(val)) {
        console.log(`----------${title}----------`)
        // @ts-expect-error
        console[typeVal](val)
      }
      else {
        // @ts-expect-error
        console[typeVal](`${title ? `[${title}:]` : `[${typeVal}]`} ${val}`)
      }
    }
  }

  /**
   * 处理不同类型，展示不同的颜色值
   * @param type
   */
  private formatChalkVal(chalk: any, title: string, val: any, type?: LogType) {
    switch (type) {
      case 'log':
        this.formatChalkColor(chalk, title, [0, 191, 255], val, type)
        return
      case 'info':
        this.formatChalkColor(chalk, title, [216, 191, 216], val, type)
        return
      case 'warn':
        this.formatChalkColor(chalk, title, [255, 165, 0], val, type)
        return
      case 'error':
        this.formatChalkColor(chalk, title, [255, 0, 0], val, type)
        return
      default:
        this.formatChalkColor(chalk, title, [127, 255, 170], val, type)
    }
  }

  /**
   * node 格式化输出颜色
   * @param chalk
   * @param title
   * @param color
   * @param val
   * @param type
   */
  private formatChalkColor(
    chalk: any,
    title: string,
    color: number[],
    val: string,
    type?: LogType,
  ) {
    const baseChalk = chalk.bold
    console.log(
      `${title ? `${title}:` : ''} ${baseChalk.rgb(color[0], color[1], color[2])(JSON.stringify(val))}`,
    )
  }

  /**
   * 开始记录耗时
   * @param title
   */
  startTime(title?: string) {
    if (this.data.logStatus) {
      this.isStartTime = true
      console.log(`%c执行耗时 -> ${title}`, commStyle)
      console.time()
    }
  }

  /**
   * 成功
   * @param val
   * @param title
   */
  s(val: any, title?: string) {
    this.pintValue(title, val, 'log')
  }

  /**
   * 信息
   * @param val
   * @param title
   */
  i(val: any, title?: string) {
    this.pintValue(title, val, 'info')
  }

  /**
   * 调试
   * @param val
   * @param title
   */
  d(val: any, title?: string) {
    this.pintValue(title, val, 'debug')
  }

  /**
   * 错误
   * @param val
   * @param title
   */
  e(val: any, title?: string) {
    this.pintValue(title, val, 'error')
  }

  /**
   * 警告
   * @param val
   * @param title
   */
  w(val: any, title?: string) {
    this.pintValue(title, val, 'warn')
  }

  /**
   * 打印堆栈跟踪
   * @param val
   * @param title
   */
  trace(val: any, title?: string) {
    this.pintValue(title, val, 'trace')
  }

  /**
   * 将数据以表格的形式显示
   * @param val
   * @param title
   */
  table(val: any, title?: string) {
    this.pintValue(title, val, 'table')
  }

  /**
   * 清空控制台
   */
  clear() {
    console.clear()
  }

  isObject = (value: any) => {
    return value != null && (typeof value == 'object' || typeof value == 'function')
  }
}

export default LogUtil
