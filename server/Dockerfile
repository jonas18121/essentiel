FROM openjdk:15-jdk-alpine
COPY target/*.jar app.jar
COPY docs/ /docs/
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
