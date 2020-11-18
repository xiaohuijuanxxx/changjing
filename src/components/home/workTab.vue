<template>
    <div class="work-tab">
        <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTab" @tab-click="clickTab" ref="tabs">
          <el-tab-pane v-for="(t) in worktabs" 
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
        </el-tabs><!-- 不写在el-tab-pane的原因是contentHeight这个计算属性高度减去了tabs,也可以写里面-->
        <div class="work-tab-content" :style="{height: contentHeight}">
            <keep-alive :include="cachePage" :exclude="excludeList">
                <router-view ref="content" v-if="showRouterView"></router-view><!-- -->
            </keep-alive>
        </div>
    </div>
</template>

<script>
export default {
    name:'workTab',
    components:{},
    props: [
        "id",
        "initPage"
    ],
    data() {
        return {
            showRouterView: true,//控制是否重新进行路由跳转（开始时有缓存的）
            activeTab:'',//默认当前活跃页
            initPageCount: 0,//记录需要初始化页面的个数
            oldname:'',//
            rightActiveTab:'',//设置一个变量存储右键tab的name
            initCompleted: false,/* 用来判断dom是否加载完成，第一次进computed的时候dom是没有加载完成的 
            可以用console.log验证，当dom加载完成之后会走mounted，这时候this.$refs才有值，重新计算contentHeight属性*/
            excludeList: [],//不缓存组件存放的数组
            hasInitPage: false,//是否初始化页面
            popItems:[//创建的右键菜单的内容
                {
                    id: 'current',
                    txt: '关闭当前'
                },
                {
                    id: 'others',
                    txt: '关闭其他'
                },
                {
                    id: 'all',
                    txt: '关闭所有'
                }
            ],
        };
    },
    created() {
        //添加current监听, current是store中的对象
        this.$watch('current', function(newval){
            this.activeTab = newval.name;
        })
        //
        this.oldName = this.current.name;
    },
    mounted() {
        this.initCompleted = true;
        let _that = this;
        //$().on()是jquery方法，在被选元素及子元素上添加一个或多个事件处理程序。
        //当鼠标指针移动到元素上,并按下鼠标左键时,会发生 mousedown 事件, 给指定元素.el-tabs__item添加mouseDown事件
        $(".work-tab > .el-tabs").on("mousedown", ".el-tabs__item", function(e){
            //event.which属性返回的是对应鼠标按钮的映射代码值， 1-鼠标左键、2-鼠标中键(滚轮键)、3-鼠标右键
            if(e.which == 3){//当鼠标右键点击tab标签时
                document.body.oncontextmenu = function () {
                    return false
                }//鼠标右键点击.el-tabs 不显示什么返回、复制的白框，因为要设置右键效果，所以要把原来的效果取消
                //确定鼠标在哪个tab上右键（this指向），获取到这个tab的索引值
                let currentTabIndex = $(this).index();
                //找到当前tab页
                let currentTab = _that.worktabs[currentTabIndex];
                //设置一个变量存储这个tab的name
                _that.rightActiveTab = currentTab.name;
            }
        })

        //打开初始页面
        if(this.initPage){
            this.hasInitPage = true;
            this.router.replace('/');
            this.initPage.split(" ").forEach((item)=>{
                this.initPageCount++;
                //路由传参时，path与query连用、name与param连用
                this.router.replace({
                    name: item,
                    params:{
                        
                    }
                })
            })
        }

    },
    computed: {
        current(){
            return this.$store.state.current;
        },
        worktabs(){
            return this.$store.state.list;
        },
        contentHeight(){
            let contentHeight = 100
            let h = this.$store.state.screenHeight;
            let w = this.$store.state.screenWidth;
            if (this.initCompleted) {
                let tabH = this.$refs.tabs.$el.offsetHeight
                contentHeight = h - 60 - tabH
                this.$store.commit("contentHeight", contentHeight)
            }
            return contentHeight + "px"
        },
        //需要keep-alive缓存的组件名称（需要缓存的组件放在store中），存的是组件的name值，不是router的name值
        cachePage(){
            let cachePage = [];//存放组件的name值的数组
            if(this.$store.state.list){//用foeEach的时候，必须要判断一下是否存在，否则会报错
                this.$store.state.list.forEach((element) => {
                    cachePage.push(element.name)
                })
            }
            return cachePage;
        }
    },
    methods: {
        removeTab(targetName){
            console.log(targetName);
        },
        clickTab(tab){
            console.log(tab);
        },
        TabRefresh(t){
            this.excludeList = [t.name];//不缓存当前要刷新的组件，即重新加载
            this.showRouterView = false;//通过控制showRouterView的true或者false来进行缓存组件的是否重新加载
            this.$nextTick(function () {
                this.showRouterView = true;//还原showRouterView的值
                this.$nextTick(function () {
                    this.excludeList = [];//还原excludeList的值
                })
            })
        },
    }
};
</script>

<style scoped lang="less">

    .work-tab{
        overflow: hidden;
        background-color: #0a1c41;
    }

    /deep/.el-tabs--card>.el-tabs__header{
        background-color: #0a1c41;
        border-bottom: 2px solid #163168;
        margin: 0px;
    }

    /deep/.el-tabs__item{
        color: #9d9ea1;
    }

    /deep/.el-tabs__item:hover{
        color: #b1d4e9;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__item{
        border-left: 5px solid #0a1c41;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__nav{
        background-color: #163168;
        border: 2px solid #0a1c41;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        border-bottom-color: #ffffff;
    }

    /deep/.el-tabs__item.is-active{
        color: #ffffff;
    }

    /*tab页签名字最长200，超出显示省略号*/
    .tab_zdy_wrap{
        width: fit-content;//自适应内部元素
        max-width: 150px;
        display: inline-flex;
    }

    .tab_zdy{
        width: 100%;
        white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;//允许在单词内换行
    }

    .work-tab-content{
        overflow-x: auto;//如果水平溢出元素内容区域的话，则对内容进行裁剪（添加滚动）
        overflow-y: auto;
        background-color: #021c41;
    }

</style>
