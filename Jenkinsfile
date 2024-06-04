#!groovy
@Library('waluigi@release/7') _

mixedBeehiveFlow(
  testPrefix: 'Tiny-Vue',
  testDirs: [ "src/test/ts/atomic", "src/test/ts/browser" ],
  platforms: [
    [ browser: 'chrome', headless: true ],
    [ browser: 'firefox', provider: 'aws' ],
    [ browser: 'safari', provider: 'lambdatest' ]
  ],
  customSteps: {
    stage("update storybook") {
      def status = beehiveFlowStatus()
      if (status.branchState == 'releaseReady' && status.isLatest) {
        tinyGit.withGitHubSSHCredentials {
          exec('yarn storybook-to-ghpages')
        }
      } else {
        echo "Skipping as is not latest release"
      }
    }
  }
)