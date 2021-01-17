#!groovy
@Library('waluigi@v4.0.0') _

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

  def platforms = [
    [ os: "windows-10", browser: "chrome" ],
    [ os: "windows-10", browser: "firefox" ],
    [ os: "windows-10", browser: "MicrosoftEdge" ],
    [ os: "macos", browser: "chrome" ],
    [ os: "macos", browser: "firefox" ],
    [ os: "macos", browser: "safari" ]
  ]
  bedrockBrowsers(platforms: platforms, testDirs: [ "src/test/ts/atomic", "src/test/ts/browser" ])

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
