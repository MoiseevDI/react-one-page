pipeline {
    // agent {
    //     docker {
    //         image 'node:lts-bullseye-slim' 
    //         args '-p 3000:3000 -u root:root'
    //         reuseNode true
    //     }
    // }
    agent any
    tools {nodejs "node" }
    stages {
        stage('Install dependencies') { 
            steps {
                sh 'npm install -g' 
            }
        }
        stage('SonarQube analysis') {
            steps {
                script {
                    withSonarQubeEnv('sonarasus') {
                        sh "sonar-scanner"
                    }
                    timeout(time: 1, unit: "HOURS") {
                        def qualitygate = waitForQualityGate()
                        if (qualitygate.status != "OK") {
                            waitForQualityGate abortPipeline: true
                        }
                    }
                }
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}