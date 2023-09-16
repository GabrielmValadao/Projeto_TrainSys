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
  <h2 class="pa-2 ma-2">Hoje</h2>

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
    :class="{ 'font-color': clickButton['segunda'] }"
    >Segunda-feira</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('terca')"
    :class="{ 'font-color': clickButton['terca'] }"
    >Terça-feira</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('quarta')"
    :class="{ 'font-color': clickButton['quarta'] }"
    >Quarta-feira</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('quinta')"
    :class="{ 'font-color': clickButton['quinta'] }"
    >Quinta-feira</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('sexta')"
    :class="{ 'font-color': clickButton['sexta'] }"
    >Sexta-feira</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('sabado')"
    :class="{ 'font-color': clickButton['sabado'] }"
    >Sábado</v-btn
  >
  <v-btn
    variant="elevated"
    class="ma-2"
    color="#DBD5B5"
    @click="displayWorkouts('domingo')"
    :class="{ 'font-color': clickButton['domingo'] }"
    >Domingo</v-btn
  >

  <div>
    <div class="border-lg ma-2" v-if="daySelected">
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

      clickButton: {
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
        domingo: false,
      },

      lastClick: null,
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
      this.clickButton[day] = !this.clickButton[day];
      if (this.lastClick !== null) {
        this.clickButton[this.lastClick] = false
      }
      this.clickButton[day] = true;
      this.lastClick = day
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

<style scoped>
.font-color {
  
  color: white; 
}
</style>
