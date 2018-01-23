<template>
  <div class="article">
    <loading :load="loading"></loading>
    <h1>关于标签"<span>{{title}}</span>"的文章</h1>
    <ul>
      <li v-for="list in article">
        <div class="head">
          <span class="time">{{list.create_time | getDateTime}}</span>
          <span class="title">{{list.title}}</span>
        </div>
        <div class="text">
          <span>{{list.abstract}}</span>
          <router-link :to="{name: 'ArticleDetail', params: {id: list.id}}">阅读全文</router-link>
        </div>
        <div class="foot">
          <span class="time">{{list.create_time}}</span>
          <span class="author">{{list.author}}</span>
          <span class="read">阅读(<span class="number">{{list.browse_times}}</span>)</span>
        </div>
      </li>
    </ul>
    <paging :all="total" v-on:getData="getArticle"></paging>
  </div>
</template>
<script>
  import axios from 'axios'
  import Loading from './loading.vue'
  import paging from './page.vue'

  export default {
    name: 'labelarticle',
    data () {
      return {
        article: '',
        total: 0,
        loading: true,
        title: ''
      }
    },
    components: {
      Loading,
      paging
    },
    watch: {
      '$route' (to, from) {
        console.log(to + '------' + from)
        this.getArticle()
      }
    },
    mounted: function () {
      this.getArticle()
    },
    methods: {
      getArticle: function (page = 0) {
        let val = this.$route.params.val
        this.title = this.$route.params.title
        axios.get('/public/index/Article/labelArticle', {
          params: {
            type: val
          }
        })
        .then((res) => {
          // const articleInfo = {
          //   'type': res.data.ArticleTypeData
          // }
          this.loading = false
          this.article = res.data.articleData
          this.total = Math.ceil(res.data.count / 8)
          // this.$store.dispatch('setArticleInfo', articleInfo)
        })
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  .article{
    position:relative;
    h1{
      font-size:22px;
      padding:20px;
      span{
        font-size:24px;
        color:#45bcf9;
      }
    }
    ul{
      border:1px solid #dedede;
      li{
        border-bottom:1px solid #dedede;
        padding: 15px;
        .head{
          span{
            display:inline-block;
            vertical-align:top;
          }
          .time{
            padding: 0 5px;
            line-height:30px;
            font-size:14px;
            color:#fff;
            background:#45bcf9;
          }
          .title{
            line-height:30px;
            font-size:20px;
            color:#333;
            margin-left:10px;
          }
        }
        .text{
          padding:15px 0;
          span{
            line-height:28px;
            font-size:14px;
            color:#333;
            white-space: normal;
          }
          a{
            display:inline-block;
            font-size:14px;
            line-height:28px;
            color:green;
          }
        }
        .foot{
          span{
            display:inline-block;
            vertical-align:top;
            color:#bcbcbc;
            font-size:13px;
            white-space: normal;
          }
          .time{}
        }
      }
    }
  }
</style>