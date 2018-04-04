<style lang="less">
    @import '../../../styles/common.less';
</style>


<template>
    <div>  
        <Row>
          
            <Col span="24" class="padding-left-10">
                
                <Card>
                    <div>
                        <div style="margin:0 0 20px 0; font-size:14px;" class="ditu_top">显示：
                            <CheckboxGroup v-model="fruit" style="display:inline-block;font-size:14px;"  @on-change="checkGroupChange">
                                <Checkbox label="维护人员"></Checkbox>
                                <Checkbox label="智能井盖"></Checkbox>
                            </CheckboxGroup>&nbsp;&nbsp;&nbsp;&nbsp;
                              <span>报警设备：</span><em>3个</em>&nbsp;&nbsp;&nbsp;&nbsp;<span>已处理：<em>1个</em></span>
                        </div>


                       


                        <div style="width:100%; height:750px;"  id="allmap">
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>

    </div>
</template>
<style>
    .ditu_top .ivu-checkbox-wrapper{ font-size: 14px !important;}
    .ditu_top em{ font-size: 14px; font-style: normal;}
</style>
<script>
import {MP} from '../src/map.js';
//引入axios
var zong = 0;
var zai = 0;
import axios from 'axios';
    export default {
        name:'',
        data () {
            return {
                fruit: ['维护人员','智能井盖'],
                zong:""
            }
        },
        methods:{

            checkGroupChange: function (val){
                
                if(val == "维护人员"){
                    
                    this.$nextTick(function () {

                        MP("qCRNVGumLaK3e4wyTi6za5UhX99KhjiO").then( BMap => {

                        // 百度地图API功能
                        var map = new BMap.Map("allmap");
                        var point = new BMap.Point(121.364093, 31.251892);
                        map.centerAndZoom(point, 16);

                        // 添加地图类型控件
                        map.addControl(new BMap.MapTypeControl());  
                        // 设置地图显示的城市 此项是必须设置的
                        map.setCurrentCity("上海");    
                        // 开启鼠标滚轮缩放      
                        map.enableScrollWheelZoom(true);
                        
                        var opts = {
                            width : 240,     // 信息窗口宽度
                            height: 120,     // 信息窗口高度
                        }

                        map.addOverlay();  



                        })



                    })  

                }else if(val == "智能井盖"){

                    this.$nextTick(function () {

                        MP("qCRNVGumLaK3e4wyTi6za5UhX99KhjiO").then( BMap => {

                        // 百度地图API功能
                        var map = new BMap.Map("allmap");
                        var point = new BMap.Point(121.364093, 31.251892);
                        map.centerAndZoom(point, 16);

                        // 添加地图类型控件
                        map.addControl(new BMap.MapTypeControl());  
                        // 设置地图显示的城市 此项是必须设置的
                        map.setCurrentCity("上海");    
                        // 开启鼠标滚轮缩放      
                        map.enableScrollWheelZoom(true);
                        
                        var opts = {
                            width : 240,     // 信息窗口宽度
                            height: 120,     // 信息窗口高度
                        }

                        map.addOverlay();  



                        })



                    })  

                }else if(val.length == "2"){
                   
                   this.$nextTick(function () {

                        MP("qCRNVGumLaK3e4wyTi6za5UhX99KhjiO").then( BMap => {

                        // 百度地图API功能
                        var map = new BMap.Map("allmap");
                        var point = new BMap.Point(121.364093, 31.251892);
                        map.centerAndZoom(point, 16);

                        // 添加地图类型控件
                        map.addControl(new BMap.MapTypeControl());  
                        // 设置地图显示的城市 此项是必须设置的
                        map.setCurrentCity("上海");    
                        // 开启鼠标滚轮缩放      
                        map.enableScrollWheelZoom(true);
                        
                        var opts = {
                            width : 240,     // 信息窗口宽度
                            height: 120,     // 信息窗口高度
                        }

                        map.addOverlay();  



                        })



                    })  
                    
                }else{
                   
                    

                    this.$nextTick(function () {

                        MP("qCRNVGumLaK3e4wyTi6za5UhX99KhjiO").then( BMap => {

                        // 百度地图API功能
                        var map = new BMap.Map("allmap");
                        var point = new BMap.Point(121.364093, 31.251892);
                        map.centerAndZoom(point, 16);

                        // 添加地图类型控件
                        map.addControl(new BMap.MapTypeControl());  
                        // 设置地图显示的城市 此项是必须设置的
                        map.setCurrentCity("上海");    
                        // 开启鼠标滚轮缩放      
                        map.enableScrollWheelZoom(true);
                        
                        var opts = {
                            width : 240,     // 信息窗口宽度
                            height: 120,     // 信息窗口高度
                        }

                        map.addOverlay();  



                        })



                    })    








                }
            }
        },
        mounted() {
        
           
                    this.$nextTick(function () {

                        MP("qCRNVGumLaK3e4wyTi6za5UhX99KhjiO").then( BMap => {

                        // 百度地图API功能
                        var map = new BMap.Map("allmap");
                        var point = new BMap.Point(121.364093, 31.251892);
                        map.centerAndZoom(point, 16);

                        // 添加地图类型控件
                        map.addControl(new BMap.MapTypeControl());  
                        // 设置地图显示的城市 此项是必须设置的
                        map.setCurrentCity("上海");    
                        // 开启鼠标滚轮缩放      
                        map.enableScrollWheelZoom(true);
                        
                        var opts = {
                            width : 240,     // 信息窗口宽度
                            height: 120,     // 信息窗口高度
                        }

                        map.addOverlay();  



                        })



                    })    

           
    }
    }
</script>
