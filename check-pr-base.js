if (!process.env.GITHUB_EVENT_PATH) {
  console.log('Not running in CI!');
  process.exit(0);
}

const github = require('@actions/github');
const octokit = new github.GitHub(process.env.GITHUB_TOKEN, {previews: ['antiope-preview']});

const ghAction = require(process.env.GITHUB_EVENT_PATH);

const baseRefMatched = ghAction.pull_request.base.ref === 'master';

octokit.graphql(`
  mutation CreateCheck {
    createCheckRun(input: {name: "Test check"}) {
      clientMutationId
    }
  }
`);
