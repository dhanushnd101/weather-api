pipeline {
  agent any
  
  environment {
    // Change these variables according to your project
    DOCKER_REGISTRY = "dhanushnd" // Replace with your Docker Hub username
    IMAGE_NAME = "weather-test" // Replace with the name you want to give to your Docker image
  }
  
  stages {
    stage('Cleanup') {
            steps {
                // Cleanup any previous build artifacts and Docker containers/images
                sh 'npm ci'
                sh 'docker-compose down -v'
            }
        }

    stage('Build') {
      steps {
        // Checkout the source code from the repository
        checkout scm

        // def dockerImageTag = "${DOCKER_REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}" 

        // Build the Docker image
        sh "docker build -t  ${DOCKER_REGISTRY}/${IMAGE_NAME} ."
      }
    }
    
    stage('Test') {
      steps {
        // Run tests inside the Docker container
        // sh "docker run -it --rm  npm test"
      }
    }
    
    stage('Push') {
      steps {

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
                // Deploy the Docker image to the Dev environment
                sh "docker-compose -f docker-compose.dev.yml up -d"
            }
        }

        stage('Deploy UAT') {
            when {
                // Add any condition to control when this stage should run (e.g., manual approval)
                expression { params.DEPLOY_TO_UAT == 'true' }
            }
            steps {
                // Deploy the Docker image to the UAT environment
                sh "docker-compose -f docker-compose.uat.yml up -d"
            }
        }

        stage('Deploy Production') {
            when {
                // Add any condition to control when this stage should run (e.g., manual approval)
                expression { params.DEPLOY_TO_PROD == 'true' }
            }
            steps {
                // Deploy the Docker image to the Production environment
                sh "docker-compose -f docker-compose.prod.yml up -d"
            }
        }



  }
}
