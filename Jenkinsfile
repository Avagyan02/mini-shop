pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'cd /data'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                // sh 'npm run dev'
                sh 'node -v'
            }
        }
        stage('Deploy') {
            steps {
                // checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'githubtoken', url: 'https://github.com/Avagyan02/mini-shop.git']])                
                script {
                    def changeSets = currentBuild.changeSets
                    echo changeSets
                }
            }
        }
    }
}