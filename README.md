# Dad Joke App

Simple ReactJS application used for deploying ReactJS application into [IBM Cloud](https://ibm.biz/ibm-cloud-dashboard-bradstondev)

Based on a blog/tutorial published on dev.to called [Deploying your first ReactJS application into the Cloud]()

## Prerequisites for deploying into IBM Cloud

1. IBM Cloud Lite Account(Free) - Sign-up [here](https://ibm.biz/IBM-Cloud-Signup) 
2. React (installed on local Machine) - Get Installation Instructions [here](https://reactjs.org/docs/getting-started.html)
3. IBM Cloud CLI - Get [here](https://github.com/IBM-Cloud/ibm-cloud-cli-release/releases/)


## Don't forget to run NPM Install

Since node modules are not included in repo, for application to run correctly locally, make sure to run:

```
npm install
```

## You only need to modify one file - manifest.yml


You only need to change these two lines to match your information on your IBM Cloud Foundry Application Info:

```
name: my-app-name
...
- route: route.server.cf.appdomain.cloud
```

Feel free to submit pull requests if 