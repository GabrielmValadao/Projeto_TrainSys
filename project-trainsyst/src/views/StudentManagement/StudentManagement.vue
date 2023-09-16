<template>
  <v-app>
    <Header></Header>
  </v-app>
  <div class="d-flex justify-center align-center">
    <h2>
      Alunos

      <v-icon
        icon="mdi-weight-lifter"
        color="rgb(223, 70, 97)"
        size="large"
      ></v-icon>
    </h2>
  </div>

  <div class="pa-2 ma-2">
    <div class="d-flex justify-space-between align-center">
      <v-text-field
        class="ma-2"
        variant="underlined"
        v-model="search"
        label="Digite o nome do aluno"
      ></v-text-field>

      <v-btn @click="filteredStudents" class="mr-5 ma-2" color="#DBD5B5"
        >Buscar aluno</v-btn
      >
      <router-link to="/cadastro/novo/aluno">
        <v-btn class="mr-5 ma-2" color="#DBD5B5">Cadastrar novo aluno</v-btn>
      </router-link>
    </div>

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
              <v-btn color="#DBD5B5" class="mr-5">Montar treino</v-btn>
            </router-link>
            <router-link :to="`/Visualizacao/${student.id}/Treino/`">
              <v-btn color="#DBD5B5">Ver treino</v-btn>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Header from "../../assets/components/HeaderPosLogin/HeaderPosLogin.vue";
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
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #dbd5b5;
}
</style>
