<br/>

<p align="center"><a href="https://agroi9incubadora.com.br/" target="_blank"><img src="https://github.com/Engenharia-de-Software-1/Frontend/blob/main/public/images/logoAgroi9.png" height="70"></a></p>

<br/>

<p align="center">
    <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next JS" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white" alt="Chakra UI"/>
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

## Sobre
A AgroI9 é uma incubadora especializada em oferecer apoio gerencial, jurídico, logístico e tecnológico para negócios inovadores focados no agronegócio sustentável.

Tal incubadora tem o objetivo de promover a inovação aberta conectando startups, empresas, cooperativas e instituições de ensino e de ciência, tecnologia e inovação, para o desenvolvimento de novos negócios de base tecnológica. 

Esse repositório foi feito para a disciplina de Engenharia de Software do segundo semestre de 2022 onde uma plataforma que abrange as funcionalidades de um MVP para a incubadora devem ser implementados.

## Features
#### Geral
- Login
- Logout
- Cadastro de investidores, startups e clientes (produtores rurais)
#### Administradores
- Edição dos dados de um administrador
- Alteração de senha
- Exclusão de conta
- Aprovar ou rejeitar um projeto
- Aprovar ou rejeitar uma ideia/oportunidade
- Listagem de planos existentes para um investidor escolher
- Criação de um plano para um investidor
- Exclusão de um plano
#### Investidores
- Edição dos dados de um investidor
- Alteração de senha
- Exclusão de conta
- Listagem de projetos
- Visualização de um projeto de acordo com o plano adquirido
- Possibilidade de investimento de acordo com o plano adquirido
#### Startups
- Edição dos dados de uma startup
- Alteração de senha
- Exclusão de conta
- Listagem de ideias/oportunidades
- Favoritar ideias/oportunidades
- Visualização de ideias VISTAS por ultimo
- Adicionar projeto
- Mostrar situação do projeto (Pendente ou não)
- Lista de projetos
- Visualização de um projeto
- Edição de um projeto
- Exclusão de um projeto
#### Clientes (Produtores Rurais)
- Edição dos dados de um cliente
- Alteração de senha
- Exclusão de conta
- Listagem de ideias/oportunidades
- Favoritar ideias/oportunidades
- Adicionar ideia/oportunidade
- Mostrar situação da ideia/oportunidade (Pendente ou não)

## :warning: Arquivos importantes
.env
-------------

O arquivo ***.env*** deve ser criado com base no arquivo ***.env.example***.  
  
Esse arquivo deve estar na pasta raiz do projeto e conter obrigatóriamente as váriaveis de desenvolvimento abaixo:
```javascript
NEXT_PUBLIC_API_URL
```
>EM HIPÓTESE ALGUMA SUBA SEU ARQUIVO .ENV PARA O GITHUB
  
Caso seja necessário criar uma nova variável de desenvolvimento, observe que há um padrão:
```javascript
NEXT_PUBLIC_<NOME_DA_VARIAVEL>=VALOR
```
_Caso tenha criado uma variável, especifique isso em um Pull Request_  
Para chamar sua variável faça como o código abaixo: 
```javascript
let myVar = process.env.NEXT_PUBLIC_MY_VAR
```
-----------------

## Requisitos
- [x] Configurar .env ou .env.local
- [x] Configurar backend AgroI9 para testes finais
- [x] Instalar dependências com `yarn` ou `npm install`

## Rodando o frontend
Execute o frontend com
```javascript
yarn dev
```

## Configurando rotas
Para configurar uma rota para a aplicação basta criar um arquivo com o nome da rota desejada na pasta _src/pages_.
Ex: para Home -> https://agroi9/home -> Criar um arquivo chamado _home.tsx_.

## Componentização
Para componentização é necessário usar algumas regras:
- Só usar **Spinner** e **Image** do Chakra UI, se necessário
- Para qualquer coisa, seja inputs, espaços, dropdowns, buttons, **usar Tailwind CSS** 
- **Modals** e **Menus** podem ser personalizados utilizando o Chakra UI
- Devem estar presentes na pasta _components_
- As estilizações podem ser isoladas em arquivos _styles.ts_
  
```typescript
// Exemplo de componente
import React, { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

function Button({ ...rest }: IButtonProps) {

  return(
    <button
      className={`
        w-full 
        h-11
        bg-dark-blue
        rounded 
        font-sans
        font-semibold
        transition-all
        duration-300
        hover:opacity-90
        text-white
      `}
      {...rest}
    />
  )
}

export { Button };
```

### Contato
| Nome                          | Contato                                |
| ----------------------------- |:--------------------------------------:|
| Gabriela Marangoni Radigonda  | gabrielaradigonda@alunos.utfpr.edu.br   |
| Getulio Coimbra Regis         | getulioregis@alunos.utfpr.edu.br        |
| Gustavo Sengling Favaro       | gusfav@alunos.utfpr.edu.br              |
| Igor de Lara Oliveira         | igooli@alunos.utfpr.edu.br              |
| Yuri Baza                     | yuribaza@alunos.utfpr.edu.br            |
