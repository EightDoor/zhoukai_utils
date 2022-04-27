import { LogUtil } from "zk_utils";


const log = new LogUtil();

log.d("content test", 'debug test')
log.i("content test", 'info test')
log.e("content test", 'error test')
log.s("content test123", 'success test')



const info = {
  test1: 1,
  test2: 2
}
log.d(info, "content object debug")
log.s(info, 'success test')


log.startTime("业务")
setTimeout(() => {
 log.d("执行完成")
}, 2000)



