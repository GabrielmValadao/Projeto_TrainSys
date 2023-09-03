<template>
  <h1>Crie sua conta</h1>
  <v-form ref="form" @submit.prevent="handleSubmit">
    <v-text-field
      label="Nome"
      type="text"
      variant="outlined"
      v-model="name"
      :class="{ inputError: this.errors.name }"
    />
    <span>{{ this.errors.name }}</span>

    <v-text-field
      label="E-mail"
      type="email"
      variant="outlined"
      v-model="email"
      :class="{ inputError: this.errors.email }"
    />
    <span>{{ this.errors.email }}</span>

    <v-text-field
      label="Senha"
      type="password"
      variant="outlined"
      v-model="password"
      :class="{ inputError: this.errors.password }"
    />
    <span>{{ this.errors.password }}</span>

    <v-text-field
      label="Confirme sua senha"
      type="password"
      variant="outlined"
      v-model="verify_password"
      :class="{ inputError: this.errors.verify_password }"
    />
    <span>{{ this.errors.verify_password }}</span>

    <v-select
      label="Selecione o seu plano"
      :items="type_plan"
      v-model="select_plan"
      :class="{ inputError: this.errors.select_plan }"
    />
    <span>{{ this.errors.type_plan }}</span>

    <v-btn type="submit">Cadastrar</v-btn>
    <v-btn>Voltar</v-btn>
  </v-form>
</template>

<script>
import * as yup from "yup";
import axios from "axios";
import { captureErrorYup } from "../../../src/utils/captureErrorYup";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      verify_password: "",
      type_plan: [
        { text: "Bronze", value: "bronze" },
        { text: "Prata", value: "silver" },
        { text: "Ouro", value: "gold" },
      ],
      select_plan: "bronze",

      errors: {},
    };
  },

  methods: {
    handleSubmit() {
      try {
        const schema = yup.object().shape({
          name: yup.string().required("O nome é obrigatório!"),
          email: yup
            .string()
            .email("Email não é valido")
            .required("O email é obrigatório"),
          password: yup
            .string()
            .min(8, "A senha precisa ter no mínimo 8 caracteres")
            .max(20, "A senha deve ter entrega 8 e 20 caracteres"),
          verify_password: yup
            .string()
            .required("Informe novamente sua senha")
            .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
          plan_type: yup.array().required("Selecione um dos planos"),
        });

        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            password: this.password,
            verify_password: this.verify_password,
          },
          { abortEarly: false }
        );

        const novoUsuario = {
          name: this.name,
          email: this.email,
          password: this.password,
          type_plan: this.select_plan,
        };

        //cadastro do usuario

        axios
          .post(`http://localhost:3000/users`, novoUsuario)
          .then(() => {
            alert("Usuário cadastrado com sucesso!");
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
            if (error.response?.data?.message) {
              alert(error.response.data.message);
            } else {
              alert("Houve um erro ao efetuar cadastro do usuário");
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

<style scoped>
span {
  color: red;
}

.inputError {
  border: 1px solid red;
}
</style>
