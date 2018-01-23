<template>
  <div class="login">
    <h2>请登录</h2>
    <form action="">
      <input type="text" placeholder="管理用户名" v-model="username">
      <input type="password" placeholder="密码" v-model="password">
      <button @click.prevent="login">登录</button>
    </form>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        if (this.username === '' || this.password === '') {
          alert('请输入用户名和密码')
        }
        axios.post('/public/admin/Login/login', {
          name: this.username,
          psd: this.password
        }).then((res) => {
          if (res.data === 0) {
            alert('没有此用户名')
          }
          if (res.data === 1) {
            alert('密码错误')
          }
          if (res.data === 2) {
            window.sessionStorage.setItem('user', this.username)
            this.$store.dispatch('setLoginState')
            let redirect = this.$route.query.redirect
            // let redirectName = this.$route.query.redirect.slice(1)
            // console.log(redirectName)  // /admin
            this.$router.push({
              // name: redirectName,
              path: redirect
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
  .login{
    max-width:300px;
    margin:30px auto;
    h2{
      margin-bottom:30px;
      text-align:center;
      font-size:25px;
      color:#777;
      letter-spacing:3px;
    }
    input{
      display:block;
      width:100%;
      padding:0 15px;
      line-height:35px;
      margin:15px auto;
      border:1px solid #dfdfdf;
    }
    button{
      display:block;
      width:100%;
      margin: 30px auto 0;
      line-height:35px;
      height:35px;
      text-align:center;
      border:1px solid #45bcf9;
      background:#45bcf9;
      color:#fff;
    }
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {/* WebKit browsers */
      color: #aaa;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {/* Mozilla Firefox 4 to 18 */
      color: #aaa;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {/* Mozilla Firefox 19+ */
      color: #aaa;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {/* Internet Explorer 10+ */
      color: #aaa;
  }
  input,textarea{
      color: #666;
  }
</style>