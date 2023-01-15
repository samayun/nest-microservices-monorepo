## Mono

```zsh

_  __ ___ ____ ____   ___  ____  _____ ______     _____ ____ _____ ____  
|  \/  |_ _/ ___|  _ \ / _ \/ ___|| ____|  _ \ \   / /_ _/ ___| ____/ ___| 
| |\/| || | |   | |_) | | | \___ \|  _| | |_) \ \ / / | | |   |  _| \___ \ 
| |  | || | |___|  _ <| |_| |___) | |___|  _ < \ V /  | | |___| |___ ___) |
|_|  |_|___\____|_| \_\\___/|____/|_____|_| \_\ \_/  |___\____|_____|____/

```

## Config


```bash
cd apps/auth && cp .env.example .env

cd apps/billing && cp .env.example .env

cd apps/orders && cp .env.example .env

```


## Running the app

Node CLI

```bash
npm run start:dev auth
npm run start:dev billing
npm run start:dev orders

```


Docker


```bash

sudo docker-compose up --build -d

sudo docker-compose logs --follow auth
sudo docker-compose logs --follow billing
sudo docker-compose logs --follow orders

```
