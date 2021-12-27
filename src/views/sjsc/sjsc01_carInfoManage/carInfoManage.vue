<template>
    <div>
        <h3>我是carInfoManage</h3>
        <search-accordion  style="padding-bottom:10px;">
            <template slot="searchContent"><!-- :inline="true"表示行内表单数据 -->
                <el-form :model="searchForm" :inline="true"
                    ref='searchParam'
                    label-width="80px"
                ><!-- label-width支持继承到el-form-item -->
                  <el-form-item label="任务编号:">
                      <el-input prefix-icon="el-icon-search" v-model="searchForm.taskNum" placeholder="请输入任务编号" size="small"></el-input>
                  </el-form-item>
                </el-form>
            </template>
        </search-accordion>
        <span style="margin:20px;">底部</span>
    </div>
</template>

<script>
export default {
    name:'carInfoManage',
    components:{},
    data() {
        return {
            searchForm:{
                taskNum:'',
            },
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

</style>
