#!/usr/bin/env bash

# 🟢 Java 설치
apt-get update && apt-get install -y openjdk-17-jdk

# 🟢 JAVA_HOME 설정
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# 🟢 gradlew 실행 권한 부여 (혹시라도 안 되어있을 때를 대비)
chmod +x ./gradlew

# 🟢 빌드 실행 (테스트는 제외)
./gradlew build -x test
