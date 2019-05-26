<template>
    <div class="area" ref="area_scroll" v-if="cityInfo">
        <div class="scroll_wrap">
            <!-- 热门城市 -->
            <div class="hot_wrap citylist">
                <div class="title">热门城市</div>
                <ul class="hot_city">
                    <li @click="$emit('selectCity',item)" v-for="(item,index) in cityInfo.hotCities" :key="index">
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <!-- 所有城市 -->
            <div class="city_wrap">
                <!-- 按字母排序 -->
                <div 
                    class="city_content citylist"
                    v-for="(item,index) in keys"
                    :key="index"
                >
                    <div class="title">{{item}}</div>
                    <!-- 根据字母key展示城市名 -->
                    <ul>
                        <li @click="$emit('selectCity',city)" v-for="(city,index) in cityInfo[item]" :key="index">
                            {{city.name}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 字母 -->
        <div class="area_keys">
            <ul>
                <li @click="selectKey(0)">#</li>
                <li @click="selectKey(index + 1)" v-for="(item,index) in keys" :key="index">{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"alpabet",
    props:{
        cityInfo: Object,
        keys: {
            // default: function () { return [] }
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            scroll:null
        }
    },
    methods: {
        initScroll() {
            this.scroll = new BScroll(this.$refs.area_scroll,{
                click:true
            })
        },
        selectKey(index) {
            // console.log(index)
            // console.log(this.$refs.area_scroll.getElementsByClassName("citylist"))
            const citylist = this.$refs.area_scroll.getElementsByClassName("citylist");
            //根据下标滚动合适的位置
            let el = citylist[index]
            this.scroll.scrollToElement(el,300)
        }
    },
}
</script>
<style scoped>
.area{
    margin-top: 10px;
    box-sizing: border-box;
    padding: 0 16px;
    background-color: #ffffff;
    height: calc(100% - 65px);
    overflow: hidden;
}
.scroll_wrap {
    background: #fff;
    overflow: auto;
}
.title {
    color: #aaa;
    padding: 15px 0;
}
.hot_city{
    padding: 0 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.hot_city li {
    width: 30%;
    background-color: #fff;
    margin: 0 10px 10px 0;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
}
.city_content li {
    padding: 10px;
    border-bottom: 1px solid #eee;
}
.area_keys {
    position: fixed;
    right: 0;
    top: 25%;
    color: #aaa;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    padding: 0 5px;
}
</style>


