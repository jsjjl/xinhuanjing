export const table1Columns = [{
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
    title: '手机号',
    align: 'center',
    key: 'login_name',
    editable: true
},
{
    title: '职位',
    align: 'center',
    key: 'login_type'
},
{
    title: '身高',
    align: 'center',
    key: 'height',
    editable: true
},
{
    title: '体重',
    align: 'center',
    key: 'weight',
    editable: true
},
{
    title: '蓝牙名称',
    align: 'center',
    key: 'blue_name',
    editable: true
},
{
    title: '蓝牙地址',
    align: 'center',
    key: 'blue_address',
    editable: true
},
{
    title: '性别',
    align: 'center',
    key: 'sex',
    editable: true
},
{
    title: '负责路段',
    align: 'center',
    key: 'my_area',
    editable: true
},

{
    title: '操作',
    align: 'center',
    width: 190,
    key: 'userid',
    handle: ['edit', 'delete']

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