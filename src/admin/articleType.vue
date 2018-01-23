<template>
  <div class="articleType">
    <button @click.prevent="insetMask">添加类名</button>
    <table>
      <tr>
        <th>编号</th>
        <th>id</th>
        <th>分类名</th>
        <th>描述</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in typeData">
        <td>{{index}}</td>
        <td>{{item.id}}</td>
        <td>{{item.type_name}}</td>
        <td>{{item.type_describe}}</td>
        <td>
          <button @click.prevent="showMask(index)">编辑</button>
          <button @click.prevent="delType(item.id)">删除</button>
        </td>
      </tr>
    </table>
    <div v-if="show" class="edit-mask" @click.self="maskhide">
      <form action="">
        <div class="list" v-if="!btnShow">
          <label class="title">文章id：</label>
          <div class="val">
            <span class="title">{{id}}</span>
          </div>
        </div>
        <div class="list">
          <label class="title">分类名：</label>
          <div class="val">
            <input type="text" name="type_name" v-model="typeName">
          </div>
        </div>
        <div class="list">
          <label class="title">修改描述：</label>
          <div class="val">
            <input type="text" name="type_describe" v-model="typeDescribe">
          </div>
        </div>
        <button @click.prevent="updata()" v-if="!btnShow">更新</button>
        <button @click.prevent="insert()" v-if="btnShow">添加</button>
      </form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'articleType',
    data () {
      return {
        id: '',
        typeName: '',
        typeDescribe: '',
        typeData: '',
        show: false,
        btnShow: false
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        axios.get('/public/index/Index/indexData')
          .then((res) => {
            this.typeData = res.data.ArticleTypeData.data
            console.log(this.typeData)
          })
      },
      insert () {
        axios.post('/public/admin/Article/addType', {
          'name': this.typeName
        }).then((res) => {
          if (res.data.code === 1) {
            this.getData()
            alert('添加成功')
            this.router.push({
              path: '/admin/articleType'
            })
          } else {
            alert('添加失败')
          }
        })
      },
      delType (id) {
        axios.post('/public/admin/Article/delType', {
          'id': id
        }).then((res) => {
          if (res.data.code === 1) {
            alert('删除成功！')
          } else {
            alert('删除失败！')
          }
        })
      },
      showMask (index) {
        this.show = true
        this.btnShow = false
        this.id = this.typeData[index].id
        this.typeName = this.typeData[index].type_name
        this.typeDescribe = this.typeData[index].type_describe
      },
      insetMask () {
        this.show = true
        this.btnShow = true
        this.id = ''
        this.typeName = ''
        this.typeDescribe = ''
      },
      maskhide () {
        this.show = false
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  .articleType{
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
    bottom:0;
    top:0;
    left:0;
    background:rgba(0,0,0,0.5);
    form{
      width:100%;
      min-height:100%;
      padding:5%;
      max-width:800px;
      margin:0 auto;
      /*position:absolute;
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
