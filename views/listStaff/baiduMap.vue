<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>


<template>
    <div>  
        <Row>
          
            <Col span="24" class="padding-left-10">
                <Card>
                    <div class="">
                        <div style="width:100%; height:750px;"  id="allmap">
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
import {MP} from './components/map.js';
//引入axios
import axios from 'axios';
    export default {
        name:'',
        data () {
            return {
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
                        height: 90,     // 信息窗口高度
                    }

//                     axios.all([

//     axios.get('http://xhj.icecn.net/xhjapi/listStaff'),

//     axios.get('http://xhj.icecn.net/xhjapi/listTong')

//   ])

//   .then(axios.spread(function (userResp, reposResp) {

//     // 上面两个请求都完成后，才执行这个回调方法

//     // console.log('User', userResp.data);

//     // console.log('Repositories', reposResp.data);


//      var k1=userResp.data.list;
//                         for(let a=0;a<k1.length;a++){
//                             if(k1[a].latitude){
//                                    //创建
//                                 window["pt1"+a] = new BMap.Point(k1[a].longitude, k1[a].latitude);
//                                 if(k1[a].alarm == 1){ 
//                                     var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ryyc.png", new BMap.Size(28,32));
//                                 }else{
//                                     var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ryzc.png", new BMap.Size(28,32));
//                                 }
                               
//                                 window["mk1"+a] = new BMap.Marker(window["pt1"+a],{icon:myIcon});  // 创建标注
//                                 map.addOverlay(window["mk1"+a]);              // 将标注添加到地图中

//                                 window["iw1"+a] = new BMap.InfoWindow("姓名：" + k1[a].account + "<br/>地址：" + k1[a].address + "<br/>编号：" + k1[a].id + "<br/>电话："+ k1[a].phone, opts);  // 创建信息窗口对象 
//                                 window["mk1"+a].addEventListener('click', function() {
//                                         console.log('点击了预设覆盖物1'+window["pt1"+a]);
//                                         map.openInfoWindow(window["iw1"+a],window["pt1"+a])
//                                 })
//                             }
                                    
//                         }  


//          var k=reposResp.data.list;
//                         for(let i=0;i<k.length;i++){
//                             if(k[i].latitude){
//                                    //创建
//                                 window["pt"+i] = new BMap.Point(k[i].longitude, k[i].latitude);
//                                 if(k[i].is_full == "已满"){ 
//                                     var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ljtyc.png", new BMap.Size(28,32));
//                                 }else{
//                                     var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ljtzc.png", new BMap.Size(28,32));
//                                 }
                               
//                                 window["mk"+i]  = new BMap.Marker(window["pt"+i],{icon:myIcon});  // 创建标注
//                                 map.addOverlay(window["mk"+i]);              // 将标注添加到地图中

//                                 window["iw"+i]= new BMap.InfoWindow("地址：" + k[i].address + "<br/>编号：" + k[i].id + "<br/>管理者姓名：" + k[i].person + "<br/>管理者电话："+ k[i].phone, opts);  // 创建信息窗口对象 

                                
//                                 window["mk"+i].addEventListener('click', function() {
//                                         console.log('点击了预设覆盖物2'+window["pt"+i]);
//                                         map.openInfoWindow(window["iw"+i],window["pt"+i])
//                                     })
                                
//                             }
                                    
//                         }          

//   }));



                    axios.get('http://xhj.icecn.net/xhjapi/listStaff').then((res) => {
                        var ka=res.data.list;
                        for(let a=0;a<ka.length;a++){
                            if(ka[a].latitude){
                                   //创建
                                window["pta"+a] = new BMap.Point(ka[a].longitude, ka[a].latitude);
                                if(ka[a].alarm == 1){ 
                                    var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ryyc.png", new BMap.Size(28,32));
                                }else{
                                    var myIcon = new BMap.Icon("http://dooodesign.com/dist/src/images/ryzc.png", new BMap.Size(28,32));
                                }
                               
                                window["mka"+a] = new BMap.Marker(window["pta"+a],{icon:myIcon});  // 创建标注
                                map.addOverlay(window["mka"+a]);              // 将标注添加到地图中

                                window["iwa"+a] = new BMap.InfoWindow("姓名：" + ka[a].account + "<br/>地址：" + ka[a].address + "<br/>编号：" + ka[a].id + "<br/>电话："+ ka[a].phone, opts);  // 创建信息窗口对象 
                                window["mka"+a].addEventListener('click', function() {
                                        console.log(a+'点击了预设覆盖物1'+window["pta"+a]);
                                        map.openInfoWindow(window["iwa"+a],window["pta"+a])
                                })
                            }
                                    
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
                    })

                     })



            })  


         
        })    
    }
    }
</script>
