
#!/bin/bash

# Create unique database name from request ID
DATABASE_NAME="9c3d5609_b86c_47d7_b2fb_0877f9916699"

# Create MySQL database
mysql -u root -pexamly -e "CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};" 2>/dev/null || echo "Database creation failed, will use default"

# Define project directory
PROJECT_DIR="/home/coder/project/workspace/question_generation_service/solutions/9c3d5609-b86c-47d7-b2fb-0877f9916699/springapp"

# Generate Spring Boot project using Spring CLI
spring init \
  --type=maven-project \
  --language=java \
  --boot-version=3.4.0 \
  --packaging=jar \
  --java-version=17 \
  --groupId=com.examly \
  --artifactId=springapp \
  --name="Job Portal Application" \
  --description="Job Portal Application with Spring Boot Backend" \
  --package-name=com.examly.springapp \
  --dependencies=web,data-jpa,validation,mysql,lombok \
  --build=maven \
  ${PROJECT_DIR}

# Wait for project generation to complete
sleep 2

# Create application.properties with MySQL configuration
cat > "${PROJECT_DIR}/src/main/resources/application.properties" << EOL
spring.datasource.url=jdbc:mysql://localhost:3306/${DATABASE_NAME}?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=examly
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE
spring.web.cors.allowed-headers=*
EOL
