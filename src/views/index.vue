<template>
    <div>
        <el-container>
            <el-header>
                <header-bar></header-bar>
            </el-header>
            <el-container class="bottomPart">
                <el-aside width="unset">
                    <work-menu></work-menu>
                </el-aside>
                <el-main>
                    <h3>main</h3>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import headerBar from 'components/home/Header'
import workMenu from 'components/home/workMenu'
export default {
    name:'index',
    components:{headerBar,workMenu},
    data() {
        return {

        };
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
    header {
        padding: 0px;
    }

    main {
        padding: 0px;
    }

    .bottomPart{
        height: calc(100vh - 60px);//100vh代表可视区域100%，减60代表可视区域60像素一下的高度为该属性高度
    }
</style>
