pipeline {
    agent any
    stages {
        stage('Stop Previous Container') {
            steps {
                script {
                    def oldContainer = "aarondev-${BUILD_NUMBER - 1}"
                    sh "docker stop ${oldContainer} || true"
                    sh "docker rm ${oldContainer} || true"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t aarondev .'
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    def newContainer = "aarondev-${BUILD_NUMBER}"
                    sh "docker run -d -p 8081:8081 --name ${newContainer} aarondev"
                }
            }
        }
    }
}
