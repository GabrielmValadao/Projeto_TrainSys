<template>
  <h1>Cadastro de Treino</h1>
  <v-container>
    <v-form @submit.prevent="handleSubmit">
      <v-select
        label="Selecione o exercício"
        v-model="selectedExercise"
        :items="exercises"
        required
      >
        <option v-for="exercise in exercises" :key="exercise.id">
          {{ exercise.description }}
        </option>
      </v-select>

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
      <router-link to="/Gerenciamento/Aluno"
        ><v-btn>Cancelar</v-btn></router-link
      >
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

      errors: {}
    };
  },

  mounted() {
    this.fetchExercises();
  },

  methods: {
    async handleSubmit() {
      const cadastroTreinoData = {
        exercise_id: this.selectedExercise,
        repetitions: this.repetitions,
        weight: this.weight,
        break_time: this.breakTime,
        observations: this.observations,
        day: this.selectedDay,
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/workouts",
          cadastroTreinoData
        );

        alert("Treino cadastrado com sucesso") 
        this.exercises = response.data 
      } catch (error) {
        alert("Houve um erro ao cadastrar o treino!");
        console.log(error);
      }
    },

    async fetchExercises() {
      try {
        const response = await axios.get("http://localhost:3000/exercises");

        this.exercises = response.data;
      } catch (error) {
        alert("Erro ao buscar exercício");
        console.log("erro ao fazer o get do exercício");
        console.log(error);
      }
    },
  },
};
</script>
