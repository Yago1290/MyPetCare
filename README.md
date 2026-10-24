# 🐾 MyPetCare

**MyPetCare** é um SaaS de gestão e acompanhamento da saúde de pets, conectando **tutores** e **clínicas veterinárias**. O projeto está em fase inicial: as funcionalidades descritas abaixo representam o escopo planejado a partir dos fluxos do Miro, não recursos já implementados.

## Funcionalidades planejadas

### Para tutores
- Cadastro, login e gerenciamento do perfil.
- Cadastro e manutenção de dados dos pets (proposta inicial: até três pets gratuitamente).
- Acesso à agenda, consultas, exames e histórico dos animais.
- Assinaturas e benefícios opcionais.

### Para clínicas
- Cadastro da clínica, serviços e horários.
- Gestão de agenda, atendimentos, exames, pareceres e anexos.
- Consulta de informações dos animais com vínculo de atendimento e autorização adequada.

### Planos (proposta em validação)

| Plano | Benefícios previstos |
| --- | --- |
| Bronze | Teleorientação e conteúdo de dicas |
| Prata | Benefícios do Bronze + recomendações de clínicas |
| Ouro | Benefícios do Prata + acesso ao Shop |

Integrações, preços, avaliações, WhatsApp e critérios de elegibilidade estão sujeitos à definição de produto. Teleorientação não substitui consultas ou emergências veterinárias.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Frontend | Next.js + TypeScript |
| Backend | Fastify + TypeScript |
| Banco de dados | PostgreSQL |
| ORM | Prisma 7 |
| Workspace (planejado) | pnpm + Turborepo |
| Gestão | GitHub Issues + GitHub Projects |

## Estrutura proposta

```text
MyPetCare/
├── apps/
│   ├── web/                  # Next.js
│   └── api/                  # Fastify
│       └── src/
│           ├── modules/     # auth, users, clinics, pets, appointments...
│           └── shared/
├── packages/
│   ├── database/             # Prisma 7
│   └── contracts/            # Schemas/tipos compartilhados
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
├── docker-compose.yml
├── pnpm-workspace.yaml
└── turbo.json
```

> A estrutura é um plano de implementação e ainda não corresponde a arquivos existentes.

## Modelo de domínio inicial

- **User / Tutor:** conta, dados de contato e perfil.
- **Clinic:** dados institucionais, serviços, horários e membros.
- **Pet:** cadastro do animal e vínculos com tutores.
- **Appointment:** consultas/agendamentos, status e observações.
- **MedicalRecord / Exam / File:** histórico clínico, exames, pareceres e anexos.
- **Subscription:** plano, status e direitos de acesso.
- **Message:** comunicação, caso uma integração autorizada seja implementada.

As permissões precisarão considerar o papel do usuário **e** os vínculos efetivos entre tutor, pet, clínica e profissional.

## Equipe

| Pessoa | Foco |
| --- | --- |
| [@Yago1290](https://github.com/Yago1290) | Backend: Fastify, Prisma, PostgreSQL, autenticação e domínio |
| [@Cristhianstevs](https://github.com/Cristhianstevs) | Frontend: Next.js, interfaces, dashboards e integração |

Contratos da API, revisão de PRs, testes e decisões de produto são responsabilidades compartilhadas.

## Organização do trabalho

Kanban planejado: **Backlog → Todo → In Progress → In Review → Done**.

Padrão de branches: `feat/...`, `fix/...` e `chore/...`. Preferir PRs pequenos com revisão do outro desenvolvedor antes do merge na `main`.

### Roadmap

- [ ] Bootstrap de workspace, Next.js, Fastify e banco.
- [ ] Autenticação, autorização e papéis de acesso.
- [ ] Cadastros de tutores, clínicas e pets.
- [ ] Dashboards e agenda.
- [ ] Atendimentos, exames, históricos e anexos.
- [ ] Assinaturas, benefícios e integrações.
- [ ] Testes, CI e documentação.

## Segurança e privacidade

Não subir arquivos `.env`, segredos, senhas ou dados pessoais reais. Aplicar hash de senhas, validação de entrada, controle de acesso por recurso, proteção de prontuários, armazenamento seguro de arquivos e requisitos da **LGPD**.

## Execução local

Os scripts de instalação e execução serão documentados quando o monorepo for inicializado.

---

*Feito para cuidar melhor de quem faz parte da família.* 🐶🐱
