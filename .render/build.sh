#!/bin/bash

# Java 17 설치
export JAVA_HOME=/usr/lib/jvm/java-17
export PATH=$JAVA_HOME/bin:$PATH

# Gradle 빌드
cd apiserver
./gradlew build -x test
