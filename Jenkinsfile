pipeline {
    agent any

    environment {
        NODE_VERSION = "20"
        APP_PORT = "3000"
        // Deployment directory inside Jenkins container
        DEPLOY_DIR = "/var/jenkins_home/muk2-deploy"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                sh '''
                echo "Using system Node.js (inside container)"
                node -v || echo "Node.js not found yet"
                npm -v || echo "npm not found yet"
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "Starting deploy to ${DEPLOY_DIR}"
                mkdir -p ${DEPLOY_DIR}
                cp -r dist/* ${DEPLOY_DIR}/
                echo "Deploy finished."
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline finished successfully.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
        always {
            archiveArtifacts artifacts: 'dist/**', fingerprint: true
        }
    }
}
