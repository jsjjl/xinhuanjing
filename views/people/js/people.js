export const table1Columns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'account',
        editable: true
    },
    {
        title: '步数',
        align: 'center',
        key: 'step'
    },
    {
        title: '心率',
        align: 'center',
        key: 'heart',
        editable: true
    },
    {
        title: '公司',
        align: 'center',
        key: 'company',
        editable: true
    },
    {
        title: '上报时间',
        align: 'center',
        key: 'report_time',
        render: (h, params) => {
            if(params.row.off_minute >=30 && params.row.report_time == undefined){
                return h('div',{
                    style: {
                        color: 'red',
                    }
                },  '未知');
            }else if(params.row.off_minute >=30 && params.row.report_time != "undefined"){
                return h('div',{
                    style: {
                        color: 'red',
                    }
                },  params.row.report_time);
            }
           else{
            return h('div',params.row.report_time);
            }
        }

    }
];


// export const table1Data = [
//     {
//         name: 'Aresn',
//         step: '55',
//         heart: '90'
//     },
//     {
//         name: 'Lison',
//         step: '20',
//         heart: '100'
//     },
//     {
//         name: 'lisa',
//         step: '9',
//         heart: '98'
//     }
// ];


const tableData = {
    table1Columns: table1Columns,
   // table1Data: table1Data,
    
};

export default tableData;
