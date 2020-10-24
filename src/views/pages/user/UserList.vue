<template>
<div>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>
    <!-- 搜索与添加区域 -->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList()">
        <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 用户列表 -->
    <el-table :data="userList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="编辑用户" placement="top" :enterable="false">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
            <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>

  <!-- 添加用户对话框 -->
  <el-dialog
    title="添加用户"
    :visible.sync="addDialogVisible"
    width="50%"
    @close="addDialogClose()">
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="用户手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser()">确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
import { getUserList, userStateChange, addUser } from '../../../api/user/user.js'


export default {
  name: 'user-list',
  data() {
    // 验证邮箱
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if(regEmail.test(value)) {
        return callback();
      }
      callback(new Error('请输入合法的邮箱'));
    };

    // 验证手机
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if(regMobile.test(value)) {
        return callback();
      }
      callback(new Error('请输入合法的手机号'));
    };


    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur'}
        ],
        mobile: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      getUserList({params: this.queryInfo}).then(result => {
        if (result.meta.status === 200) {
          this.userList = result.data.users;
          this.total = result.data.total;
        } else{
          this.$message.error('获取用户列表异常！');
        }
      })
    },
    handleSizeChange(pagesize) {
      this.queryInfo.pagesize = pagesize;
      this.getUserList();
    },
    handleCurrentChange(pagenum) {
      this.queryInfo.pagenum = pagenum;
      this.getUserList();
    },
    userStateChange(userinfo) {
      userStateChange(userinfo).then(result => {
        if (result.meta.status === 200) {
          this.$message.success('更新用户状态成功！');
        } else{
          userinfo.mg_state = !userinfo.mg_state;
          this.$message.error('更新用户数据失败！');
        }
      })
    },
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if(valid) {
          this.doAddUser();
        }
      })
    },
    doAddUser() {
      addUser(this.addForm).then(result => {
        if (result.meta.status === 201) {
          this.$message.success('添加用户成功！');
          this.addDialogVisible = false;
          this.getUserList();
        } else{
          this.$message.error('添加用户失败！');
        }
      })
    }

  }
}
</script>





