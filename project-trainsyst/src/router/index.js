import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login/Login.vue'
import UserRegistration from '../views/UserRegistration/UserRegistration.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import ExerciseManagement from '../views/ExerciseManagement/ExerciseManagement.vue'
import StudentManagement from '../views/StudentManagement/StudentManagement.vue'
import NewStudentRegister from '../views/NewStudentRegister/NewStudentRegister.vue'
import TrainingRegistration from '../views/TrainingRegistration/TrainingRegistration.vue'
import TrainingVisualization from '../views/TrainingVisualization/TrainingVisualization.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Cadastro/usuario',
      name: 'UserRegistration',
      component: UserRegistration
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/Gerenciamento/Exercicios',
      name: 'ExerciseManagement',
      component: ExerciseManagement
    },
    {
      path: '/Gerenciamento/Aluno',
      name: 'StudentManagement',
      component: StudentManagement
    },
    {
      path: '/Cadastro/Novo/Aluno',
      name: 'NewStudentRegister',
      component: NewStudentRegister
    },
    {
      path: '/Cadastro/:id/Treino/',
      name: 'TrainingRegistration',
      component: TrainingRegistration
    },
    {
      path: '/Visualizacao/:id/Treino',
      name: 'TrainingVisualization',
      component: TrainingVisualization
    },
    
  ]
})

export default router
