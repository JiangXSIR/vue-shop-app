<template>
   <!-- 侧边栏 -->
  <el-aside :width="collapse ? '64px' : '200px'">
    <div class="toggle-button" @click="toggleCollapse()">|||</div>
    <el-menu
      background-color="#4b4b4b"
      text-color="#fff"
      unique-opened
      :collapse="collapse"
      :collapse-transition="false"
      active-text-color="#ffd04b"> <!-- 选中的文本颜色 -->
      <!-- 一级菜单 -->
      <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.authName }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ subItem.authName }}</span>
          </template>
        </el-menu-item>

      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'aside',
  data() {
    return {
      menuList: [],
      collapse: false
    }
  },
  created() {
    getMenus().then(result => {
      if (result.meta.status === 200) {
        this.menuList = result.data;
      } else{
        this.$message.error('获取菜单异常！');
      }
    });
  },
  methods: {
    toggleCollapse() {
      this.collapse = !this.collapse;
    },
  }
}
</script>

