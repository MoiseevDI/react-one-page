pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 3000:3000 -u root:root'
            reuseNode true
        }
    }
    stages {
        stage('SonarQube analysis') {
            steps {
                script {
                    sh 'npm install -D jest-sonar-reporter sonarqube-scanner'
                    sh 'npm install -g sonarqube-scanner'
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
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}