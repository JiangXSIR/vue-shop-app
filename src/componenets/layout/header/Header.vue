<template>
  <!-- 头部 -->
  <el-header>
    <div>
      <!-- <img src="" alt=""> -->
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
</template>

<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>
