<template>
    <div>
        <!-- <float-view ref="floatview" v-if="showView" :json="json" @closeview="closeview"></float-view> -->
        <div class="work_menu">
            <el-menu router class="leftPart"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :class="{collmin:!isCollapse}">
                <template v-for="item in menuTree">
                    <el-submenu v-if="item.children && item.children.length" :index="item.menuInitlink || item.menuId"
                                :key="item.menuId">
                        <template slot="title">
                            <router-link v-if="item.menuInitlink" :to="{path:item.menuInitlink}">
                                <i v-if="item.menuName!=''" :class="getIcon(item.menuName)"></i>
                                <!-- <i v-if="item.menuIcon!=''" :class="item.menuIcon"></i> -->
                                <span>{{item.menuName}}</span>
                            </router-link>
                            <div v-else>
                                <i v-if="item.menuIcon!=''" :class="getIcon(item.menuName)"></i>
                                <span>{{item.menuName}}</span>
                            </div>
                        </template>
                        <template v-for="itemChild in item.children">
                            <el-submenu v-if="itemChild.children && itemChild.children.length"
                                        :index="itemChild.menuInitlink || itemChild.menuId" :key="itemChild.menuId">
                                <template slot="title">
                                    <router-link v-if="itemChild.menuInitlink" :to="{path:itemChild.menuInitlink}">
                                        <i v-if="itemChild.menuIcon!=''" :class="getIcon(item.menuName)"></i>
                                        <span>{{itemChild.menuName}}</span>
                                    </router-link>
                                    <div v-else>
                                        <i v-if="itemChild.menuIcon!=''" :class="getIcon(item.menuName)"></i>
                                        <span>{{itemChild.menuName}}</span>
                                    </div>
                                </template>
                                <template v-for="itemChild_Child in itemChild.children">
                                    <el-submenu v-if="itemChild_Child.children && itemChild_Child.children.length"
                                                :index="itemChild_Child.menuInitlink || itemChild_Child.menuId"
                                                :key="itemChild_Child.menuId">
                                        <template slot="title">
                                            <router-link v-if="itemChild_Child.menuInitlink"
                                                        :to="{path:itemChild_Child.menuInitlink}">
                                                <i v-if="itemChild_Child.menuIcon!=''"
                                                :class="getIcon(itemChild_Child.menuName)"></i>
                                                <span>{{itemChild_Child.menuName}}</span>
                                            </router-link>
                                            <div v-else>
                                                <i v-if="itemChild_Child.menuIcon!=''"
                                                :class="getIcon(itemChild_Child.menuName)"></i>
                                                <span>{{itemChild_Child.menuName}}</span>
                                            </div>
                                        </template>
                                        <el-menu-item v-for="itemChild_Child_Child in itemChild_Child.children"
                                                    :index="itemChild_Child_Child .menuInitlink || itemChild_Child_Child.menuId"
                                                    :key="itemChild_Child_Child.menuId">
                                            <i v-if="itemChild_Child_Child.menuIcon!=''"
                                            :class="getIcon(itemChild_Child.menuName)"></i><span slot="title">{{itemChild_Child_Child.menuName}}</span>
                                        </el-menu-item>
                                    </el-submenu>
                                    <el-menu-item v-else :index="itemChild_Child.menuInitlink"
                                                :key="itemChild_Child.menuId">
                                        <i
                                                v-if="itemChild_Child.menuIcon!=''"
                                                :class="getIcon(itemChild_Child.menuName)"></i><span
                                            slot="title">{{itemChild_Child.menuName}}</span></el-menu-item>
                                </template>
                            </el-submenu>
                            <el-menu-item v-else :index="itemChild.menuInitlink" :key="itemChild.menuInitlink"><i
                                    v-if="itemChild.menuIcon!=''" :class="getIcon(item.menuName)"></i><span
                                    slot="title">{{itemChild.menuName}}</span></el-menu-item>
                        </template>
                    </el-submenu>
                    <el-menu-item v-else :index="item.menuInitlink || item.menuId" :key="item.menuId">
                        <i v-if="item.menuIcon!=''" :class="getIcon(item.menuName)"></i>
                        <span slot="title">{{item.menuName}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import { Notification } from 'element-ui';//单独引用
    export default {
        name: "WorkMenu2",
        data() {
            return {
                // isCollapse: false,
                menuTree: [],
            }
        },
        computed: {
            isCollapse() {
                return this.$store.state.isCollapse
            }
        },
        created: function () {
            let that = this
            this.axios({
                url: this.$api.SSOloginApi.getAuthFromCurrentUser,
                method: 'get'
            }).then(function (res) {
                if (res.code == 200) {
                    if(res.info.menuList&&res.info.menuList.length>0){
                        that.menuTree = res.info.menuList[0].children;
                        if(that.menuTree.length==1){
                            that.open2();
                        }
                    }
                } else {
                    that.$message({
                        type: 'warning',
                        message: res.msg
                    });
                }
            })
        },
        beforeDestroy(){
            Notification.closeAll()
        },
        mounted(){
        },
        methods: {
            open2() {
                this.$notify({
                    title:'提示' ,
                    message: '您暂未拥有任何权限，请联系系统管理员或公司工作组管理员申请页面查看权限',
                    duration: 0,
                    position: 'bottom-right',
                });
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
    }
</script>

<style scoped lang="less">
    .work_menu {
        height: 100%;
        box-sizing: border-box;
        text-align: left;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .leftPart {
        border-right: 0px;
    }

    .collmin {
        min-width: 15em;
    }

    /deep/ .el-submenu__title i {
        color: #0c9ef5;
    }

    /deep/ .el-menu-item i {
        color: #52a4ff;
    }

    /deep/ .el-submenu [class^=fa] {
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
    }
</style>
