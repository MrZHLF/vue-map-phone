<template>
  <div class="home">
    <div class="header">
      <div class="address_map" @click="$router.push({name:'address',query:{city:JSON.stringify(city)}})">
        <i class="fa fa-map-marker"></i>
        <span>{{address}}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
      <div class="shop_search">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    address() {
      //获取所在地址
      return this.$store.getters.address;
    },
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    }
  }
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.header {
  background-color: #009eef;
  padding: 16px;
}
.header .address_map {
  color: #ffffff;
  font-weight: bold;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.header span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header .shop_search {
  margin-top: 10px;
  background-color: #ffffff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaaaaa;
}
</style>

