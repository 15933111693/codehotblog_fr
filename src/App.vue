<template>
  <el-backtop></el-backtop>
  <el-container>
    <el-header><div class="head"><c_head/></div></el-header>
    <el-main>
      
      <div class="main"><router-view/></div>
    </el-main>
  </el-container>  
</template>

<script setup>
  import c_head from "./components/c_head"
</script>

<style>
*{
  padding: 0;
  margin: 0;
  /* outline: 1px red solid; */
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  height: 8vh !important;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  min-height: 92vh;
  height: auto;
}
.el-header, .el-main, .main {
  display: flex !important;
  justify-content: center;
}

@media (max-width: 980px) {
.el-main{
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-bottom: 0px !important;
}
.el-header {
  padding: 0px !important;
}
}
</style>

<style scoped>
.head, .main{
  width: 960px;
}  
@media (max-width: 980px) {
.head, .main{
  width: 100%;
}    
}
</style>