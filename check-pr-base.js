if (!process.env.GITHUB_EVENT_PATH) {
  console.log('Not running in CI!');
  process.exit(0);
}

const graphql = require('@octokit/graphql').graphql.defaults({
  headers: {
    authorization: `token: ${process.env.GITHUB_TOKEN}`,
    accept: 'application/vnd.github.antiope-preview+json',
  }
});

const ghAction = require(process.env.GITHUB_EVENT_PATH);
const baseRefMatched = ghAction.pull_request.base.ref === 'master';

graphql(`
  mutation CreateCheck {
    createCheckRun(input: {name: "Test check"}) {
      clientMutationId
    }
  }
`);
