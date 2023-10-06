pipeline {
    agent any
    parameters {
        choice(
                name: 'ENVIRONMENT',
                choices: ['dev1', 'prd1', 'root'],
                description: 'Which environment to deploy to?'
        )
    }
    environment {
        PORT = "${params.ENVIRONMENT == 'root' ? '8080' : params.ENVIRONMENT == 'dev1' ? '8081' : '8082'}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Stop Previous Container') {
            steps {
                script {
                    def oldContainer = "aarondev-${params.ENVIRONMENT}"
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
                    def newContainer = "aarondev-${params.ENVIRONMENT}"
                    sh "docker run -d -p ${PORT}:${PORT} --name ${newContainer} aarondev"
                }
            }
        }
    }
}
