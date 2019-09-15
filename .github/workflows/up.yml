workflow "Deploy with Serverless" {
  on = "push"
  resolves = ["serverless deploy"]
}

action "master branch only" {
  uses = "actions/bin/filter@b2bea07"
  args = "branch master"
}

action "npm install" {
  uses = "actions/npm@master"
  args = "install"
  needs = ["master branch only"]
}

action "serverless deploy" {
  uses = "serverless/github-action@master"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  needs = ["npm install"]
  args = "deploy"
}
