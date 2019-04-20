var ips = ['mc.coleweinman.com','us.mineplex.com','play.cubecraft.net','mc.hypixel.net'];
var update = setInterval(refresh, 10000);



function addIP(value) {
    var ip = document.getElementById("ipField").value;
    if(ip == "") {
        ip = value;
    }
    document.getElementById("ipField").value = "";
    ips.push(ip);
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
            document.getElementById(ip).childNodes[1].innerText = "Players Online: "+res.playerCount+"/"+res.playerMax;
            document.getElementById(ip).childNodes[3].innerText = "Players: "+res.playerList.toString();
            document.getElementById(ip).childNodes[5].innerText = "Version: "+res.version+" "+res.protocal;
            document.getElementById(ip).childNodes[7].innerText = "MOTD: "+motd;
        }
    };
    xhttp.open("GET", "https://cors.io/?https://redtech-trackmc.appspot.com/?ip="+ip, true);
    //xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.send();

}

function refresh() {
    for(var i = 0; i < ips.length; i++) {
        updateIP(ips[i]);
    }
}
