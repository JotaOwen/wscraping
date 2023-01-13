const express = require('express')
const app = express()
const Products = require("./src/controllers/ProductsController");

const port = 8080

app.get('/', (req, res) => {
    res.send('<a href="/products?url=https://www.tiendasjumbo.co/supermercado/despensa/enlatados-y-conservas">get Products</a>')
})

app.get('/products', async(req, res) => {
    console.info("REQ: ", req.query.url);
    const URL = req.query.url;
    const response = await Products.getList(URL);
    res.send(response);
})


app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})