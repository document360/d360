module.exports = {
  branches: ["main", { name: "next", prerelease: true }],
  repositoryUrl: "https://github.com/document360/d360.git",
  plugins: [
    "@semantic-release/commit-analyzer",
    {
      preset: "conventionalcommits",
      releaseRules: [
        { type: "chore", release: "major" },
        { type: "docs", scope: "README", release: "patch" },
        { type: "perf", release: "patch" },
        { type: "fix", release: "patch" },
        { type: "deps", release: "patch" },
        { type: "feat", release: "minor" },
      ],
    },
    "@semantic-release/release-notes-generator",
     [
      "@semantic-release/npm",
      {
        "path": "./dist"
      }
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/git",
      {
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
        assets: ["CHANGELOG.md", "package.json", "package-lock.json"],
      },
    ],
    [
      "@semantic-release/exec",
      {
        publishCmd: "gh release create ${nextRelease.version} --draft --generate-notes",
      },
    ],
  ],
};
