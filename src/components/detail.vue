<template>
  <div class="article-detail">
    <h1>{{artData.title}}</h1>
    <div class="text" v-html="artData.content">
      <!-- {{artData.content}} -->
    </div>
    <div class="info">
      <span class="time">{{artData.create_time}}</span>
      <span class="author">{{artData.author}}</span>
      <span class="browse">阅读({{artData.browse_times}})</span>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'ArticleDetail',
    data () {
      return {
        artData: ''
      }
    },
    mounted: function () {
      this.getArticleDetail()
    },
    methods: {
      getArticleDetail () {
        let id = this.$route.params.id
        axios.get('/public/index/article/articleData', {
          params: {
            id: id
          }
        })
        .then((res) => {
          this.artData = res.data.articleData
        })
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  .article-detail{
    padding:15px;
    h1{
      font-size:28px;
      color:#333;
    }
    .text{
      margin-top:20px;
      p{
        font-size:14px;
        color:#333;
        line-height:28px;
      }
    }
    .info{
      margin-top:30px;
      span{
        display:inline-block;
        padding:0 5px;
        font-size:13px;
        color:#666;
      }
    }
  }
</style>