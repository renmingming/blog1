<template>
  <div  v-if='load' class="loading">
    <span>loading.......</span>
  </div>
</template>
<script>
  export default {
    props: ['load'],
    name: 'loading',
    data () {
      return {
        // loading: false
      }
    },
    watch: {
      // '$route': 'fetchData'
    },
    methods: {}
  }
</script>
<style lang="scss" scoped type="text/css">
  .loading{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:999;
    span{
      display:inline-block;
      position:absolute;
      top:50%;
      left:0;
      width:100%;
      transform:trnaslateY(-50%);
      font-size:18px;
      color:#45bcf9;
      text-align:center;
    }
  }
</style>