export const table1Columns = [{
        title: '编号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '时间',
        align: 'center',
        key: 'sj',
        editable: true
    },
    {
        title: '地点',
        align: 'center',
        key: 'account',
        editable: true
    },
    {
        title: '投诉来源',
        align: 'center',
        key: 'address',
        editable: true
    },
    {
        title: '负责单位',
        align: 'center',
        key: 'content'
    },
    {
        title: '时限',
        align: 'center',
        key: 'deal',
        editable: true
    },
    {
        title: '详情',
        align: 'center',
        key: 'type',
        editable: true
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