mdc.autoInit();

var ips = ['mc.coleweinman.com','us.mineplex.com','play.cubecraft.net','mc.hypixel.net'];
var update = setInterval(refresh, 3000);

for(var k = 0; k < ips.length; k++) {
  addIP(ips[k]);
}

function addIP(value) {
    var ip = document.getElementById("ipField").value;
    if(ip == "") {
        ip = value;
    }
    if(!ips.includes(ip)) {
      ips.push(ip);
    }
    document.getElementById("ipField").value = "";
    var element = document.getElementById('card').cloneNode(true);
    element.setAttribute('id',ip);
    element.setAttribute('style','');
    document.getElementById('card-list').appendChild(element);
    updateIP(ip);
}
function updateIP(ip) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            var motd = "";
            if(res.description.text == "") {
                for(var j = 0; j < res.description.extra.length; j++) {
                    motd += res.description.extra[j].text;
                }
            } else {
                motd = res.description.text;
            }
            if(motd == undefined) {
              motd = res.description;
              motd = motd.split(new RegExp("§.")).join("");
            }
            var element = document.getElementById(ip);
            if(element != null) {
                element.childNodes[1].innerHTML = "<b>Players Online: </b>"+res.playerCount+"/"+res.playerMax;
                if(res.playerList.toString() == "n/a" || res.playerList.toString() == "") {
                  element.childNodes[3].innerHTML = "";
                } else {
                  element.childNodes[3].innerHTML = "<b>Players: </b>"+res.playerList.toString();
                }
                element.childNodes[5].innerHTML = "<b>Version: </b>"+res.version+" "+res.protocal;
                element.childNodes[7].innerHTML = "<b>MOTD: </b>"+motd;
                element.setAttribute('style','');
            }
        }
    };
    xhttp.open("GET", "https://redtech-trackmc.appspot.com/?ip="+ip, true);
    //xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.send();

}

function refresh() {
    for(var i = 0; i < ips.length; i++) {
        updateIP(ips[i]);
    }
}
