#!groovy
@Library('waluigi@release/7') _

mixedBeehiveFlow(
  container: [ resourceRequestMemory: '3Gi', resourceLimitMemory: '3Gi' ],
  headlessContainer: [ selenium: [ image: "selenium/standalone-chrome:127.0" ] ],
  testPrefix: 'Tiny-Vue',
  testDirs: [ "src/test/ts/atomic", "src/test/ts/browser" ],
  platforms: [
    [ browser: 'chrome', headless: true ],
    [ browser: 'firefox', provider: 'aws' ],
    [ browser: 'safari', provider: 'lambdatest' ]
  ],
  publishContainer: [
    resourceRequestMemory: '4Gi',
    resourceLimitMemory: '4Gi'
  ],
  customSteps: {
    stage("update storybook") {
      def status = beehiveFlowStatus()
      if (status.branchState == 'releaseReady' && status.isLatest) {
        tinyGit.withGitHubSSHCredentials {
          exec('yarn deploy-storybook')
        }
      } else {
        echo "Skipping as is not latest release"
      }
    }
  },
  preparePublish:{
    yarnInstall()
    sh "yarn build"
  }
)