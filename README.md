# App

GymPass style app.

## RFs (Requisitos Funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negocio)

- [ ] E-mails são unicos na app, ou seja, apenas um e-mail por usuário.
- [ ] Só pode ser realizado 1 check-in por dia por usuário.
- [ ] Só pode ser realizado o check-in se o usuário estiver 100m da academia que deseja fazer check-in.
- [ ] O check-in tem um validade de 20 min para ser validado após ser criado;
- [ ] O check-in so pode ser validado por administradores(academias);
- [ ] A academia so pode ser cadastrada por administradores;


## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário vai ser criptografada;
- [ ] Os dados da aplicação estarão salvos em um banco postgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um JWT;