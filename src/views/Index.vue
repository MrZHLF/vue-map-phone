<template>
  <div class="index">
    <router-view></router-view>
    <tab-bar :dataArray="tabBar"/>
  </div>
</template>

<script>
import TabBar from '../components/TabBar'
export default {
  name: 'index',
  data(){
    return {
      tabBar:[
        {title:"首页",icon:"home",path:'/home'},
        {title:"订单",icon:"file-text-o",path:'/order'},
        {title:"我的",icon:"user",path:'/me'},
      ]
    }
  },
  components:{
    TabBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  width: 100%;
  max-width: 640px;
  min-width: 320px;
  height: calc(100% - 45px);
  margin: 0 auto;
}
</style>
