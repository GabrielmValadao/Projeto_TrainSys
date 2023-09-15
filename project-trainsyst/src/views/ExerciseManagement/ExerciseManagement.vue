<template>
  <v-app>
    <Header></Header>
  </v-app>
  <h1>Exercícios</h1>

  <v-form refr="form" @submit.prevent="addExercise">
    <div>
    <h2>Novo Exercício:</h2>
    <v-text-field
    v-model="newExercise"
    label="Nome do exercício"
    variant="underlined"
    :error-messages="this.errors.newExercise" 
    />
    <v-btn type="submit">Cadastrar exercício</v-btn>
  </div>
  
  <div>
    <h2>Lista de exercícios:</h2>
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
