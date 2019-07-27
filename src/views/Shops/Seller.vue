<template>
  <div class="seller" v-if="sellInfo">
    <section>
      <img :src="sellInfo.header_image" alt="">
      <h3>{{sellInfo.title}}</h3>
      <p>{{sellInfo.brand_intros[0].brief}}</p>
      <div>查看品牌故事</div>
    </section>
  </div>
</template>

<script>
export default {
  name:"seller",
  data() {
    return {
      sellInfo:null  
    }
  },
  methods: {
    getData(){
      this.$axios('/api/profile/seller').then(res =>{
        this.sellInfo = res.data;
      })
    }
  },
  created() {
    this.getData()
  },
}
</script>
<style scoped>
.seller section {
  margin-bottom: 2.666667vw;
  padding: 4.266667vw 4vw 4vw;
  font-size: 0.9rem;
  background-color: #fff;
  color: #666;
  border-bottom: 1px solid #eee;
}
section > img {
  width: 92vw;
  height: 52vw;
  margin-bottom: 4.266667vw;
}
section > h3 {
  color: #333;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1.066667vw;
}
section > p {
  height: 40px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
section > div {
  margin: 4vw 0 -4vw;
  text-align: center;
  font-size: 0.346667rem;
  padding: 4vw 0;
}
</style>
