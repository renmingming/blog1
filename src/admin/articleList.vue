<template>
  <div class="articleList">
    <table>
      <tr>
        <th>编号</th>
        <th>id</th>
        <th>标题</th>
        <th>编辑</th>
        <th>分类</th>
        <th>阅读量</th>
        <th>创建时间</th>
        <th>修改时间</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in newestArticle">
        <td>{{index}}</td>
        <td>{{item.id}}</td>
        <td>{{item.title}}</td>
        <td>{{item.author}}</td>
        <td>{{item.type_name}}</td>
        <td>{{item.browse_times}}</td>
        <td>{{item.create_time}}</td>
        <td>{{item.update_time}}</td>
        <td>
          <button @click.prevent="showMask(index)">编辑</button>
          <button @click.prevent="delArticle(item.id)">删除</button>
        </td>
      </tr>
    </table>
    <div v-if="show" class="edit-mask form-style" @click.self="maskhide">
      <form action="">
      <div class="list">
          <label class="title">文章id：</label>
          <div class="val">
            <span class="title">{{id}}</span>
          </div>
        </div>
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
              <option :value="val.id" v-for="val in typeData">{{val.type_name}}</option>
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
        <button @click.prevent="save()">保存</button>
      </form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import UE from '@/admin/editor.vue'
  export default {
    name: 'articleList',
    data () {
      return {
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 400
        },
        newestArticle: '',
        typeData: '',
        show: false,
        id: '',
        title: '',
        author: '',
        selected: '',
        abstract: '',
        defaultMsg: ''
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        axios.get('/public/index/Index/indexData')
        .then((res) => {
          this.newestArticle = res.data.NewestArticle
          this.typeData = res.data.ArticleTypeData.data
          console.log(this.newestArticle)
        })
      },
      delArticle (id) {
        axios.post('/public/admin/Article/articleDel', {
          'id': id
        }).then((res) => {
          if (res.data.code === 1) {
            alert('删除成功')
          } else {
            alert('删除失败')
          }
        })
      },
      showMask (index) {
        this.id = this.newestArticle[index].id
        this.title = this.newestArticle[index].title
        this.author = this.newestArticle[index].author
        this.selected = this.newestArticle[index].type_val
        this.abstract = this.newestArticle[index].abstract
        this.defaultMsg = this.newestArticle[index].content
        this.show = true
      },
      save () {
        let content = this.$refs.ue.getUEContent()
        axios.post('/public/admin/Article/editArticle', {
          'id': this.id,
          'title': this.title,
          'author': this.author,
          'abstract': this.abstract,
          'type': this.selected,
          'content': content
        }).then((res) => {
          if (res.data.code === 1) {
            alert('更新成功')
            this.$router.push({
              path: '/'
            })
          } else {
            alert('更新失败')
          }
        })
      },
      maskhide () {
        this.show = false
      }
    },
    components: {
      UE
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  .articleList{
    table{
      display:block;
      width:100%;
      tr{
        background:#dfdfdf;
        &:nth-child(even){
          background:#fff;
        }
      }
      td,th{
        border:1px solid #fff;
        padding:0 20px;
        margin:0 1px;
        line-height:35px;
      }
    }
    .edit-mask{
      position:fixed;
      width:100%;
      height:100%;
      overflow-y:scroll;
      bottom:0;
      top:0;
      left:0;
      background:rgba(0,0,0,0.5);
      form{
        width:100%;
        padding:5%;
        max-width:800px;
        min-height:100%;
        margin:0 auto;
       /* position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);*/
        background:#fff;
      }
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
  }
</style>
