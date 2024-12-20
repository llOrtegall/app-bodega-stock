pipeline {
  agent any
    
  tools { nodejs 'node-v22' }

  environment { 
    ENV_APP_BODEGA_STOCK = credentials('ENV_APP_BODEGA_STOCK')
    ENV_API_BODEGA_STOCK = credentials('ENV_API_BODEGA_STOCK')
  }
    
  stages {
    stage('Copy .env files') {
      steps {
        script {
            def env_client = readFile(ENV_APP_BODEGA_STOCK)
            def env_api = readFile(ENV_API_BODEGA_STOCK)
            writeFile file: './app/.env', text: env_client
            writeFile file: './api/.env', text: env_api
          }
        }
      }

      stage('install dependencies frontend') {
        steps {
          script {
            sh 'cd app && npm install'
            sh 'cd app && npm run build'
          }
        }
      }

      stage('down docker compose'){
        steps {
          script { sh 'docker compose down' }
        }
      }

      stage('delete images if exist') {
        steps{
          script {
            def images = 'api_bod_stock:v1'
            if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
              sh "docker rmi ${images}"
            } else {
              echo "Image ${images} does not exist."
              echo "continuing..."
            }
          }
        }
      }

      stage('run docker compose'){
        steps {
          script { sh 'docker compose up -d' }
          }
      }
    }
}