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
                    withSonarQubeEnv('sonarasus') {
                        sh "npx sonar-scanner -Dsonar.projectKey=reactapp -Dsonar.projectName=reactapp"
                    }
                    timeout(time: 1, unit: "HOURS") {
                        def qualitygate = waitForQualityGate()
                        if (qualitygate.status != "OK") {
                            error "Pipeline aborted due to qg sonar"
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