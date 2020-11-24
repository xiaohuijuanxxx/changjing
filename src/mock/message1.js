import Mock from 'mockjs'
const Random = Mock.Random //获取random对象，随机生成各种数据
const domain = 'http://mockjs.com/api' //定义默认域名，随便写
const code = 200 //返回状态码

//获取消息列表
const message = function(req) {
    let listData=[];
    //获取10条数据，可修改
    for(let i = 0; i<10; i++){
        //定义字段
        let post = { 
            id: i,
            title: Random.csentence(10,25),//随机生成长度为10-25的标题
            "symbol|1-10":"★",
            'age|20-30': 23,
            name: "@cname",//name: Random.cname(), 随机生成名字
            brand:Random.string('upper',5),//随机生成5位大写的字母当做品牌
            'job|1':['前端工程师', '后端工程师', 'UI工程师', '产品经理'],
            number: Random.natural(0,50),//随机生成0-50之间的数字
            time: Random.date() + ' ' + Random.time(),//随机生成年月日+时间
        }
        listData.push(post);
    }
    return {
        //返回状态码和文章数据posts,即返回自定义的数据格式
        code,
        info:{
            records: listData,
        }
    }
}
Mock.mock(`${domain}/message`, /get|post/i, message);//定义请求连接、类型，还有返回数据