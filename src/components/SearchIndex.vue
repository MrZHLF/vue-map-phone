<template>
    <ul class="search_list">
        <li v-for="(item,index) in dataList" :key="index" @click="$emit('click')">
            <img v-if="item.image_path" :src="item.image_path" alt="">
            <i v-else class="fa fa-search"></i>
            <div class="shopitem">
                <span class="title">{{item.name || item}}</span>
                <span v-if="item.rating" class="rating">评分{{item.rating}}</span>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name:"SearchIndex",
    props:{
        dataList:Array
    }
}
</script>

<style scoped>
.search_list {
  background: #fff;
}
.search_list li {
  padding: 0 4.266667vw;
  display: flex;
  height: 13.933333vw;
  align-items: center;
}
.search_list li img {
  width: 6.4vw;
  height: 6.4vw;
  margin-right: 4.266667vw;
  border-radius: 0.133333vw;
}
.shopitem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 13.933333vw;
  border-bottom: 1px solid #e3e3e3;
}
.shopitem .title {
  display: inline-block;
  max-width: 56vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.888rem;
  color: #333;
  margin-right: 0.8vw;
}
.shopitem .rating {
  color: #999;
  font-size: 0.8rem;
}

.search_list li i {
  margin-right: 4.266667vw;
  color: #888;
}
</style>

