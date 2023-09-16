<template>
  <v-app>
    <Header></Header>
  </v-app>
  <h2 class="d-flex justify-center align-center">
    Cadastro de exercícios
    <v-icon color="rgb(223, 70, 97)" icon="mdi-dumbbell" size="large"></v-icon> 
  
  </h2>
  <hr>
  <v-form ref="form" @submit.prevent="addExercise" class="pa-2 ma-2">
    <div class="d-flex justify-row">
    <v-text-field
    class="ma-2"
    v-model="newExercise"
    label="Nome do exercício"
    variant="outlined"
    :error-messages="this.errors.newExercise" 
    />
    <v-btn variant="elevated" 
    class="ma-2"
    height="60"
    color="#DBD5B5" type="submit">Cadastrar exercício</v-btn>
  </div>
  
  <div class="card-lista-exercicio">
    <v-card outlined class="ma-5 pa-5">
    <h3>Lista de exercícios:</h3>
    <br>
    <ul type="none">
      <li v-for="exercise in exercises"  :key="exercise.id">
          {{ exercise.description }}
        </li>
      </ul>
    </v-card>
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

.card-lista-exercicio {
  border: 1px solid #DBD5B5;
  background-color:  #DBD5B5;
  border-radius: 5px;
}

li {
  padding: 5px;
  border: 1px solid black;
}
</style>
