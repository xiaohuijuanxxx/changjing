<template>
    <div>
        <el-container>
            <el-header>
                <header-bar></header-bar>
            </el-header>
            <el-container>
                <el-aside width="">
                    <h3>aside</h3>
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
export default {
    name:'index',
    components:{headerBar},
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
</style>
