<template>
  <div class="search">
    <c_list v-for="i in list.val" :key="i._id" :articleInfo="i"/>
  </div>
</template>

<script setup>
  import c_list from "@/components/c_list"
  import { provide, reactive, watch } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import {search_api} from "@/api/article"
  const route = useRoute()
  const router = useRouter()

  const list = reactive({val: []})
  provide("c_list->list", list.val)
  const getlist = async (val) => {
    if(val.id != undefined) return
    if(!val.content) router.push('/')
    const query = val.content
    const res = await search_api(query)
    list.val = res.data
  }
  watch(() => route.query, getlist, {immediate: true, deep: true})

</script>


<style scoped>
.search {
  width: 100%;
  height: 100%;
}
</style>