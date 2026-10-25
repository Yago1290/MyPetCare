# Repositories

Este health check não acessa persistência, portanto não precisa de repository.

Nos módulos que acessarem dados, defina as interfaces de repositories nesta
camada e implemente os adapters em `prisma/` e os doubles de testes em
`in-memory/`. Os use cases recebem as interfaces pelo construtor; as factories
instanciam os adapters e os injetam, sem acoplar os use cases ao Prisma.
