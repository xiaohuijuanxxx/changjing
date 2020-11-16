<template>
    <div>
        <el-container>
            <el-header>
                <header-bar></header-bar>
            </el-header>
            <el-container class="bottomPart">
                <div class="menuWrap">
                    <el-aside width="unset">
                        <work-menu></work-menu>
                    </el-aside>
                    <span class="menuButton" @click="hideMenu">
                        <i style="line-height: 70px" :class="{'el-icon-arrow-right':isCollapse, 'el-icon-arrow-left':!isCollapse}"></i>
                    </span>
                </div>
                <el-main :style="{'height':mainHeight}">
                    <work-tab id="worktab_1" initPage="mainPage"></work-tab>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import headerBar from 'components/home/Header'
import workMenu from 'components/home/workMenu'
import workTab from 'components/home/workTab'

export default {
    name:'index',
    components:{headerBar,workMenu,workTab},
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    computed: {
        isCollapse(){
            return this.$store.state.isCollapse;
        },
        mainHeight(){
            let mainHeight =  this.$store.state.isCollapse - 60;
            return mainHeight+"px";
        }
    },
    methods: {
        hideMenu(){
            this.$store.commit('toggleCollapse');
        },
    }
};
</script>

<style scoped lang="less">
    header {
        padding: 0px;
    }

    main {
        padding: 0px;
    }

    .bottomPart{
        height: calc(100vh - 60px);//100vh代表可视区域100%，减60代表可视区域60像素一下的高度为该属性高度
    }

    .menuWrap {
        display: inline-flex;
        position: relative;
    }

    .menuButton{
        width: 15px;
        top: 45%;
        right: 0;
        opacity: 0.7;
        height: 70px;
        color: white;
        background: #888;
        position: absolute;
        border-radius: 5px;
        display: inline-flex;
    }
</style>
