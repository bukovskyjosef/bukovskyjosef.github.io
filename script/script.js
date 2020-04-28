$(".all-button").on("click", function() {
    $(`.item`).show()
})

$(".menu-buton").on("click", function() {
    let category =  $(this).attr("id")
    
    $(`.item`).hide()

    $(`.item[category=${category}]`).show()

})

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("nav-bar").style.top = "0";
    } else {
        document.getElementById("nav-bar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
};

document.getElementById("nav-bar").onmouseover = function () {
    mouseOver();
};

document.getElementById("nav-bar").onmouseout = function () {
    mouseOut();
};

function mouseOver() {
    document.getElementById("nav-bar").style.top = "0";
}

function mouseOut() {
    if (window.pageYOffset == 0) {
    } else {
        document.getElementById("nav-bar").style.top = "-50px";
    }
}

readTextFile("src/inventura.csv")

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
        var textFromFile = rawFile.responseText;
        parseTextToArray(textFromFile)
      }
    }
  }
  rawFile.send(null);
}

function parseTextToArray(TextForParsing) {
  var allLines = TextForParsing.split(/\r\n|\n/)
  jsonDataArray(allLines)
  // allLines.forEach((line) => {
  //   console.log(line)
  // })
}

function jsonDataArray(array) {
  var headers = array[0].split(';');
  var jsonData = [];
  for (var i = 0, length = array.length; i < length; i++) {
    var row = array[i].split(';');
    var data = {};
    for (var x = 0; x < row.length; x++) {
      data[headers[x]] = row[x];
    }
    jsonData.push(data);
  }

  let vygenerovaneHTML = ""
  
  for (var radek = 1, lenght = jsonData.length; radek < lenght ;radek++) {

      let id = jsonData[radek].id
      let brand = jsonData[radek].brand
      let volume = jsonData[radek].volume
      let name = jsonData[radek].name
      let customerPrice = jsonData[radek].customerPrice
      let originalPrice = jsonData[radek].price
      let discount = jsonData[radek].discount
      let category = jsonData[radek].category
      let subCategory = jsonData[radek].subcategory
      let subname = jsonData[radek].subname
      let warehouse = jsonData[radek].warehouse
      let sex = jsonData[radek].sex
      let shortDescription = jsonData[radek].shortDescription

      vygenerovaneHTML = vygenerovaneHTML.concat(
      `<div class="item" category="${category}" id="${id}">
            <div class="item-name">${name}</div>
            <div class="item-meta">
                <div class="item-full-name">${name}</div>
                <div class="item-category">${category}</div>
                <div class="item-subcategory">${subCategory}</div>
                <div class="item-sex">${sex}</div>
            </div>
            <div class="columns">
                <div class="1st-column">
                    <div class="item-image"><img src="src/images/${radek}.png"></div>
                </div>
                <div class="2nd-column">
                    <div class="item-params">
                        <div class="volume">
                            <div class="item-volume-label">Objem:</div>
                            <div class="item-volume">${volume}</div>
                        </div>
                        <div class="price">
                            <div class="original-price">
                                <div class="item-original-price-label">Originální cena:</div>
                                <div class="item-original-price">${originalPrice}</div>
                            </div>
                            <div class="customer-price">
                                <div class="item-cutomer-price-label">Vaše cena:</div>
                                <div class="item-customer-price">${customerPrice}</div>
                            </div>
                            <div class="cart-wrapper">
                                <div class="cart"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- tu by měl být popis -->
            <div class="item-short-description">${shortDescription}</div>
            <div class="read-more">Číst více</div>
            <div class="item-long-description"></div>
            <div class="read-less">Číst méně</div>
        </div>`)
  }
  $(".page-content").html(vygenerovaneHTML)
}

$(".shoppping-cart-overview").after().on("click", function() {
    console.log("yeah")
    $(`.shoppping-cart-overview`).hide()
})

$(".shopping-cart").on("click", function() {
    $(`.shoppping-cart-overview`).show()
})

$(".read-more").on("click", function() {
    // $(this).parent().siblings().fadeTo(500, 0.33) //musím vypnout, protože to nastavuje i pro skryté itemy :(
    // $(this).parent().fadeTo(500, 1.00) //musím vypnout, protože to nastavuje i pro skryté itemy :(
    // $(this).parent().animate({ "width": "500px", "height": "500px" }, "slow" )
    var file2 = "src/descriptions/" + $(this).parent().attr("id") + ".html"
    var rawFile2 = new XMLHttpRequest();
    var textFromFile = ""
    
    rawFile2.open("GET", file2, false);
    rawFile2.onreadystatechange = function () {
        if (rawFile2.readyState === 4) {
          if (rawFile2.status === 200 || rawFile2.status == 0) {
            textFromFile = rawFile2.responseText;
          }
        }
      }
      rawFile2.send(null);

    $(this).css("display","none") //skryje číst více
    $(this).prev().css("display","none") // schová short-description
    $(this).next().next().css("display","block") // zobrazí číst méně
    $(this).next().html(textFromFile); // nastaví html divu item-long-description
})

$(".read-less").on("click", function() {
    // $(this).parent().animate({ "width": "300px", "height": "300px" }, "slow" )
    // $(this).parent().siblings().fadeTo(500, 1.00) //musím vypnout, protože to nastavuje i pro skryté itemy :(
    // $(this).parent().fadeTo(500, 1.00) //musím vypnout, protože to nastavuje i pro skryté itemy :(
    $(this).css("display","none") // skryje číst méně
    $(this).prev().prev().prev().css("display","block") // zobrazí číst více
    $(this).prev().prev().css("display","block") // zoobrazí short-description
    $(this).prev().html("") // nastvací html divu item-long-description
})

