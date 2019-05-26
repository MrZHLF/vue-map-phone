<template>
  <div class="home">
    <div class="header">
      <div class="address_map" @click="$router.push({name:'address',query:{city:JSON.stringify(city)}})">
        <i class="fa fa-map-marker"></i>
        <span>{{address}}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </div>
    <div class="search_wrap" :class="{'fixedview':showFilter}">
      <div class="shop_search" @click="$router.push('/search')">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
    <div id="container">
      <!-- 轮播图 -->
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(img,index) in swipeImgs" :key="index">
          <img :src="img">
        </mt-swipe-item>
      </mt-swipe>
      <!-- 分类 -->
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item v-for="(entry,i) in entries" :key="i">
          <div class="foodentry" v-for="(item,index) in entry" :key="index">
            <div class="img_wrap">
              <img :src="item.image">
            </div>
            <span>{{item.name}}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 推荐商家 -->
    <div class="shoplist-title">推荐商家</div>
    <FilterView :filtersData="filtersData" @searchFixed="showFilterView" @update="update" />

    <!-- 商品展示列表 -->
    <mt-loadmore 
      :top-method="loadData" 
      :bottom-method="loadMore" 
      :bottom-all-loaded="allLoaded" 
      :auto-fill="false"
      :bottomPullText="bottomPullText"
      ref="loadmore"
    >
      <div class="shoping">
        <IndexShop  v-for="(item,index) in restaurants" :key="index" :restaurant = "item.restaurant" />
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
import { Swipe, SwipeItem,Loadmore } from 'mint-ui';
import FilterView from '../components/FilterView'
import IndexShop from '../components/IndexShop'
export default {
  name: "home",
  data() {
    return {
      swipeImgs:[], //轮播图
      entries:[], //分类
      filtersData:null, //排序导航
      showFilter:false, //导航顶部
      restaurants:[], //商品展示
      page:1,
      size:5,
      allLoaded:false,
      bottomPullText:"上拉加载更多",
      data:null
    }
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
  },
  methods: {
    getDate(){
      this.$axios.get('/api/profile/shopping').then(res =>{
        // console.log(res)
        if(res.data && res.status === 200) {
          this.swipeImgs = res.data.swipeImgs;
          this.entries = res.data.entries
        }  
      });
      //导航列表数据
      this.$axios.get('/api/profile/filter').then(res => {
        // console.log(res)
        this.filtersData = res.data
      })

      //商品展示列表数据
      this.loadData()
    },
    loadData(){
      //下拉刷新
     this.page = 1;
     this.allLoaded = false;
     this.bottomPullText = "上拉加载更多"
     this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.data).then(res =>{
        this.restaurants = res.data;
        console.log(res)
        this.$refs.loadmore.onTopLoaded();
      })
    },
    loadMore(){
      //上拉加载
      if(!this.allLoaded) {
        this.page ++;
        this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`).then(res =>{
          this.$refs.loadmore.onBottomLoaded();
          if(res.data.length > 0) {
            res.data.forEach(item => {
              this.restaurants.push(item)
            });
          if(res.data < this.size) {
            this.allLoaded = true
            this.bottomPullText = "没有更多数据"
          }
          } else {
            this.allLoaded = true
            this.bottomPullText = "没有更多数据"
          }
        })
      }
    },
    update(condation){
      //点击排序更新数据
      // console.log(condation)
      this.data = condation
      // console.log(this.data)
      this.loadData()
    },
    showFilterView(isShow) {
      //隐藏蒙版
      this.showFilter = isShow
    }
  },
  created() {
    this.getDate()
  },
  components:{
    FilterView,
    IndexShop
  }
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,
.search_wrap {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search_wrap .shop_search {
  /* margin-top: 10px; */
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}

.search_wrap {
  position: sticky;
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
}
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
}

.mint-loadmore {
  height: calc(100% - 95px);
  overflow: auto;
}
</style>

