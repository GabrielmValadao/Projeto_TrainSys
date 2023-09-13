<template>
  <h1>Cadastro de Treino</h1>
  <v-container>
    <v-form ref="form" @submit.prevent="handleSubmit">
      <v-select
        label="Selecione o exercício"
        v-model="selectedExercise"
        :items="exercises"
        item-title="description"
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
      student_id: this.$route.params.id,
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

      errors: {},
    };
  },

  mounted() {
    this.fetchExercises();
  },

  methods: {
    fetchExercises() {
      {
        axios
          .get("http://localhost:3000/exercises")
          .then(({ data }) => (this.exercises = data));
      }
    },
    handleSubmit() {
      
      const cadastroTreinoData = {
        student_id: this.student_id, 
        exercise_id: this.selectedExercise,
        repetitions: this.repetitions,
        weight: this.weight,
        break_time: this.breakTime,
        observations: this.observations,
        day: this.selectedDay,
      };
      {
        axios
          .post("http://localhost:3000/workouts", cadastroTreinoData)
          .then(() => {
            this.$refs.form.reset()
            alert("Treino cadastrado com sucesso!")
          });
      }
    },
  },
};
</script>
