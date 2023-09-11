<template>
  <h1>Cadastro de Treino</h1>
  <v-container>
    <v-form @submit.prevent="handleSubmit">
      <v-select
        label="Exercício"
        v-model="selectedExercise"
        :items="exercises"
        item-text="name"
        item-value="id"
        required
      />
      <v-text-field
        label="Quantidade de Repetições"
        v-model="repetitions"
        type="number"
        min="1"
        required
      />
      <v-text-field
        label="Peso (em kg)"
        v-model="weight"
        type="number"
        required
      />
      <v-text-field
        label="Tempo de Pausa (em horas : minutos)"
        v-model="breakTime"
        type="time"
        required
      />
      <v-select
        label="Dia da Semana"
        v-model="selectedDay"
        :items="daysOfWeek"
        required
      />
      <v-text-field label="Observações do Treino" v-model="observations" />
      <v-btn type="submit">Cadastrar Treino</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      exercises: [], // Para armazenar os exercícios obtidos da API
      selectedExercise: null,
      repetitions: 1,
      weight: null,
      breakTime: null,
      observations: "",
      daysOfWeek: [
        { title: "Segunda-feira", value: "segunda" },
        { title: "Terça-feira", value: "terca" },
        { title: "Quarta-feira", value: "quarta" },
        { title: "Quinta-feira", value: "quinta" },
        { title: "Sexta-feira", value: "sexta" },
        { title: "Sábado", value: "sabado" },
        { title: "Domingo", value: "domingo" },
      ],
      selectedDay: new Date().toLocaleDateString("pt-BR", { weekday: "long" }), // Dia atual como valor padrão
    };
  },

  mounted() {
        this.fetchExercises()
  },

  methods: {
    handleSubmit() {
      const cadastroTreinoData = {
        exercise_id: this.selectedExercise,
        repetitions: this.repetitions,
        weight: this.weight,
        break_time: this.breakTime,
        observations: this.observations,
        day: this.selectedDay,
      };
      axios({
        url: (`http://localhost:3000/workouts`, cadastroTreinoData),
        method: "POST",
      })
        .then((response) => {
          alert("Cadastro de treino realizado com sucesso!");
          console.log(response);
        })
        .catch((error) => {
          alert("Houve um erro ao cadastrar o treino!");
          console.log(error);
        });
    },

    fetchExercises() {
      axios({
        url: "http://localhost:3000/exercises",
        methods: "GET",
      })
        .then((response) => {
          this.exercises = response.data;
        })
        .catch((error) => {
          console.log("error ao fazer o get dos exercícios");
          console.log(error);
        });
    },
  },
};
</script>
