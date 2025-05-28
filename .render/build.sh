#!/bin/bash

# Java 설치
sudo apt-get update
sudo apt-get install -y openjdk-17-jdk

# JAVA_HOME 설정
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# 빌드
cd apiserver
./gradlew build -x test
