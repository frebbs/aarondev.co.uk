pipeline {
    agent any
    parameters {
        choice(
                name: 'ENVIRONMENT',
                choices: ['dev1', 'dev2', 'prd1', 'root'],
                description: 'Which environment to deploy to?'
        )
    }
    environment {
        PORT = "${params.ENVIRONMENT == 'root' ? '3000' : params.ENVIRONMENT == 'dev1' ? '8080' : params.ENVIRONMENT == 'dev2' ? '8081' : params.ENVIRONMENT == 'prd1' ? '8082' : 'unknown'}"
        BRANCH_NAME = 'main'
    }
    stages {
        stage('Pre-Processing') {
            steps {
                script {
                    env.BRANCH_NAME = 'main'
                }
            }
        }
        stage('Checkout Code') {
            steps {
                checkout([
                        $class: 'GitSCM',
                        branches: [[name: env.BRANCH_NAME]], // Use the environment variable set in pre-processing
                        doGenerateSubmoduleConfigurations: false,
                        extensions: [],
                        submoduleCfg: [],
                        userRemoteConfigs: [[url: 'https://github.com/frebbs/aarondev.co.uk']]
                ])
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
                    sh "docker run -d -p ${PORT}:${PORT} -e PORT=${PORT} --name ${newContainer} aarondev"
                }
            }
        }
    }
}
