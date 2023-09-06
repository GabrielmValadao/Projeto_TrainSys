<template>
  <h1>Exercícios</h1>

  <div>
    <h2>Novo Exercicio:</h2>
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
      registration: false,
    };
  },

  mounted() {
    this.fetchExercises();
  },

  methods: {
    fetchExercises() {
      axios({
        url: "http://localhost:3000/exercises",
        method: "GET",
        data: {
          exercises: [],
        },
      });

      .then((response) => {
        this.exercises= response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },

    addExercise() {
        axios({
          url: "http://localhost:3000/exercises",
          method: "POST",
          data: {
            newExercise: "",
            description: this.newExercise,
          },
        })
          .then((response) => {
            console.log(response);
            this.registration = true 
            this.fetchExercises()
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
