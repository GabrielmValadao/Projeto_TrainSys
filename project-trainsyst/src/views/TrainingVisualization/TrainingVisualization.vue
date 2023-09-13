<template>
  <h1>Visualização de Treinos</h1>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        listWourkouts: [],
    };
  },

  mounted() {
    axios({
        url: `http://localhost:3000/workouts?student_id=${this.$route.params.id}`,
        method: "GET"
    })
    .then(() => {
        const response = []
        this.listWourkouts = response 
    })
    .catch((error) => {
        console.log("error ao fazer o get", error)
    })
  },

  methods: {

  }
};
</script>
