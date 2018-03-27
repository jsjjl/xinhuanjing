<style lang="less">
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>  
        <Row>
          
            <Col span="24" class="padding-left-10">
            
                <Card>
                    <div style="margin:5px 0 20px;text-align: right;"> 
                        <DatePicker type="date" placeholder="选择日期" style="width: 200px" v-model="model2"></DatePicker>
                     <Select v-model="model1" style="width:150px;text-align: left;">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                     <Button type="primary" @click="handleSearch3" >搜索</Button>
                    </div>
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
import tableData from './js/history.js';
import Cookies from 'js-cookie';

var day1 = new Date();
day1.setTime(day1.getTime()-24*60*60*1000);
var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();

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
            tableData: [],
            cityList: [
                    // {
                    //     value: 'New York',
                    //     label: 'New York'
                    // },
                    // {
                    //     value: 'London',
                    //     label: 'London'
                    // }
                ],
                model1: ''
        };
    },
    methods: {
        getData () {
            this.columnsList = tableData.table1Columns;

            //this.tableData = [{account:"",step:"数据加载中",heart:""}];
                axios.get('http://xhj.icecn.net/xhjapi/listStep?date='+s1).then((res) => {

                    var k=res.data.list;
                    var json = [];
                    for(var i=0;i<k.length;i++){
                                var j = {};
                                j.account = k[i].account;
                                j.add_str = k[i].add_str;
                                j.login_name = k[i].login_name;
                                j.step = k[i].step;
                                j.heart = k[i].heart;
                                json.push(j);
                    }
                        u.sort(json,'step');

                        // 上面两个请求都完成后，才执行这个回调方法
                        //json = json.parseJSON();
                        console.log(json);
                        this.tableData = json;
                });
                var aa =Cookies.get('user_id');
                console.log("cookies_user_id:",aa);
                 axios.get('http://xhj.icecn.net/xhjapi/listStaff?session_id='+aa).then((res) => {

                    var k=res.data.list;
                    var json = [];
                    for(var i=0;i<k.length;i++){
                                var j = {};
                                j.value = k[i].login_name;
                                j.label = k[i].account;
                                json.push(j);
                    }
                    var a = {};
                    a.value = "";
                    a.label = "选择全部";
                    json.push(a);
                        //u.sort(json,'step');

                        // 上面两个请求都完成后，才执行这个回调方法
                        //json = json.parseJSON();
                        console.log(json);
                        this.cityList = json;
                });
            

           
            
        },handleSearch3 () {
            var  rq="";
            if(this.model2!=""){
            var d = this.model2;
            var rq=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
            }
            var xm =this.model1;
            

                axios.get('http://xhj.icecn.net/xhjapi/listStep?date='+rq+'&login_name='+xm).then((res) => {

                    var k=res.data.list;
                    var json = [];
                    for(var i=0;i<k.length;i++){
                                var j = {};
                                j.account = k[i].account;
                                j.add_str = k[i].add_str;
                                j.login_name = k[i].login_name;
                                j.step = k[i].step;
                                j.heart = k[i].heart;
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
