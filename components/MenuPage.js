export class MenuPage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement("style");
        this.root.appendChild(styles);
        
        async function loadCSS() {
            const request = await fetch("/components/MenuPage.css");
            const css = await request.text();
            styles.textContent = css;
        }

        loadCSS();
    }
    connectedCallback() {
        const template = document.getElementById('menu-page-template');
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);
        this.render();
        window.addEventListener("appmenuchange", () => {
            this.render();
        });

        this.render();
    }

    render() {
        if (app.store.menu) {
            this.root.querySelector('#menu').innerHTML="";
            for (let category of app.store.menu) {
                const listCategory = document.createElement("li");
                listCategory.innerHTML = `
                    <h3>${category.name}</h3>
                    <ul class='category'>
                    </ul>
                `;
                this.root.querySelector('#menu').appendChild(listCategory);

                category.products.forEach(product => {
                    const item = document.createElement("product-item");
                    item.dataset.product = JSON.stringify(product);
                    listCategory.querySelector("ul").appendChild(item);
                });
            }
        } else {
            this.root.querySelector("#menu").innerHTML = "Loading...";
        }
    }

};

customElements.define("menu-page", MenuPage);