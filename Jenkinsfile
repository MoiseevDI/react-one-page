pipeline {
    agent any
    tools {nodejs "node" }
    stages {
        stage('Install dependencies') { 
            steps {
                sh 'npm install' 
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