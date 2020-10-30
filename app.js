var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=dIPTOgpTvbwbpCqbGFo19S6OgltyAk3IW7-n9qcI07U";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};


new Promise((resolve) => {
  const request = doCORSRequest({
    url: "https://trefle.io/api/v1/plants" + apiToken + "&filter_not[image_url]=null",
  });
  resolve(request);
})
  .then((request) => {
    request.onload = (response) => {
      const trefleData = JSON.parse(response.originalTarget.response)["data"];
      const descriptions = trefleData.map((e) => {
        console.log(e);
        const img = "<img src=\"" + e["image_url"] + "\" alt=\"" + e["scientific_name"] + "\"/>";
        const des = "<figcaption><em>" + e["scientific_name"] + "</em></figcaption>";
        return "<figure>" + img + des + "</figure>";
      })
      const ulElem = document.querySelector("#plants");
      ulElem.innerHTML = "";
      descriptions.map((d) => {
        const liElem = document.createElement('li');
        liElem.innerHTML = d;
        ulElem.appendChild(liElem);
      })
    }
  });
