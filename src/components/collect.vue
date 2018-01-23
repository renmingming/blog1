<template>
  <div class="collect" @click="setCollectState" :class="{active: collectState}">{{collectVal}}</div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'collect',
    data () {
      return {
        collectVal: '收藏'
      }
    },
    computed: {
      collectState () {
        return this.$store.state.collectState
      }
    },
    methods: {
      ...mapActions(['setCollectState'])
    }
  }
</script>

<style lang="scss" scopeds type="text/css">
  .collect{
    display:inline-block;
    vertical-align: top;
    color: #333;
    font-size: 13px;
    margin-left:10px;
    &.active{
      color:#bcbcbc;
    }
  }
</style>