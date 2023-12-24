<script setup>

  import { ref, onMounted } from 'vue';
  import { useApi } from '@/stores/api'
  import { useRoute, useRouter } from 'vue-router'

  const api = useApi()
  const route = useRoute()
  const router = useRouter()

  const userId = ref('')
  const deleteUserId = ref('')

  const newNome = ref('')
  const newIdade = ref('')
  const newUf = ref('')

  const updateId = ref('')
  const updateNome = ref('')
  const updateIdade = ref('')
  const updateUf = ref('')

  const results = ref(null)


  //New user
  const newUser = () => {
    return {
      "nome": newNome.value,
      "idade": newIdade.value,
      "uf": newUf.value
    } 
  }

  //Update User
  const updateUser = () => {
    return {
      "nome": updateNome.value,
      "idade": updateIdade.value,
      "uf": updateUf.value
    } 
  }



  const get = async (param) => { 
    const res = await api._get(param) 
    results.value = res.data
  }

  const post = async (param, data) => { 
    const res = await api._post(param, data) 
    results.value = res.data
  }

  const patch = async (param, data) => { 
    const res = await api._patch(param, data) 
    results.value = res.data
  }

  const deleteUser = async (param) => { 
    const res = await api._delete(param) 
    results.value = res.data
  }

  onMounted(() => {
    get('/')
  })


</script>

<template>

  <div class="container">

    <div class="nav-btns">

      <button @click="router.push({ path: `/users_data/${api.userInfo.id}` })">
          Go to id {{ api.userInfo.id }}
      </button>
    
    </div>

    <div class="nav-btns">
    
      <div class="col">
        <button @click="get('/')">
          Root
        </button>
      </div>

      <div class="col">
        <button @click="get('/users_data')">
          Get all
        </button>
      </div>

      <div class="col">
        <button :disabled="userId == '' || userId == 0" @click="get('/users_data/' + userId)">
          Get by id
        </button>
        <input v-model="userId" placeholder="id" name="id"/>
      </div>

      <div class="col">
        <button @click="post('/users_data', newUser())">
          Post new
        </button>
        <input v-model="newNome" placeholder="nome" name="novo_nome"/>
        <input v-model="newIdade" placeholder="idade" name="nova_idade"/>
        <input v-model="newUf" placeholder="uf" name="novo_uf"/>
      </div>

      <div class="col">
        <button :disabled="updateId == ''|| updateId == 0 " 
        @click="patch('/users_data/' + updateId, updateUser())">
          Patch by id
        </button>
        <input v-model="updateId" placeholder="id" name="id"/>
        <input v-model="updateNome" placeholder="nome" name="nome"/>
        <input v-model="updateIdade" placeholder="idade" name="idade"/>
        <input v-model="updateUf" placeholder="uf" name="uf"/>
      </div>

      <div class="col">
        <button :disabled="deleteUserId == '' || deleteUserId == 0" 
        @click="deleteUser('/users_data/' + deleteUserId)">
          Delete
        </button>
        <input v-model="deleteUserId" placeholder="id" name="id"/>
      </div>
      
    </div>
    
    <div v-if="results != null" class="results">
      <h2>
        Resultado:
      </h2>
      <p>{{ results }}</p>
    </div>
    <div v-else class="rootPoint">
      outro texto
    </div>

  </div>
  
</template>

<style scoped>
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    width: 100%;
  }
  .nav-btns{
    display: flex;
    justify-content: space-around;
    align-items: start;
  }
  .col{
    flex: 1;
    padding: 1em;
    display: flex;
    justify-content: center;
    flex-direction:column;
  }
  .rootPoint{
    width: 50%;
    margin: 2em;
    padding: 2em;
    border: 1px solid #666;
    border-radius: 5px;
  }
  .results{
    width: 80%;
    margin: 2em;
    padding: 2em;
    border-top: 1px dotted #333;
  }
</style>
