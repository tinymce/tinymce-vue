#!groovy
@Library('waluigi@v3.2.0') _

standardProperties()

def isSupportedBranch() {
  def branchName = env.BRANCH_NAME ? env.BRANCH_NAME : env.GIT_BRANCH
  return branchName == 'v3.x' || branchName == 'origin/v3.x';
}

def isNewerTaggedVersion(tagName) {
  def packageName = sh(script: 'node -p -e "require(\'./package.json\').name"', returnStdout: true).trim()
  if (packageName && tagName) {
    def remoteVersion = sh(script: "npm view ${packageName}@${tagName} version", returnStdout: true)
    echo "Validating remote version: " + remoteVersion
    def localVersion = sh(script: 'node -p -e "require(\'./package.json\').version"', returnStdout: true)
    if (localVersion) {
      return isNewerVersion(remoteVersion, localVersion)
    }
  }
  return false
}

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

  stage("Publish") {
    if (isReleaseBranch() && isPackageNewerVersion()) {
      sh 'npm publish'
    } else if (isSupportedBranch() && isNewerTaggedVersion('vue2')) {
      sh 'npm publish --tag vue2'
    } else {
      echo "Nothing to publish"
    }
  }
}
