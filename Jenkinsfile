pipeline {
  agent any

  options {
        timeout(time: 1, unit: 'HOURS')
    }

  stages {
    stage('Source') {
      steps {
        echo 'Pulling from GitHub'
      }
    }

    stage('Build') {
      steps {
        echo '********STARTING BUILD STAGE*******'
        echo '***********************************'
        sh '''
        cd auth
        docker build -t uddin609/auth:01 .
        cd ../user
        docker build -t uddin609/user:01 .
        cd ../admin
        docker build -t uddin609/admin:01 .
        '''
        echo '***** DOCKER HUB *****'
        withCredentials([usernamePassword(credentialsId: 'DockerHubC', passwordVariable: 'DHPASS', usernameVariable: 'DHUSER')]) {
          sh "docker login -u ${DHUSER} -p ${DHPASS}"
        }
        echo '***** PUSHING IMAGES TO DOCKER HUB *****'
        sh '''
        docker push uddin609/auth:01
        docker push uddin609/user:01
        docker push uddin609/admin:01
        '''
      }
    }

    stage('Deploy_To_TestServer') {
      steps {
        echo '***** DEPLOYING TO TEST SERVER *****'
        withCredentials([string(credentialsId: 'SERVERPASS', variable: 'SERVERPASS')])    {
          sh "sshpass -p ${SERVERPASS} ssh -o StrictHostKeyChecking=no ubuntu@54.198.218.245 'docker-compose down && docker-compose up -d'"
        }
        echo '***** DEPLOYMENT IS DONE FOR TEST SERVER *****'
                            
