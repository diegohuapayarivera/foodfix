FROM openjdk:11-jre-slim-buster
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} carrera-service.jar
ENTRYPOINT ["java","-jar","/carrera-service.jar"]
EXPOSE 8080
