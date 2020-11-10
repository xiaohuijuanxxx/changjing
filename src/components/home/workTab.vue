<template>
    <div>
        <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTab" @tab-click="clickTab" ref="tabs">
          <el-tab-pane v-for="(t) in editableTabs" 
          :key="t.name" 
          :label="t.tabname" 
          :name="t.name"
          >
            <span slot="label" v-if="t.name == activeTab">
                <span class="tab_zdy_wrap">
                    <span class="tab_zdy" :title="t.tabname">{{t.tabname}}</span>
                </span>
                <i style="margin-left:5px;" class="el-icon-refresh" title="刷新" @click="TabRefresh(t)"></i>
            </span>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name:'workTab',
    components:{},
    data() {
        return {
            activeTab:'',
        };
    },
    created() {

    },
    mounted() {

    },
    computed: {
        editableTabs(){
            return this.$store.state.list;
        }
    },
    methods: {
        removeTab(targetName){
            console.log(targetName);
        },
        clickTab(tab){
            console.log(tab);
        },
    }
};
</script>

<style scoped lang="less">

</style>
