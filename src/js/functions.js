var currentCategory = 'bebida energetica';
var currentPage = 1;
var orderByName = 'ASC';
var search = '';

function appendProducts(data) {
    var products = data.products;
    products.map(product => {
        //let apply_discount = product.price - (product.price * product.discount / 100);
        $("#products").append(
            `
            <div class="product">
                <div class="product-name">
                    `+ product.name + `
                </div>
                <div class="product-image">
                    <img src=" `+ product.url_image + `" alt="image_alt"/>
                </div>

                <div class="product-details">
                    <div class="product-details-discount">
                        <p id="new_price">$`+ product.price + ` &nbsp;</p>
                        <p id="discount">`+ product.discount + `% descuento</p>
                    </div>
                    <button type="button" class="btn btn-primary">Añadir al carrito</button>
                </div>
            </div>
            `
        );
    });
}

function appendPages(numberOfPages) {
    console.log(numberOfPages);
    for (let i = 1; i <= numberOfPages; i++) {
        $("#pagination").append(
            `
                <li class="page-item" id="page-item`+ i + `"><a class="page-link" href="#" id="page-link" onClick="changePage(` + i + `)">` + i + `</a></li>
            `
        );
    }
}

function fetchProducts() {
    fetch('https://api-productos-app.vercel.app/api/product')
        .then(response => response.json())
        .then(data => {
            appendProducts(data);
            appendPages(data.numberOfPages);
        });
}

function fetchProductsByName(productName) {
    fetch('https://api-productos-app.vercel.app/api/product/search?product_name=' + productName + '&name=' + orderByName + '')
        .then(response => response.json())
        .then(data => {
            $("#products").empty();
            $("#pagination").empty();

            appendProducts(data);
        });
}

$(function () {
    fetchProducts();
});

function changePage(page) {

    var idPageItem = "page-item" + currentPage;

    console.log("currentPage => " + idPageItem);
    document.getElementById(idPageItem).classList.remove("active");

    currentPage = page;

    var oldIdPageItem = "page-item" + currentPage;

    document.getElementById(oldIdPageItem).classList.add("active");

    var url = 'https://api-productos-app.vercel.app/api/product/?category=' + currentCategory + '&page=' + currentPage + '';


    fetch(url)
        .then(response => response.json())
        .then(data => {
            $("#products").empty();

            appendProducts(data);

        });
}

$('#pagination > #page-link').click(function () {

});

$('#nav > #nav-link').click(function () {
    currentCategory = $(this).text();
    var pageNumber = 1;

    var url = 'https://api-productos-app.vercel.app/api/product/?category=' + currentCategory + '&page=' + pageNumber + '&name=' + orderByName + '';

    //limpiar input de busqueda.
    var input = document.getElementById("searchProduct");

    input.value = '';
    search = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            $("#products").empty();
            $("#pagination").empty();

            appendProducts(data);
            appendPages(data.numberOfPages);
        });


});

/**
 * Buscador de productos por nombre del producto.
 */
$(function () {
    var input = document.getElementById("searchProduct");


    input.addEventListener("keyup", function (event) {
        event.preventDefault();
        search = input.value;

        if (event.key === 'Enter') {
            if (search === "") {
                $("#products").empty();
                $("#pagination").empty();
                fetchProducts();
            } else {
                fetchProductsByName(search);
            }

        }


    });
});

function fetchByCategory(orderBy) {
    var pageNumber = 1;
    var url = 'https://api-productos-app.vercel.app/api/product/?category=' + currentCategory + '&page=' + pageNumber + '&name=' + orderBy + '';


    fetch(url)
        .then(response => response.json())
        .then(data => {
            $("#products").empty();
            $("#pagination").empty();

            appendProducts(data);
            appendPages(data.numberOfPages);
        });

}

$('#orderBy').change(function () {

    orderByName = $(this).val();

    if (search === '') {
        fetchByCategory(orderByName);

    } else {
        fetchProductsByName(search);
    }
})

function handleMenu() {
    var state = document.getElementById('menu-container').style.display;
    alert(state);
    if (state === 'none') {
        document.getElementById('menu-container').style.display = 'flex';
    }else{
        document.getElementById('menu-container').style.display = 'none';
    }

}

