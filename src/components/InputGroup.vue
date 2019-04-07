<template>
	<div class="text_group">
		<div class="input_group" :class="{'is-invalid': error}">
			<!-- 输入框 -->
			<input 
				:type="type"
				:placeholder="placeholder"
				:value="value"
				:name="name"
				@input="$emit('input',$event.target.value)"
			>
			<!-- 输入框后面的内容 -->
			<button v-if="btnTitle" @click="$emit('btnClick')" :disabled="disabled">{{btnTitle}}</button>
		</div>
		<!-- 验证提示 -->
		<div v-if="error" class="invalid-feedback">{{error}}</div>
	</div>
</template>
<script>
	export default {
		name:"inputGroup",
		props:{
			type: {
				type: String,
				default: "text"
			},
			placeholder:String,
			value:String,
			name:String,
			disabled:Boolean,
			btnTitle:String,  //input框中的文字
			error:String  //验证不正确
		}
	}
</script>
<style scoped>
.input_group {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input_group input {
  height: 100%;
	width: 60%;
	font-size: 14px;
	outline: none;
	border: none;
}
.input_group button {
  border: none;
  outline: none;
  background: #fff;
}
.input_group button[disabled] {
  color: #aaa;
}
.is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
}
</style>