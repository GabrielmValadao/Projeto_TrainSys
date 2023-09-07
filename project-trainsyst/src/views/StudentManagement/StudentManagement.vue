<template>
  <div>
    <h1>Alunos</h1>
    <router-link to="/cadastro/novo/aluno">
      <v-btn>Cadastrar novo aluno</v-btn>
    </router-link>
  </div>

  <div>
    <v-text-field v-model="search" label="Digite o nome do aluno" ></v-text-field>
    <v-btn>Buscar aluno</v-btn>
  
    <v-data-table :headers="headers" :items="filterStudents"></v-data-table>

  </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            headers: [
                {title: 'Nome', value: 'name'},
                {title: 'Ações', value: 'actions'}
            ]
        }
        
    }
}
</script>
