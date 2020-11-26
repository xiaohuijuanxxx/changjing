<template>
    <div class="work_menu">
        <!-- background-color: #001530;dom中设置背景的话hover会有问题 -->
        <el-menu
            router
            text-color="#ebf0f8"
            :collapse="isCollapse"
            :collapse-transition="false"
            :class="{collmin:!isCollapse}"
        ><!-- 不水平折叠收起菜单, 当不水平折叠收起菜单时绑定collmin属性 -->
            <template v-for="item in menuTree">
                <!-- 如果有多层，那么只有最后一层有menuInitlink,所以可以先随便设置一个index,之后最后一层生效 -->
                <!-- 如果有第二层 -->
                <el-submenu v-if="item.children&&item.children.length" :key="item.menuId" :index="item.menuInitlink||item.menuId" :show-timeout="0" :hide-timeout="0">
                  <template slot="title" v-if="item.menuName">
                      <i :class="getIcon(item.menuName)"></i>
                      <span>{{item.menuName}}</span>
                  </template>
                    <template v-for="itemChild in item.children">
                        <!-- 如果有第三层 -->
                        <el-submenu v-if="itemChild.childen&&itemChild.childen.length>0" :key="itemChild.menuId" :index="itemChild.menuInitlink||item.menuId" :show-timeout="0" :hide-timeout="0">
                          <template slot="title" v-if="itemChild.menuName">
                            <i :class="getIcon(itemChild.menuName)"></i>
                            <span>{{itemChild.menuName}}</span>
                          </template>
                            <!-- 第三层 -->
                            <el-menu-item :key="itemChild.childen.menuId" :index="itemChild.childen.menuInitlink">
                                <i :class="getIcon(itemChild.childen.menuName)"></i><!-- v-if="item.menuIcon!=''" -->
                                <span slot="title">{{itemChild.childen.menuName}}</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :key="itemChild.menuId" :index="itemChild.menuInitlink">
                            <i :class="getIcon(itemChild.menuName)"></i><!-- v-if="item.menuIcon!=''" -->
                            <span slot="title">{{itemChild.menuName}}</span>
                        </el-menu-item>
                    </template>
                </el-submenu>
                <!-- 如果只有一层，那么有menuInitlink字段 -->
                <el-menu-item v-else :key="item.menuId" :index="item.menuInitlink">
                    <i :class="getIcon(item.menuName)"></i><!-- v-if="item.menuIcon!=''" -->
                    <span slot="title">{{item.menuName}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { Notification } from 'element-ui';//单独引用
export default {
    name:'workMenu1',
    components:{},
    data() {
        return {
            menuTree:[],//返回的菜单树
        };
    },
    computed: {
        //是否水平折叠收起菜单
        isCollapse(){
            return this.$store.state.isCollapse;
        }
    },
    created() {
        let that = this
        this.$axios({
            url: this.$api.SSOloginApi.getAuthFromCurrentUser,
            method: 'get',
        }).then(function (res) {
            if(res.code == 200) {
                if(res.info.menuList&&res.info.menuList.length>0){
                    that.menuTree = res.info.menuList[0].children;
                    //如果只有一个个人信息中心，则弹出提示：您没有任何权限
                    if(that.menuTree.length == 1){
                        that.open();
                    }
                }
            }else{
                that.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        
        })
    },
    beforeDestroy(){
        Notification.closeAll()
    },
    mounted() {

    },
    methods: {
        open(){
            this.$notify({
                title:'提示',
                message:'您暂未拥有任何权限，请联系系统管理员或公司工作组管理员申请页面查看权限',
                duration: 0,
                position: 'bottom-right',
            })
        },
        getIcon(name){
                let icon = '';
                switch (name) {
                    case '数据上传':
                        icon = 'el-icon-upload';
                        break;
                    case '数据审核':
                        icon = 'el-icon-s-order';
                        break;
                    case '数据管理':
                        icon = 'el-icon-s-management';
                        break;
                    case '用户管理':
                        icon = 'el-icon-s-custom';
                        break;
                    case '权限管理':
                        icon = 'el-icon-s-management';
                        break;
                    case '系统设置':
                        icon = 'el-icon-setting';
                        break;
                    case '日志管理':
                        icon = 'el-icon-s-management';
                        break;
                    case '个人信息管理':
                        icon = 'el-icon-edit';
                        break;
                    case '用户注册':
                        icon = 'el-icon-edit-outline';
                        break;
                    default:
                        icon = 'el-icon-s-management';
                }
                return icon;
            }
    }
};
</script>

<style scoped lang="less">
    .work_menu{
        user-select: none;//禁止用户选中
        height: 100%;
        box-sizing: border-box;
        text-align: left;
        background-color: #0a1c41;
    }

    .el-menu{
        border-right: solid 1px #061630;
        background-color: #001530;
    }

    /deep/ .el-menu-item i {
        color: #52a4ff;
    }

    /deep/ .el-menu-item:hover{
        background-color: #003168;
    }

    /deep/ .el-menu-item:focus, .el-menu-item:hover{
        background-color: #003168;
    }
    
    .collmin {
        min-width: 15em;
    }

</style>
