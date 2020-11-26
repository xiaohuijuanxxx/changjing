<!--查询组件封装 用到折叠面板collapse-->
<template>
    <div class="search_part">
        <h3>我是查询组件</h3>
        <el-collapse v-model="activeName" @change="handleChange">
          <el-collapse-item name="1" class="searchClass">
              <template slot="title">
                  <div class="search_title" @click.stop><!-- @click.stop阻止事件冒泡，即点击整个标题div的时候，折叠面板不折叠 点击input或者图标时也不折叠-->
                        <i class="el-icon-search"></i>
                        <span class="search_words">查询</span>
                        <el-input v-if="activeName==''&&textSearch==true" :placeholder="placeholderText" size="small"
                            v-model="searchContent"
                            clearable
                            class="input-with-select searchInput"
                        >
                            <el-button slot="append" icon="el-icon-search" @click="submitSearchValue"></el-button>
                        </el-input><!--slot="append"紧贴在依赖组件后面  -->
                  </div>
              </template>
              <slot name="searchContent"></slot>
          </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    name:'accordion',
    components:{},
    props: {
        placeholderText: {
            type: String,
            default: '请输入关键字进行搜索'
        },
        textSearch: {
            trpe: Boolean,
            default: false,
        }
    },
    data() {
        return {
            activeName:['1'],//默认打开
           /* activeName:'', */
           searchContent: ''
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        //激活面板改变时触发
        handleChange(val){
            console.log(val);
        },
        submitSearchValue(){
            //发射事件，以便其他组件监听
            this.$emit('searchText',this.searchContent);
        }
    }
};
</script>

<style scoped lang="less">
    @background-color:#163168;

    .search_part{//不可选中
        -o-user-select: none;
        -moz-user-select: none; /*火狐 firefox*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10+*/
        -khtml-user-select: none; /*早期的浏览器*/
        user-select: none;
    }

    .el-collapse{
        border-top: 1px solid #163168;
    }

    /deep/.el-collapse-item__header{
        background-color: @background-color;
        border-bottom: 1px solid #163168;
    }

    /deep/.el-collapse-item__arrow{
        color: #fff;
    }

    /deep/.el-collapse-item__wrap{
        border-bottom: 1px solid #163168;
    }

    /deep/.el-collapse-item__content{
        background-color: @background-color;
    }

    .search_title {
        display: flex;//弹性布局
        align-items: center;//纵轴居中
        justify-content: flex-start;//横轴左对齐
        padding-left: 10px;
        font-size: 14px;
        color: #ffff;
    }

    .search_words{
        padding-left: 5px;
    }

    .searchInput {
        width: 400px;
        margin-left: 30px;
    }
</style>
