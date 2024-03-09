pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run dev'
            }
        }
        stage('Deploy') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'githubtoken', url: 'https://github.com/Avagyan02/mini-shop.git']])                
                def changeSets = currentBuild.changeSets
                echo changeSets
            }
        }
    }
}