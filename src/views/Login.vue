<template>
	<div class="login">
		<div class="logo">
			<img src="../assets/logo.jpg" alt="">
		</div>
		<!-- 手机号 -->
		<InputGroup 
			type="number" 
			placeholder="手机号"
			v-model="phone"
			:btnTitle="btnTitle"
			:disabled="disabled"
			:error="errors.phone"
			@btnClick="getVerifyCode"
		/>
		<!-- 输入验证码 -->
		<InputGroup 
			type="number" 
			v-model="verifyCode"
			placeholder="验证码"
			:error="errors.code"
		/>
		<!-- 用户服务协议 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
		<!-- 登录按钮 -->
    <div class="login_btn">
      <button @click="handleLogin" :disabled="isClick">登录</button>
    </div>
	</div>
</template>
<script>
	import InputGroup from '../components/InputGroup'
	export default {
		name:"login",
		data() {
			return {
				phone:"", //手机号
				verifyCode:"", //验证码
				btnTitle:"获取验证码",
				disabled:false,  
				errors:{}, //验证提示信息
			}
		},
		computed: {
			//手机号和验证码都不能为空
			isClick(){
				if(!this.phone || !this.verifyCode) {
					return true
				} else {
					return false
				}
				
			}
		},
		methods: {
			getVerifyCode(){
				//获取验证码
				if(this.validatePhone()) {
					this.validateBtn()
					//发送网络请求
					this.$axios.post('/api/posts/sms_send',{
						tpl_id: "", //填写自己的 聚合数据
            key: "", //填写自己的  聚合数据
						phone:this.phone
					}).then(res => {
						console.log(res)
					})
				}
			},
			validateBtn(){
				//倒计时
				let time = 60;
				let timer = setInterval(() => {
					if(time == 0) {
						clearInterval(timer);
						this.disabled = false;
						this.btnTitle = "获取验证码";
					} else {
						this.btnTitle =time + '秒后重试';
						this.disabled = true;
						time--
					}
				},1000)
			},
			validatePhone(){
				//判断输入的手机号是否合法
				if(!this.phone) {
					this.errors = {
						phone:"手机号码不能为空"
					}
					// return false
				} else if(!/^1[345678]\d{9}$/.test(this.phone)) {
					this.errors = {
						phone:"请输入正确是手机号"
					}
					// return false
				} else {
					this.errors ={}
					return true
				}
			},
			handleLogin() {
				//点击发送
				this.errors = {};
				this.$axios.post('/api/posts/sms_back',{
					phone:this.phone,
					code:this.verifyCode
				}).then(res => {
					console.log(res);
					localStorage.setItem('ele_login',true)
					this.$router.push('/')
				}).catch(error =>{
					//返回错误信息
					this.errors ={
						code:error.response.data.msg
					}
				})
			}
		},
		components:{
			InputGroup
		}
	}
</script>
<style scoped>
	.login {
		width: 100%;
		height: 100%;
		padding: 30px;
		box-sizing: border-box;
		background-color: white;
		overflow: hidden;
	}
	.logo {
		text-align: center;
	}
	.logo img {
		width: 150px
	}
	.text_group,
	.login_des,
	.login_btn {
		margin-top: 20px;
	}
	.login_des span{
		color: #4d90fe;
	}
	.login_btn button {
		width: 100%;
		height: 40px;
		background-color: #48ca38;
		border-radius: 4px;
		color: white;
		font-size: 14px;
		border:none;
		outline: none;
	}
	.login_btn button[disabled] {
		background-color: #8bda81;
	}
</style>
