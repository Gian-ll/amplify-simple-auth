import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    // especificar nombre de pila "given_name" como atributo
    givenName: {
      mutable: true,
      required: true,
    },
    // especificar apellido "family_name" como atributo
    familyName: {
      mutable: true,
      required: true,
    },
  },
})