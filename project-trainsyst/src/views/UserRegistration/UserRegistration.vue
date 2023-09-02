<template>
    <h1>Crie sua conta</h1>
    <v-form ref="form" @submit.prevent="handleSubmit">
        <v-text-field 
        label="Nome"
        variant="outlined"
        v-model="name"
        >
        </v-text-field> 
        <v-text-field 
        label="E-mail"
        variant="outlined"
        v-model="email"
        >
        </v-text-field> 
        <v-text-field 
        label="Senha"
        variant="outlined"
        v-model="password"
        >
        </v-text-field> 
        <v-text-field 
        label="Confirme sua senha"
        variant="outlined"
        >
        </v-text-field> 

        <v-select
        label="Selecione o seu plano"
        :items="['Bronze', 'Prata', 'Ouro']"
        v-model="type_plan"
        >
        
        </v-select>
        
        <v-btn type="submit">Cadastrar</v-btn>
        <v-btn>Voltar</v-btn>

    </v-form>

</template>

<script>
import * as yup from 'yup'
import axios from 'axios'
export default{ 
 
    data() {
        return {
            name: "",
            email: "",
            password: "",
            type_plan: []

        }
    },

    methods: {
        handleSubmit() {

        }
    }
}

</script>