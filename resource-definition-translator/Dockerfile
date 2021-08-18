FROM maven:3-openjdk-8 AS build

ARG NFV_SOL006_LIBS_REPO
ARG NFV_SOL006_LIBS_VERSION

ARG TMF_INFO_MODELS_REPO
ARG TMF_INFO_MODELS_VERSION

ARG TRANSLATOR_REPO
ARG TRANSLATOR_VERSION

ARG SERVER_PORT

WORKDIR /home
RUN git clone ${NFV_SOL006_LIBS_REPO} nfv-sol-libs
WORKDIR /home/nfv-sol-libs
RUN git checkout ${NFV_SOL006_LIBS_VERSION}
WORKDIR /home/nfv-sol-libs/NFV_MANO_SOL006_LIBS_COMMON
RUN mvn clean install
WORKDIR /home/nfv-sol-libs/NFV_MANO_SOL006_LIBS_DESCRIPTORS
RUN mvn clean install

WORKDIR /home
RUN git clone ${TMF_INFO_MODELS_REPO} tmf-models
WORKDIR /home/tmf-models
RUN git checkout ${TMF_INFO_MODELS_VERSION}
WORKDIR /home/tmf-models/information_models
RUN mvn clean install

WORKDIR /home
RUN git clone ${TRANSLATOR_REPO} resource-definition-translator
WORKDIR /home/resource-definition-translator
RUN git checkout ${TRANSLATOR_VERSION}
COPY templates/application.properties /home/resource-definition-translator/sol006_tmf_translator/src/main/resources
RUN mvn clean package

FROM openjdk:8-jre-alpine
RUN mkdir /translator
COPY --from=build /home/resource-definition-translator/sol006_tmf_translator/target/sol006_tmf_translator-1.0-SNAPSHOT.jar /translator/
WORKDIR /translator

EXPOSE ${SERVER_PORT}

CMD java -jar sol006_tmf_translator-1.0-SNAPSHOT.jar
