<template>
  <h1>Exercícios</h1>
  <v-form @submit.prevent="addExercises">
    <v-text-field
      v-model="newExercise"
      label="Nome do exercício"
      variant="underlined"
      required
    />
    <v-btn>Cadastrar exercicio</v-btn>

    <v-list>
      <v-list-item v-for="exercise in Exercise" :key="exercise.id"> 
      <v-list-item-title>
        {{ exercise.data }}
      </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      newExercise: "",
      exercises: []
    };
  },

  mounted : {
      Exercise() {
      return this.exercise((exercise) => 
      exercise.includes(this.exercise.data))
    }
  },

  methods: {
     fetchExercises() {
        axios({
          url: "http://localhost:3000/exercises",
          method: "GET",
          data: {
            exercises: []
          },
        })
    },

    addExercises() {
      try {

        axios({
          url: "http://localhost:3000/exercises",
          method: "POST",
          data: {
            newExercise: ''
          },
        })
          .then((response) => {
            console.log(response)
          alert('Exercicio cadastrado com sucesso')
          this.fetchExercises()
        })
        .catch((error) => {
          console.log(error)
          alert('Erro ao buscar o exercício')
        })

      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>
