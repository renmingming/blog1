<template>
  <div id="app">
    <navbar></navbar>
    <div class="index-content">
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="sidebar">
        <my-label></my-label>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import myLabel from './components/label.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    myLabel
  }
}
</script>

<style lang="scss" type="text/css">
  body,html{
    display:block;
    background:#F0EEF5 !important;
  }
  #app{
    // background:#F0EEF5;
  }
  .index-content{
    max-width:1400px;
    padding:0 25px;
    margin:20px auto;
    display:flex;
    @media screen and (max-width: 767px) {
       display:block;
    }
    .content{
      display:inline-block;
      flex:1 ;
      background:#fff;
      margin-right:25px;
      @media screen and (max-width: 767px) {
         width:100%;
      }
    }
    .sidebar{
      flex: 0 0 290px;
      @media screen and (max-width: 767px) {
          width:100%;
      }
    }
  }
</style>
