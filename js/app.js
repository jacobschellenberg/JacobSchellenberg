let elements = {
  container: "container",
  helpfulLinks: "helpful-links",
  welcomeId: "welcome",
  quoteId: "quote",
};

let urls = [
  {
    id: "paizo",
    url: "https://paizo.com/",
    image: "images/paizo.png",
    groups: [],
  },
  {
    id: "inMaricopa",
    url: "https://inmaricopa.com",
    image: "images/inmaricopa-logo.jpg",
    groups: ["daily"],
  },
  {
    id: "inMaricopaBusiness",
    url: "https://www.inmaricopa.com/business/",
    image: "images/inmaricopa-business.png",
    groups: ["daily"],
  },
  {
    id: "warhammerCommunity",
    url: "https://www.warhammer-community.com/en-us/latest-news-features/",
    image: "images/warhammer-community-logo.png",
    groups: ["daily"],
  },
  {
    id: "warhammerCompetitive",
    url: "https://www.reddit.com/r/WarhammerCompetitive/",
    image: "images/warhammer-competitive.jpg",
    groups: [],
  },
  {
    id: "aixanKelthex",
    url: "https://aixankelthex.com",
    image: "images/mysterium-logo.png",
    groups: [],
  },
];

let helpfulLinks = [
  {
    link: "https://json2csharp.com/",
    title: "Json -> C# Converter"
  },
];

document.addEventListener("DOMContentLoaded", function (event) {
  updateWelcome();
  updateRandomQuote();
  displayWebsiteCards();
  displayHelpfulLinks();
});

function openDailyWebsites() {
  var dailyWebsites = urls.filter((element) =>
    element.groups.includes("daily")
  );

  dailyWebsites.forEach((element) => {
    openUrlById(element.id);
  });
}

function displayWebsiteCards() {
  var cardTemplate =
    '<div class="col-sm-2 d-flex align-items-stretch"> <div class="card box-shadow"> <img class="website-image img-fluid card-img-top p-1" src="{{image}}"> <div class="card-body d-flex flex-column"> <button onclick="openUrlById(\'{{urlId}}\')" type="button" class="w-100 btn btn-lg btn-primary mt-auto">View</button> </div> </div> </div>';

  var rowTemplate =
    '<div class="row pt-1 justify-content-center">{{content}}</div>';

  var columnMax = 3;
  var currentColumnCount = 0;
  var html = "";
  var columnsHtml = "";
  var totalColumns = 0;
  urls.forEach((element) => {
    var columnHtml = cardTemplate
      .replace("{{image}}", element.image)
      .replace("{{urlId}}", element.id);
    columnsHtml += columnHtml;

    currentColumnCount += 1;
    totalColumns += 1;
    if (currentColumnCount >= columnMax || totalColumns == urls.length) {
      html += rowTemplate.replace("{{content}}", columnsHtml);
      currentColumnCount = 0;
      rowHtml = "";
      columnsHtml = "";
    }
  });

  setText(elements.container, html);
}

function displayHelpfulLinks() {

  var cardTemplate =
    '<li><strong>{{title}}:</strong> <a href="{{link}}" target="_blank">{{link}}</a></li>';

  var rowTemplate =
    '<ul>{{content}}</ul>';

  var html = "";
  var current = 0;
  var columnsHtml = "";
  helpfulLinks.forEach((element) => {

    var columnHtml = cardTemplate
      .replace("{{link}}", element.link)
      .replace("{{title}}", element.title)
      .replace("{{link}}", element.link);

    current++;

    columnsHtml += columnHtml;

    if (current == helpfulLinks.length) {
      html = rowTemplate.replace("{{content}}", columnsHtml);
    }
  });

  console.log(html);

  setText(elements.helpfulLinks, html);
}

function openUrlById(urlId) {
  console.log(urlId);

  var element = urls.filter((element) => element.id == urlId)[0];
  window.open(element.url, "_blank");
}

function updateWelcome() {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    setText(elements.welcomeId, "Good Morning");
  } else if (curHr < 18) {
    setText(elements.welcomeId, "Good Afternoon");
  } else {
    setText(elements.welcomeId, "Good Evening");
  }
}

function updateRandomQuote() {
  setText(elements.quoteId, "Oh look, a dashboard.");
}

function setText(elementId, value) {
  document.getElementById(elementId).innerHTML = value;
}
