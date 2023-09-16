<template>
  <v-app>
    <Header></Header>
  </v-app>

  <div class="d-flex justify-center align-center min-vh-100">

    <v-form ref="form" @submit.prevent="handleSubmit" class="ma-10 pa-5">
      <h3>Faça seu login no nosso app</h3>
      <br>
      <v-text-field
      
      label="E-mail"
      type="email"
      variant="underlined"
      v-model="email"
      :error-messages="this.errors.email"
      />
      
      <v-text-field
      
      label="Senha"
      type="password"
      variant="underlined"
      v-model="password"
      :error-messages="this.errors.password"
      />
    <br />
    
      <div class="d-flex justify-start align-start">
        <v-btn color="#DBD5B5" type="submit" class="mr-4">Entrar</v-btn>
        <router-link to="/cadastro/usuario">
        <v-btn color="#DBD5B5">
          Ainda não possui conta?
          <router-link to="/cadastro/usuario" style="text-decoration:none">Cadastre-se</router-link>
        </v-btn>
      </router-link>
      </div>
      
    
  </v-form>
</div>
</template>

<script>
import Header from "../../assets/components/headerLoginCadastro/headerLoginCadastro.vue";
import * as yup from "yup";
import axios from "axios";
import { captureErrorYup } from "../../../src/utils/captureErrorYup";
export default {
  data() {
    return {
      email: "",
      password: "",

      errors: {},
    };
  },

  components: {
    Header,
  },

  methods: {
    handleSubmit() {
      try {
        const schema = yup.object().shape({
          email: yup
            .string()
            .email("Email não é valido")
            .required("O email é obrigatório"),
          password: yup.string().required("A senha é obrigatória"),
        });

        schema.validateSync(
          {
            email: this.email,
            password: this.password,
          },
          { abortEarly: false }
        );

        axios({
          url: "http://localhost:3000/sessions",
          method: "POST",
          data: {
            email: this.email,
            password: this.password,
          },
        })
          .then((response) => {
            localStorage.setItem("user_toke", response.data.token);
            localStorage.setItem("user_name", response.data.name);

            this.$router.push("/Dashboard");
          })

          .catch((error) => {
            console.log(error);
            //não tem message na api
            if (error.response?.data?.message) {
              alert(error.response.data.message);
            } else {
              alert("Houve um erro ao efetuar o login");
            }
          });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error);
          this.errors = captureErrorYup(error);
        }
      }
    },
  },
};
</script>
