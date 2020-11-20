/* 封装addRoutes中传入的参数，随机路由 */
export default function(param){
    //如果没有传过来名称则定义一个随机名称、floor函数： 找到小于参数的最大整数
    let tabName = param.tabName || "vue"+Math.floor(Math.random() * 10000);
    let tabNumber = param.tabNumber || "vue"+Math.floor(Math.random() * 10000);
    let component = {
        extends: param.component,
        name: tabNumber
    }
    //设定一个路由地址
    let path = param.tabNumber ? param.tabNumber + tabName : tabName + param.component.name;
    //addRoutes的参数是一个数组，存储自定义的路由信息
    //添加的动态路由是在index中跳转的
    this.$router.addRoutes([{
        path: '/',
        name: 'index',
        //路由懒加载
        component: () => ('views/index'),
        children:[{
            //跳转到一个随机路由后面带有'/:moduleName'
            path: '/' + path + '/:moduleName',
            name: tabNumber,
            mata: {
                tabname: tabName
            },
            components: component
        }]
    }])
    this.$router.push({
        path: '/' + path +'/:moduleName' ,
        /* name:tabNumber, */
        query: Object.assign(param,param.query || {},{moduleName:"worktab_1"}) || {
            moduleName:"worktab_1",
        },
        /* params: Object.assign(param,param.query || {},{moduleName:"worktab_1"}) || {
            moduleName:"worktab_1",
        } */
    })
}