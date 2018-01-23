<template>
  <div class="article">
    <loading :load="loading"></loading>
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
          <!-- <collect></collect> -->
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
  // import collect from './collect.vue'

  export default {
    name: 'Article',
    data () {
      return {
        article: '',
        total: 0,
        loading: true
      }
    },
    components: {
      Loading,
      paging
    },
    mounted: function () {
      this.getArticle()
    },
    methods: {
      getArticle: function (page = 0) {
        console.log(page)
        axios.get('/public/index/Index/indexData', {
          params: {
            page: page
          }
        })
        .then((res) => {
          const articleInfo = {
            'type': res.data.ArticleTypeData
          }
          this.loading = false
          this.article = res.data.NewestArticle
          this.total = Math.ceil(res.data.count / 8)
          this.$store.dispatch('setArticleInfo', articleInfo)
        })
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  .article{
    position:relative;
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