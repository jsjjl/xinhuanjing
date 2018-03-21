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
                                <Checkbox label="环卫工"></Checkbox>
                                <Checkbox label="垃圾桶"></Checkbox>
                                <Checkbox label="公共厕所/垃圾压缩站"></Checkbox>
                            </CheckboxGroup>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>总共人数：</span><em>{{ zong }}人</em>&nbsp;&nbsp;&nbsp;&nbsp;<span>在线人数：<em>{{ zai }}人</em></span>
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
                fruit: ['环卫工','垃圾桶','公共厕所/垃圾压缩站'],
                zong:""
            }
        },
        methods:{

            checkGroupChange: function (val){
                console.log(val)
                
                if(val == "环卫工"){
                    

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

                                            axios.get('http://xhj.icecn.net/xhjapi/listStaff').then((res) => {
                                                var ka=res.data.list;
                                                 zai = 0;
                                                for(let a=0;a<ka.length;a++){
                                                    if(ka[a].latitude){
                                                        zai = zai + 1;
                                                        //创建
                                                        window["pta"+a] = new BMap.Point(ka[a].longitude, ka[a].latitude);
                                                        if(ka[a].alarm == 1){ 
                                                            var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ryyc.png", new BMap.Size(28,32));
                                                        }else{
                                                            var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ryzc.png", new BMap.Size(38,38));
                                                        }
                                                    
                                                        window["mka"+a] = new BMap.Marker(window["pta"+a],{icon:myIcon});  // 创建标注
                                                        map.addOverlay(window["mka"+a]);              // 将标注添加到地图中
                                                        console.log(ka[a].picture)
                                                        window["iwa"+a] = new BMap.InfoWindow("<img src='" + ka[a].picture + "' style='width:35px;height:35px;border-radius:35px;margin-top:0px; margin-right:10px;'><span style='margin-top: -42px;display: block;margin-left: 45px;'><em style='color:#9b9b9b;font-style: normal;'>姓名：</em>" + ka[a].account + "</span><br/><span style='margin-top: -22px;display: block;margin-left: 45px;'><em style='color:#9b9b9b;font-style: normal;'>电话：</em>"+ ka[a].phone+ "</span><br/><span style='margin-top: -20px;display: block;margin-left: 0px;'><em style='color:#9b9b9b;font-style: normal;'>地址：</em>" + ka[a].address + "</span><span style='margin-top: -1px;display: block;margin-left: 0px;width:35%;float:left;'><em style='color:#9b9b9b;font-style: normal;'>编号：</em>" + ka[a].id + "</span><span style='margin-top: -1px;display: block;margin-left: 0px;width:65%;float:left;'><em style='color:#9b9b9b;font-style: normal;'>负责区域：</em>"+ ka[a].my_area +"</span><span style='margin-top: -1px;display: block;width:35%;float:left;margin-left: 0px;'><em style='color:#9b9b9b;font-style: normal;'>心率：</em>"+ ka[a].heart + "</span><span style='margin-top: -1px;display: block;width:65%;float:left;margin-left: 0px;'><em style='color:#9b9b9b;font-style: normal;'>步数：</em>"+ ka[a].step, opts );  // 创建信息窗口对象 
                                                        window["mka"+a].addEventListener('click', function() {
                                                                console.log(a+'点击了预设覆盖物1'+window["pta"+a]);
                                                                map.openInfoWindow(window["iwa"+a],window["pta"+a])
                                                        })
                                                    }
                                                    zong = ka.length;
                                                    this.zong = zong;
                                                    this.zai = zai;

                                                    
                                                            
                                                } 
                                                
                                            })
                                            })

                        });



                }else if(val == "垃圾桶"){

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

                                               axios.get('http://xhj.icecn.net/xhjapi/listWc').then((res2) => {


                            var kb=res2.data.list;
                                                for(let b=0;b<kb.length;b++){
                                                    if(kb[b].latitude){
                                                        //创建
                                                        window["ptb"+b] = new BMap.Point(kb[b].longitude, kb[b].latitude);
                                                        if(kb[b].type == "公厕"){ 
                                                            var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/wc.png", new BMap.Size(26,26));
                                                        }else{
                                                            var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ysz.png", new BMap.Size(26,26));
                                                        }
                                                    
                                                        window["mkb"+b]  = new BMap.Marker(window["ptb"+b],{icon:myIcon});  // 创建标注
                                                        map.addOverlay(window["mkb"+b]);              // 将标注添加到地图中

                                                        window["iwb"+b]= new BMap.InfoWindow("地址：" + kb[b].address + "<br/>编号：" + kb[b].name_code + "<br/>管理者姓名：" + kb[b].person + "<br/>管理者电话："+ kb[b].phone, opts);  // 创建信息窗口对象 

                                                        
                                                        window["mkb"+b].addEventListener('click', function() {
                                                                console.log(b+'点击了预设覆盖物3'+window["ptb"+b]);
                                                                map.openInfoWindow(window["iwb"+b],window["ptb"+b])
                                                            })
                                                        
                                                    }
                                                            
                                                }   
                                                   
                                            })

                                            })

                        });
                    
                
                
                }else if(val == "公共厕所/垃圾压缩站"){

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

                                             axios.get('http://xhj.icecn.net/xhjapi/listWc').then((res1) => {
                                                var k=res1.data.list;
                                                for(let i=0;i<k.length;i++){
                                                    if(k[i].latitude){
                                                        //创建
                                                        window["pt"+i] = new BMap.Point(k[i].longitude, k[i].latitude);
                                                        if(k[i].type == "公厕"){ 
                                                            var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/wc.png", new BMap.Size(26,26));
                                                        }else{
                                                            var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ysz.png", new BMap.Size(26,26));
                                                        }
                                                    
                                                        window["mk"+i]  = new BMap.Marker(window["pt"+i],{icon:myIcon});  // 创建标注
                                                        map.addOverlay(window["mk"+i]);              // 将标注添加到地图中

                                                        window["iw"+i]= new BMap.InfoWindow("地址：" + k[i].address + "<br/>编号：" + k[i].id + "<br/>管理者姓名：" + k[i].person + "<br/>管理者电话："+ k[i].phone, opts);  // 创建信息窗口对象 

                                                        
                                                        window["mk"+i].addEventListener('click', function() {
                                                                console.log(i+'点击了预设覆盖物3'+window["pt"+i]);
                                                                map.openInfoWindow(window["iw"+i],window["pt"+i])
                                                            })
                                                        
                                                    }
                                                            
                                                }      
                                            })

                                            })

                        });
                    
                }else if(val.length == "3"){
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

                    axios.get('http://xhj.icecn.net/xhjapi/listStaff').then((res) => {
                        var ka=res.data.list;
                        zai = 0;
                        for(let a=0;a<ka.length;a++){
                            if(ka[a].latitude){
                                zai = zai + 1;
                                   //创建
                                window["pta"+a] = new BMap.Point(ka[a].longitude, ka[a].latitude);
                                if(ka[a].alarm == 1){ 
                                    var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ryyc.png", new BMap.Size(28,32));
                                }else{
                                    var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ryzc.png", new BMap.Size(38,38));
                                }
                               
                                window["mka"+a] = new BMap.Marker(window["pta"+a],{icon:myIcon});  // 创建标注
                                map.addOverlay(window["mka"+a]);              // 将标注添加到地图中
                                console.log(ka[a].picture)
                                window["iwa"+a] = new BMap.InfoWindow("<img src='" + ka[a].picture + "' style='width:35px;height:35px;border-radius:35px;margin-top:0px; margin-right:10px;'><span style='margin-top: -42px;display: block;margin-left: 45px;'><em style='color:#9b9b9b;font-style: normal;'>姓名：</em>" + ka[a].account + "</span><br/><span style='margin-top: -22px;display: block;margin-left: 45px;'><em style='color:#9b9b9b;font-style: normal;'>电话：</em>"+ ka[a].phone+ "</span><br/><span style='margin-top: -20px;display: block;margin-left: 0px;'><em style='color:#9b9b9b;font-style: normal;'>地址：</em>" + ka[a].address + "</span><span style='margin-top: -1px;display: block;margin-left: 0px;width:35%;float:left;'><em style='color:#9b9b9b;font-style: normal;'>编号：</em>" + ka[a].id + "</span><span style='margin-top: -1px;display: block;margin-left: 0px;width:65%;float:left;'><em style='color:#9b9b9b;font-style: normal;'>负责区域：</em>"+ ka[a].my_area +"</span><span style='margin-top: -1px;display: block;width:35%;float:left;margin-left: 0px;'><em style='color:#9b9b9b;font-style: normal;'>心率：</em>"+ ka[a].heart + "</span><span style='margin-top: -1px;display: block;width:65%;float:left;margin-left: 0px;'><em style='color:#9b9b9b;font-style: normal;'>步数：</em>"+ ka[a].step, opts );  // 创建信息窗口对象 
                                window["mka"+a].addEventListener('click', function() {
                                        console.log(a+'点击了预设覆盖物1'+window["pta"+a]);
                                        map.openInfoWindow(window["iwa"+a],window["pta"+a])
                                })
                            }
                            zong = ka.length;
                            this.zong = zong;
                            this.zai = zai;

                            
                                    
                        } 
                         
                    }).then(()=>{


                    axios.get('http://xhj.icecn.net/xhjapi/listTong').then((res1) => {
                        var k=res1.data.list;
                        for(let i=0;i<k.length;i++){
                            if(k[i].latitude){
                                   //创建
                                window["pt"+i] = new BMap.Point(k[i].longitude, k[i].latitude);
                                if(k[i].is_full == "已满"){ 
                                    var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ljtyc.png", new BMap.Size(28,32));
                                }else{
                                    var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ljtzc.png", new BMap.Size(28,32));
                                }
                               
                                window["mk"+i]  = new BMap.Marker(window["pt"+i],{icon:myIcon});  // 创建标注
                                map.addOverlay(window["mk"+i]);              // 将标注添加到地图中

                                window["iw"+i]= new BMap.InfoWindow("地址：" + k[i].address + "<br/>编号：" + k[i].id + "<br/>管理者姓名：" + k[i].person + "<br/>管理者电话："+ k[i].phone, opts);  // 创建信息窗口对象 

                                
                                window["mk"+i].addEventListener('click', function() {
                                        console.log(i+'点击了预设覆盖物2'+window["pt"+i]);
                                        map.openInfoWindow(window["iw"+i],window["pt"+i])
                                    })
                                
                            }
                                    
                        }      
                    });




                        axios.get('http://xhj.icecn.net/xhjapi/listWc').then((res2) => {


                            var kb=res2.data.list;
                                                for(let b=0;b<kb.length;b++){
                                                    if(kb[b].latitude){
                                                        //创建
                                                        window["ptb"+b] = new BMap.Point(kb[b].longitude, kb[b].latitude);
                                                        if(kb[b].type == "公厕"){ 
                                                            var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/wc.png", new BMap.Size(26,26));
                                                        }else{
                                                            var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ysz.png", new BMap.Size(26,26));
                                                        }
                                                    
                                                        window["mkb"+b]  = new BMap.Marker(window["ptb"+b],{icon:myIcon});  // 创建标注
                                                        map.addOverlay(window["mkb"+b]);              // 将标注添加到地图中

                                                        window["iwb"+b]= new BMap.InfoWindow("地址：" + kb[b].address + "<br/>编号：" + kb[b].name_code + "<br/>管理者姓名：" + kb[b].person + "<br/>管理者电话："+ kb[b].phone, opts);  // 创建信息窗口对象 

                                                        
                                                        window["mkb"+b].addEventListener('click', function() {
                                                                console.log(b+'点击了预设覆盖物3'+window["ptb"+b]);
                                                                map.openInfoWindow(window["iwb"+b],window["ptb"+b])
                                                            })
                                                        
                                                    }
                                                            
                                                }   
                                                   
                                            })

                    })



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

                    axios.get('http://xhj.icecn.net/xhjapi/listStaff').then((res) => {
                        var ka=res.data.list;
                        zai = 0;
                        for(let a=0;a<ka.length;a++){
                            if(ka[a].latitude){
                                zai = zai + 1;
                                   //创建
                                window["pta"+a] = new BMap.Point(ka[a].longitude, ka[a].latitude);
                                if(ka[a].alarm == 1){ 
                                    var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ryyc.png", new BMap.Size(28,32));
                                }else{
                                    var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ryzc.png", new BMap.Size(38,38));
                                }
                               
                                window["mka"+a] = new BMap.Marker(window["pta"+a],{icon:myIcon});  // 创建标注
                                map.addOverlay(window["mka"+a]);              // 将标注添加到地图中
                                console.log(ka[a].picture)
                                window["iwa"+a] = new BMap.InfoWindow("<img src='" + ka[a].picture + "' style='width:35px;height:35px;border-radius:35px;margin-top:0px; margin-right:10px;'><span style='margin-top: -42px;display: block;margin-left: 45px;'><em style='color:#9b9b9b;font-style: normal;'>姓名：</em>" + ka[a].account + "</span><br/><span style='margin-top: -22px;display: block;margin-left: 45px;'><em style='color:#9b9b9b;font-style: normal;'>电话：</em>"+ ka[a].phone+ "</span><br/><span style='margin-top: -20px;display: block;margin-left: 0px;'><em style='color:#9b9b9b;font-style: normal;'>地址：</em>" + ka[a].address + "</span><span style='margin-top: -1px;display: block;margin-left: 0px;width:35%;float:left;'><em style='color:#9b9b9b;font-style: normal;'>编号：</em>" + ka[a].id + "</span><span style='margin-top: -1px;display: block;margin-left: 0px;width:65%;float:left;'><em style='color:#9b9b9b;font-style: normal;'>负责区域：</em>"+ ka[a].my_area +"</span><span style='margin-top: -1px;display: block;width:35%;float:left;margin-left: 0px;'><em style='color:#9b9b9b;font-style: normal;'>心率：</em>"+ ka[a].heart + "</span><span style='margin-top: -1px;display: block;width:65%;float:left;margin-left: 0px;'><em style='color:#9b9b9b;font-style: normal;'>步数：</em>"+ ka[a].step, opts );  // 创建信息窗口对象 
                                window["mka"+a].addEventListener('click', function() {
                                        console.log(a+'点击了预设覆盖物1'+window["pta"+a]);
                                        map.openInfoWindow(window["iwa"+a],window["pta"+a])
                                })
                            }
                            zong = ka.length;
                            this.zong = zong;
                            this.zai = zai;




                            
                                    
                        } 
                         
                    }).then(()=>{


                    axios.get('http://xhj.icecn.net/xhjapi/listTong').then((res1) => {
                        var k=res1.data.list;
                        for(let i=0;i<k.length;i++){
                            if(k[i].latitude){
                                   //创建
                                window["pt"+i] = new BMap.Point(k[i].longitude, k[i].latitude);
                                if(k[i].is_full == "已满"){ 
                                    var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ljtyc.png", new BMap.Size(28,32));
                                }else{
                                    var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ljtzc.png", new BMap.Size(28,32));
                                }
                               
                                window["mk"+i]  = new BMap.Marker(window["pt"+i],{icon:myIcon});  // 创建标注
                                map.addOverlay(window["mk"+i]);              // 将标注添加到地图中

                                window["iw"+i]= new BMap.InfoWindow("地址：" + k[i].address + "<br/>编号：" + k[i].id + "<br/>管理者姓名：" + k[i].person + "<br/>管理者电话："+ k[i].phone, opts);  // 创建信息窗口对象 

                                
                                window["mk"+i].addEventListener('click', function() {
                                        console.log(i+'点击了预设覆盖物2'+window["pt"+i]);
                                        map.openInfoWindow(window["iw"+i],window["pt"+i])
                                    })
                                
                            }
                                    
                        }      
                    });




                     axios.get('http://xhj.icecn.net/xhjapi/listWc').then((res2) => {


                            var kb=res2.data.list;
                                                for(let b=0;b<kb.length;b++){
                                                    if(kb[b].latitude){
                                                        //创建
                                                        window["ptb"+b] = new BMap.Point(kb[b].longitude, kb[b].latitude);
                                                        if(kb[b].type == "公厕"){ 
                                                            var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/wc.png", new BMap.Size(26,26));
                                                        }else{
                                                            var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ysz.png", new BMap.Size(26,26));
                                                        }
                                                    
                                                        window["mkb"+b]  = new BMap.Marker(window["ptb"+b],{icon:myIcon});  // 创建标注
                                                        map.addOverlay(window["mkb"+b]);              // 将标注添加到地图中

                                                        window["iwb"+b]= new BMap.InfoWindow("地址：" + kb[b].address + "<br/>编号：" + kb[b].name_code + "<br/>管理者姓名：" + kb[b].person + "<br/>管理者电话："+ kb[b].phone, opts);  // 创建信息窗口对象 

                                                        
                                                        window["mkb"+b].addEventListener('click', function() {
                                                                console.log(b+'点击了预设覆盖物3'+window["ptb"+b]);
                                                                map.openInfoWindow(window["iwb"+b],window["ptb"+b])
                                                            })
                                                        
                                                    }
                                                            
                                                }   
                                                   
                                            })

                    })



            })


         
        })    
    }
    }
</script>
