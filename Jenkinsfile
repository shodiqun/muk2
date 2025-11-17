pipeline {
    agent any

    environment {
        NODE_VERSION = "20"
        APP_PORT = "3000"
        // Example deployment directory (adjust to your server)
        DEPLOY_DIR = "/var/www/muk2-sample-app"
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
                if command -v nvm >/dev/null 2>&1; then
                  echo "Using nvm to set Node ${NODE_VERSION}"
                  nvm install ${NODE_VERSION}
                  nvm use ${NODE_VERSION}
                else
                  echo "Using system Node.js"
                  node -v || true
                fi
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

