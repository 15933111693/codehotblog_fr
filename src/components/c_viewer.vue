<template>
    <div>
        <div class="target" ref="target"></div>
    </div>
</template>

<script setup>
import { Viewer } from "bytemd";
import { inject, onMounted, ref, watch } from "vue";
import "bytemd/dist/index.min.css";
const target = ref(null)
const data = inject("c-viewer")

watch(() => data.content, (val) => {
    viewer.$$set({value: val})
})
let viewer
onMounted(() => {
    viewer = new Viewer({
        target: target.value,
        props: {
            value: data.content
        }
    })
})
</script>
