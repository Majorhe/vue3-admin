<template>
    <div class="login-page">
        <div class="login-form">
            <h1 class="text-align-center login-title">{{ $t('login.title') }}</h1>
            <el-form ref="loginForm">
                <el-form-item prop="username">
                    <el-input v-model="form.username" size="large" @keyup.enter="handleSubmit" :placeholder="$t('login.inputPlaceholder.username')"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" size="large" @keyup.enter="handleSubmit" :placeholder="$t('login.inputPlaceholder.password')" autocomplete="off"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="large" :round="true" :loading="loading" @click="handleSubmit" style="width: 100%">{{ $t('button.login') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login-page',
    data() {
        return {
            loading: false,
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$store.commit('user/set', this.form)
            this.$router.push({name: 'dashboard'})
        }
    }
}
</script>

<style lang="scss" scoped>
.login-page {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/login.jpg');
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

.auto-login {
    margin-bottom: 24px;
    text-align: left;
}
</style>