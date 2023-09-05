<template>
  <h1>Bem vindo(a), {{ usuarioLogado }}</h1>
  <v-form @submit.prevent="handleSubmit">
    <v-card variant="outlined">
      <v-card-title>Alunos Cadastrados</v-card-title>
      <v-card-text>{{ alunosCadastrados }}</v-card-text>
      <v-card-actions>
        <v-btn type="submit">Adicionar</v-btn>
      </v-card-actions>
    </v-card>

    <v-card variant="outlined">
      <v-card-title>Exercícios</v-card-title>
      <v-card-text>{{ exercicios }}</v-card-text>
      <v-card-actions>
        <v-btn type="submit">Adicionar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      alunosCadastrados: 0,
      exercicios: 0,
      usuarioLogado: localStorage.getItem('user_name'),
    };
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    fetchData() {
        axios({
          url: "http://localhost:3000/dashboard",
          method: "GET",
          data: {
            alunosCadastrados: this.this.alunosCadastrados,
            exercicios: this.exercicios,
          },
        })
        .then((response) => {
            this.alunosCadastrados = response.data.alunosCadastrados;
            this.exercicios = response.data.exercicios
        })
        .catch((error) => {
            console.log(error)
            alert('Erro ao buscar os dados:', error)
        })
    }
  }
};
</script>
