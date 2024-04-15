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
        sshagent (credentials: ['3e856116-029e-4c8d-b57d-593b2fba3cb2']) {
          exec('yarn storybook-to-ghpages')
        }
      } else {
        echo "Skipping as is not latest release"
      }
    }
  }
)