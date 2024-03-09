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
                // script {
                //     def changeSets = currentBuild.changeSets
                // }

                sh 'node -v'
                sh 'ls -la /var/lib/jenkins/workspace/'
            }
        }
    }
}