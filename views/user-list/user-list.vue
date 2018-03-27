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
                       
                     <Select v-model="model1" style="width:150px;text-align: left;">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                     <Button type="primary" @click="handleSearch3" >搜索</Button>
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
   
                    </div>
                    <div class="" style=" margin-bottom: 20px;">
                        <can-edit-table refs="table1" v-model="tableData" :columns-list="columnsList"  @on-delete="handleDel" ></can-edit-table>
                    </div>
                   
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


export default {
    name: 'editable-table',
    components: {
        canEditTable
    },
    data () {
        return {
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
            modal1: false,
            columnsList: [{
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
],
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
        handleChange(page) {
            this.pageList.splice(0, this.pageList.length);
            this.pageList=this.list.slice((page - 1) * 9,page * 9);
        },
            ok () {
                 axios.get('http://xhj.icecn.net/xhjapi/insertUser', {  
                    params : { //请求参数  
                        date : s1,
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
                // alert(id)
                
                
                // console.log(this.tableData[index]);
            
            },
            remove (index) {
                 let self = this;
                 this.$Modal.confirm({
                    title: '用户信息',
                    content: `是否删除此记录`,
                    onOk: function(){
                        this.$Loading.start();
                        let para = {id: index}
                         removeUser(para).then((res)=> {
                            self.mockTableData();
                      });
                    }
                })
            },
        getData () {
            // this.columnsList = tableData.table1Columns;

            //this.tableData = [{account:"",step:"数据加载中",heart:""}];
                axios.get('http://xhj.icecn.net/xhjapi/listUser?date='+s1).then((res) => {

                    var k=res.data.list;
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
            
            var xm =this.model1;
            

                axios.get('http://xhj.icecn.net/xhjapi/listUser?date'+s1+'&company='+xm).then((res) => {

                    var k=res.data.list;
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