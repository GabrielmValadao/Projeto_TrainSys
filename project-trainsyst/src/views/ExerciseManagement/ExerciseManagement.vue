<template>
  <v-app>
    <Header></Header>
  </v-app>
  <h2 class="d-flex justify-center align-center">
    Cadastro de exercícios
    <v-icon color="rgb(223, 70, 97)" icon="mdi-dumbbell" size="large"></v-icon> 
  
  </h2>
  <hr>
  <v-form ref="form" @submit.prevent="addExercise" class="pa-5 ma-5">
    <div class="d-flex justify-row">
    <v-text-field
    class="ma-6"
    v-model="newExercise"
    label="Nome do exercício"
    variant="outlined"
    :error-messages="this.errors.newExercise" 
    />
    <v-btn variant="elevated" 
    class="ma-6"
    height="60"
    color="#DBD5B5" type="submit">Cadastrar exercício</v-btn>
  </div>
  
  <div>
    <h3>Lista de exercícios:</h3>
    <ul>
      <li v-for="exercise in exercises" :key="exercise.id">
        {{ exercise.description }}
      </li>
    </ul>
  </div>
</v-form>
</template>

<script>
import Header from "../../assets/components/HeaderPosLogin/HeaderPosLogin.vue"
import axios from "axios";
import * as yup from "yup";
import { captureErrorYup } from "../../../src/utils/captureErrorYup"; 
export default {
  data() {
    return {
      newExercise: '',
      exercises: [],

      errors: {}
    };
  },
  components: {
    Header,
  },

  mounted() {
    this.getExercise()
  },

  methods: {
    getExercise() {
      axios({
        url: "http://localhost:3000/exercises",
        method: "GET",
      })
      .then((response) => {
        this.exercises = response.data
      })
    },

    addExercise() {

      try {
        const schema = yup.object().shape({
          newExercise: yup.string().required("O nome do exercício é obrigatório"),
        });

        schema.validateSync(
          {
            newExercise: this.newExercise
          },
          { abortEarly: false }
        );

        axios({
          url: "http://localhost:3000/exercises",
          method: "POST",
          data: {
            newExercise: '',
            description: this.newExercise,
          },
        })
          .then((response) => {
            console.log(response);
            alert("Exercício cadastrado com sucesso");
            this.newExercise = ''
            this.getExercise() 
          })
          .catch((error) => {
            if(error.response?.data?.message) {
              alert(error.response.data.message)
            } else {
              alert("Erro ao cadastrar o exercício");
            }
          });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error);
          this.errors = captureErrorYup(error);
        }
      }
    }
  },
};
</script>

<style scoped>
hr {
  border: none;
  border-top: 1px solid #043c4b;
  padding: 10px; 
}
</style>
