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
                script {
                    def changeSets = currentBuild.changeSets
                }

                ah 'node -v'
            }
        }
    }
}