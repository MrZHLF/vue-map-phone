<template>
    <div class="header">
        <!-- 左侧 -->
        <div class="header-button is-left" v-show="isLeft">
            <i class="fa fa-chevron-left"></i>
            <button @click="$router.go(-1)">返回</button>
        </div>
        <!-- 中间内容 -->
        <h1 class="header-titile">{{title}}</h1>
    </div>
</template>
<script>
export default{
    name:"header",
    props:{
        title:String,
        isLeft:{
            type:Boolean,
            default:false
        }
    }
}
</script>
<style scoped>
.header {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: #009eef;
    color: #fff;
    font-size: 16px;
    height: 45px;
    line-height: 1;
    padding: 0 10px;
    position: relative;
    text-align: center;
    white-space: nowrap;
    position: fixed;
    width: 100%;
    top:0;
    z-index: 99;
}
.header button {
    background-color: transparent;
    border:0;
    box-shadow: none;
    color: inherit;
    display: inline-block;
    padding: 0;
    font-size: inherit;
    outline: none;
}
.header-titile {
    flex: 1;
}
.is-left {
    float: left;
}
</style>

