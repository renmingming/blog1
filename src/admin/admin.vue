<template>
  <div class="admin">
    <ul>
      <li>
        <router-link to='/admin/addArticle'>添加文章</router-link>
      </li>
      <li>
        <router-link to='/admin/articleList'>文章列表</router-link>
      </li>
      <li>
        <router-link to='/admin/articleType'>文章类型</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'admin'
  }
</script>
<style lang="scss" scoped type="text/css">
  .admin{
    padding: 20px 15px;
    ul{
      margin-bottom:20px;
      li{
        display:inline-block;
        border-radius:5px;
        a{
          display:block;
          padding:10px 30px;
          background:#f6f6f6;
          border-radius:5px;
          color:#aaa;
          &.router-link-exact-active.router-link-active{
            background:#45bcf9;
            color:#fff;
          }
        }
      }
    }
  }
</style>