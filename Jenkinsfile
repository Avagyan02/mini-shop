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
      }
    }
  }
}