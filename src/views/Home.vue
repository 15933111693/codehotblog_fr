<template>
  <div class="home">
    <c_list v-for="i,index in data.val" :key="index" :articleInfo="i"/>
  </div>
</template>

<script setup>
  import c_list from "@/components/c_list"
  import {getAllArticle_api} from "@/api/article"
  import { reactive, ref } from "vue"

  let data = reactive({val: []});
  (async function() {
    const res = await getAllArticle_api()
    data.val = res.data
  })()
</script>


<style scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>