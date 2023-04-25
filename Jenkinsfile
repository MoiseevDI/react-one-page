pipeline {
    environment {
        registry = "moiseevdi/ip-simple-ui"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }
    agent any
    tools {nodejs "node" }
    stages {
        stage('Install dependencies') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Building image') {
            steps{
                script {
                dockerImage = docker.build registry + ":latest"
                }
            }
        }
        stage('Deploy Image') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Remove Unused docker image') {
            steps{
                sh "docker rmi $registry:latest"
            }
        }
    }
}
