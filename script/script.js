let allVisible = true
let samponyVisible = true
let regeneraceVisible = true

$(".all-button").on("click", function() {
    $(`.item`).show()
})

$(".menu-buton").on("click", function() {
    let category =  $(this).attr("id")
    
    $(`.item`).hide()
    // $(`.item[category="Šampony"]`).show()

    $(`.item[category=${category}]`).show()
       
    // if (allVisible = true){
        
    //     // ponechej šampony aktivní
    //     samponyVisible = true
        
    //     // označ jako aktivní kategorii šampony
    //     $("#sampony").css({"background-color":"red"})

    //     //sryj ostatní kategorie
    //     regeneraceVisible = false
    //     $(".item[category=regenerace]").hide();
    //     allVisible = false //již není zobrazeno všechno
    // } else {
    //     if (samponyVisible === true) {
    //         samponyVisible = false
    //     } else {
    //         samponyVisioble = true
    //     }
    // }
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
      let longDescription = jsonData[radek].longdescription

      vygenerovaneHTML = vygenerovaneHTML.concat(
      `<div class="item" category="${category}">
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
            <p><b><i>obrázek: ${radek}.png</i></b><br>Stručný text o produktu, bla bla blabla bla blabla bla blabla bla blabla bla </p>
            <div class="item-short-description">${longDescription}</div>
        </div>`)
  }
  
  $(".page-content").html(vygenerovaneHTML)
  // log all objects to console
  // jsonData.forEach((line) => {
  //   console.log(line)
  // })
}





