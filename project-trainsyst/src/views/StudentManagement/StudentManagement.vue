<template>
  <v-app>
    <Header></Header>
  </v-app>
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
    ></v-text-field>
    <v-btn @click="filteredStudents">Buscar aluno</v-btn>

    <br />

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in studentsFilter" :key="student.id">
          <td>
            {{ student.name }}
          </td>
          <td>
            {{ student.email }}
          </td>
          <td>
            <router-link :to="`/Cadastro/${student.id}/Treino/`">
              <v-btn>Montar treino</v-btn>
            </router-link>
            <router-link :to="`/Visualizacao/${student.id}/Treino/`">
              <v-btn>Ver treino</v-btn>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Header from "../../assets/components/HeaderPosLogin/HeaderPosLogin.vue"
import axios from "axios";

export default {
  data() {
    return {
      students: [],
      search: "",
      studentsFilter: [],
    };
  },

  components: {
    Header,
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
          this.students = response.data.students;
          this.studentsFilter = this.students;
        })
        .catch((error) => {
          console.log(error);
          alert("Erro ao buscar aluno");
        });
    },

    filteredStudents() {
      this.studentsFilter = this.students.filter((student) => {
        return (
          student.name.toLowerCase().includes(this.search.toLowerCase()) ||
          student.email.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
},
}
</script>
