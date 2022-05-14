module.exports = {
  branches: [
    'main',
    { name: 'beta', channel: 'beta', prerelease: true },
    { name: 'alpha', channel: 'alpha', prerelease: true },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    [
      '@semantic-release/github',
      {
        addReleases: 'top',
      },
    ],
  ],
}
