


# Sentry-demos/with-typescript-eslint-jest

## Setup

### 1. Create a [Layer0 account](https://app.layer0.co/)
### 2. Clone this repository
### 3. install dependencies:
```
yarn install
```
### 4. Update .env file variables:
```
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=
```
### 5. Run the command layer0 login to create a authorization token
```
yarn layer0 login
```

### 6. Now you can you can deploy using layer0
```
yarn layer0 deploy
```
This will:
- create a new project in layer0 if it doesn't exist
- build the nextjs application
- deploy the application to layer0

## Deploying using Github Actions after the project creation in Layer0
This strategy will decouple the build and deploy phases.

### 1. Access the [Layer0 dashboard](https://app.layer0.co/)
### 2. Go to: `{Your Project}` > `Settings` > `Create New Deploy Token` 

> name: GITHUB_ACTION_TOKEN

### 3. Copy the token value
### 4. Go to the github repository: `Settings` > `Secrets` > `Actions` > `New Repository secret`

> name: LAYER0_DEPLOY_TOKEN

> value: {the value of GITHUB_ACTION_TOKEN from Layer0}

### 5. You also should create some sentry variables as githib action secrets
```
SENTRY_AUTH_TOKEN
SENTRY_ORG
SENTRY_PROJECT
```
___ 
