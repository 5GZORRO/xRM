# xRM
x-Resource Manager implementation, component of the 5G-ZORRO platform. The x-Resource-Manager is a collection of various modules that interact with each other:

- Gravitee (northbound interface of the xRM)
- 5G Apps & Services Catalogue
- Resource Definition Translator

Please note that the docker images in this repository were built targetting the 5G-Barcelona testbed as virtualized environment, follow the installation sections for further informations.

## Requirements
- Docker (tested with 20.10.8)
- Docker Compose (tested with 1.28.5)

## Deployment with docker-compose
- Customize the enviroment variables in ```xRM/.env``` and ```xRM/5g-catalogue-app/profiles/default.env```
- In docker-compose.yaml update the MGMT_API_URL (management_ui service) and PORTAL_API_URL (portal_ui service) environment variables specifying the IP address of the machine on which the xRM will run.
- from ```xRM/``` run:
  ```bash
    docker-compose up --build -d
  ```

## Deployment with Kubernetes
- (Optional, you can use the image on this repository) Build the kafka docker image
  ```bash
    cd kafka
    docker build -t kafka -f Dockerfile .
  ```
- Build the 5gcatalogueapp docker image, the only arguments that need to be customized are those related to the MANO 
  ```bash
    cd 5g-catalogue-app
    docker build -t 5gcatalogueapp -f Dockerfile \
    --build-arg catalogue_repo=https://github.com/nextworks-it/5g-catalogue.git \
    --build-arg catalogue_version=5g_zorro \
    --build-arg catalogue_server_port=31086 \
    --build-arg nfv_sol_libs_repo=https://github.com/nextworks-it/nfv-sol-libs.git \
    --build-arg nfv_sol_libs_version=feat-nfv-sol006-libs-osm \
    --build-arg nfv_ifa_libs_repo=https://github.com/nextworks-it/nfv-ifa-libs.git \
    --build-arg nfv_ifa_libs_version=dev_5growth \
    --build-arg mano_id=ZORRO_OSMR10 \
    --build-arg mano_type=OSMR10 \
    --build-arg mano_site=ZORRO_OSM \
    --build-arg mano_ip=172.28.3.59 \
    --build-arg mano_port=9999 \
    --build-arg mano_username=admin \
    --build-arg mano_password=admin \
    --build-arg mano_project=admin \
    --build-arg public_catalogue_id=DEFAULT_CAT \
    --build-arg public_catalogue_url=http://127.0.0.1:8083/ \
    --build-arg proxy_enabled=false \
    .
  ```
- (Optional, you can use the image on this repository) Build the 5gcataloguegui docker image, the only argument that need to be changed is the catalogue server port only if you want to change the port of the catalogue app in the k8s service.
  ```bash
    cd 5g-catalogue-gui
    docker build -t 5gcataloguegui -f Dockerfile \
    --build-arg catalogue_repo=https://github.com/nextworks-it/5g-catalogue.git \
    --build-arg catalogue_version=5g_zorro \
    --build-arg catalogue_server_port=31086 \
    --build-arg catalogue_scope=PUBLIC \
    --build-arg catalogue_profile=default \
    --build-arg keycloak_enabled=false \
    --build-arg keycloak_url=http://127.0.0.1:8080/auth/ \
    --build-arg keycloak_realm=osm \
    --build-arg keycloak_gui_client=5gcatalogue \
    .
  ```
- (Optional, you can use the image on this repository) Build the resource-definition-translator docker image
  ```bash
    cd resource-definition-translator
    docker build -t resource-definition-translator -f Dockerfile \
    --build-arg NFV_SOL006_LIBS_REPO=https://github.com/nextworks-it/nfv-sol-libs.git \
    --build-arg NFV_SOL006_LIBS_VERSION=feat-nfv-sol006-libs-osm \
    --build-arg TMF_INFO_MODELS_REPO=https://github.com/5GZORRO/resource-and-service-offer-catalog.git \
    --build-arg TMF_INFO_MODELS_VERSION=main \
    --build-arg TRANSLATOR_REPO=https://github.com/5GZORRO/resource-definition-translator.git \
    --build-arg TRANSLATOR_VERSION=main \
    .
  ```
- Push the images you built in a docker registry and update each k8s deployment file (kafka-deployment.yaml, catalogueapp-deployment.yaml, cataloguegui-deployment.yaml, translator-deployment.yaml) with the new image paths; update also the imagePullSecret accordingly.
- update the MGMT_API_URL (management-ui-deployment.yaml) and PORTAL_API_URL (portal-ui-deployment.yaml) environment variables specifying the hostname and port of the management-api-service.
- If needed, customize the environment variables in the k8s deployment files.
- deploy the xRM
  ```bash
    kubectl apply -f k8s/
  ```

## Usage
- Gravitee APIM Management UI accessible at ```http://localhost:8084``` (docker-compose deployment) or ```http://hostname:31084``` (k8s deployment)
- Gravitee APIM Portal UI accessible at ```http://localhost:8085``` (docker-compose deployment) or ```http://hostname:31085``` (k8s deployment)
- Gravitee APIM Gateway reachable at ```http://localhost:8082``` (docker-compose deployment) or ```http://hostname:31081``` (k8s deployment)
- 5G Apps & Services Catalogue UI accesible at ```http://localhost:8087/5gcatalogue``` (docker-compose deployment) or ```http://hostname:31087``` (k8s deployment)
- 5G Apps & Services Catalogue Swagger UI accessible at ```http://localhost:8086/swagger-ui.html``` (docker-compose deployment) or ```http://hostname:31086``` (k8s deployment)
- Resource Definition Translator Swagger UI accessible at ```http://localhost:9090/sol006-tmf/swagger-ui/``` (docker-compose deployment) or ```http://hostname:31090``` (k8s deployment)