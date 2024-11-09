# AI Web Developer MVP

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Architecture](#architecture)
5. [Frontend](#frontend)
6. [Backend](#backend)
7. [Integration with OpenHands](#integration-with-openhands)
8. [Design Patterns](#design-patterns)
9. [Setup Instructions](#setup-instructions)
10. [Deployment](#deployment)
11. [Contributing](#contributing)
12. [License](#license)

---

## Project Overview

The **AI Web Developer MVP** project aims to create a streamlined system that autonomously modifies websites based on user-provided instructions. Leveraging **OpenHands** for AI-driven code generation and **Puppeteer** for website fetching, the system will:

1. **Capture Existing Websites**: Use Puppeteer in the backend to fetch and download the current state of a website based on a user-provided URL.
2. **Process User Instructions**: Accept a series of instructions detailing desired changes to the website via the frontend interface.
3. **Automate Modifications**: Utilize OpenHands to implement the specified changes to the website code.
4. **Return Modified Website**: Provide the modified website files for the user to download.
5. **Export as A/B Test**: Allow users to export the original and modified website setup as an A/B test for deployment.

This README outlines the requirements, architecture, and implementation details necessary to develop this MVP.

---

## Features

- **Website Capture**: Backend service using Puppeteer to fetch websites based on user-provided URLs.
- **Instruction Input**: Frontend interface to input and manage a series of instructions for website modifications.
- **AI-Powered Code Generation**: Integration with OpenHands to interpret instructions and modify website code accordingly.
- **Modified Website Download**: Allow users to download the modified website files upon completion.
- **A/B Test Export**: Export the original and modified website versions as an A/B test setup for developers.
- **File Management**: Handle storage and retrieval of website files and modification instructions.

---

## Technology Stack

- **Frontend**:

  - Next.js (React Framework)
  - Tailwind CSS (Styling)
  - Axios (API Calls)

- **Backend**:

  - Node.js with Express.js
  - Puppeteer (Website Fetching)
  - OpenHands SDK/API
  - Docker (Containerization)

- **Deployment**:

  - **Frontend**: Vercel
  - **Backend**: AWS (ECS, EKS, or EC2 with Docker)

- **Other Tools**:
  - Git & GitHub/GitLab
  - Docker Compose (for local development)
  - Webpack or Parcel (for bundling)

---

## Architecture

The application follows a **Modular** architecture to ensure scalability and maintainability. The primary components include:

1. **Frontend Application**: Built with Next.js and styled using Tailwind CSS, deployed on Vercel.
2. **Backend API**: Hosted on AWS as a Docker container, handling business logic, website fetching with Puppeteer, and AI integration with OpenHands.
3. **AI Integration Module**: Communicates with OpenHands to generate code changes.
4. **File Management**: Handles the storage and retrieval of website files and modification instructions.

![Architecture Diagram](./docs/architecture-diagram.png) _(Provide an actual diagram in the docs folder)_

---

## Frontend

### Responsibilities

- Provide a user-friendly interface for:
  - Inputting the website URL.
  - Inputting and managing modification instructions.
  - Downloading the modified website.
  - Exporting the setup as an A/B test.

### Structure

- **Pages**:

  - **Index Page**: Input website URL and instructions.
  - **Export Page**: Configure and export A/B test setups.

- **Components**:
  - **Header/Footer**: Navigation and branding.
  - **URL Input Form**: Form to input the website URL.
  - **Instruction Form**: Form to input modification instructions.
  - **Download Button**: Trigger download of the modified website.
  - **A/B Test Export Button**: Trigger export functionality.
  - **Logs/Activity Feed**: Display processing steps and AI actions.

### State Management

- Use **Context API** to manage global state, including projects and instructions.

### API Integration

- Utilize **Axios** for HTTP requests to the backend services.

### Design Considerations

- **Responsive Design**: Ensure compatibility across devices.
- **User Experience**: Intuitive workflows for users.
- **Error Handling**: Display meaningful messages and recovery options.

### Styling

- Use **Tailwind CSS** for rapid and consistent styling.

---

## Backend

### Responsibilities

- **API Endpoints**:

  - **Website Fetching**: Fetch and store website files using Puppeteer based on user-provided URLs.
  - **Instruction Processing**: Apply user instructions to the fetched website using OpenHands.
  - **A/B Test Export**: Package and export original and modified website setups for A/B testing.

- **File Management**:
  - Handle storage and retrieval of website files and modification instructions.

### Structure

- **Controllers**: Handle incoming requests and responses.
- **Services**: Business logic, including website fetching, AI integration, and A/B test packaging.
- **Routes**: Define API endpoints and associate them with controllers.

### Website Fetching with Puppeteer

- **Process**:
  1. Receive website URL from the frontend.
  2. Use Puppeteer to navigate to the URL and capture the website as a single file (HTML, CSS, JS, assets).
  3. Store the captured website files in the file storage system.
  4. Return the captured website files to the frontend.

### Instruction Processing with OpenHands

- **Process**:
  1. Receive user instructions from the frontend.
  2. Send the current website code and instructions to OpenHands via the API client.
  3. Receive modified code snippets or entire files from OpenHands.
  4. Return the modified website files to the frontend.

### A/B Test Export

- **Process**:
  1. Package the original and modified website files.
  2. Provide a downloadable A/B test setup to the user.

---

## Integration with OpenHands

### Responsibilities

- **AI Code Generation**: Utilize OpenHands to interpret user instructions and modify website code accordingly.

### Steps

1. **Instruction Parsing**:

   - Receive and parse user-provided instructions from the frontend.
   - Translate instructions into prompts suitable for OpenHands.

2. **Code Modification**:

   - Send the current website code and instructions to OpenHands via the API client.
   - Receive modified code snippets or entire files from OpenHands.

3. **Validation**:

   - Ensure that the AI-generated code meets quality and functionality standards.
   - Implement testing mechanisms to verify changes (e.g., automated testing or visual diffs).

4. **Return Modified Website**:
   - Send the updated website files back to the frontend for user download.

### Using OpenHands Docker Container

OpenHands provides a Docker container that can be used to execute instructions. Below are the steps to integrate OpenHands using Docker:

1. **Pull the OpenHands Docker Image**:

   ```bash
   docker pull docker.all-hands.dev/all-hands-ai/runtime:0.13-nikolaik
   ```

2. **Run the OpenHands Container**:

   ```bash
   docker run -it --pull=always \
       -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:0.13-nikolaik \
       -v /var/run/docker.sock:/var/run/docker.sock \
       -p 3000:3000 \
       --add-host host.docker.internal:host-gateway \
       --name openhands-app \
       docker.all-hands.dev/all-hands-ai/openhands:0.13
   ```

3. **Backend Integration**:

   - **API Communication**: The backend will communicate with the OpenHands container via HTTP requests to `http://localhost:3000` (assuming default port mapping).
   - **Docker Networking**: Ensure that both the backend and OpenHands containers are on the same Docker network if deployed separately. Alternatively, use Docker Compose to orchestrate both services.

4. **Using Docker Compose for Simplified Setup**:

   To simplify running both the backend and OpenHands together, you can use `docker-compose.yml`:

   ```yaml
   version: "3.8"

   services:
     backend:
       build: ./backend
       ports:
         - "5000:5000"
       environment:
         - OPENDEVIN_API_KEY=your_openhands_api_key
         - STORAGE_BUCKET=your_storage_bucket
       depends_on:
         - openhands

     openhands:
       image: docker.all-hands.dev/all-hands-ai/openhands:0.13
       ports:
         - "3000:3000"
       environment:
         - SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:0.13-nikolaik
       volumes:
         - /var/run/docker.sock:/var/run/docker.sock
       extra_hosts:
         - "host.docker.internal:host-gateway"
   ```

   **Steps**:

   1. **Create `docker-compose.yml`** in the root directory of your project.
   2. **Configure Environment Variables**: Replace `your_openhands_api_key` and `your_storage_bucket` with actual values.
   3. **Run Docker Compose**:

      ```bash
      docker-compose up -d
      ```

   This setup ensures that both the backend and OpenHands services are up and running, and the backend can communicate with OpenHands via `http://openhands:3000`.

### Error Handling

- **AI Limitations**: Handle cases where OpenHands cannot interpret instructions correctly by providing fallback options or requesting clarification from the user.
- **Fallback Mechanisms**: Allow users to manually adjust instructions or review and approve AI changes before finalizing modifications.
- **Logging**: Maintain detailed logs of AI interactions and modifications for debugging and audit purposes.

---

## Design Patterns

### Frontend

- **Component-Based Architecture**: Break down the UI into reusable and maintainable components.
- **Container-Presenter Pattern**: Separate logic (containers) from presentation (presenters) to enhance scalability and testability.
- **Observer Pattern**: Utilize for handling responses from the backend, enabling the frontend to react dynamically to backend processes.

### Backend

- **MVC (Model-View-Controller)**:

  - **Model**: Data structures and interactions with file storage.
  - **View**: API responses.
  - **Controller**: Request handling and business logic.

- **Service Layer**:

  - Encapsulate business logic and interactions with external services (e.g., Puppeteer, OpenHands).

- **Singleton Pattern**:

  - For modules that require a single instance, such as the OpenHands API client.

- **Factory Pattern**:

  - Create objects without specifying the exact class, useful for handling different types of instructions or website structures.

- **Strategy Pattern**:
  - Allow interchangeable algorithms for processing instructions or handling different website architectures.

### General

- **Builder Pattern**:
  - Facilitate the construction of complex objects like A/B test configurations by separating the construction process from the final representation.

---

## Setup Instructions

### Prerequisites

- **Node.js** (v16.x or later)
- **npm** or **yarn**
- **Docker** (for backend containerization)
- **OpenHands API Key**
- **Puppeteer Dependencies**: Ensure necessary libraries for Puppeteer are installed (e.g., Chromium dependencies)

### Frontend

1. **Navigate to Frontend Directory**:

   ```bash
   cd frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**:

   - Create a `.env.local` file based on `.env.example`.
   - Set API endpoints.

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Backend

1. **Navigate to Backend Directory**:

   ```bash
   cd backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**:

   - Create a `.env` file based on `.env.example`.
   - Set OpenHands API key and storage configurations.

   ```env
   PORT=5000
   OPENDEVIN_API_KEY=your_openhands_api_key
   STORAGE_BUCKET=your_storage_bucket
   ```

4. **Install Puppeteer Dependencies**:

   - Depending on the operating system, you might need to install additional libraries required by Puppeteer. Refer to [Puppeteer’s official documentation](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-on-linux).

5. **Start the Server**:

   ```bash
   npm start
   # or
   yarn start
   ```

### Additional Setup

- **OpenHands Docker Container**:

  Ensure that the OpenHands Docker container is running as per the instructions in the [Integration with OpenHands](#integration-with-openhands) section.

---

## Deployment

### Frontend

1. **Build for Production**:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Deploy to Vercel**:
   - **Sign Up/Login** to [Vercel](https://vercel.com/).
   - **Import Project** from GitHub/GitLab.
   - **Configure Environment Variables** in Vercel:
     - `NEXT_PUBLIC_API_URL` set to your backend API URL.
   - **Deploy** the project. Vercel will handle the build and deployment process.

### Backend

1. **Containerization with Docker**:

   - **Create a `Dockerfile`** in the backend directory:

     ```dockerfile
     FROM node:16-alpine

     WORKDIR /app

     COPY package.json yarn.lock ./
     RUN yarn install --production

     COPY . .
     RUN yarn build

     CMD ["node", "dist/index.js"]
     ```

   - **Create a `docker-compose.yml`** for local orchestration (optional):

     ```yaml
     version: "3.8"

     services:
       backend:
         build: ./backend
         ports:
           - "5000:5000"
         environment:
           - OPENDEVIN_API_KEY=${OPENDEVIN_API_KEY}
           - STORAGE_BUCKET=${STORAGE_BUCKET}
         depends_on:
           - openhands

       openhands:
         image: docker.all-hands.dev/all-hands-ai/openhands:0.13
         ports:
           - "3000:3000"
         environment:
           - SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:0.13-nikolaik
         volumes:
           - /var/run/docker.sock:/var/run/docker.sock
         extra_hosts:
           - "host.docker.internal:host-gateway"
     ```

2. **Deploy to AWS**:

   - **Choose a Deployment Service**:

     - **AWS Elastic Container Service (ECS)** with Fargate for serverless container management.
     - **AWS Elastic Kubernetes Service (EKS)** for Kubernetes-based orchestration.
     - **AWS EC2** instances with Docker installed.

   - **Steps for AWS ECS with Fargate**:

     1. **Push Docker Images to AWS ECR**:

        - **Create ECR Repositories** for both backend and OpenHands (if not using the official OpenHands image).

        - **Authenticate Docker to AWS ECR**:

          ```bash
          aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com
          ```

        - **Build and Tag Docker Images**:

          ```bash
          docker build -t ai-web-developer-backend ./backend
          docker tag ai-web-developer-backend:latest your-account-id.dkr.ecr.your-region.amazonaws.com/ai-web-developer-backend:latest

          # OpenHands uses the official image; no need to build unless customization is required
          ```

        - **Push Images to ECR**:

          ```bash
          docker push your-account-id.dkr.ecr.your-region.amazonaws.com/ai-web-developer-backend:latest
          ```

     2. **Create an ECS Cluster**:

        - Navigate to ECS in the AWS Console.
        - Create a new cluster using Fargate.

     3. **Create Task Definitions**:

        - **Backend Task Definition**:

          - Use the pushed backend Docker image.
          - Set necessary environment variables (`OPENDEVIN_API_KEY`, `STORAGE_BUCKET`).
          - Configure networking (VPC, subnets, security groups).

        - **OpenHands Task Definition** (if using a custom image):
          - Use the official OpenHands image.
          - Set environment variables (`SANDBOX_RUNTIME_CONTAINER_IMAGE`).
          - Mount Docker socket if necessary.

     4. **Run the Services**:

        - Deploy the tasks in the ECS cluster.
        - Configure load balancing if needed.

3. **Configure Environment Variables**:

   - Set environment variables securely in AWS:
     - `OPENDEVIN_API_KEY`
     - `STORAGE_BUCKET`

4. **Set Up Networking**:

   - **VPC Configuration**: Ensure the backend is accessible to the frontend.
   - **Security Groups**: Open necessary ports (e.g., 5000 for API, 3000 for OpenHands if needed).

5. **Scaling and Monitoring**:

   - **Auto-Scaling**: Configure based on CPU/memory usage.
   - **Monitoring**: Use AWS CloudWatch for logs and metrics.

### Database

- **Not Applicable**: This MVP does not use a database. All processing is handled in-memory, and outputs are returned directly to the frontend.

### Real-Time Communication

- **Not Applicable**: This MVP does not implement real-time features such as WebSockets. All interactions are handled via standard HTTP requests.

### Continuous Integration/Continuous Deployment (CI/CD)

1. **Frontend (Vercel)**:

   - Vercel automatically integrates with GitHub/GitLab repositories.
   - Push to the main branch triggers automatic deployments.

2. **Backend (AWS)**:

   - **Set Up CI/CD Pipelines** using tools like **GitHub Actions**, **GitLab CI**, or **Jenkins**.
   - Example **GitHub Actions Workflow**:

     ```yaml
     name: CI/CD Pipeline

     on:
       push:
         branches: [main]
       pull_request:
         branches: [main]

     jobs:
       build:
         runs-on: ubuntu-latest

         steps:
           - uses: actions/checkout@v2

           - name: Set up Node.js
             uses: actions/setup-node@v2
             with:
               node-version: "16"

           - name: Install dependencies
             run: |
               cd frontend
               yarn install
               cd ../backend
               yarn install

           - name: Run tests
             run: |
               cd frontend
               yarn test --ci
               cd ../backend
               yarn test --ci

           - name: Build frontend
             run: |
               cd frontend
               yarn build

           - name: Build backend
             run: |
               cd backend
               yarn build

           - name: Push Docker Image to ECR
             env:
               AWS_REGION: your-region
               AWS_ACCOUNT_ID: your-account-id
               ECR_REPO: ai-web-developer-backend
               IMAGE_TAG: latest
             run: |
               aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
               docker build -t $ECR_REPO ./backend
               docker tag $ECR_REPO:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:$IMAGE_TAG
               docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:$IMAGE_TAG

           - name: Deploy to AWS ECS
             uses: aws-actions/amazon-ecs-deploy-task-definition@v1
             with:
               task-definition: backend-task-def.json
               service: ai-web-developer-backend-service
               cluster: ai-web-developer-cluster
               wait-for-service-stability: true
     ```

   - **Notes**:
     - Ensure that AWS credentials with appropriate permissions are configured in GitHub Secrets.
     - Replace placeholders like `your-region` and `your-account-id` with actual values.
     - The `backend-task-def.json` should be predefined with necessary configurations.

---

## Contributing

### Guidelines

- **Fork the Repository**: Create a personal copy of the project.
- **Create a Branch**: Use descriptive branch names for features or fixes.
- **Commit Changes**: Write clear and concise commit messages.
- **Open a Pull Request**: Submit your changes for review.

### Code Standards

- **Linting**: Follow established linting rules (e.g., ESLint for JavaScript).
- **Formatting**: Use Prettier or similar tools for consistent code formatting.
- **Documentation**: Comment code where necessary and update relevant documentation.

### Reporting Issues

- **Bug Reports**: Use the issue tracker to report bugs with detailed information.
- **Feature Requests**: Propose new features or improvements through issues.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Additional Resources

- **OpenHands Documentation**: [Link to OpenHands Docs](https://docs.all-hands.dev/modules/usage/installation)
- **Puppeteer Documentation**: [Puppeteer Docs](https://pptr.dev/)
- **Next.js Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **Tailwind CSS Documentation**: [Tailwind CSS Docs](https://tailwindcss.com/docs)
- **Node.js Documentation**: [Node.js Docs](https://nodejs.org/en/docs/)
- **Design Patterns Reference**: [Refactoring Guru](https://refactoring.guru/design-patterns)
- **Docker Documentation**: [Docker Docs](https://docs.docker.com/)
- **CI/CD with GitHub Actions**: [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**Note**: This MVP does not include security features such as authentication or input validation. It is intended for internal use and testing purposes only. For production deployment, implementing security measures is highly recommended.
