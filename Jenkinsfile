pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'cd /data/dev/mini-shop'
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
                sh 'cd /data/dev && rm -rf mini-shop/'
                sh 'cp -r /var/jenkins_home/workspace/mini-shop /data/dev'
            }
        }
    }
}