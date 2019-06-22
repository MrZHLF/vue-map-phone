<template>
  <div class="nav">
    <router-link to="/goods" class="nav-item">
      点餐
      <i class="line"></i>
    </router-link>
    <router-link to="/comments" class="nav-item">
      评价
      <i class="line"></i>
    </router-link>
    <router-link to="/seller" class="nav-item">
      商家
      <i class="line"></i>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav {
  display: flex;
  width: 100%;
  line-height: 10.666667vw;
  border-bottom: 1px solid #e4e4e4;
  background: #fff;
  position: sticky;
  top: 0px;
  z-index: 10;
}

.nav .nav-item {
  flex: 1;
  text-align: center;
  font-size: 0.95rem;
  text-decoration: none;
  color: #666;
  position: relative;
}

.nav .active {
  color: #333;
  font-weight: 700;
}
.nav .active .line {
  width: 30px;
  height: 0.533333vw;
  background: #2395ff;
  display: inline-block;
  position: absolute;
  left: 45%;
  bottom: 0;
  margin-left: -10px;
}
</style>
