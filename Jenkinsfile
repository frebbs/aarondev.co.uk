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
                    def portMapping = (params.ENVIRONMENT == 'root') ? '80:8080' : '8081:8081'
                    def newContainer = "aarondev-${params.ENVIRONMENT}"
                    sh "docker run -d -p ${portMapping} -e PORT=${portMapping.split(':')[1]} --name ${newContainer} aarondev"
                }
            }
        }
    }
}
