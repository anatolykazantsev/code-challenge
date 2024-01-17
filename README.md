# Code Challenge

## Yarn

Run yarn via local wrapper from the root directory of the project, i.e.

```
./yarn --version
```

## Build & run for development

```
./yarn run-app
```

## Build distribution container

*NOTE*: the following script uses podman to build the container

```
cd tools; ./build
```

## Run distribution container

```
podman run -it --rm localhost/code-challenge/game
```
