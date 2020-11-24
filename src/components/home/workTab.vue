<template>
    <div class="work-tab">
        <!-- :closable="tag.name !== 'mainPage'" -->
        <el-tabs v-model="activeTab" type="card"  @tab-remove="removeTab" @tab-click="clickTab" ref="tabs">
          <el-tab-pane v-for="t in worktabs" 
          :key="t.name" 
          :label="t.tabname" 
          :name="t.name"
          :closable="!isInit(t.name)"
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
                <!-- router-view写在组件要渲染的地方，组件就是router中的component -->
                <router-view ref="content" v-if="showRouterView"></router-view>
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
            oldname:'',//存放当前tab页name的中间变量
            rightActiveTab:'',//设置一个变量存储右键tab的name
            initCompleted: false,/* 用来判断dom是否加载完成，第一次进computed的时候dom是没有加载完成的 
            可以用console.log验证，当dom加载完成之后会走mounted，这时候this.$refs才有值，重新计算contentHeight属性*/
            excludeList: [],//不缓存组件存放的数组
            hasInitPage: false,//是否已经初始化页面
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
        /* this.$store.commit("initList"); */
        this.$store.state.list = [];
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
                //设置一个变量存储当前tab的name
                _that.rightActiveTab = currentTab.name;
                //要插入的dom
                let $wrapper = $('<div class="worktab-rightmenu-wrapper"><div class="worktab-menu"><ul></ul></div></div>')
                //append() 方法在被选元素的结尾插入指定内容。
                $('body').append($wrapper)
                let li = ''
                _that.popItems.forEach((item, i) => {
                    //如果是首页则不显示关闭当前选项
                    if (_that.isInit(currentTab.name) && i == 0) {
                        //li += '<li class="is-disabled">'+ item.txt +'</li>'
                    } else {
                        li += '<li data-id="' + item.id + '">' + item.txt + '</li>'
                    }
                })
                let $li = $(li)

                $wrapper.find('ul').append($li)
                //点击li事件
                $wrapper.find('ul li').on('click', function () {
                    let id = $(this).data("id")
                    //将打开的所有tabs放到一个数组里面
                    let temp = [].concat(_that.worktabs)
                    //关闭当前页
                    if (id === 'current') {
                        if (!_that.isInit(currentTab.name)) {
                            _that.removeTab(currentTab.name)
                        }
                        
                    } else if (id === 'others') {//关闭其他
                        temp.forEach((item, i) => {
                            //如果不是首页和当前页则关闭
                            if (!_that.isInit(item.name) && i !== currentTabIndex) {
                                _that.$store.dispatch("worktabRemove", item.name)
                            }
                        })
                        _that.$router.push({
                            name: currentTab.name
                        })
                        
                    } else {//关闭所有
                        temp.forEach((item, i) => {
                            if (!_that.isInit(item.name)) {
                                //关闭所有
                                _that.$store.dispatch("worktabRemove", item.name)
                            }
                        })
                        if (_that.hasInitPage) {//mainPage初始化完毕，则重新加载
                            _that.$router.push({
                                name: _that.worktabs[0].name,
                                params: _that.worktabs[0].params
                            })
                        } else {//否则返回/index路由
                            _that.$router.push("/")
                        }
                    }
                })
                //为worktab-menu添加样式，使他出现在这个tab的正下方
                $wrapper.find('.worktab-menu').css({
                    'top': $(this).offset().top + $(this).height() + 'px',
                    "left": $(this).offset().left + "px"
                })

                //点击执行关闭当前、关闭其他、关闭所有之一后，移除这个右键菜单
                $wrapper.on('click', function (e) {
                    $(this).remove()
                    //恢复右键显示菜单的功能，因为开始时false
                    //oncontextmenu 事件在元素中用户右击鼠标时触发。
                    setTimeout(() => {
                        document.body.oncontextmenu = null;
                    }, 300)
                });
            }
        })

        //打开初始页面
        if(this.initPage){
            this.hasInitPage = true;
            this.$router.replace('/');
            this.initPage.split(" ").forEach((item)=>{
                this.initPageCount++;
                //路由传参时，path与query连用、name与param连用
                this.$router.replace({
                    name: item,
                    params:{}
                })
            })
            //传入的初始页面initPage为mainPage, 如果当前打开的tab页签不为mainPage, 则初始化当前tab
            if(this.initPage != this.oldName){
                this.$router.push({
                    name: this.oldName,
                    params: {
                        /* moduleName: this.id */
                    }
                })
            }
        }
        //通过事件关闭tab，别的组件调用这个事件来关闭tab
        //this.$bus.$on用于监听（接收）总线事件
        this.$bus.$on("closeTab", function(val){
            _that.removeTab(val);
        })
        //通过事件刷新tab
        this.$bus.$on("refreshTab", function(val){
            _that.TabRefresh(val)
        })


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
        //tab标签是否可关闭，设置首页不可关闭
        isInit(name){
            let flag = false;
            if(this.initPage){//如果设置了初始tab
                this.initPage.split(" ").forEach( e => {
                    if(e == name){
                        flag = true;
                    }
                })
            }
            return flag;
        },
        removeTab(name){//关闭tab页
            //如果要删除的tab是当前选中的tab，那么需要删除后，将其他tab作为活跃tab, 程选中状态
            //this.worktabs.length就是store中list的长度，this.initPageCount记录需要初始化的页面数，这个条件是为了约束初始的首页是不能删除的，即最少展示一个tab页
            if(name === this.$store.state.current.name && this.worktabs.length >= this.initPageCount){
                //因为初始页是不能删除的，所以大于1的时候就是存在可删除的tab
                if(this.worktabs.length > this.initPageCount){
                    // 是当前页，返回上一个打开的tab页
                    //this.$router.back();
                    //是当前页，则删除后将最后一个tab作为活跃选中页
                    let nowWorktabs = this.worktabs;
                    for(let i=0; i<nowWorktabs.length; i++){
                        if(nowWorktabs[i].name == name){
                            //如果要删除的不是最后一个tab那么将他的后一个tab作为活跃选中tab
                            if(nowWorktabs[i+1]){
                                this.$router.push({
                                    name: nowWorktabs[i+1].name,
                                    params: nowWorktabs[i+1].params,
                                })
                            }//如果要删除的tab是最后一个tab，那么将他的前一个tab作为活跃选中tab
                            else if(nowWorktabs[i-1]){
                                this.$router.push({
                                    name: nowWorktabs[i-1].name,
                                    params: nowWorktabs[i-1].params,
                                })
                            }
                            break;
                        }
                    }
                }else {//因为大条件是>= 不是大于那么就是= 所以这种情况是只剩下初始的tab页的时候
                    if (this.hasInitPage) {//如果页面初始化完毕（mainPage）
                        this.$router.push({
                            name: this.worktabs[0].name,
                            params: this.worktabs[0].params,
                        })
                    } else {
                        this.$router.push({path:"/"})
                    }
                }
            }
            //如果要删除的tab不是当前tab，则直接删除即可，活跃的tab还是活跃选中状态
            this.$store.dispatch('worktabRemove',name)
        },
        clickTab(tab){
            //回到函数为被选中的tab实例
            console.log(tab);
            this.$router.push({
                /* name:this.worktabs[tab.index].leafName, */
                name: tab.name,
                params: this.worktabs[tab.index].params,
            })
            //跳转路由之所以会改变current是因为路由跳转要经过路由拦截器filter,走vuex的action，最后到worktabRoute中改变current
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

<style lang="less">

    .work-tab{
        overflow: hidden;
        background-color: #0a1c41;
    }

    .work-tab .el-tabs--card > .el-tabs__header{
        background-color: #0a1c41;
        border-bottom: 2px solid #163168;
        margin: 0px;
    }

    .work-tab > .el-tabs--card > .el-tabs__header .el-tabs__item{
        color: #9d9ea1;
    }

    .work-tab > .el-tabs--card > .el-tabs__header .el-tabs__item:hover{
        color: #b1d4e9;
    }

    .work-tab > .el-tabs--card >.el-tabs__header .el-tabs__item{
        border-left: 5px solid #0a1c41;
    }

    .work-tab > .el-tabs--card >.el-tabs__header .el-tabs__nav{
        background-color: #163168;
        border: 2px solid #0a1c41;
    }

    .work-tab > .el-tabs--card >.el-tabs__header .el-tabs__item.is-active{
        border-bottom-color:#163168;
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

    .work-tab > .work-tab-content{
        overflow-x: auto;//如果水平溢出元素内容区域的话，则对内容进行裁剪（添加滚动）
        overflow-y: auto;
        background-color: #021c41;
        position: relative;
    }

    .worktab-rightmenu-wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
    }

    .worktab-menu {
        width: 100px;
        position: absolute;
        z-index: 10;

        background-color: #fff;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }

    .worktab-menu > ul {
        margin: auto;
        padding: 0px;
    }

    .worktab-menu ul li {
        list-style: none;
        line-height: 36px;
        padding: 0 20px;
        margin: 0;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        outline: none;
    }

    .worktab-menu ul li:hover {
        background-color: #ecf5ff;
        color: #66b1ff;
    }

    .worktab-menu ul li span {
        display: inline-block;
    }

    .worktab-menu ul li span:first-child {
        margin-right: 5px;
    }

    .worktab-menu ul li.is-disabled {
        cursor: not-allowed;
    }

</style>
