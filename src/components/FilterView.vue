<template>
  <div :class="{'open':isScrt || isScreen}" @click.self="hideView">
    <!-- 导航 -->
    <div class="filter_wrap" v-if="filtersData">
        <aside class="filter">
          <div class="filter-nav" 
            v-for="(item,index) in filtersData.navTab" 
            :key="index" 
            :class="{'filter-bold':currentFilter===index}"
            @click="filterSort(index)"
          >
              <span>{{item.name}}</span>
              <i v-if="item.icon" :class="'fa fa-'+item.icon"></i>
          </div>    
        </aside>
    </div>
    <!-- 排序 -->
    <section class="filter-extend" v-if="isScrt">
      <ul>
        <li v-for="(item,index) in filtersData.sortBy" :key="index" @click="selectSort(item,index)">
          <span :class="{'selectName':currentScrt==index}">{{item.name}}</span>
          <i v-show="currentScrt==index" class="fa fa-check"></i>
        </li>
      </ul>
    </section>
    <!-- 筛选 -->
    <section class="filter-extend" v-if="isScreen">
      <div class="filter-sort">
        <div class="morefilter" v-for="(screen,index) in filtersData.screenBy" :key="index">
          <p class="title">{{screen.title}}</p>
          <ul>
            <li 
              :class="{'selected':item.select}" 
              v-for="(item,i) in screen.data" 
              :key="i"
              @click="selectScreen(item,screen)"
            >
              <img v-if="item.icon" :src="item.icon" alt="">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="morefilter-btn">
        <span :class="{'edit':edit}" class="morefilter-clear" @click="clearFilter">取消</span>
        <span @click="filterOk" class="morefilter-ok">确定</span>
      </div>
    </section>
  </div>
</template>
<script>
export default {
    name:"filterView",
    props:{
        filtersData:Object
    },
    data() {
        return {
          currentFilter:0, //点击导航文字字体加粗
          isScrt:false, //点击导航蒙版是显示
          currentScrt:0, //排序显示顺序
          isScreen:false, //点击筛选是否显示
        }
    },
    computed: {
      edit(){
        //筛选取消之前看看是否有选中的状态
        let edit = false
        this.filtersData.screenBy.forEach(screen =>{
          screen.data.forEach(item =>{
            if(item.select) {
              edit = true;
            }
          })
        })
        return edit
      }
    },
    methods: {
      filterSort(index) {
        // console.log(index)
        //点击字体加粗
        this.currentFilter = index;
    //点击导航蒙版是显示
        switch(index){
          case 0:
          // 配送最快
            this.isScrt=true;
            this.isScreen=false;
            this.$emit('searchFixed',true); //点击传值home组件
            break;
          case 1:
          // 距离最近
            this.$emit('update',{condition:this.filtersData.navTab[1].condition});
            this.hideView();
            break;
          case 2:
          // 品质联盟
            this.$emit('update',{condition:this.filtersData.navTab[2].condition});
            this.hideView();
            break;
          case 3:
          // 筛选
            this.isScrt=false;
            this.isScreen=true;
            this.$emit('searchFixed',true); //点击传值home组件
            break;
          default:
            this.hideView()
            break;
        }
      },
      selectSort(item,index){
        //排序
        this.currentScrt=index;
        //修改name名称
        this.filtersData.navTab[0].name = this.filtersData.sortBy[index].name;
        //隐藏模板
        this.hideView();

        //更新点击排序的数据
        this.$emit('update',{condition:item.code})
      },
      hideView(){
        //点击蒙版隐藏
        this.isScrt=false;
        this.isScreen=false;
        this.$emit('searchFixed',false)
      },
      selectScreen(item,screen){
        // 筛选
        if(screen.id !== "MPI"){ // 单选
          screen.data.forEach(ele => {
            ele.select = false
          });
        }
        item.select = !item.select
      },
      clearFilter(){
        //筛选取消按钮
        this.filtersData.screenBy.forEach(screen =>{
          screen.data.forEach(item =>{
              item.select = false;
          })
        })
        // this.hideView()
      },
      filterOk(){
        //筛选确定按钮
        let screenData = {
          MPI:"",
          offer:"",
          per:""
        }
        let mpiStr="";
        this.filtersData.screenBy.forEach(screen =>{
          screen.data.forEach((item,index) =>{
            
            if(item.select) {
              if(screen.id !== 'MPI'){
                //单选
              } else {
                //多选
                mpiStr += item.code + ','
                screenData[screen.id] = mpiStr;
              }
            }
          })
        })
        // console.log(mpiStr)
        this.$emit('update',{condition:screenData})
        //隐藏
        this.hideView()
      }
    },
}
</script>
<style scoped>
.filter_wrap {
  background: #fff;
  position: sticky;
  top: 54px;
  z-index: 10;
}
.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}
.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}

.filter-bold {
  font-weight: 600;
  color: #333;
}

.open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}

.filter-extend {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 24.533333vw;
}
.filter-extend li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}
.fa-check {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

.selectName {
  color: #009eef;
}
/* 筛选 */
.filter-sort {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}
.morefilter {
  margin: 2.666667vw 0;
  overflow: hidden;
}
.morefilter .title {
  margin-bottom: 2vw;
  color: #666;
  font-size: 0.5rem;
}
.morefilter ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.morefilter li {
  box-sizing: border-box;
  width: 30%;
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
  background: #fafafa;
}
.morefilter li img {
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: middle;
  margin-right: 0.8vw;
}
.morefilter li span {
  margin-left: 2%;
  vertical-align: middle;
}

.morefilter-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  line-height: 11.466667vw;
  box-sizing: border-box;
}
.morefilter-btn span {
  font-size: 0.826667rem;
  text-align: center;
  text-decoration: none;
  flex: 1;
}
.morefilter-clear {
  color: #ddd;
  background: #fff;
}
.morefilter-ok {
  color: #fff;
  background: #00d762;
  border: 0.133333vw solid #00d762;
}

.selected {
  color: #3190e8 !important;
  background-color: #edf5ff !important;
}

.edit {
  color: #333 !important;
}
</style>

