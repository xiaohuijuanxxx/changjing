<template>
    <div class="work_menu">
        <el-menu
            background-color="#001530"
            text-color="#ebf0f8"
            :router="true"
            :collapse="isCollapse"
            :class="{collmin:!isCollapse}"
            :default-openeds="defaultOpeneds"
        >
            <el-submenu index="1"><!-- 当此菜单下还有下一级菜单的时候用el-submebu，当没有时用el-menu-item -->
              <template slot="title">
                  <i class="el-icon-upload"></i>
                  <span>数据上传</span>
              </template>
              <el-menu-item-group><!-- 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
                  <el-menu-item index="1-1">
                       <i class="el-icon-upload"></i>
                        <span>车辆信息管理</span>
                  </el-menu-item>
                  <el-menu-item index="1-2">
                       <i class="el-icon-upload"></i>
                        <span>数据上传管理</span>
                  </el-menu-item>
                  <el-menu-item index="1-3">
                       <i class="el-icon-upload"></i>
                        <span>上传数据统计与存储监控</span>
                  </el-menu-item>
                  <el-menu-item index="1-4">
                       <i class="el-icon-upload"></i>
                        <span>上传任务监控</span>
                  </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
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

    .collmin {
        min-width: 15em;
    }
</style>
