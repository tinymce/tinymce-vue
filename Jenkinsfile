#!groovy
@Library('waluigi@v4.1.0') _

standardProperties()

node("primary") {
  echo "Clean workspace"
  cleanWs()

  stage("checkout") {
    checkout localBranch(scm)
  }

  stage("dependencies") {
    yarnInstall()
  }

  stage("stamp") {
    sh "yarn beehive-flow stamp"
  }

  stage("build") {
    sh "yarn build"
  }

  stage("lint") {
    sh "yarn lint"
  }

  def platforms = [
    [ os: "windows-10", browser: "chrome" ],
    [ os: "windows-10", browser: "firefox" ],
    [ os: "windows-10", browser: "MicrosoftEdge" ],
    [ os: "macos", browser: "chrome" ],
    [ os: "macos", browser: "firefox" ],
    [ os: "macos", browser: "safari" ]
  ]
  bedrockBrowsers(platforms: platforms, testDirs: [ "src/test/ts/atomic", "src/test/ts/browser" ])

  stage("storybook") {
    def status = beehiveFlowStatus();
    if (status.branchState == 'releaseReady' && status.isLatest) {
      sshagent (credentials: ['3e856116-029e-4c8d-b57d-593b2fba3cb2']) {
        sh 'yarn storybook-to-ghpages'
      }
    } else {
      echo "Skipping as is not latest release"
    }
  }

  stage("publish") {
    sshagent(credentials: ['jenkins2-github']) {
      sh "yarn beehive-flow publish"
      sh "yarn beehive-flow advance-ci"
    }
  }
}
