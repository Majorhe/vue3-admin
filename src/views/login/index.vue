<template>
  <div class="login-page">
    <div class="login-form">
      <h1 class="text-align-center login-title">平台管理系统</h1>
      <el-form ref="loginForm" :model="form" :rules="rules">
        <el-form-item prop="username" style="margin-bottom: 28px">
          <el-input v-model="form.username" size="large" @keyup.enter="handleSubmit" :placeholder="$t('login.placeholder.username')"/>
<!--          <el-input v-model="form.username" size="large" @keyup.enter="handleSubmit" placeholder="手机号码"/>-->
        </el-form-item>
        <el-form-item prop="password" style="margin-bottom: 28px">
          <el-input type="password" v-model="form.password" size="large" @keyup.enter="handleSubmit"
                    :placeholder="$t('login.placeholder.password')" autocomplete="off"/>
        </el-form-item>
        <el-form-item prop="password" style="margin-bottom: 28px">
          <div class="code-box d-flex flex-justify-between flex-align-center">
            <el-input v-model="form.code" size="large"  @keyup.enter="handleSubmit" placeholder="请输入短信验证码"  class="input-code" autocomplete="off" />
            <el-button type="primary" size="large" class="code" @click="handleClick">{{Time <= 0 ? "获取验证码" : Time + "S后重新获取" }}</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" :round="true" :loading="loading" @click="handleSubmit()"
                     style="width: 100%">{{ $t('button.login') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AccountRequest from '@/api/account'
import SendCodeRequest from "@/api/sendcode"
export default {
  name: 'login-page',
  data() {
    return {
      loading: false,
      timer: null,
      Time: 0,
      form: {
        username: '',
        password: '',
        rePassword: '',
        phone: '',
        code: "",
      },
      rules: {
        username: [{ required: true, message: this.$t('login.message.username'), trigger: 'blur' }],
        password: [{ required: true, message: this.$t('login.message.password'), trigger: 'blur' }],
        code: [ { required: true, message: this.$t("login.message.code"), trigger: "blur"}],
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          AccountRequest.login(this.form.username, this.form.password, this.form.code).then(res => {
            // console.log(res)
            this.$store.commit('user/set', res.account)
            this.$store.commit('user/setToken', res.access_token)
            // localStorage.setItem("menu_list", JSON.stringify(res.data))
            this.$router.push({name: 'dashboard'})
          }).catch(err => {
            this.$message.error(err.toString() || this.$t('login.message.invalid'))
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    handleClick(){
      if(this.Time > 0) return
      SendCodeRequest.SendCode({name:this.form.username}).then(res=>{
        this.$message.success(res.message || this.$t("message.operateSuccess"));
        this.Time = 60
        this.timer = setInterval(this.codeNum,1000);
      }).catch(err => {
        this.$message.error(err || this.$t("message.operateFail"));
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/login-01.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
}

.login-title {
  color: white;
  margin-bottom: 20px;
}

.login-form {
  width: 380px;
  padding: 20px 40px 40px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: calc(50% - 150px);
  left: calc(50% - 190px);
}
.register-form {
  width: 380px;
  padding: 20px 40px 40px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: calc(50% - 250px);
  left: calc(50% - 190px);
}

.auto-login {
  margin-bottom: 24px;
  text-align: left;
}
.code-box{
  width: 100%;
  .code{
    white-space: nowrap;
    color: rgba(255,255,255,0.6);
    cursor: pointer;
    user-select: none;
  }

}
.input-code{
  max-width: 150px;
}
</style>