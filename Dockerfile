# ✅ 1. Java 17 slim 이미지 기반
FROM openjdk:17-jdk-slim

# ✅ 2. 작업 디렉토리 생성
WORKDIR /app

# ✅ 3. Gradle 빌드에 필요한 파일 복사
COPY apiserver/gradlew apiserver/gradlew
COPY apiserver/gradle apiserver/gradle
COPY apiserver/build.gradle apiserver/build.gradle
COPY apiserver/settings.gradle apiserver/settings.gradle
COPY apiserver/src apiserver/src

# ✅ 4. 실행 권한 부여 및 빌드 실행
WORKDIR /app/apiserver
RUN chmod +x gradlew
RUN ./gradlew build -x test

# ✅ 5. 빌드된 JAR 파일을 실행
CMD ["java", "-jar", "build/libs/apiserver-0.0.1-SNAPSHOT.jar"]
