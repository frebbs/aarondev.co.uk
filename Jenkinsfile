pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                // This will run 'npm run build' in your project directory
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Your deployment steps here
            }
        }
    }
}
