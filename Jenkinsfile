pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    def appImage = docker.build("aarondev")
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Run the Docker container
                    docker.image("aarondev").run("-p 8081:8081")
                }
            }
        }
    }
}
