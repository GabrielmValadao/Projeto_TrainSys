<template>
  <v-app>
    <Header></Header>
  </v-app>
  <div class="ma-1">
    <h2 class="d-flex justify-center align-center ma-2">
      <v-icon
        color="rgb(223, 70, 97)"
        icon="mdi-kettlebell"
        size="large"
      ></v-icon>
      Treinos - {{ studentName }}
    </h2>
  </div>
  <v-divider></v-divider>
  <h3 class="ma-10">Hoje</h3>

  <div>
    <v-list>
      <v-list-item
        class="d-flex align-center"
        v-for="workout in wourkoutDay[daySelected]"
        :key="workout.id"
      >
        <v-list-item-action>
          <v-checkbox v-model="workout.checked" @change="checkWorkout(workout)">
          </v-checkbox>

          <v-list-item-content>
            <v-list-item-title style="height: 45px">
              {{ workout.exercise_description }} |
              {{ workout.repetitions }} repetições | {{ workout.weight }}KG |
              {{ workout.break_time }} minutos de pausa
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>

  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('segunda')"
    >Segunda-feira</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('terca')"
    >Terça-feira</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('quarta')"
    >Quarta-feira</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('quinta')"
    >Quinta-feira</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('sexta')"
    >Sexta-feira</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('sabado')"
    >Sábado</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('domingo')"
    >Domingo</v-btn
  >

  <div>
    <div v-if="daySelected">
      <h2>{{ daySelected }}</h2>
      <v-list>
        <v-list-item
          v-for="workout in wourkoutDay[daySelected]"
          :key="workout.id"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ workout.exercise_description }} |
              {{ workout.repetitions }} repetições | {{ workout.weight }} Kg |
              {{ workout.break_time }} minutos de pausa
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../../assets/components/HeaderPosLogin/HeaderPosLogin.vue";

export default {
  data() {
    return {
      studentName: "",
      wourkoutDay: {},
      daySelected: null,
    };
  },

  components: {
    Header,
  },
  mounted() {
    const studentId = this.$route.params.id;
    this.getTraining(studentId);
  },
  methods: {
    getTraining(studentId) {
      axios
        .get(`http://localhost:3000/workouts?student_id=${studentId}`)
        .then((response) => {
          if (
            response.data &&
            Array.isArray(response.data.workouts) &&
            response.data.workouts.length > 0
          ) {
            const workouts = {};
            response.data.workouts.forEach((wourkout) => {
              const dayOfWeek = wourkout.day;
              if (!workouts[dayOfWeek]) {
                workouts[dayOfWeek] = [];
              }
              workouts[dayOfWeek].push({ ...wourkout, checked: false });
            });
            this.wourkoutDay = workouts;
            this.studentName = response.data.workouts[0].student_name;
          } else {
            console.error("Resposta inválida:", response);
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar treinos:", error);
        });
    },
    displayWorkouts(day) {
      this.daySelected = day;
    },
    checkWorkout(workout) {
      const { id, day } = workout;
      const studentId = this.$route.params.id;

      axios
        .post("http://localhost:3000/workouts/check", {
          workout_id: id,
          student_id: studentId,
          day_of_week: day,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert("Erro ao marcar treino");
          console.log(error);
        });
    },
  },
};
</script>
