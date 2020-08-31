<template>
  <div class="footer-wrap">
    <ul class="content">
      <li v-for="(item,index) in appBar" :key="index" class="list" @click="getBar(item)" :class="{actives : bottomActive === item.id}">
        <p class="icons item"><i class="iconfont" :class='item.icon'></i></p>
        <p class="item">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
// import { cloneDeep } from 'lodash';
import {MapState} from '@/custormDecorator';

@Component({})
export default class FooterBar extends Vue {
  @MapState('FooterBar.appBar') appBar: [] | undefined;
  @MapState('FooterBar.bottomActive') readonly bottomActive: string | undefined

  mounted(){
    this.getBar({id: '1'})
  }
  public getBar(data: { id: string }){
    this.$store.commit('GET_MENU_BAR', {active:data.id});
    switch (this.bottomActive) {
        case '1':
          this.$router.push({path:'/home',query: {id:'1'}})
          break;
        case '2':
          this.$router.push({path:'/menu',query: {id:'2'}})
          break;
        case '3':
          this.$router.push({path:'/shoppingCar',query: {id:'3'}})
          break;
        case '4':
          this.$router.push({path:'/mine',query: {id:'4'}})
          break;
    }

  }
}
</script>

<style scoped lang="less">
.actives{
  color: #42b983;
}
.footer-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  box-shadow: 0 0  1px #222;
  .content{
    display: flex;
    justify-content: space-between;
    width: 100%;
    .list{
      width: 100%;
      .icons{
        i{
          display: block;
          font-size: 25px;
        }
      }
      .item{
        text-align: center;
        display: block;
        width: 100%;
        font-size: 13px;
        padding-top: 2px;
      }
    }
  }
}
</style>
