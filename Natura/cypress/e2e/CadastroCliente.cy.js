/// <reference types="cypress" />
import { faker } from "@faker-js/faker"

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('FLUXO E2E - CADASTRO', () => {
  beforeEach(() => {
    cy.viewport(1280, 750)
    cy.visit('https://www.natura.com.br/')
    cy.get('#onetrust-accept-btn-handler', { timeout: 10000 }).should('be.visible').click()
  })

  it('Cadastrar novo cliente na base', () => {

    //Gerando dados do cliente
    const geradorCPF = require('gerador-validador-cpf');
    const cpfAleatorio = geradorCPF.generate();
    const dateOfBirth = faker.date.between('1950-01-01', '2004-12-31')
    const numeroTelefone = '119' + Cypress._.random(55555555, 99999999)
    const nome = faker.person.firstName()
    const sobrenome = faker.person.lastName()
    const email = faker.internet.email()

    //Gerando senhas aleatórias
    const caracteresEspeciais = ["@", "#", "!", "%"];
    let senha = "";
    const caractereEspecial = caracteresEspeciais[Math.floor(Math.random() * caracteresEspeciais.length)];
    senha += caractereEspecial;
    const numero = Math.floor(Math.random() * 10);
    senha += numero;
    const letraMaiuscula = String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
    senha += letraMaiuscula;
    const letraMinuscula = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
    senha += letraMinuscula;
    const caracteresRestantes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#!%";
    while (senha.length < 8) {
      const caractereAleatorio = caracteresRestantes[Math.floor(Math.random() * caracteresRestantes.length)];
      senha += caractereAleatorio;
    }

    //Início fluxo principal
    cy.get('.MuiBox-root > .MuiTypography-subtitle2').should('have.text', 'Minha conta').click()
    cy.get('.MuiButton-outlined > .MuiButton-label').click()

    cy.get('[name="firstName"]', { timeout: 10000 }).should('exist').should('exist').type(nome)
    cy.get('[name="lastName"]').type(sobrenome)
    cy.get('[name="email"]').type(email)

    cy.get('#password-field').type(senha)
    cy.get('#confirmPassword-field').type(senha)

    cy.get('[name="cpf"]').type(cpfAleatorio)
    cy.get('[name="dateOfBirth"]').type(dateOfBirth.toLocaleDateString('pt-BR'))

    cy.contains('Não especificar').click()

    cy.get('[name="homePhone"]').type(numeroTelefone)

    cy.get('#pushOptInWP').click()
    cy.get('#acceptedterms').click()

    cy.contains('Criar Conta').click()
 

    cy.log(`CPF gerado: ${cpfAleatorio}`)
    cy.log(`Email gerado: ${email}`)
    cy.log(`Senha gerada: ${senha}`)

  })

})