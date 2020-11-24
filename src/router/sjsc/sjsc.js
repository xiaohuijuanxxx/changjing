export default[
    {
        path: '/carInfoManage',
        name: 'carInfoManage',
        meta: {
            tabname: '车辆信息管理',
        },
        component: ()=> import ('views/sjsc/sjsc01_carInfoManage/carInfoManage')
    },
    {
        path: '/uploadDataManage',
        name: 'uploadDataManage',
        meta: { 
            tabname:'数据上传管理',
        },
        component: ()=> import ('views/sjsc/sjsc02_uploadDataManage/uploadDataManage')
    },
    {
        path: '/uploadStorageMon',
        name: 'uploadStorageMon',
        meta: { 
            tabname:'上传数据统计与存储监控',
        },
        component: ()=> import ('views/sjsc/sjsc03_uploadStorageMon/uploadStorageMon')
    },
    {
        path: '/uploadTaskControl',
        name: 'uploadTaskControl',
        meta: { 
            tabname:'上传任务监控',
        },
        component: ()=> import ('views/sjsc/sjsc04_uploadTaskControl/uploadTaskControl')
    },
]