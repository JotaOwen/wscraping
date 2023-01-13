const puppeteer = require('puppeteer');
const jsdom = require('jsdom');

const Products = () => {};

Products.getList = async (url) => {
    console.info("URL: ", url);
    try {

        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome',
            //headless:false,
            args: ["--no-sandbox"]
        }) ;
        const page = await browser.newPage();
        page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36");
        //await page.emulateMedia("screen");

        const response = await page.goto(url);
        const body = await response.text();
        const { window: { document } } = new jsdom.JSDOM(body);

        let productssArray = [];
        await document.querySelectorAll('.vtex-search-result-3-x-gallery .vtex-search-result-3-x-galleryItem').forEach(element => {
            console.info("ELEMENTS", element.textContent);

            const pArray = {
                name: element.querySelector('.vtex-product-summary-2-x-productBrand').textContent,
                price: element.querySelector('.tiendasjumboqaio-jumbo-minicart-2-x-price').textContent
            }
            productssArray.push(pArray);

        });
        const resp = {
            url: url,
            products: productssArray
        }
        await browser.close();
        return resp;

    } catch(err){
        console.error("❌ ERROR: Exception thrown: ", err.message);
        return err.message;
    }
}

module.exports = Products;
