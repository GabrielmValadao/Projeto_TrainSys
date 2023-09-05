<template>
  <h1>Bem vindo, {{ usuarioLogado }}</h1>
  <v-container>
    <v-card variant="outlined">
      <v-card-title>Alunos Cadastrados</v-card-title>
      <v-card-text>{{ alunosCadastrados }}</v-card-text>
      <v-card-actions>
        <v-btn>Adicionar</v-btn>
      </v-card-actions>
    </v-card>

    <v-card variant="outlined">
      <v-card-title>Exercícios</v-card-title>
      <v-card-text>{{ exercicios }}</v-card-text>
      <v-card-actions>
        <v-btn>Adicionar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      alunosCadastrados: 0,
      exercicios: 0,
      usuarioLogado: "",
    };
  },
};
</script>
