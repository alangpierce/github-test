if (!process.env.GITHUB_EVENT_PATH) {
  console.log('Not running in CI!');
  process.exit(0);
}

const graphql = require('@octokit/graphql').graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
    accept: 'application/vnd.github.antiope-preview+json',
  }
});

const ghAction = require(process.env.GITHUB_EVENT_PATH);
const baseRefMatched = ghAction.pull_request.base.ref === 'master';

console.log(`Sending args:`);
console.log({
  repoId: ghAction.pull_request.head.repo.node_id,
  headSha: ghAction.pull_request.head.sha,
});

graphql(`
  mutation CreateCheck($repoId: ID!, $headSha: GitObjectID!) {
    createCheckRun(input: {name: "Base ref matches", repositoryId: $repoId, headSha: $headSha, status: COMPLETED, conclusion: FAILURE}) {
      clientMutationId
    }
  }
`, {
  repoId: ghAction.pull_request.head.repo.node_id,
  headSha: ghAction.pull_request.head.sha,
  // conclusion: baseRefMatched ? "SUCCESS" : "FAILURE",
});
