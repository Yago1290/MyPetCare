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
| Workspace | pnpm + Turborepo |
| Gestão | GitHub Issues + GitHub Projects |

## Estrutura do monorepo

```text
MyPetCare/
├── apps/
│   ├── web/                  # Next.js
│   └── api/                  # Fastify
│       └── src/
│           ├── http/        # controllers e rotas
│           ├── use-cases/   # casos de uso e factories
│           ├── repositories/
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

> Bootstrap implementado: página inicial, API com `GET /health`, contratos Zod, Prisma 7 com um modelo mínimo `User`, PostgreSQL via Docker e CI. Os módulos de negócio ainda serão implementados.

## Arquitetura da API

```text
apps/api/src/
├── app.ts                    # Instancia Fastify e registra CORS, Cookie, JWT e rotas
├── server.ts                 # Carrega ambiente e inicia o listen
├── http/
│   ├── controllers/
│   │   └── get-health.ts
│   └── routes.ts
├── use-cases/
│   ├── factories/
│   │   └── make-get-health-use-case.ts
│   ├── get-health.ts
│   └── get-health.test.ts
├── repositories/
│   └── README.md
└── shared/
    ├── env.ts
    └── env.test.ts
```

As camadas `http`, `use-cases` e `repositories` ficam diretamente na raiz de `src`, sem pasta `modules`. As factories ficam em `use-cases/factories`. O fluxo é **rota → controller → factory → use case → repository**, quando houver persistência. Controllers lidam com HTTP e validação; use cases não dependem do Fastify. Interfaces de repositories ficam em `repositories/`, adapters de banco em `repositories/prisma/` e implementações de teste em `repositories/in-memory/`, conforme forem necessárias. Factories montam essas dependências e as injetam pelo construtor dos use cases.

O health check exemplifica o fluxo sem inventar acesso a banco. `buildApp()` cria uma instância isolada e não abre porta, permitindo testes com `inject()`. Cookie e JWT estão registrados, mas login, emissão de cookies e proteção de rotas ainda não foram implementados. CORS aceita credenciais apenas para a origem configurada; cookies de autenticação futuros devem definir `httpOnly`, `secure` em produção, `sameSite` e proteção contra CSRF conforme o fluxo adotado.

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

- [x] Bootstrap de workspace, Next.js, Fastify e banco.
- [ ] Autenticação, autorização e papéis de acesso.
- [ ] Cadastros de tutores, clínicas e pets.
- [ ] Dashboards e agenda.
- [ ] Atendimentos, exames, históricos e anexos.
- [ ] Assinaturas, benefícios e integrações.
- [ ] Testes, CI e documentação.

## Segurança e privacidade

Não subir arquivos `.env`, segredos, senhas ou dados pessoais reais. Aplicar hash de senhas, validação de entrada, controle de acesso por recurso, proteção de prontuários, armazenamento seguro de arquivos e requisitos da **LGPD**.

## Execução local

### Pré-requisitos

- Node.js 24 LTS (recomendado).
- pnpm 12.15.0, conforme `packageManager` em `package.json`.
- Docker com Compose para o PostgreSQL.

### Preparação

Na raiz do projeto:

```sh
pnpm install
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp packages/database/.env.example packages/database/.env

docker compose up -d --wait
pnpm db:generate
pnpm db:migrate --name init
# Configure JWT_SECRET em apps/api/.env antes de iniciar (veja abaixo).
pnpm dev
```

Antes de executar `pnpm dev`, adicione `JWT_SECRET` em `apps/api/.env` com um segredo aleatório de pelo menos 32 caracteres. Não existe segredo padrão. Você pode gerar um com `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.

No PowerShell, use `Copy-Item` no lugar de `cp`, se necessário. Os arquivos `.env` não são versionados. As credenciais dos exemplos servem apenas para desenvolvimento local; ao alterá-las na raiz, atualize também a URL do banco em `packages/database/.env`.

- Web: http://localhost:3000
- API: http://127.0.0.1:3333/health
- PostgreSQL: `localhost:5432`

A API e a página inicial funcionam sem banco; `/health` indica apenas que a API está disponível, não verifica PostgreSQL. O schema inicial não implementa autenticação nem regras de negócio. A primeira migração é criada pelo comando acima e deve ser versionada em `packages/database/prisma/migrations/`.

### Comandos

| Comando | Função |
| --- | --- |
| `pnpm dev` | Inicia web e API; compila contratos antes dos apps |
| `pnpm build` | Gera Prisma Client e builds de produção |
| `pnpm lint` | ESLint no frontend, validação Prisma e TypeScript nos demais pacotes |
| `pnpm typecheck` | Verifica os tipos de todos os pacotes |
| `pnpm test` | Executa testes da API com Node Test Runner |
| `pnpm db:generate` | Gera o Prisma Client |
| `pnpm db:migrate --name descricao` | Cria/aplica migrações de desenvolvimento |
| `pnpm db:studio` | Abre o Prisma Studio |
| `docker compose down` | Para o banco preservando o volume |

`packages/contracts` exporta schemas Zod e tipos compartilhados. `packages/database` exporta `createDatabaseClient(connectionString)` usando o adapter PostgreSQL do Prisma 7; o consumidor deve fornecer a URL e encerrar o cliente com `$disconnect()`. Esses pacotes são compilados para `dist`: após modificar contratos durante `pnpm dev`, execute `pnpm --filter @mypetcare/contracts build` e reinicie o consumidor se necessário.

A CI em `.github/workflows/ci.yml` instala pelo lockfile e executa build, lint, tipagem e testes. Não exige banco ativo; testes de integração e funcionalidades de domínio ficam para as próximas etapas.

---

*Feito para cuidar melhor de quem faz parte da família.* 🐶🐱
