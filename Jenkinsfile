pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'cd /data/mini-shop/prod'
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
                sh 'cd /data/mini-shop/prod && rm -r mini-shop/'
                sh 'cp /var/jenkins_home/workspace/mini-shop /data/prod'
            }
        }
    }
}