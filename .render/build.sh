#!/bin/bash

# JAVA_HOME (Render 환경에서는 보통 이미 Java 17/21이 설치돼 있음)
export JAVA_HOME=$JAVA_HOME
export PATH=$JAVA_HOME/bin:$PATH

# 빌드
cd apiserver
chmod +x gradlew
./gradlew build -x test
