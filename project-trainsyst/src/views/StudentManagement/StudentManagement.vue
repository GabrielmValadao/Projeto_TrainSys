<template>
  <div>
    <h1>Alunos</h1>
    <router-link to="/cadastro/novo/aluno">
      <v-btn>Cadastrar novo aluno</v-btn>
    </router-link>
  </div>

  <div>
    <v-text-field
      v-model="search"
      label="Digite o nome do aluno"
      @input="searchStudent"
    ></v-text-field>
    <v-btn>Buscar aluno</v-btn>

    <v-data-table :headers="headers" :items="filteredStudents">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>
          <router-link to="/Cadastro/Treino">
            <v-btn>Montar treino</v-btn>
          </router-link>
          <router-link to="/Visualização/Treinos">
            <v-btn>Ver treino</v-btn>
          </router-link>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      students: [],
      search: "",
      headers: [
        { title: "Nome", value: "name" },
        { title: "Ações", value: "actions" },
      ],
    };
  },

  mounted() {
    this.getStudents();
  },

  methods: {
    getStudents() {
      axios({
        url: "http://localhost:3000/students",
        method: "GET",
      })
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          console.log(error);
          alert("Erro ao buscar aluno");
        });
    },

    searchStudent() {
      //atualiza a lista de alunos ao fazer uma pesquisa
      this.getStudents() 
    },

    filterStudents() {
      const searchStudent = this.search;
      this.filteredStudents = this.students.filter((student) => {
        return student.state.includes(searchStudent);
      });
    },
  },

  computed: {
    filteredStudents() {
      return this.students.filter(student =>
        student.name.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
};
</script>
