<template>
  <div>
    <h1>1、log demo 打开console.log 查看具体的使用示例</h1>
    <br />
    <h1>2、时间转换</h1>
    当前时间: {{ formatTime(Date.now()) }}
    <div>直接使用dayjs: {{ formatTimeCustom(Date.now()) }}</div>
    <div>直接使用dayjs: {{ formatTimeCustom(Date.now()) }}</div>

    <br />
    <h1>3、存储数据 (localstore、cookies)</h1>
    <div>
      <button @click="storeDataFun">存储数据</button>
      <button style="margin-left: 15px" @click="getStore">读取数据</button>
      展示存储的值: {{ storeData }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { onMounted } from "vue";
import { LogUtil, dateUtil, StoreUtil } from "zk_utils";

export default defineComponent({
  setup() {
    function formatTime(val: number) {
      return dateUtil.formatTime(val);
    }
    function formatTimeCustom(val: number) {
      return dateUtil.formatDayjs(val).format("YYYY-MM-DD HH:mm:ss");
    }

    function getLog() {
      const log = new LogUtil({ level: "debug", logStatus: true });

      log.d("content test", "debug test");
      log.i("content test", "info test");
      log.e("content test", "error test");
      log.s("content test123", "success test");

      const info = {
        test1: 1,
        test2: 2,
      };
      log.d(info, "content object debug");
      log.s(info, "success test");

      log.startTime("业务");
      setTimeout(() => {
        log.d("执行完成");
      }, 2000);
    }

    const storeData = ref();
    function storeDataFun() {
      store.value.set("test", Date.now());
    }

    function getStore() {
      storeData.value = store.value.get("test");
    }

    const store = ref<StoreUtil>();
    function initStore() {
      store.value = new StoreUtil();
    }
    onMounted(() => {
      getLog();
      initStore();
    });

    return {
      formatTime,
      formatTimeCustom,
      storeDataFun,
      getStore,
      storeData,
    };
  },
});
</script>
