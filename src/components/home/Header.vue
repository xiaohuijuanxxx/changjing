<template>
    <div class="header clearfix" >
        <div class="header-logo">
            <h1>
                <i class="el-icon-s-platform" style="padding-right:10px"></i>
                场景云平台系统
            </h1>
        </div>
        <div class="header-rool"></div>
        <div class="header-right">
            <i class="el-icon-s-custom commonM"></i>
            <span class="commonM">sysadmin</span>
            <span class="talls"></span>
            <i class="el-icon-switch-button cursor-pointer" @click="logout"></i>
        </div>
    </div>
</template>

<script>
export default {
    name:'Header',
    components:{},
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        logout(){
            this.$confirm('您确定要退出登录吗','提示',{
                comfirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning',
            }).then(()=>{
                this.$router.replace({path:"/login"})
            })
        },
    }
};
</script>

<style scoped lang="less">
    .clearfix:after {//解决让父元素包含浮动子元素
        content: " ";
        display: block;
        clear: both;
    }

    .header{
        width: 100%;
        background: #003168;

        .header-logo{
            float: left;
            margin-left: 20px;
            width: 300px;
            color: #fff;
        }

        .header-rool {
            float: left;
            margin-left: 100px;
            width: 500px;
            font-size: 16px;
            color: #fff;
            line-height: 70px;

            span {
                margin: 0 20px;
            }
        }
        
        .header-right{

            @commonRight: 10px;

            float: right;
            color: #fff;
            line-height: 70px;
            margin-right: 20px;
            font-size: 18px;

            .commonM{
                margin-right: @commonRight;
            }

            .talls{
                width: 2px;
                height: 18px;
                display: inline-block;
                background-color: #8a8993;
                border-radius: 5px;
                .commonM();
            }

            .cursor-pointer{
                cursor: pointer;
            }
        }
    }
</style>
