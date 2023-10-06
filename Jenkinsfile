pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run sass'
            }
        }

        stage('Deploy') {
            steps {
                // Your deployment steps here
                echo 'Deploying...'  // Add this line or replace it with your actual deployment steps.
            }
        }
    }
}
