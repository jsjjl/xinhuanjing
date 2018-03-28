<style lang="less">
    @import '../../styles/common.less';
    @import './work-flow.less';
    @import '../../styles/table.less';
</style>


<template>
    <div>  
        <Row>
          
            <Col span="24" class="padding-left-10">
            
                <Card>
                    <div style="margin:5px 0 20px;text-align: right;"> 
                       <Input v-model="ssxm" placeholder="请输入姓名..." style="width: 150px"></Input>
                       <Input v-model="sszh" placeholder="请输入账号..." style="width: 150px"></Input>
                     <Select v-model="model1" style="width:150px;text-align: left;">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                     <Button type="primary" @click="getData" >搜索</Button>
                      <Button type="primary" style="float:right;margin-left:10px;" @click="modal1 = true" >新增</Button>

                       <Modal
                            v-model="modal1"
                            title="新增"
                            @on-ok="ok"
                            @on-cancel="cancel">
                           

                            <Form :label-width="80">
                                <FormItem label="姓名" >
                                    <Input v-model="account" />
                                </FormItem>
                                <FormItem label="手机号" >
                                    <Input v-model="login_name" />
                                </FormItem>

                                <FormItem label="职位" >
                                    <Select  style="width:100%" v-model="login_type" >
                                        <Option v-for="item in articleStateList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                                    </Select>
                                </FormItem>
                                
                                <FormItem label="身高cm" >
                                    <Input v-model="height" />
                                </FormItem>
                                <FormItem label="体重kg" >
                                    <Input v-model="weight" />
                                </FormItem>
                                <FormItem label="蓝牙名称" >
                                    <Input v-model="blue_name" />
                                </FormItem>

                                <FormItem label="蓝牙地址" >
                                    <Input v-model="blue_address" />
                                </FormItem>

                                <FormItem label="性别" >
                                    <RadioGroup v-model="step.pass">
                                        <Radio :disabled="hasSubmit" label="男"></Radio>
                                        <Radio :disabled="hasSubmit" label="女"></Radio>
                                    </RadioGroup>
                                </FormItem>

                                <FormItem label="负责路段" >
                                    <Input v-model="my_area" />
                                </FormItem>

                                <FormItem label="公司">
                                    <Select  style="width:100%" v-model="company">
                                        <Option v-for="item in companybox" :value="item.value" :key="item.value" >{{ item.value }}</Option>
                                    </Select>
                                </FormItem>
                                
                            </Form>

                        </Modal>






                           <Modal
                            v-model="modal2"
                            title="编辑"
                            @on-ok="ok2"
                            @on-cancel="cancel2">
                           

                            <Form :label-width="80">
                                <FormItem label="姓名" >
                                    <Input v-model="account2" />
                                </FormItem>
                                <FormItem label="手机号" >
                                    <Input v-model="login_name2" />
                                </FormItem>

                                <FormItem label="职位" >
                                    <Select  style="width:100%" v-model="login_type2" >
                                        <Option v-for="item in articleStateList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                                    </Select>
                                </FormItem>
                                
                                <FormItem label="身高cm" >
                                    <Input v-model="height2" />
                                </FormItem>
                                <FormItem label="体重kg" >
                                    <Input v-model="weight2" />
                                </FormItem>
                                <FormItem label="蓝牙名称" >
                                    <Input v-model="blue_name2" />
                                </FormItem>

                                <FormItem label="蓝牙地址" >
                                    <Input v-model="blue_address2" />
                                </FormItem>

                                <FormItem label="性别" >
                                    <RadioGroup v-model="step2.pass">
                                        <Radio :disabled="hasSubmit" label="男"></Radio>
                                        <Radio :disabled="hasSubmit" label="女"></Radio>
                                    </RadioGroup>
                                </FormItem>

                                <FormItem label="负责路段" >
                                    <Input v-model="my_area2" />
                                </FormItem>

                                <FormItem label="公司">
                                    <Select  style="width:100%" v-model="company2">
                                        <Option v-for="item in companybox" :value="item.value" :key="item.value" >{{ item.value }}</Option>
                                    </Select>
                                </FormItem>
                                
                            </Form>

                        </Modal>
   
                    </div>
                    <div class="" style=" margin-bottom: 20px;">
                        <!-- <can-edit-table refs="table1" v-model="tableData" :columns-list="columnsList"  @on-delete="handleDel" ></can-edit-table> -->

                        <Table border :columns="columns7" :data="tableData"></Table>
                    </div>
             
                    <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total   
placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>  

                </Card>
            </Col>
        </Row>

    </div>
</template>



<script>
import canEditTable from '../main-components/canEditTable.vue';
import tableData from './js/user-list.js';
import Cookies from 'js-cookie';


//引入axios
import axios from 'axios';
  var aa =Cookies.get('user_id');
  console.log("cookies_user_id:",aa);


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

var xgid="";

export default {
    name: 'editable-table',
    components: {
        canEditTable
    },
    data () {
        return {
            ssxm:'',
            sszh:'',
            pageTotal: 0,  
            pageNum: 1,  
            pageSize: 10,
                 columns7: [
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
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),

                


                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除'),




                                        // props: {
                                        //      type: 'error',
                                        //      size: 'small'
                                        // },

                // h('Button',  [
                //     h('Poptip', {
                //         props: {
                //             confirm: true,
                //             title: '确定要删除吗！',
                //             width: '150'
                //         },
                //         on: {
                //              'on-ok': function(){
                //                 alert('删除按钮，有效果')
                //             },
                //             'on-cancel': function(){
                //                 alert('取消按钮，有效果')
                //             }
                //         }
                //     }, '删除')
                // ],)





                            ]);
                        }
                    }
                ],
               


            step: {
                pass: '男'
            },
            account:'',
            login_name:'',
            height:'',
            weight:'',
            blue_name:'',
            blue_address:'',
            my_area:'',
            companybox:[{value: '士明'}, {value: '馨靓'},  {value: '守利'},  {value: '冉然'},  {value: '彦宇'}],



             step2: {
                pass: '男'
            },
            account2:'',
            login_name2:'',
            height2:'',
            weight2:'',
            blue_name2:'',
            blue_address2:'',
            my_area2:'',
            company2:'',



            modal1: false,
             modal2: false,
          
            sexbox:[{value: '男'}, {value: '女'}, ],
            articleStateList: [{value: '果壳箱收集工'}, {value: '管理员'}, {value: '道路保洁工'}, {value: '果壳箱冲洗工'}, {value: '道路垃圾收集工'}],
            tableData: [],
            cityList: [
                    {
                        value: '士明',
                        label: '士明'
                    },{
                        value: '馨靓',
                        label: '馨靓'
                    },{
                        value: '守利',
                        label: '守利'
                    },{
                        value: '冉然',
                        label: '冉然'
                    },{
                        value: '彦宇',
                        label: '彦宇'
                    },{
                        value: '',
                        label: '全部'
                    }
                ],
                model1: ''
        };
    },
    methods: {

           show (index) {

                
                 var aid =this.tableData[index].userid;
xgid = this.tableData[index].userid;
                axios.get('http://xhj.icecn.net/xhjapi/idStaff?session_id='+aa+'&id='+aid).then((res) => {

                        var k=res.data;
                        var vm = this;
                

                        vm.account2=k.account;
                        vm.login_name2=k.login_name;
                        vm.login_type2=k.login_type;
                        vm.height2=k.height;
                        vm.weight2=k.weight;
                        vm.blue_name2=k.blue_name;
                        vm.blue_address2=k.blue_address;
                        vm.step2.pass=k.sex;
                        vm.my_area2=k.my_area;
                        vm.company2=k.company;

                        vm.modal2=true;

                    
                });


            },
            ok2 () {

                 axios.get('http://xhj.icecn.net/xhjapi/updateUser', {  
                    params : { //请求参数
                        id:xgid,
                        session_id : aa,
                        account : this.account2,
                        login_name : this.login_name2,
                        login_type : this.login_type2,
                        height : this.height2,
                        weight : this.weight2,
                        blue_name : this.blue_name2,
                        blue_address : this.blue_address2,
                        sex : this.step2.pass,
                        my_area : this.my_area2,
                        company : this.company2
                    }  
                })
                 .then((res) => {
                    console.log(res.data);
                    this.$Message.info('修改成功');
                    this.getData();
                });
                
            },
            cancel2 () {
                // this.$Message.info('Clicked cancel');
            },

            //删除
            remove (index) {
                var aid =this.tableData[index].userid;
                axios.get('http://xhj.icecn.net/xhjapi/deleteUser', {  
                    params : { //请求参数  
                        id : aid,
                    }  
                }).then((res) => {
                   this.tableData.splice(index, 1);
                });   
            },
            
           handlePage(value) {  
            this.pageNum = value  
            this.getData()  
            },  
            handlePageSize(value) {  
            this.pageSize = value  
            this.getData()  
            },
            ok () {
                 axios.get('http://xhj.icecn.net/xhjapi/insertUser', {  
                    params : { //请求参数  
                        session_id : aa,
                        account : this.account,
                        login_name : this.login_name,
                        login_type : this.login_type,
                        height : this.height,
                        weight : this.weight,
                        blue_name : this.blue_name,
                        blue_address : this.blue_address,
                        sex : this.step.pass,
                        my_area : this.my_area,
                        company : this.company
                    }  
                })
                 .then((res) => {
                    console.log(res.data);
                    this.$Message.info('添加成功');
                    this.getData();
                });
            },
            cancel () {
                // this.$Message.info('Clicked cancel');
            },
            handleDel (val, index, key) {

                
                console.log("删除的id:",this.tableData[index].account);
            
            },
       
        getData () {
            // this.columnsList = tableData.table1Columns;

            //this.tableData = [{account:"",step:"数据加载中",heart:""}];

            var xm =this.model1;
            var ssxm =this.ssxm;
            var sszh =this.sszh;
                axios.get('http://xhj.icecn.net/xhjapi/listUser?session_id='+aa+'&company='+xm+'&account='+ssxm+'&login_name='+sszh+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize).then((res) => {

                    var k=res.data.list;
                    var vm = this;

                    vm.pageTotal = parseInt(res.data.total); 
                    var json = [];
                    for(var i=0;i<k.length;i++){
                                var j = {};
                                j.account = k[i].account;
                                j.login_name = k[i].login_name;
                                j.login_type = k[i].login_type;
                                j.height = k[i].height;
                                j.weight = k[i].weight;
                                j.blue_name = k[i].blue_name;
                                j.blue_address = k[i].blue_address;
                                j.sex = k[i].sex;
                                j.my_area = k[i].my_area;
                                j.userid = k[i].id;
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
                
            

           
            
        },handleSearch3 () {
            
            
            console.log('http://xhj.icecn.net/xhjapi/listUser?session_id='+aa+'&company='+xm+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize);
                axios.get('http://xhj.icecn.net/xhjapi/listUser?session_id='+aa+'&company='+xm+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize).then((res) => {

                    var k=res.data.list;
                    var vm = this;

                    vm.pageTotal = parseInt(res.data.total); 
                    var json = [];
                    for(var i=0;i<k.length;i++){
                                var j = {};
                                j.account = k[i].account;
                                j.login_name = k[i].login_name;
                                j.login_type = k[i].login_type;
                                j.height = k[i].height;
                                j.weight = k[i].weight;
                                j.blue_name = k[i].blue_name;
                                j.blue_address = k[i].blue_address;
                                j.sex = k[i].sex;
                                j.my_area = k[i].my_area;
                                j.userid = k[i].id;
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