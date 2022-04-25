
const log = {
   /**
   * success
   * @param val
   */
  s:(val: any, title?: string)=>{
    console.group(`${title ?? 'success'} ->`);
    console.log(`%${val}`, "color: 'Green'");
    console.groupEnd();
  },

  /**
   * info
   * @param val
   */
  i:(val: any, title?: string)=>{
    console.group(`${title ?? 'info'} ->`);
    console.info(`%${val}`, "color: 'LightSteelBlue'");
    console.groupEnd();
  },

  /**
   * debug
   * @param val
   */
  d:(val: any, title?: string)=>{
    console.group(`${title ?? 'debug'} ->`);
    console.debug(`%${val}`, "color: 'Blue'");
    console.groupEnd();
  },
  /**
   * error
   * @param val
   */
  e:(val: any, title?: string)=>{
    console.group(`${title ?? 'error'} ->`);
    console.error(val);
    console.groupEnd();
  }
}


export default log
