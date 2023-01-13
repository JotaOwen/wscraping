const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const fs = require('fs');

(async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        //headless:false,
        args: ["--no-sandbox"]
    }) ;
    const page = await browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36");
    //await page.emulateMedia("screen");

    const response = await page.goto('https://www.soriana.com');
    const body = await response.text();
    //console.info("BODY: ", body);


    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const { window: { document } } = new jsdom.JSDOM(body);

    let Menu = [];
    document.querySelectorAll('#subcat-despensa').forEach(element => {

        let categories = [];
        element.querySelectorAll(".one-third").forEach(subcat => {
            const subcategories = subcat.querySelector(".subcategory");

            let subcategoriesArray = [];
            subcategories.querySelectorAll(".position-relative .megamenu-lvl-three").forEach(child => {
                const subCat = {
                    name: child.querySelector(".nav__cat-item-megamenu").textContent.trim(),
                    url: child.querySelector(".nav__cat-item-megamenu").href,
                }
                subcategoriesArray.push(subCat);
            });
            const catName = subcat.querySelector(".cat-title").textContent;
            const Cat = {
                name: catName.trim(),
                url: subcat.querySelector(".cat-title a").href,
                subcategories: subcategoriesArray
            }
            categories.push(Cat);
        });

        const menuItem = {
            department: element.querySelector(".cat-lvl-one").textContent.trim(),
            url: element.querySelector(".cat-lvl-one").href,
            categories: categories
        }
        Menu.push(menuItem);

    } );
    console.info("Menu: ", JSON.stringify(Menu, null, 2) )

    // Cerramos el puppeteer
    await browser.close();

    // guarda el Menu en un archivo json
    fs.writeFile("./menu.json", JSON.stringify(Menu, null, 2), { flag: 'w+' }, function (err) {
        if (err) throw err;
        console.info("guardado correctamente...");
    });

  } catch (error) {
    console.error(error);
  }
})();
