# Contributing to SYNAPSE Agent Kit

First off, thank you for considering contributing to SYNAPSE Agent Kit! It's people like you that make SYNAPSE such a great tool for the AI agent ecosystem.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to ceo@synapse-arch.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include code samples and error messages** if applicable.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps** or provide mock-ups if applicable.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most SYNAPSE Agent Kit users.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript styleguide
* Include thoughtfully-worded, well-structured tests
* Document new code based on the Documentation Styleguide
* End all files with a newline

## Development Setup

### Prerequisites

* Node.js 18+ and pnpm
* TypeScript 5+
* Git

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/synapse-agent-kit.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `pnpm install`
5. Make your changes
6. Build the project: `pnpm build`
7. Test your changes: `pnpm test` (if tests are available)
8. Commit your changes: `git commit -m 'Add some feature'`
9. Push to the branch: `git push origin feature/your-feature-name`
10. Submit a pull request

### Project Structure

```
synapse-agent-kit/
├── src/              # Source code
├── examples/         # Example implementations
├── tests/            # Test files (coming soon)
└── docs/             # Documentation
```

### Coding Standards

* Use TypeScript for all new code
* Follow the existing code style
* Write meaningful commit messages
* Add comments for complex logic
* Keep functions small and focused
* Use descriptive variable names

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* `feat:` A new feature
* `fix:` A bug fix
* `docs:` Documentation only changes
* `style:` Changes that do not affect the meaning of the code
* `refactor:` A code change that neither fixes a bug nor adds a feature
* `perf:` A code change that improves performance
* `test:` Adding missing tests or correcting existing tests
* `chore:` Changes to the build process or auxiliary tools

Example: `feat: add support for Python agent integration`

## Documentation

* Use clear and concise language
* Provide code examples where applicable
* Keep the README.md up to date
* Document all public APIs
* Include JSDoc comments for functions and classes

## Community

* Join our [GitHub Discussions](https://github.com/Chimera-Founder/synapse-agent-kit/discussions) to ask questions and share ideas
* Follow us on [Twitter/X](https://x.com/Synapse_Arch) for updates
* Check out the [SYNAPSE website](https://synapse-arch.com) for more information

## Recognition

Contributors will be recognized in our README.md and release notes. Significant contributors may be invited to join the core team.

## Questions?

Don't hesitate to ask questions in [GitHub Discussions](https://github.com/Chimera-Founder/synapse-agent-kit/discussions) or reach out to us at ceo@synapse-arch.com.

Thank you for contributing to SYNAPSE! 🚀
