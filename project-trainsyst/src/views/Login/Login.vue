<template>
    <h1>Login</h1>
    <v-form ref="form" @submit.prevent="handleSubmit">
        <v-text-field label="E-mail" type="email" variant="underlined" v-model="email"
        :error-messages="this.errors.email" />

        <v-text-field label="Senha" type="password" variant="underlined" v-model="password"
        :error-messages="this.errors.password" />
        <v-btn type="submit">Entrar</v-btn>

        <v-form>
            <v-alert v-if="error" type="error">{{ loginError }}</v-alert>
        </v-form>

        <p>
            Ainda não possui conta?
            <router-link to="/cadastro/usuario">Cadastre-se</router-link>
        </p>
    </v-form>
</template>

<script>
import * as yup from "yup";
import axios from "axios";
import { captureErrorYup } from "../../../src/utils/captureErrorYup";
export default {
    data() {
        return {
            email: '',
            password: '',

            errors: {},
            loginError: null 
        }
    },

    methods: {
        handleSubmit() {
            this.errors= {}
            this.loginError = null
            try {
                const schema = yup.object().shape({
                    email: yup
                        .string()
                        .email("Email não é valido")
                        .required("O email é obrigatório"),
                    password: yup
                        .string()
                        .required("A senha é obrigatória")
                });

                schema.validateSync(
                    {
                        email: this.email,
                        password: this.password,
                    },
                    { abortEarly: false }
                );

                axios({
                    url:'http://localhost:3000/sessions',
                    method: 'POST',
                    data: {
                        email: this.email,
                        password: this.password 
                    }
                })

                .then((response) => {
                    localStorage.setItem("user_toke", response.data.token)
                    localStorage.setItem("user_name", response.data.name)
                    
                    this.$router.push('/Dashboard')
                })

                .catch((error)=> {
                    this.loginError= error.response.data.message;
                    console.log(error)
                })

            } catch (error) {
                if (error instanceof yup.ValidationError) {
                    console.log(error);
                    this.errors = captureErrorYup(error);
                }
            }
        }
    }
}
</script>
