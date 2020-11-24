<template>
    <div class="work_menu">
        <el-menu
            router
            class="leftPart"
            :collapse="isCollapse"
            :collapse-transition="false"
            :class="{collmin:!isCollapse}"
        ><!-- 不水平折叠收起菜单, 当不水平折叠收起菜单时绑定collmin属性 -->
            <!-- <div v-for="item in menuTree">

            </div> -->
        </el-menu>
    </div>
</template>

<script>
export default {
    name:'workMenu1',
    components:{},
    data() {
        return {

        };
    },
    computed: {
        //是否水平折叠收起菜单
        isCollapse(){
            return this.$store.state.isCollapse;
        }
    },
    created() {

    },
    mounted() {

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
        background-color: #0a1c41;
    }

    .collmin {
        min-width: 15em;
    }
</style>
