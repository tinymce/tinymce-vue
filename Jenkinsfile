#!groovy
@Library('waluigi@v3.2.0') _

standardProperties()

node("primary") {
  echo "Clean workspace"
  cleanWs()

  stage ("Checkout SCM") {
    checkout localBranch(scm)
  }

  stage("Building") {
    yarnInstall()
    exec "yarn run build"
  }

  def permutations = [
    [ name: "win10Chrome", os: "windows-10", browser: "chrome" ],
    [ name: "win10FF", os: "windows-10", browser: "firefox" ],
    [ name: "win10Edge", os: "windows-10", browser: "MicrosoftEdge" ]
  ]

  def processes = [:]

  for (int i = 0; i < permutations.size(); i++) {
    def permutation = permutations.get(i);
    def name = permutation.name;
    processes[name] = {
      node("bedrock-" + permutation.os) {
        echo "Clean workspace"
        cleanWs()

        echo "Checkout"
        checkout scm

        echo "Installing tools"
        yarnInstall()

        echo "Platform: browser tests for " + permutation.name
        bedrockTests(permutation.name, permutation.browser, "src/test/ts/browser")
      }
    }
  }

  stage("Parallel Browser Tests") {
    parallel processes
  }

  stage("Deploying storybook to github") {
    if (isReleaseBranch()) {
      sshagent (credentials: ['3e856116-029e-4c8d-b57d-593b2fba3cb2']) {
        sh 'yarn storybook-to-ghpages'
      }
    }
  }

  if (isReleaseBranch() && isPackageNewerVersion()) {
    stage("Publish") {
      sh 'npm publish'
    }
  }
}
