# Development Environment Setup Notes

## Prerequisites

Before you begin, ensure that Docker is installed on your machine.

### Install Docker

1. Go to the [Docker website](https://www.docker.com/get-started) and download the Docker application.
2. Follow the installation instructions for your platform.

### Launch Docker Daemon

After installing Docker, launch the Docker daemon:

### Clone the Repository

```shell
git clone https://github.com/heaphyg/VRPatientPortal
```

### Set Up the Backend (Express and MySQL)

1. Open a terminal and Navigate to the ExpressBackend directory

```shell
   cd VRPatientPortal/ExpressBackend
```

2. Launch the backend using Docker Compose:

```shell
   docker compose up
```

### Set Up the Frontend (Vue.js)

1. Open a separate terminal window.
2. Navigate to the VueFrontend directory and install dependencies

```shell
   cd VRPatientPortal/VueFrontend
   npm ci
```

3. To start the Vue.js server, run:

```shell
   npm run dev
```

4. To run Playwrite tests, run:

```shell
   npx playwright test
```

5. visit http://localhost:5173/ in your browser
