<template>
  <div class="page">
    <ul class="page-ul">
      <li v-if="cur>1">
        <a v-on:click="cur--, pageClick()">上一页</a>
      </li>
      <li v-if="cur==1">
        <a class="banclick">上一页</a>
      </li>
      <li v-for="index in indexs" :class="{ 'active' : cur == index}">
        <a @click="btnClick(index)">{{ index }}</a>
      </li>
      <li v-if="cur!=all">
        <a @click="cur++,pageClick()">下一页</a>
      </li>
      <li v-if="cur == all">
        <a class="banclick">下一页</a>
      </li>
      <li><a>共<i>{{all}}</i>页</a></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'page',
    props: {
      all: Number // 总页码
    },
    data () {
      return {
        cur: 1 // 当前页码
      }
    },
    computed: {
      indexs: function () {
        let left = 1
        let right = this.all
        let ar = []
        if (this.all >= 5) {
          if (this.cur > 3 && this.cur < this.all - 2) {
            left = this.cur - 2
            right = this.cur + 2
          } else {
            if (this.cur <= 3) {
              left = 1
              right = 5
            } else {
              right = this.all
              left = this.all - 4
            }
          }
        }
        while (left <= right) {
          ar.push(left)
          left++
        }
        return ar
      }
    },
    methods: {
      btnClick: function (data) {
        console.log(data)
        if (data !== this.cur) {
          this.cur = data
          this.$emit('getData', this.cur - 1)
        }
      },
      pageClick: function () {
        this.$emit('getData', this.cur - 1)
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  .page{
    margin-top:35px;
    .page-ul{
      li{
        display:inline-block;
        margin:0 2px;
        text-align:center;
        border:1px solid #dfdfdf;
        line-height:28px;
        background:#dadada;
        color:#666;
        font-size:14px;
        a{
          display:inline-block;
          padding:2px 13px;
          color:#666;
          cursor:pointer;
          &.banclick{
            background:#f2f2f2;
            color:#dadada;
          }
        }
        &:first-child{
          font-family:'宋体';
        }
        &:last-child{
          font-family:'宋体';
        }
        &.active{
          background:#45bcf9;
          color:#fff;
          a{
            color:#fff;
          }
        }
      }
    }
  }
</style>