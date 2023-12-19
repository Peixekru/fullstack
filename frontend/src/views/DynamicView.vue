<template>
    <div>
        <h1>
            Id da página = {{ routeParms }}
        </h1>
        <h1>
            Path da página = {{ routePath }}
        </h1>
    </div>

    <div v-if="results">
        <br />
        <p>Dados do Mysql</p>
        <p>Nome: {{ results.nome }}</p>
        <p>Idade: {{ results.idade }}</p>
        <p>Uf: {{ results.uf }}</p>
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

    let results = ref({})

    const get = ( async function () {
        results.value = await api.get( `/clientes/${route.params.id}` )
        //results.value = await api.get( route.path )
    }())
    
</script>