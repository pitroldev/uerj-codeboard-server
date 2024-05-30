# Comunicação entre regiões

## Message Broker

``` mermaid
graph 
    O1C[Ohio User 1]
    O2C[Ohio User 2]
    C1C[China User 1]


    subgraph Ohio Region
        OhioServer[Backend Server 1]
        OhioServer2[Backend Server 2]
        OhioRedis[Redis Pub/Sub]
        OhioBroker[Message Broker]
        OhioServer -->|Publishes| OhioRedis
        OhioRedis -->|Subscribe| OhioServer2
        OhioServer --> OhioBroker
    end

    subgraph China Region
        ChinaServer[Backend Server]
        ChinaRedis[Redis Pub/Sub]
        ChinaBroker[Message Broker]
        ChinaServer -->|Publishes| ChinaRedis
        ChinaBroker -->|Replicate Message| ChinaServer
    end

    O1C -->|Send Message| OhioServer
    OhioServer2 -->|Send Message| O2C
    OhioBroker -->|Forward Message| ChinaBroker
    ChinaServer -->|Send Message| C1C
```

### Vantagens - Message Broker

- **Escalabilidade**: A comunicação por mensagens permite que a aplicação seja escalada de forma mais eficiente, pois a comunicação entre regiões
é feita de forma assíncrona.
- **Resiliência**: Caso uma região fique indisponível, as mensagens podem ser armazenadas em um buffer e processadas posteriormente.
- **Desacoplamento**: As regiões não precisam conhecer a estrutura interna uma da outra, apenas a estrutura da mensagem.

### Desvantagens - Message Broker

- **Latência**: A comunicação por mensagens pode adicionar latência à aplicação, pois as mensagens precisam ser enviadas e processadas.
- **Complexidade**: A comunicação por mensagens pode adicionar complexidade ao sistema, pois é necessário implementar a lógica de envio e recebimento de mensagens.
- **Consistência**: A comunicação por mensagens pode introduzir problemas de consistência, pois as mensagens podem ser processadas fora de ordem.

## Direct Inter-Region Communication

``` mermaid
graph 
    O1C[Ohio User 1]
    O2C[Ohio User 2]
    C1C[China User 1]


    subgraph Ohio Region
        OhioServer[Backend Server 1]
        OhioServer2[Backend Server 2]
        OhioRedis[Redis Pub/Sub]
        OhioServer -->|Publishes| OhioRedis
        OhioRedis -->|Subscribe| OhioServer2
    end


    O1C -->|Send Message| OhioServer
    OhioServer2 -->|Send Message| O2C
    OhioServer ----->|Send Message| C1C
```

### Vantagens - Direct Inter-Region Communication

- **Baixa Latência**: A comunicação direta entre as regiões pode reduzir a latência da aplicação, pois não há intermediários.
- **Simplicidade**: A comunicação direta entre as regiões pode simplificar a arquitetura da aplicação, pois não é necessário implementar a lógica de envio e recebimento de mensagens.
- **Consistência**: A comunicação direta entre as regiões pode garantir a consistência dos dados, pois as mensagens são processadas na ordem correta.

### Desvantagens - Direct Inter-Region Communication

- **Escalabilidade**: A comunicação direta entre as regiões pode dificultar a escalabilidade da aplicação, pois a comunicação síncrona pode sobrecarregar os servidores.
- **Resiliência**: Caso uma região fique indisponível, a comunicação direta entre as regiões pode causar falhas na aplicação, pois não há buffer para armazenar as mensagens.
- **Acoplamento**: As regiões precisam conhecer a estrutura interna uma da outra, o que pode dificultar a manutenção e evolução da aplicação.
- **Variabilidade**: A comunicação direta entre as regiões pode ser mais suscetível a falhas de rede e problemas de conectividade. Já que provedores de internet podem ter problemas de roteamento entre regiões.
