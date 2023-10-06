pipeline {
    agent any
    parameters {
        choice(
                name: 'ENVIRONMENT',
                choices: ['dev1', 'prd1', 'root'],
                description: 'Which environment to deploy to?'
        )
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
                    def oldContainer = "aarondev"
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
                    def newContainer = "aarondev"
                    sh "docker run -d -p 8081:8081 --name ${newContainer} aarondev"
                }
            }
        }
    }
}
