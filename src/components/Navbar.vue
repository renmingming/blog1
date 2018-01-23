<template>
  <div class="nav">
    <ul>
      <li>
        <router-link to='/'>首页</router-link>
        <router-link to='/about'>关于我们</router-link>
        <router-link to='/admin'>后台管理</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  // import axios from 'axios'
  export default {
    name: 'Navbar',
    data () {
      return {
        artlist: ''
      }
    },
    methods: {}
  }
</script>
<style lang="scss" scoped type="text/css">
  .nav{
    width:100%;
    background:#45bcf9;
    text-align:left;
    ul{
      max-width:1400px;
      margin:0 auto;
      li{
        display:inline-block;
        color:#fff;
        font-size:16px;
        a{
          display:inline-block;
          padding:20px 40px;
          color:rgba(255,255,255,1);
          text-shadow:1px 1px 1px #666;
          &.router-link-active{
            color:rgba(255,255,255,0.8)
          }
        }
      }
    }
  } 
</style>