<template>
  <el-container class="layout">
    <!-- 头部 -->
    <el-header>
      <div>
        <!-- <img src="" alt=""> -->
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="collapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse()">|||</div>
        <el-menu
          background-color="#4b4b4b"
          text-color="#fff"
          unique-opened
          router
          :collapse="collapse"
          :collapse-transition="false"
          :default-active="activePath"
          active-text-color="#ffd04b">
          <!-- router组件自带的功能，根据二级菜单的index跳转 -->
          <!-- 选中的文本颜色 -->
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenus } from '../../api/layout/layout.js'

export default {
  name: 'Layout',
  data() {
    return {
      menuList: [],
      collapse: false, // 是否折叠
      activePath: '',  // 被激活的路由
    }
  },
  created() {
    this.getMenus();
    this.activePath = window.sessionStorage.getItem('activePath');
  },
  methods: {
    getMenus() {
      getMenus().then(result => {
        if (result.meta.status === 200) {
          this.menuList = result.data;
        } else{
          this.$message.error('获取菜单异常！');
        }
      })
    },
    toggleCollapse() {
      this.collapse = !this.collapse;
    },
    saveNavState(path) {
      this.activePath = path;
      window.sessionStorage.setItem('activePath', path);
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
}

.el-header {
  background-color: #282828;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #4b4b4b;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #fff;
}

.toggle-button {
  background-color: #4A5064;
  text-align: center;
  line-height: 24px;
  color: #fff;
  cursor: pointer;
  letter-spacing: 0.2em;
}

</style>
