pipeline {
  agent any
  triggers {
    GenericTrigger(
     genericVariables: [
      [key: 'branch', value: 'main']
     ],
     causeString: 'Triggered on $ref',
     regexpFilterExpression: '',
     regexpFilterText: '',
     printContributedVariables: true,
     printPostContent: true
    )
  }
  stages {
    stage('Some step') {
      steps {
        sh "echo $branch"
        git credentialsId: 'c9294c2b-1dda-4a4c-9cdb-631a9abca249', url: 'https://github.com/Avagyan02/mini-shop.git'
      }
    }
  }
}
