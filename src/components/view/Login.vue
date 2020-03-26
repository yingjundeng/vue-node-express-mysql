<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">今日实惠后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名" @keyup.enter.native="Login()">
                        <!-- <el-button slot="prepend" icon="el-icon-lx-people"></el-button> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="Login()">
                        <!-- <el-button slot="prepend" icon="el-icon-lx-lock"></el-button> -->
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="Login()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 中宝互动版权所有</p>
            </el-form>
        </div>
        
    </div>
</template>

<script>
    //import md5 from "md5"
    export default {
        data(){
            return {
                ruleForm: {
                    username: 'sysadmin',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            
        },
        methods: {
            Login(){
            	this.$router.push({ path: '/dashboard' })
            },
//         Login(){
//             
//           if (!this.checkPassWord(this.ruleForm.username) || !this.checkPassWord(this.ruleForm.password)) {
//                 this.$message.error('账号密码为4-16位数字字母组合')
//                  return false
//          }
//          this.$axios.post('/api/login',{
//              username:this.ruleForm.username,
//              password:md5("jrsh"+this.ruleForm.password),
//          })
//          .then(res=>{
//              //开发登录
//              console.log(res)
//              if(res.data.msg === "操作成功"){
//                  sessionStorage.setItem("account",this.ruleForm.username)
//                  sessionStorage.setItem("role",res.data.data.user.username)
//                  sessionStorage.setItem("menu",JSON.stringify(res.data.data.menuList))
//                  sessionStorage.setItem("token",JSON.stringify(res.data.data.menuList[0].children))
//                  var currentRouter =res.data.data.menuList[0].menuList[0].menuPath
//                  this.$router.push({ path: '/home' })
//                  
//              }else{
//                  this.$message({
//			            message: res.data.msg,
//			            type: 'error'
//			          })
//              }
//                               
//          })
//      },
          checkPassWord (str) {
            if (str === null || str.length < 4 || str.length > 16) {
                return false
            } else {
                return true
            }
       },

     //检测是否登录
       isLogin(){
         
       },
            
    }
}
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        /* background-image:url(../../../static/img/bg.jpg);
        background-repeat:no-repeat;
        background-size: 100%; */
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: rgb(255, 255, 255,0.9);
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        text-align: center;
        font-size:12px;
        line-height:30px;
        color:rgb(255,255,255,0.5);
    }
</style>