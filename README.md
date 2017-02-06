## King of the Hill

Quiz app to find out which one is the greatest.

## Installation and Startup

1. Build docker image ```docker-compose build```
2. Development environment ```docker-compose -f docker-compose.yml -f docker-compose.dev.yml up```
3. Stable environment (QA, DEMO, etc.) ```docker-compose up```
5. Open http://localhost

## Several notes

1. In Ubuntu server it crashed using docker-compose v1.5.*. It works properly using v1.8.1 (try to use latest version always)
2. Before starting up docker-compose in Windows - make sure your cmd has administrator rights
3. After development environment startup, you might be need to rebuild the client side project (npm run build), for docker volumes synchronization
