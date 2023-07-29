pipeline {
    agent any

    environment {
        // Change these variables according to your project
        DOCKER_REGISTRY = "dhanushnd" // Replace with your Docker Hub username
        IMAGE_NAME = "weather-api" // Replace with the name you want to give to your Docker image
    }
  
    stages {
        stage('Cleanup') {
            steps {
                echo "** In cleanup stage"
                // Cleanup any previous build artifacts and Docker containers/images
                sh 'npm ci'
                // sh 'docker-compose down -v'
            }
        }

        stage('Build') {
            steps {
                echo "** In build stage"
                // Checkout the source code from the repository
                checkout scm

                // def dockerImageTag = "${DOCKER_REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}" 

                // Build the Docker image
                sh "docker build -t  ${DOCKER_REGISTRY}/${IMAGE_NAME} ."
            }
        }
        
        stage('Test') {
            steps {
                echo "** In testing stage"
                // Run tests inside the Docker container
                // sh "docker run -it --rm  npm test"
            }
        }
        
        stage('Push') {
            steps {
                echo "** In push stage"

                // def dockerImageTag = "${DOCKER_REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}" 

                // Push the Docker image to Docker Hub
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh "docker login -u $USERNAME -p $PASSWORD"
                    sh "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}"
                }
            }
        }

        stage('Deploy Dev') {
            when {
                    // Add any condition to control when this stage should run (e.g., manual approval)
                    expression { params.DEPLOY_TO_DEV == 'true' }
                }
            steps {
                echo "** In Deploy to dev stage"
                // Deploy the Docker image to the Dev environment
                sh "docker pull ${DOCKER_REGISTRY}/${IMAGE_NAME}"
                // Run the Docker container on the local machine
                sh "docker run -d -p 3000:3000 --name weather-app ${DOCKER_REGISTRY}/${IMAGE_NAME}"
            }
        }

        stage('Deploy UAT') {
            when {
                // Add any condition to control when this stage should run (e.g., manual approval)
                expression { params.DEPLOY_TO_UAT == 'true' }
            }
            steps {
                echo "** In deploy to UAT stage"
                // Deploy the Docker image to the Dev environment
                sh "docker pull ${DOCKER_REGISTRY}/${IMAGE_NAME}"
                // Run the Docker container on the local machine
                sh "docker run -d -p 3000:3000 --name weather-app ${DOCKER_REGISTRY}/${IMAGE_NAME}"
            }
        }

        stage('Deploy Production') {
            when {
                // Add any condition to control when this stage should run (e.g., manual approval)
                expression { params.DEPLOY_TO_PROD == 'true' }
            }
            steps {
                echo "** In deploy to PROD stage"
                // Deploy the Docker image to the Dev environment
                sh "docker pull ${DOCKER_REGISTRY}/${IMAGE_NAME}"
                // Run the Docker container on the local machine
                sh "docker run -d -p 3000:3000 --name weather-app ${DOCKER_REGISTRY}/${IMAGE_NAME}"
            }
        }
    }
}
