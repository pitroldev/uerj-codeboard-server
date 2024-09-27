# Anotações

## Uso da fila

Usar fila em uma aplicação real-time não faz sentido. Em uma aplicação real-time o que importa é a velocidade de transmissão dos dados, que no caso da fila é muito lenta.

Usaremos a fila para garantir que os dados do quadro do usuário sejam armazenados/processados após a sua desconexão.
