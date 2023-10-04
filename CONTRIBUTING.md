# Editing documentation

Thank you for your interest in the LongPort OpenAPI documentation! We appreciate your feedback, edits, and additions to our content. This page covers the basic steps for editing our documentation.

## Editing documents in GitHub

We've tried to make editing an existing, public file as simple as possible.

### To edit a documentation

1. Browse to the [LongPort OpenAPI Docs](https://open.longportapp.com/docs) article that you want to update.

1. Then click the **Edit this page** or **Edit page** link.

   ![SCR-20230629-jm3](https://github.com/longbridgeapp/openapi-website/assets/5518/491a7d72-156a-4db9-8d21-78e4a72fda89)

   If the link isn't present, the content might not be open to public contributions. Some pages are generated (for example, from inline documentation in code) and must be edited in the project they belong to.

   > **TIP**<br>
   > View the page source in your browser, and look for the following metadata: `original_content_git_url`. This path always points to the source markdown file for the article.

1. In GitHub, select the **Pencil** icon to edit the article. If the pencil icon is grayed out, you need to either sign in to your GitHub account or create a new account.

   ![image](https://github.com/longbridgeapp/openapi-website/assets/5518/48ab67cd-7baf-458c-bad0-73eb46b94b6f)

1. Using Markdown language, make your changes to the file. For info about how to edit content using Markdown, see the GitHub's [Mastering Markdown](https://guides.github.com/features/mastering-markdown/) documentation.

   If your Longbridge staff, please reading and following the [Longbridge Writing Style Guide](https://longbridge.feishu.cn/wiki/wikcnqOEWHe43bdSLMP0S42vvvg) and the [OpenAPI Writing Guide](https://longbridge.feishu.cn/wiki/wikcnb0RtZ8OEuAodGBXaOL6Nxh).

1. Make your suggested change, and then select **Preview changes** to make sure it looks correct.

   ![SCR-20230629-jov](https://github.com/longbridgeapp/openapi-website/assets/5518/47c5621a-64c3-4d75-bbc3-ed9aa8289d6a)

1. When you're finished editing, scroll to the bottom of the page. In the **Propose changes** area, enter a title and optionally a description for your changes. The title will be the first line of the commit message. Briefly state _what_ you changed. Select **Propose changes** to commit your changes:

   ![image](https://github.com/longbridgeapp/openapi-website/assets/5518/091d76ce-4fbf-4193-bb5f-51af4c923994)

1. The **Comparing changes** screen appears to show what the changes are between your fork and the original content. On the **Comparing changes** screen, you'll see if there are any problems with the file you're checking. If there are no problems, you'll see the message **Able to merge**.

   ![SCR-20230629-jre](https://github.com/longbridgeapp/openapi-website/assets/5518/820007c9-016f-4941-a8b9-3e99395f3db8)

   Select **Create pull request**. Next, enter a title and description to give the approver the appropriate context about _why_ you're suggesting this change. Make sure that only your changed files are in this pull request; otherwise, you could overwrite changes from other people.

1. Select **Create pull request** again to actually submit the pull request.

   The pull request is sent to the writer of the topic and your edits are reviewed. If your request is accepted, updates are published to their respective article.

## Swagger Documentation

There have a lot of Swagger documentation in this project for describe our API, you can find them in `swagger-docs` directory.

[Swagger Editor](https://editor.swagger.io) is a tool can help us to edit and preview Swagger documentation. You can editing the document in the Swagger Editor, and then copy the document to `swagger-docs` directory.

And please following the [Swagger Specification](https://swagger.io/specification/).

## Editing documents locally

> NOTE: We recommend using [Visual Studio Code](https://code.visualstudio.com/) to develop. This project comes with `.vscode` built-in VS Code plugins and configuration recommendations. Writing with VS Code can start the automatic formatting function.

If you want to edit the documentation locally, you can follow the steps below.

```shell
$ yarn

# Start docusaurus server
$ yarn dev

# Listening swagger to markdown convert
$ yarn dev:swagger
```

### File structure

```bash
.
├── README.md
├── docs // All documentation in here
├── swagger-docs // All swagger documentation
├── templates // Template for Swagger to Markdown
├── i18n // I18n translation files, when you change any files in `docs`, you need to update the translation files.
├── src // Documentation website source code.
├── convert-md.js // Script for convert Swagger to Markdown.
├── sidebars.js // For describe the documentation sidebar.
├── docusaurus.config.js // Documentation website contributions.
├── tsconfig.json
├── package.json
└── yarn.lock
```

## Resources

- You can use your favorite text editor to edit Markdown files. We recommend [Visual Studio Code](https://code.visualstudio.com/), a free lightweight open source editor from Microsoft.
  - And please install [huacnlee.autocorrect](https://marketplace.visualstudio.com/items?itemName=huacnlee.autocorrect) extension for VSCode, for make sure your have a better copywriting.
- You can learn the basics of Markdown in just a few minutes. To get started, check out [Mastering Markdown](https://guides.github.com/features/mastering-markdown/).
