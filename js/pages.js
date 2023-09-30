var expandButtons = document.getElementsByClassName('expand-button');

for(tile of expandButtons){

    tile.addEventListener("click", sendQueryForDescription);
}

function sendQueryForDescription(event){

    let xhttp = new XMLHttpRequest();
    let thisTile = event.target;
    if(thisTile.id === '')
    {
        thisTile = thisTile.parentElement;
    }
    let tileID = thisTile.id.slice(14);
    
    let container = document.getElementsByClassName('page-tiles-container')[0];

    let descriptionBox = document.createElement('div');
    descriptionBox.classList.add('description-box');
    
    xhttp.onload = function() {
        descriptionBox.innerText = this.response;
    }

    xhttp.open("GET", "../php/send_page_description.php?id=" + tileID, true);
    xhttp.send();

    container.appendChild(descriptionBox);
    container.insertBefore(descriptionBox, container.children[Array.prototype.indexOf.call(container.children, thisTile)]);

    thisTile.removeEventListener("click", sendQueryForDescription);
    thisTile.addEventListener("click", hideTileDescription);
}

function hideTileDescription(event)
{
    let thisTile = event.target;
    if(thisTile.id === '')
    {
        thisTile = thisTile.parentElement;
    }

    let container = document.getElementsByClassName('page-tiles-container')[0];

    container.children[Array.prototype.indexOf.call(container.children, thisTile) - 1].classList.add('close-container');

    thisTile.removeEventListener("click", hideTileDescription);
    thisTile.addEventListener("click", sendQueryForDescription);

    setTimeout(function() {container.removeChild(container.children[Array.prototype.indexOf.call(container.children, thisTile) - 1])}, 900);

}

var pageSelectButton = document.getElementsByClassName('tile-right-button');

for(tile of pageSelectButton){

    tile.addEventListener("click", sendQueryForDescriptionArticle);
}

function sendQueryForDescriptionArticle(event)
{
    if(event.target.id === '')
    {
        activeTile = event.target.parentElement;
    }
    else{
        activeTile = event.target;
    }

    let PageID = activeTile.id.slice(26);

    let descriptionRequest = new XMLHttpRequest();

    descriptionRequest.onload = function() {
        document.getElementById('side-content').innerText = this.response;
        console.log(PageID);
    }

    descriptionRequest.open("GET", "../php/send_page_description.php?id=" + PageID, true);
    descriptionRequest.send();

}