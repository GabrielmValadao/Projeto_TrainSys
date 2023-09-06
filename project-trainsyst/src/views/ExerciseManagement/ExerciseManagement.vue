<template>
  <h1>Exercícios</h1>

  <div>
    <h2>Novo Exercício:</h2>
    <v-text-field
      v-model="newExercise"
      label="Nome do exercício"
      variant="underlined"
      required
    />
    <v-btn @click="addExercise">Cadastrar exercício</v-btn>
  </div>

  <div>
    <h2>Lista de exercícios:</h2>
    <ul>
      <li v-for="exercise in exercises" :key="exercise.id">
        {{ exercise.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newExercise: "",
      exercises: [],
    };
  },

  mounted() {
    axios({
        url: "http://localhost:3000/exercises",
        method: "GET",
      })
      .then((response) => {
        this.exercises = response.data
      })
  },

  methods: {
    addExercise() {
        axios({
          url: "http://localhost:3000/exercises",
          method: "POST",
          data: {
            description: this.newExercise,
          },
        })
          .then((response) => {
            console.log(response);
            this.newExercise = ''
            alert("Exercício cadastrado com sucesso");
          })
          .catch((error) => {
            console.log(error);
            alert("Erro ao cadastrar o exercício");
          });
    },
  },
};
</script>
