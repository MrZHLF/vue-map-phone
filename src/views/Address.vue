<template>
    <div class="address">
        <Header :isLeft="true" title="选择收货地址" />
        <div class="city_search">
            <div class="search">
                <span class="city" @click="$router.push('/city')">
                    {{city}}
                    <i class="fa fa-angle-down"></i>
                </span>
                <i class="fa fa-search"></i>
                <input type="text" v-model="search_val" placeholder="小区/写字楼/学校等">
            </div>
            <!-- //获取当前具体位置 -->
            <Location @click="selectAddress" :address="address" />
            <div class="area" v-if="areaList">
                <ul class="area_list" v-for="(item,index) in areaList" :key="index">
                    <li @click="selectAddress(item)">
                        <h4>{{item.name}}</h4>
                        <p>{{item.district}}{{item.address}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../components/Header'
import Location from  '../components/Location'
export default{
    name:"address",
    data() {
        return {
            city:"", //当前城市
            search_val:"", //搜索
            areaList:[]
        }
    },
    computed: {
       address(){
           //获取当前具体位置
           return this.$store.getters.location.formattedAddress;
       } 
    },
    watch:{
        search_val(){
            //监听搜索地区
            this.searchPlace()
        }
    },
    methods:{
        searchPlace(){
            // console.log(this.search_val)
            const self = this
            AMap.plugin('AMap.Autocomplete', function(){
                // 实例化Autocomplete
                var autoOptions = {
                    //city 限定城市，默认全国
                    city: self.city
                }
                var autoComplete= new AMap.Autocomplete(autoOptions);
                autoComplete.search(self.search_val, function(status, result) {
                    // 搜索成功时，result即是对应的匹配数据
                    // console.log(result)
                    self.areaList = result.tips
                    console.log(self.areaList)
                })
            })
        },
        selectAddress(item){
            // console.log(item)
            //点击获取地址传到首页
            if(item) {
                let address = item.district +item.address+item.name
                this.$store.dispatch("setAddress",address)
            } else {
                this.$store.dispatch('setAddress',this.address)
            }
            
            this.$router.push('/home')
        }
    },
    beforeRouteEnter (to, from, next) {
        //进入路由获获取传递的数据
        next(vm =>{
            // vm.city = to.params.city
            vm.city = JSON.parse(to.query.city)
        })
    },
    components:{
        Header,
        Location
    }
}
</script>
<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.city_search {
    background-color: #ffffff;
    padding: 10px 20px;
    overflow: hidden;
}
.search {
    background-color: #eee;
    height: 40px;
    border-radius: 10px;
    box-sizing: border-box;
    line-height: 40px;
}
.search .city {
    padding: 0 10px;
}
.city i {
    margin-right: 10px;
}
.search input {
    margin-left: 5px;
    background-color: #eee;
    outline: none;
    border: none;
}
.area{
    margin-top: 16px;
    background: white;
}
.area .area_list li {
    border-bottom: 1px solid #eee;
    padding: 8px 16px;
    color: #aaaaaa;
}
.area .area_list li h4{
    font-weight: bold;
    color: #333;
    margin-bottom:5px; 
}
</style>

