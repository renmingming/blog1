<template>
  <div class="my-label">
    <div class="head">我的标签</div>
    <ul class="label-list">
      <li v-for="(type,index) in articleType">
        <a @click="goArticle(type.type_val, type.type_name)">{{type.type_name}}</a>
        ({{articleCount[index]}})
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'myLabe',
    data () {
      return {
        articleType: '',
        articleCount: ''
      }
    },
    mounted: function () {
      this.getType()
    },
    watch: {
      '$route' (to, from) {
        this.getType()
      }
      // articleCount: 'getType'
    },
    methods: {
      getType: function () {
        axios.get('/public/index/Index/indexData')
        .then((res) => {
          this.articleType = res.data.ArticleTypeData.data
          this.articleCount = res.data.ArticleTypeData.count
        })
      },
      goArticle: function (v, t) {
        this.$router.push({
          name: 'labelarticle',
          params: {
            val: v,
            title: t
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  .my-label{
    .head{
      padding: 10px 20px;
      font-size:18px;
      background:#45bcf9;
      color:#fff;
    }
    .label-list{
      background:#fff;
      border:1px solid #ededed;
      border-top:none;
      padding: 10px 0px 0px 10px;
      font-size:0;
      li{
        display:inline-block;
        vertical-align:top;
        width:129px;
        line-height:30px;
        padding: 0 10px;
        margin-right:10px;
        margin-bottom:10px;
        background:#f6f6f6;
        color:#aaa;
        text-align:right;
        font-size:14px;
        a{
          display:inline-block;
          float:left;
          min-width:80px;
          font-size:14px;
          line-height:30px;
          color:#aaa;
          text-align:left;
        }
      }
    }
  }
</style>