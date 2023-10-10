pipeline {
    agent any
    parameters {
        choice(
                name: 'ENVIRONMENT',
                choices: ['dev1', 'dev2', 'prd1', 'root'],
                description: 'Which environment to deploy to?'
        )
        string(
                name: 'BRANCH_NAME',
                defaultValue: 'main',
                description: 'Which branch to build?'
        )
    }
    environment {
        PORT = "${params.ENVIRONMENT == 'root' ? '3000' : params.ENVIRONMENT == 'dev1' ? '8080' : params.ENVIRONMENT == 'dev2' ? '8081' : params.ENVIRONMENT == 'prd1' ? '8082' : 'unknown'}"
    }
    stages {
        checkout([
                $class: 'GitSCM',
                branches: [[name: "${params.BRANCH_NAME}"]],
                doGenerateSubmoduleConfigurations: false,
                extensions: [],
                submoduleCfg: [],
                userRemoteConfigs: [[url: '<Your Git Repo URL>']]
        ])
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
