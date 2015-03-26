var adata=[0,0,0,0,0];
var adata_bidas=[0,0,0,0,0];
var adata_gaida=[0,0,0,0,0];
var cilindri=[10,20,30,40,50,60,70,80,90]
var rinda = [];
var izpildits = [-1,-1,-1,-1,-1];
var dodas = [-1,-1,-1,-1,-1];
var solis = 1;
var lasa_datus = 250;
var cikls = 20;
var cikls_max=60;
var cikls_min=5;
var adatu_bidisana;
var nobide = 15;
function atrak()
{
	if(cikls>cikls_min)
	{
		cikls = cikls - 5;
	}
}
function lenak()
{
	if(cikls<cikls_max)
	{
		cikls = cikls + 5;
	}
}
function nakamais_FCFS(a)
{
	if (rinda.length > izpildits[a]+1)
	{
		izpildits[a]=izpildits[a]+1;
		dodas[a]=izpildits[a];
		return cilindri[rinda[izpildits[a]]];
	}
	return -1;
}
function bida_adatas()
{
	clearInterval(adatu_bidisana);
	for(var i=0; i < adata.length; i++)
	{
		if (adata_gaida[i] > Date.now())
		{
			//vel jagaida
		}
		else if(adata[i] != adata_bidas[i])
		{
			adata[i] = adata[i]-Math.sign(adata[i]-adata_bidas[i])*Math.min(Math.abs(adata[i]-adata_bidas[i]),solis);
			document.getElementById("adata_"+i).style.left = adata[i]+nobide+"px";
			//alert(adata[i]);
		}
		else if(adata[i] == adata_bidas[i])
		{
			if(dodas[i] != -1)
			{
				document.getElementById("m_"+i+"_"+dodas[i]).classList.add("darits");
			}
			var merkis
			if(i == 0)
			{
				merkis = nakamais_FCFS(i);
			}
			else
			{
				merkis = cilindri[Math.round(Math.random()*100)%cilindri.length];
			}
			if(merkis != -1)
			{
				//uzsktada gaidīšanu
				adata_gaida[i] = Date.now() + lasa_datus;
				//izvēlas jauno gala mērķi
				adata_bidas[i] = merkis;
			}
			else
			{
				dodas[i]=-1;
			}
		}
	}
	adatu_bidisana = setInterval(bida_adatas, cikls);
}
function pievieno(cilindrs)
{
	rinda.push(cilindrs);
	var element = document.getElementById("t_cil");
	var para = document.createElement("td");
	para.innerHTML = ""+(cilindrs+1);
	element.appendChild(para);
	for(var i=0; i < adata.length; i++)
	{
		element = document.getElementById("t_p_"+i);
		para = document.createElement("td");
		para.id = "m_"+i+"_"+(rinda.length-1);
		element.appendChild(para);
	}
}
$(document).keyup(function(e) {
	//alert(e.keyCode);
	if (e.keyCode > 48 && e.keyCode < 58){
		pievieno(e.keyCode-49)
	}
	else if(e.keyCode == 189)
	{
		lenak();
	}
	else if(e.keyCode == 187)
	{
		atrak();
	}
});
$(function (){
	adatu_bidisana = setInterval(bida_adatas, cikls);
})