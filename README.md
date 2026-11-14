# github-test

Testing GitHub integrations.

## What's here

| File | Purpose |
|---|---|
| `.github/workflows/sample.yml` | Workflow `Log on PR changes`. Runs on pull request `opened` and `edited`, prints the README and the environment, dumps the event payload, then runs the base-ref check. |
| `check-pr-base.js` | Fails the build unless the pull request targets `master`. |

## The PR base-ref check

`check-pr-base.js` reads the pull request event payload at `GITHUB_EVENT_PATH` and
inspects `pull_request.base.ref`:

- Base is `master` — logs `Base ref was correct.` and exits 0.
- Base is anything else — logs `Base ref was wrong! Failing build.` and exits 1.

So a pull request opened against any branch other than `master` fails CI by design.
Outside CI the script exits 0 immediately, since `GITHUB_EVENT_PATH` is unset.

Note that the workflow triggers only on `opened` and `edited`, not on `synchronize`,
so pushing new commits to an existing pull request does not re-run the check.
