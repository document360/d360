<p align="center">
  <a href="https://document360.com">Document360</a> official command-line interface (CLI)
</p>

<p align="center">
  <a href="https://npm.im/d360"><img src="https://img.shields.io/npm/v/d360?style=for-the-badge" alt="NPM Version"></a>
  <a href="https://npm.im/d360"><img src="https://img.shields.io/npm/l/d360?style=for-the-badge" alt="MIT License"></a>
  <a href="https://github.com/document360/d360"><img src="https://img.shields.io/github/actions/workflow/status/document360/d360/publish.yml?branch=main&style=for-the-badge" alt="Build status"></a>
</p>

<!--alex ignore postman-postwoman-->

The d360 package provides the capability to both manage and synchronize your API Definition with Document360. By utilizing this package within Document360, you will be able to effortlessly generate API documentation for both internal and external consumers, automatically generated from your API definition files

## Table of Contents

<!--
Pro tip: You can automatically generate this Table of Contents (TOC) by executing the following command on your command line:

```
npx markdown-toc README.md --maxdepth 3 --bullets="-" -i
```

You'll need to remove the character escapes from where the emojis are used, Please visit:
https://github.com/jonschlinkert/markdown-toc/issues/119
-->

<!-- toc -->

- [Setup](#setup)
- [Commands](#commands)
  - [apidocs](#apidocs)
  - [apidocs:resync](#apidocsresync)
  - [apidocs:validate](#apidocsvalidate)
- [What's Next](#whats-next)

<!-- tocstop -->

## Setup

In order to install our package, it is required that you have Node.js already installed on your system. Once Node.js is successfully installed, you can proceed to directly install our package from the npm registry.

```sh
npm install -g d360
```

## Commands

Our npm package includes a list of available commands, which are as follows:

- apidocs - `Generate API Documentation` from your API Definition file
- apidocs:resync - Resync your API Definition

### apidocs

By utilizing the 'apidocs' command, you will have the ability to generate API documentation directly from your API Definition file.

```sh
d360 apidocs --apiKey=c92e71ab-ebdf-4007-89ed-5d47493052cd
             --userId=3340e95e-2b68-4a3f-a8c9-124bcaec9972
             --versionId=d486783f-b833-446e-aa71-615ac51392c3
             --path=https://petstore.swagger.io/v2/swagger.json
```

| Options            | Description                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| apiKey `string`    | Project API Key                                                                                                               |
| userId `string`    | User Id that's used to generate API Docs                                                                                      |
| versionId `string` | Project Version Id                                                                                                            |
| apihubUrl `string` | APIHUB Base URL. The default value for this parameter is 'https://apihub.document360.io'                                      |
| path `string`      | File path of your respective API Reference                                                                                    |
| force `boolean`    | Force import your API Reference. It will import even if there are errors or warnings present within your specification files. |

### apidocs:resync

With the 'apidocs:resync' command, you are able to update or resynchronize your API Definition.

```sh
d360 apidocs:resync --apiKey=c92e71ab-ebdf-4007-89ed-5d47493052cd
                    --userId=3340e95e-2b68-4a3f-a8c9-124bcaec9972
                    --apiReferenceId=d486783f-b833-446e-aa71-615ac51392c3
                    --path=https://petstore.swagger.io/v2/swagger.json
```

| Options                 | Description                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| apiKey `string`         | Project API Key                                                                                 |
| userId `string`         | User Id that's used to resync API Reference                                                     |
| apiReferenceId `string` | API Reference Id to resync                                                                      |
| apihubUrl `string`      | APIHUB Base URL. The default value for this parameter is 'https://apihub.document360.io'        |
| path `string`           | File path of your respective API Definitions                                                    |
| force `boolean`         | Force resync your API Reference. It will resync even your spec files has errors and warnings    |

### apidocs:validate

With the 'apidocs:validate' command, you will be able to validate your OpenAPI Specification(OAS) file.

```sh
d360 apidocs:validate --apiKey=c92e71ab-ebdf-4007-89ed-5d47493052cd
                      --apihubUrl=https://apihub.document360.io
                      --path=https://petstore.swagger.io/v2/swagger.json
```

| Options            | Description                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| apiKey `string`    | Project API Key                                                                          |
| apihubUrl `string` | APIHUB Base URL. The default value for this parameter is 'https://apihub.document360.io' |
| path `string`      | File path of your respective API Definitions                                             |

## What's next ?

As part of our ongoing efforts to enhance the user experience of our d360 npm package, we are committed to support backward compatibility to the best of our ability.
