<p align="center"><a href="https://hub.docker.com/_/node" target="_blank"><img src="https://miro.medium.com/max/860/1*ULZwPAb1f3G5pnnKP7LaxA.png" width="400" alt="Project Logo"></a></p>



## Docker, Docker-compose, NodeJS


### Init Docker
First installation

Install docker and docker-compose

https://docs.docker.com/get-docker/

https://docs.docker.com/compose/install/linux/

Then run:

`docker-compose build`

`docker-compose up -d`


Once all the containers are initialized, the first script(getMenu.js) saves the `menu.js` file into `./test1/menu.js`. 

To view the result file run :

`docker exec -t -i Test-1 cat menu.json`

So here are the link currently configured for the second container:

Products endpoint: `http://localhost:8080/products?url=https://www.tiendasjumbo.co/supermercado/despensa/enlatados-y-conservas`



### Packages

https://www.npmjs.com/package/puppeteer

https://www.npmjs.com/package/jsdom

https://www.npmjs.com/package/express






