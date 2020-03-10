<template>
  <div class="sub">
    <div class="full">
      <el-container direction=" vertical">
        <div class="bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/about' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-main></el-main>
        <el-footer></el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.sub {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: aqua;
}

.bread {
  margin: 10px;
}

.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>