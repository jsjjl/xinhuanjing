<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">智能井盖管理平台</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

//引入axios
import axios from 'axios';

export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () { 
           //请求方法，根据实际情况使用  http://xhj.icecn.net/xhjapi/login?login_name=13916026044&passwd=123456
           
               
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    

                    axios.get('http://xhj.icecn.net/xhjapi/login?login_name='+this.form.userName+'&passwd='+this.form.password).then((res) => {
                        if(res.data.state != "0"){
                            this.$Message.error(res.data.msg);
                           return;
                        } else {

                            //res 为成功回调的响应
                           console.log(res.data);
                           Cookies.set('user', this.form.userName);
                           Cookies.set('user_id', res.data.id);
                           Cookies.set('password', this.form.password);
                            this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                           if (this.form.userName === 'admin') {
                               Cookies.set('access', 0);
                           } else {
                               Cookies.set('access', 1);
                           }
                           this.$router.push({
                               name: 'map1'
                           });
                            
                        }

                   
                    });   

                   
                }
            });
        }
    }
};
</script>

<style>

</style>
