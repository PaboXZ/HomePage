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

    console.log(container);

    let descriptionBox = document.createElement('div');
    descriptionBox.innerText = 'x';
    
    xhttp.onload = function() {
        console.log(this.responseText);
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

    container.removeChild(container.children[Array.prototype.indexOf.call(container.children, thisTile) - 1]);

    thisTile.removeEventListener("click", hideTileDescription);
    thisTile.addEventListener("click", sendQueryForDescription);
}