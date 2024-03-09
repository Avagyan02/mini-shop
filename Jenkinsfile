pipeline {
    agent any
    triggers {
        GenericTrigger(
            genericVariables: [
                [key: 'targetBranchName', value: '$.body.pull_request.base.ref'],
                [key: 'sourseBranchName', value: '$.body.pull_request.head.ref'],
            ],
            token: 'jenkins-token'
        )
    }
    stages {
        stage('Build') {
            steps {
                sh 'cd /data/prod/mini-shop'
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
                sh 'cd /data/prod && rm -rf mini-shop/'
                sh 'cp -r /var/jenkins_home/workspace/mini-shop /data/prod'
            }
        }
    }
}
