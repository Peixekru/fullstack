<template>
    <div>
        <h1>
            Id da página = {{ routeParms }}
        </h1>
        <h1>
            Path da página = {{ routePath }}
        </h1>
    </div>

    <div v-if="userData">
        <br />
        <p>Dados do Mysql</p>
        <p>Nome: {{ userData.nome }}</p>
        <p>Idade: {{ userData.idade }}</p>
        <p>Uf: {{ userData.uf }}</p>
    </div>
    
</template>

<script setup>
    import { ref } from 'vue'
    import { useApi } from '@/stores/api'
    import { useRoute } from 'vue-router'

    const api = useApi()
    const route = useRoute()

    const routeParms = ref(parseInt(route.params.id))   
    const routePath = ref(route.path)

    let userData = ref({})

    const get = ( async function () { 
        //const res = await api._get( `/users_data/${route.params.id}` )
        const res = await api._get(route.path)
        userData.value = res.data[0]
    }())
    
</script>