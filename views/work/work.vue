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
                       
                     <Select v-model="model1" style="width:150px;text-align: left;">
                        <Option v-for="item in sx_type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                     <Select v-model="model2" style="width:150px;text-align: left;">
                        <Option v-for="item in sx_deal" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
import tableData from './js/work.js';


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
            sx_type: [
                    {
                        value: '建筑垃圾分拣',
                        label: '建筑垃圾分拣'
                    },
                    {
                        value: '生活垃圾分拣',
                        label: '生活垃圾分拣'
                    },
                    {
                        value: '道路保洁',
                        label: '道路保洁'
                    },
                    {
                        value: '垃圾收集',
                        label: '垃圾收集'
                    },
                    {
                        value: '其他',
                        label: '其他'
                    },
                    {
                        value: '',
                        label: '全部'
                    }
            ],
            sx_deal: [
                    {
                        value: '已处理',
                        label: '已处理'
                    },
                    {
                        value: '待处理',
                        label: '待处理'
                    },
                    {
                        value: '',
                        label: '全部'
                    }
                ],
                model1: ''
        };
    },
    methods: {
        getData () {
            this.columnsList = tableData.table1Columns;

            //this.tableData = [{account:"",step:"数据加载中",heart:""}];
                axios.get('http://xhj.icecn.net/xhjapi/listTask').then((res) => {

                    var k=res.data.list;
                    var json = [];
                    for(var i=0;i<k.length;i++){
                                var j = {};
                                j.account = k[i].account;
                                j.address = k[i].address;
                                j.content = k[i].content;
                                j.deal = k[i].deal;
                                j.type = k[i].type;
                                json.push(j);
                    }
                        u.sort(json,'step');

                        // 上面两个请求都完成后，才执行这个回调方法
                        //json = json.parseJSON();
                        console.log(json);
                        this.tableData = json;
                });

               

               
            

           
            
        },handleSearch3 () {
            
            var sx_type_val =this.model1;
            var sx_deal_val =this.model2;
            var url ='';
            
                if( sx_type_val == '' && sx_deal_val == undefined ){

                    url = 'http://xhj.icecn.net/xhjapi/listTask';
    
                }else if(sx_type_val != '' && sx_deal_val == undefined){
                     url = 'http://xhj.icecn.net/xhjapi/listTask?type='+sx_type_val;
                }
                else
                {
                    url = 'http://xhj.icecn.net/xhjapi/listTask?type='+sx_type_val+'&deal='+sx_deal_val;
                }

              
                axios.get(url).then((res) => {
                

                    var k=res.data.list;
                    var json = [];
                    for(var i=0;i<k.length;i++){
                                var j = {};
                                j.account = k[i].account;
                                j.address = k[i].address;
                                j.content = k[i].content;
                                j.deal = k[i].deal;
                                j.type = k[i].type;
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
