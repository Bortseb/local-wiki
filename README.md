# Fedwiki Packaged as a standalone app (via Electron)

__Table of Contents__
- [Set Up after Clone](#set-up-after-clone)
  - [App Icon Images](#app-icon-images)
- [Run Locally and Develop on your Computer](#run-locally-and-develop-on-your-computer)
- [Building / Packaging](#building--packaging)

## Set Up after Clone

TODO: Global find and replace:
`com.some-domain-name.app-name`: replace with an Apple ["bundle Id"](https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids) that is registered on your Apple Developer account

### App Icon Images

Replace `electron/build/icon.icns`. This one is utilized by MacOS.

Replace `electron/build/icon.ico`. This one is utilized by Windows.

Replace `web/dist/logo/icon.png`. This one is utilized by Linux.

## Run Locally and Develop on your Computer

_Prerequisites_

- Have rust language (stable) installed on your system
- Have nodejs version 14 installed on your system

Then run

- `npm run install-deps`

Run `npm run electron`

### Commands that are more specific to your use case:

**web** (user interface)

- Use nodejs version 14
- `npm run web-install`
- `npm run web`

**electron**

- `npm run electron-install`
- `npm run electron-tsc` (**needs to be re-run whenever electron folder source code changes**)
- `npm run electron`

## Building / Packaging

To build:

- `npm run build`

The packaged executables can be found in `electron/out`.

In order to get cross-platform builds, just tag your repository like `v0.0.1` and push those tags to Github. CI will automatically start running a build, under the "Release" action.

> Macos: You will need to have set the following environment variables as repository secrets:
> - APPLE_CERTIFICATE_BASE64
> - APPLE_CERTIFICATE_PASS
> - APPLE_DEV_IDENTITY
> - APPLE_ID_EMAIL
> - APPLE_ID_PASSWORD
> 
> The first two should be set as equivalents of `MACOS_CERTIFICATE` = `APPLE_CERTIFICATE_BASE64` and `MACOS_CERTIFICATE_PWD` = `APPLE_CERTIFICATE_PASS` as found in the following article, which also provides other instruction regarding this: https://localazy.com/blog/how-to-automatically-sign-macos-apps-using-github-actions
>
> There is a sixth environment variable which is useful to set, like this: `DEBUG: electron-osx-sign*,electron-notarize*`. This allows for useful logging outputs from the signing and notarizing process. This env var is set automatically when running on CI, in the "Release" Github Action.

