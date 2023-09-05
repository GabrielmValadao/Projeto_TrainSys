<template>
  <h1>Bem vindo(a), {{ usuarioLogado }}</h1>

    <v-card variant="outlined">
      <v-card-title
        >Alunos Cadastrados
        {{ alunosCadastrados }}
      </v-card-title>
      <v-card-actions>
        <router-link to="/gerenciamento/aluno">
            <v-btn>Adicionar</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>

    <v-card variant="outlined">
      <v-card-title>
        Exercícios
        {{ exercicios }}
      </v-card-title>
      <v-card-actions>
        <router-link to="/gerenciamento/exercicios">
            <v-btn>Adicionar</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      alunosCadastrados: 0,
      exercicios: 0,
      usuarioLogado: localStorage.getItem("user_name"),
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      axios({
        url: "http://localhost:3000/dashboard",
        method: "GET",
        data: {
          alunosCadastrados: this.alunosCadastrados,
          exercicios: this.exercicios,
        },
      })
        .then((response) => {
          this.alunosCadastrados = response.data.alunosCadastrados;
          this.exercicios = response.data.exercicios;
        })
        .catch((error) => {
          console.log(error);
          alert("Erro ao buscar os dados:", error);
        });
    },
  },
};
</script>
