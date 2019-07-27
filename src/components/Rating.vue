<template>
  <div class="Rating-gray">
    <i v-for="(item,index) in itemClasses" :key="index" class="fa" :class="item"></i>
  </div>
</template>

<script>
const LENGTH = 5;
// 星星对应的class
const CLS_ON = "fa-star";
const CLS_HALF = "fa-star-half-empty";
const CLS_OFF = "fa-star-o";
export default {
  name:"Rating",
  props:{
    rating:Number
  },
  computed: {
    itemClasses(){
      // 列如 4.8 四个全星 一个半星

      let result = [];

      // 根据分数对星星进行处理，向下取0.5的倍数
      let score = Math.floor(this.rating * 2) /2;
      //控制半星
      let hasDecimal = score % 1 !== 0;
      //全星
      let integer = Math.floor(score)

      //全星放到数组里面
      for (let i=0;i<integer;i++){
          result.push(CLS_ON)
      }

      //半星
      if(hasDecimal) {
        result.push(CLS_HALF)
      }

      //补齐
      while(result.length < LENGTH) {
        result.push(CLS_OFF)
      }

      return  result;
    }
  },
}
</script>

<style scoped>
.Rating-gray {
  margin-right: 1.066667vw;
  color: #ffbe00;
  display: inline-block;
}
</style>
