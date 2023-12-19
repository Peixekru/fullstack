<script setup>
  import { ref } from 'vue';
  import { useApi } from '@/stores/api'
  import { useRoute, useRouter } from 'vue-router'

  const api = useApi()
  const route = useRoute()
  const router = useRouter()

  const userInfos = ref ({ 
    'userName' : '', 
    'passWord' : '' 
  })

  const post = async () => { 
    const res = await api._post( route.path, userInfos.value )
    if(!res.data.token) return console.error('Get JWT token faild.')
    sessionStorage.setItem("token", res.data.token) 
    router.push({ path: '/home' })
  }

</script>

<template>
  <div class="container">
    <div class="card">
      <div>
        <p>Digite seu nome:</p>
        <input v-model="userInfos.userName" placeholder="nome" name="nome" type="text"/>
      </div>
      <div>
        <p>Digite sua senha:</p>
        <input v-model="userInfos.password" placeholder="password" name="password" type="password"/>
      </div>
      <button class="top-space" :disabled="userInfos.userName == '' || userInfos.password == '' " @click="post">
        Entrar
      </button>
    </div>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

}
.card{
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 16em;
  height: 12em;
}
.top-space{
  margin-top: 2em;
}
p{
  margin: .3em !important;
}
</style>
