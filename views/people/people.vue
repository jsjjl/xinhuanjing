<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>
<style>
.ivu-table .err {
    background-color: #f60;
    color: red;
}
</style>


<template>
    <div>
        <Row>
           
            <Col span="24" class="padding-left-10">
                <Card>
                    <div class="">
                        <can-edit-table refs="table1" v-model="tableData" :columns-list="columnsList"></can-edit-table>
                    </div>
                </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
import canEditTable from '../main-components/canEditTable.vue';
import tableData from './js/people.js';
import Cookies from 'js-cookie';


//引入axios
import axios from 'axios';

var u=window.u||{};
u.isArray=function(o) {
  return typeof o=='object'&&Object.prototype.toString.call(o).slice(8,-1).toLowerCase()=='array';
};
/**
 * 对json数据按照一定规则进行排列
 * @param  {array} array [需要排序的数组]
 * @param  {string} type  [排序时所依据的字段]
 * @param  {boolean} asc   [可选参数，默认降序，设置为true即为升序]
 * @return {none}       [无返回值]
 */
u.sort=function(array,type,asc) {
  if(!u.isArray(array)) throw new Error('第一个参数必须是数组类型');
  var asc=asc||false;
  array.sort(function(a,b) {
    if(!asc) {
      return parseFloat(b[type])-parseFloat(a[type]);
    } else {
      return parseFloat(a[type])-parseFloat(b[type]);
    }
  });
};



export default {
    name: 'editable-table',
    components: {
        canEditTable
    },
    data () {
        return {
            columnsList: [],
            tableData: []
        };
    },
    methods: {
        getData () {
            this.columnsList = tableData.table1Columns;

            //this.tableData = [{account:"",step:"数据加载中",heart:""}];
                // axios.get('http://xhj.icecn.net/xhjapi/listStaff').then((res) => {

                     var aa =Cookies.get('user_id');
                 console.log("cookies_user_id:",aa);
                 axios.get('http://xhj.icecn.net/xhjapi/listStaff?session_id='+aa).then((res) => {

                    var k=res.data.list;
                    var json = [];
                    for(var i=0;i<k.length;i++){
                                var j = {};
                                j.account = k[i].account;
                                j.step = k[i].step;
                                j.heart = k[i].heart;
                                j.company = k[i].company;
                                j.report_time = k[i].report_str;
                                j.off_minute = k[i].off_minute;
                                
                                json.push(j);
                    }
                        u.sort(json,'step');

                        // 上面两个请求都完成后，才执行这个回调方法
                        //json = json.parseJSON();
                        console.log(json);
                        this.tableData = json;
                });

           
            
        }
    },
    created () {
        this.getData();
    }
};
</script>
