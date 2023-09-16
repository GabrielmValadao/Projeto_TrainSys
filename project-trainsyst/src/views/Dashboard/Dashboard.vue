<template>
  <v-app>
    <Header></Header>
  </v-app>
  <div>
    <h2 class="d-flex justify-center align-center">
      Bem vindo(a), {{ usuarioLogado }}
    </h2>
    <br />
    <div class="d-flex justify-space-betwenn">
      <v-card variant="outlined" class="d-flex justify-center align-center ma-8 pa-8" style="width: 50%">
        <v-card-title>
          <v-icon icon="mdi-weight-lifter" size="large"></v-icon> 
          Alunos Cadastrados: 
          {{ alunosCadastrados }}  
        </v-card-title>
        <v-card-actions>
          <router-link to="/gerenciamento/aluno">
            <v-btn variant="elevated" color="#DBD5B5"> Adicionar</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
      <v-card variant="outlined" class="d-flex justify-center align-center ma-8 pa-8" style="width: 50%">
        <v-card-title>
          <v-icon icon="mdi-dumbbell" size="large"></v-icon> 
          Exercícios Cadastrados:
          {{ exercicios }}
        </v-card-title>
        <v-card-actions>
          <router-link to="/gerenciamento/exercicios">
            <v-btn variant="elevated" color="#DBD5B5">Adicionar</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import Header from "../../assets/components/HeaderPosLogin/HeaderPosLogin.vue";
import axios from "axios";
export default {
  data() {
    return {
      alunosCadastrados: 0,
      exercicios: 0,
      usuarioLogado: localStorage.getItem("user_name"),
    };
  },

  components: {
    Header,
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      axios({
        url: "http://localhost:3000/dashboard",
        method: "GET",
      })
        .then((response) => {
          this.alunosCadastrados = response.data.amount_students;
          this.exercicios = response.data.amount_exercises;
          this.nomeUsuario = localStorage.getItem("nomeUsuario");
        })
        .catch((error) => {
          console.log(error);
          alert("Erro ao buscar os dados:", error);
        });
    },
  },
};
</script>
