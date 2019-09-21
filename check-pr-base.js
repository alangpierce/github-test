if (!process.env.GITHUB_EVENT_PATH) {
  console.log('Not running in CI!');
  process.exit(0);
}

const ghAction = require(process.env.GITHUB_EVENT_PATH)
if (ghAction.pull_request.base.ref === 'master') {
  console.log("Base ref was correct.");
} else {
  console.log("Base ref was wrong! Failing build.");
  process.exit(1);
}
