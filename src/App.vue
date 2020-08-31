<template>
    <div id="app">

        <router-view/>
      <FooterBar></FooterBar>
    </div>
</template>
<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  // import FnUtils from '@/utils/FnUtils';

  @Component({
    components:{
      FooterBar: () => import(/* webpackChunkName: "FooterBar" */  '@/components/footerBar/index.vue'),
    }
  })
  export default class App extends Vue {
    @Watch('$route')
    getRouter(val: any) {
      if (val && val.query) {
        // this.$store.commit('GET_APP_NAME', {appName:val.query});
      }
    }

    mounted() {
      // 获取当前是哪个
      // const appName = FnUtils.getParams(window.location.href);
      // this.$store.commit('GET_APP_NAME', {appName});
    }
  }
</script>
<style lang="less">
    * {
        padding: 0;
        margin: 0;
    }

    html body {
        height: 100vh;
    }
    ul  li{
      list-style: none;
    }
    #app {
        font-family: PingFangSC-Regular, PingFang SC, Avenir, Microsoft YaHei, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        font-size: 15px;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
