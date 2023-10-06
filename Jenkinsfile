pipeline {
    agent any

    stages {
        stage('Stop Previous Container') {
            steps {
                script {
                    // Attempt to stop and remove the previous container, ignoring errors if the container doesn't exist
                    sh 'docker stop aarondev || true'
                    sh 'docker rm aarondev || true'
                }
            }
        }

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
