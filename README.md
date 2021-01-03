# The Welcome Repo
Basic landing point for fictitious GulfCharter Tours company

# About
This NodeJS application provides a basic endpoint for ensuring that it has been deployed correctly.

The application will attempt to read an environment variable named `APP_MSG`. If found, navigating
to the `/message` endpoint will display the value of the environment variable. If `APP_MSG` is not
defined, then the same endpoint will display a default message.

# Running the application locally

```
npm install
npm start
```

# Building the Docker image

```
docker build -t welcome .
```

# Run the Docker image

```
docker run  --name welcome1 --env APP_MSG="Welcome to the site\!" -p 3000:3000 -d welcome:latest
```