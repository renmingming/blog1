<template>
  <div class="addArticle form-style">
    <form action="">
      <div class="list">
        <label class="title">文章标题：</label>
        <div class="val">
          <input type="text" name="title" v-model="title">
        </div>
      </div>
      <div class="list">
        <label class="title">作者：</label>
        <div class="val">
          <input type="text" name="author" v-model="author">
        </div>
      </div>
      <div class="list">
        <label class="title">文章类型：</label>
        <div class="val">
          <select name="articletype" class="select" v-model="selected">
            <option :value="val.id" v-for="val in articleType">{{val.type_name}}</option>
          </select>
        </div>
      </div>
      <div class="list">
        <label class="title">文章摘要：</label>
        <div class="val">
          <textarea name="abstract" rows="4" v-model="abstract"></textarea>
        </div>
      </div>
      <div class="list">
        <label class="title">文章内容：</label>
        <div class="val">
          <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
        </div>
      </div>
      <button @click.prevent="getUEContent()">获取内容</button>
      <button @click.prevent="save()">保存</button>
    </form>
  </div>
</template>
<script>
  import UE from '@/admin/editor.vue'
  import axios from 'axios'
  export default {
    name: 'addArticle',
    components: {
      UE
    },
    data () {
      return {
        defaultMsg: '编辑文章内容',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 400
        },
        articleType: '',
        title: '',
        author: '',
        selected: '2',
        abstract: ''
      }
    },
    mounted () {
      this.getType()
    },
    methods: {
      getType () {
        axios.get('/public/index/Index/indexDAta').then((res) => {
          this.articleType = res.data.ArticleTypeData.data
        })
      },
      getUEContent () { // 获取富文本框内容
        let content = this.$refs.ue.getUEContent()
        console.log(content)
      },
      save () {
        let content = this.$refs.ue.getUEContent()
        axios.post('/public/admin/Article/doadd', {
          'title': this.title,
          'author': this.author,
          'abstract': this.abstract,
          'type': this.selected,
          'content': content
        }).then((res) => {
          if (res.data.code === 1) {
            alert('添加成功')
            this.$router.push({
              path: '/'
            })
          } else {
            alert('添加失败')
          }
        })
      }
    }
  }
</script>
<style lang="scss"  type="text/css">
  .addArticle{
    .list{
      display:flex;
      margin-bottom:20px;
      .title{
        flex: 0 0 100px;
        line-height:35px;
        color:#aaa;
      }
      .val{
        flex: 1;
        input{
          display:block;
          width:100%;
          border:1px solid #F0EEF5;
          line-height:33px;
          height:35px;
          padding:0 15px;
        }
        textarea{
          display:block;
          width:100%;
          border:1px solid #F0EEF5;
          line-height:33px;
          padding:0 15px;
        }
        select{
          display:block;
          max-width:300px;
          width:100%;
          border:1px solid #F0EEF5;
          line-height:33px;
          height:35px;
          padding:0 15px;
        }
      }
    }
  }
</style>