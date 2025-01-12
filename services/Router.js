const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault(); // Turn off refresh behavior
                // Getting the URL from anchor tags with multiple options:
                // const url = event.target.href
                const url = event.target.getAttribute('href');
                Router.go(url);
            });
        })
        // Event Handler for URL changes:
        window.addEventListener("popstate", event => {
            Router.go(event.state.route, false);
        })
        
        // Check the initial URL:
        Router.go(location.pathname);
    },
    go: (route, addToHistory=true) => {
        console.log(`Going to: ${route}`);

        if (addToHistory) {
            history.pushState({ route }, null, route);
        }

        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement("menu-page");
                pageElement.textContent = "Menu";
                break;
            case "/order":
                pageElement = document.createElement("order-page");
                pageElement.textContent = "Your Order";
                break;
            default:
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page");
                    pageElement.innerHTML = "Details";

                    const paramId = route.substring(route.lastIndexOf('-')+1);
                    pageElement.dataset.productId = paramId;
                }
        }
        if (pageElement){
            document.querySelector("main").innerHTML = "";
            document.querySelector("main").appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        }
        
    }
}

export default Router;