import dayjs  from 'dayjs';

const dateUtil = {
  /**
   * 格式化时间
   * @param val
   * @param format
   */
  formatTime(val: any, format = "YYYY-MM-DD HH:mm:ss") {
    return dayjs(val).format(format);
  },
  /**
   * 直接返回 dayjs
   * @returns
   */
  formatDayjs: dayjs
}


export { dateUtil }
