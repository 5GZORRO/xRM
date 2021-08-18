# xRM
x-Resource Manager docker-compose deployment

## Requirements
- Docker
- Docker Compose

## Installation
Customize the enviroment variables in ```xRM/.env``` and ```xRM/5g-catalogue-app/profiles/default.env```, then, from ```xRM/``` run:
```bash
docker-compose up --build -d
```

## Usage
- Gravitee APIM Management UI accessible at ```http://localhost:8084```
- Gravitee APIM Portal UI accessible at ```http://localhost:8085```
- Gravitee APIM Gateway reachable at ```http://localhost:8082```
- 5G Apps & Services Catalogue UI accesible at ```http://localhost:8087/5gcatalogue```
- 5G Apps & Services Catalogue Swagger UI accessible at ```http://localhost:8086/swagger-ui.html```
- Resource Definition Translator Swagger UI accessible at ```http://localhost:9090/sol006-tmf/swagger-ui/```