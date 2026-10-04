import { defineAuth, secret } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "¡Bienvenido a mi FARA Collections!",
      verificationEmailBody: (createCode) => `Utilice este código para confirmar su cuenta: ${createCode()}`,
    },
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['openid', 'email', 'profile'],
        attributeMapping: {
          email: 'email',
          emailVerified: 'email_verified',
          givenName: 'given_name',   
          familyName: 'family_name',
        },
      },
      callbackUrls: [
        'https://dev.d1aakqkfpgrp6u.amplifyapp.com/',
      ],
      logoutUrls: [
        'https://dev.d1aakqkfpgrp6u.amplifyapp.com/',
      ],
    },
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
});