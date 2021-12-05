FROM openjdk:11-jre-slim-buster
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} order-service.jar
ENTRYPOINT ["java","-jar","/order-service.jar"]
EXPOSE 8001
