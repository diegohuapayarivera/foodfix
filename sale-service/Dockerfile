FROM openjdk:11-jre-slim-buster
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} sale-service.jar
ENTRYPOINT ["java","-jar","/sale-service.jar"]
EXPOSE 8002