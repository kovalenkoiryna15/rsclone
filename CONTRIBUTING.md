# How to contribute

Thanks for your interest in improving this project!
These guidelines attempt to make the process easier and more enjoyable.

## General guidelines

Everyone interacting with this project is expected to follow the
[Code of Conduct][code of conduct].

Submit questions, bug reports, and feature requests in the [issue tracker][].
Please be as descriptive as you can. For bug reports, please include
information about your local environment, the steps to reproduce the bug,
and any relevant command-line output.

Submit improvements to code and documentation via [pull requests][].
Unless it’s a small/quick fix, pull requests should reference an open issue
that’s been discussed. This helps ensure that your contribution is aligned
with the goals of this project.

During development, use the provided tools to check for consistent style,
coding errors, and test coverage. In general, only pull requests with passing
tests and checks will be merged.

## Setting up a development environment

### [Fork and clone][github docs fork-a-repo] this repository

1. Go to ``https://github.com/kovalenkoiryna15/rsclone`` and click the
     "fork" to create own copy of the project.

2. Using [git][] clone the project to local computer and add the upstream
     repository:

   ```shell script
   git clone https://github.com/your-username/covid-dashboard.git
   cd covid-dashboard
   git remote add upstream  https://github.com/kovalenkoiryna15/rsclone.git
   git remote -v
   ```

## During development

- Pull the last changes from ``upstream`` and create own
    branch for the feature:

  ```shell script
  git checkout develop
  git pull upstream develop
  git checkout -b new-feature
  ```

- **Your work here ...**

- Commit the changes

  ```shell script
  git commit add .
  git commit -s -m "A brief description of changes"
  ```

## To submit contribution

### To rebase on master

```shell script
$ git fetch upstream

# go to the feature branch
$ git checkout new-feature

# make a backup in case you mess up
$ git branch new-feature-temp new-feature

# rebase on upstream master branch
$ git rebase upstream/develop
# to resolve conflicts...

# remove the backup branch upon a successful rebase
$ git branch -D new-feature-temp
```

Or recovering from mess-ups if necessary:

```shell script
$ git rebase --abort

# reset branch back to the saved point
$ git reset --hard new-feature-temp

# OR look at the reflog of the branch
$ git reflog show new-feature
# ...
# reset the branch to where it was before he botched rebase
$ git reset --hard new-feature@{2}
```

### Push changes

```shell script
git push origin new-feature
```

### Open pull request

On ``https://github.com/your-username/covid-dashboard`` click
**Open pull request**.

For details see [GitHub.com Help Documentation][github.com help documentation]

[code of conduct]: https://github.com/kovalenkoiryna15/rsclone/blob/master/CODE_OF_CONDUCT.md
[issue tracker]: https://github.com/kovalenkoiryna15/rsclone/issues
[pull requests]: https://github.com/kovalenkoiryna15/rsclone/pulls
[github docs fork-a-repo]: https://docs.github.com/en/github/getting-started-with-github/fork-a-repo
[git]: https://git-scm.com/
[github.com help documentation]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests
