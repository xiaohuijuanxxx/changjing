<template>
    <div class="work_menu">
        <el-menu
            background-color="#001530"
            text-color="#ebf0f8"
            :router="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            :class="{collmin:!isCollapse}"
            :default-openeds="defaultOpeneds"
        ><!-- 当菜单不展开时，显示的样式为collmin -->
            <el-submenu index="1" :show-timeout="0" :hide-timeout="0"><!-- 当此菜单下还有下一级菜单的时候用el-submebu，当没有时用el-menu-item -->
              <template slot="title">
                  <i class="el-icon-upload"></i>
                  <span>数据上传</span>
              </template>
              <el-menu-item-group><!-- 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
                  <el-menu-item index="/carInfoManage">
                       <i class="el-icon-upload"></i>
                        <span>车辆信息管理</span>
                  </el-menu-item>
                  <el-menu-item index="/uploadDataManage">
                       <i class="el-icon-upload"></i>
                        <span>数据上传管理</span>
                  </el-menu-item>
                  <el-menu-item index="/uploadStorageMon">
                       <i class="el-icon-upload"></i>
                        <span>上传数据统计与存储监控</span>
                  </el-menu-item>
                  <el-menu-item index="/uploadTaskControl">
                       <i class="el-icon-upload"></i>
                        <span>上传任务监控</span>
                  </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2" :show-timeout="0" :hide-timeout="0">
                <template slot="title">
                  <i class="el-icon-s-order"></i>
                  <span>数据审核</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">
                    <i class="el-icon-s-order"></i>
                     <span>车辆信息审核</span>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <i class="el-icon-s-order"></i>
                     <span>上传数据审核</span>
                  </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" :show-timeout="0" :hide-timeout="0">
                <template slot="title">
                  <i class="el-icon-s-management"></i>
                  <span>数据管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">
                    <i class="el-icon-s-management"></i>
                     <span>数据集统计</span>
                  </el-menu-item>
                  <el-menu-item index="3-2">
                    <i class="el-icon-s-management"></i>
                     <span>数据集管理</span>
                  </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" :show-timeout="0" :hide-timeout="0">
                <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">
                      <i class="el-icon-s-custom"></i>
                      <span>用户信息管理</span>
                  </el-menu-item>
                  <el-menu-item index="3-2">
                      <i class="el-icon-s-custom"></i>
                      <span>工作组管理</span>
                  </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5" :show-timeout="0" :hide-timeout="0">
                <template slot="title">
                    <i class="el-icon-s-management"></i>
                    <span>权限管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">
                      <i class="el-icon-s-management"></i>
                      <span>用户角色管理</span>
                  </el-menu-item>
                  <el-menu-item index="5-2">
                      <i class="el-icon-s-management"></i>
                      <span>角色权限管理</span>
                  </el-menu-item>
                  <el-menu-item index="5-3">
                      <i class="el-icon-s-management"></i>
                      <span>数据权限管理</span>
                  </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6" :show-timeout="0" :hide-timeout="0">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>系统设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="6-1">
                      <i class="el-icon-setting"></i>
                      <span>菜单管理</span>
                  </el-menu-item>
                  <el-menu-item index="6-2">
                      <i class="el-icon-setting"></i>
                      <span>字典管理</span>
                  </el-menu-item>
                  <el-menu-item index="6-3">
                      <i class="el-icon-setting"></i>
                      <span>上传目录配置</span>
                  </el-menu-item>
                  <el-menu-item index="6-4">
                      <i class="el-icon-setting"></i>
                      <span>校验规则管理</span>
                  </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7" :show-timeout="0" :hide-timeout="0">
                <template slot="title">
                    <i class="el-icon-s-management"></i>
                    <span>日志管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="7-1">
                      <i class="el-icon-s-management"></i>
                      <span>日志检索</span>
                  </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="8" :show-timeout="0" :hide-timeout="0">
                <i class="el-icon-edit"></i>
                <span>个人信息管理</span>
            </el-menu-item>
            <el-menu-item index="9" :show-timeout="0" :hide-timeout="0">
                <i class="el-icon-s-management"></i>
                <span>数据分析</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name:'workMenu',
    components:{},
    data() {
        return {
            defaultOpeneds:[],
        };
    },
    created() {

    },
    mounted() {

    },
    computed: {
        isCollapse(){
            return this.$store.state.isCollapse;
        }
    },
    methods: {

    }
};
</script>

<style scoped lang="less">
    .work_menu{
        user-select: none;//禁止用户选中
        height: 100%;
        box-sizing: border-box;
        text-align: left;
    }

    .el-menu{
        border-right: solid 1px #061630;
    }

    .collmin {
        min-width: 15em;
    }
</style>
