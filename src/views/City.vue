<template>
    <div class="city">
        <div class="search_wrap">
            <div class="search">
                <i class="fa fa-search"></i>
                <input type="text" v-model="city_val" placeholder="请输入城市名字">
            </div>
            <button @click="$router.go(-1)">取消</button>
        </div>
        <div style="height:100%" v-if="searchList.length == 0">
            <div class="location">
                <Location @click="selectCity({name:city})" :address="city" />
            </div>
            <Alphabet @selectCity="selectCity" ref="allcity" :cityInfo="cityInfo" :keys="keys" />
        </div>
        <div class="search_list" v-else>
            <ul>
                <li @click="selectCity(item)" v-for="(item,index) in searchList" :key="index">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import Location from '../components/Location'
import Alphabet from '../components/Alphabet'
export default {
    name:"city",
    data() {
        return {
            city_val:"",
            cityInfo:null, //城市名字
            keys:[], //A-Z字母
            allCities:[], //存放所有的城市
            searchList:[], //搜索
        }
    },
    computed: {
        city() {
            return (
                this.$store.getters.location.addressComponent.city ||
                this.$store.getters.location.addressComponent.province
            );
        }
    },
    created(){
        this.getCityInfo()
    },
    watch: {
        city_val(){
            // console.log(this.city_val)
            this.searchCity()
        }
    },
    methods: {
        getCityInfo(){
            this.$axios.get('/api/posts/cities').then((res) => {
                console.log(res)
                this.cityInfo = res.data;
                //拿到字母 keys
                this.keys = Object.keys(res.data)
                //删除最后一个
                this.keys.pop();
                //从A-Z排序
                this.keys.sort()
                // console.log(this.keys)  
                // 监听滚动
                this.$nextTick(() => {
                    this.$refs.allcity.initScroll()
                })
                //存储所有的key
                this.keys.forEach(key => {
                    // console.log(key)
                    this.cityInfo[key].forEach(city =>{
                        // console.log(city)
                        this.allCities.push(city)
                    })
                });
            }).catch((err) => {
                console.log(err)
            });
        },
        selectCity(city){
            // console.log(city)
            this.$router.push({name:'address',query:{city:JSON.stringify(city.name)}})
        },
        searchCity() {
            if(!this.searchList){
                this.searchList = []
            } else {
                this.searchList = this.allCities.filter(item => {
                    return item.name.indexOf(this.city_val) != -1
                })
            }
            // console.log(this.searchList)
            
        }
    },
    components:{
        Location,
        Alphabet
    }
}
</script>
<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  border: none;
  background: #009eef;
  color: #fff;
  border-radius: 4px;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>


