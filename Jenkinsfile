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
        PORT = "${params.ENVIRONMENT == 'root' ? '8081' : params.ENVIRONMENT == 'dev1' ? '8082' : '8083'}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build JS and CSS') {
            steps {
                sh 'npm install'
                sh 'npm run build:js'
                sh 'npm run sass'
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
