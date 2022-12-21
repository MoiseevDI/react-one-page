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
                    def scannerHome = tool 'sonarscan';
                    withSonarQubeEnv('sonarasus') {
                        sh "${JENKINS_HOME}/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarQube_Scanner/bin/sonar-scanner -Dsonar.projectKey=reactapp -Dsonar.projectName=reactapp"
                    }
                }
            }
        }
        stage("Quality gate") {
            steps {
                script {
                    def qualitygate = waitForQualityGate()
                    sleep(10)
                    if (qualitygate.status != "OK") {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }
        stages {
            stage('Build') { 
                steps {
                    sh 'npm install' 
                }
            }
        }
    }
}