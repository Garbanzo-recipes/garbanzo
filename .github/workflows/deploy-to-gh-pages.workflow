workflow "Deploy to Github Pages" {
  on = "push"
  resolves = ["Deploy to gh-pages"]
}

action "master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy to gh-pages" {
  uses = "Garbanzo-recipes/garbanzo@master"
  env = {
    BRANCH = "gh-pages"
    BUILD_SCRIPT = "npm install && npm run build"
    FOLDER = "dist"
  }
  secrets = ["ACCESS_TOKEN"]
  needs = ["master branch only"]
}
