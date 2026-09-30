import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "¡Bienvenido a mi FARA Collections!",
      verificationEmailBody: (createCode) => `Utilice este código para confirmar su cuenta: ${createCode()}`,
    }
  },
  userAttributes: {
    // especificar nombre de pila "given_name" como atributo
    givenName: {
      mutable: true,
      required: false,
    },
    // especificar apellido "family_name" como atributo
    familyName: {
      mutable: true,
      required: false,
    },
  },
})