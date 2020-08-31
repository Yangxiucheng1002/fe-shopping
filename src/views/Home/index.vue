<template>
    <div class="home">
      首页
    </div>
</template>

<script lang="ts">
  import {Component, Vue,} from 'vue-property-decorator';
  // import {MapState} from '@/custormDecorator';

  @Component({
    components: {
    }
  })
  export default class Home extends Vue {
    mounted() {
      // console.log(this.appName);
    }
  }
</script>
<style scoped lang="less">
</style>
