var adata=[0,0,0,0,0];
var adata_bidas=[0,0,0,0,0];
var adata_gaida=[0,0,0,0,0];
var cilindri=[10,20,30,40,50,60,70,80,90]
var rinda = [];
var izpildits = [[],[],[],[],[]];
var sakums = [-1,-1,-1,-1,-1];
var dodas = [-1,-1,-1,-1,-1];
var atrodas = [-1,-1,-1,-1,-1];
var virziens = [1,1,1,1,1];
var solis = 1;
var lasa_datus = 250;
var cikls = 20;
var cikls_max=100;
var cikls_min=5;
var adatu_bidisana;
var nobide = 15;
function notirit()
{
	location.reload();
}
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
	if (rinda.length > sakums[a]+1)
	{
		dodas[a]=sakums[a]+1;
		sakums[a]=sakums[a]+1;
		return cilindri[rinda[dodas[a]]];
	}
	atrodas[a]=-1;
	return 0;
}
function nakamais_SSTF(a)
{
	if (rinda.length > sakums[a]+1)
	{
		var dos = -1;
		for(var att=0;att<11;att++)
		{
			for(var i=sakums[a]+1;i < rinda.length; i++)
			{
				if(izpildits[a][i] == 0 && Math.abs(rinda[i]-atrodas[a]) == att)
				{
					dos = i;
					break;
				}
			}
			if (dos != -1)
			{
				break;
			}
		}
		if(dos != -1)
		{
			dodas[a]=dos;
			return cilindri[rinda[dodas[a]]];
		}
	}
	atrodas[a]=-1;
	return 0;
}
function nakamais_C_SCAN(a)
{
	if (rinda.length > sakums[a]+1)
	{
		var dos = -1;
		for(var att=0;att<11;att++)
		{
			for(var i=sakums[a]+1;i < rinda.length; i++)
			{
				if(izpildits[a][i] == 0 && rinda[i]-atrodas[a] == att)
				{
					dos = i;
					break;
				}
			}
			if (dos != -1)
			{
				break;
			}
		}
		if(dos != -1)
		{
			dodas[a]=dos;
			return cilindri[rinda[dodas[a]]];
		}
		else
		{
			if(adata[a] == cilindri[8])
			{
				atrodas[a]=-1;
				return 0;
			}
			else if(adata[a] != 0)
			{
				return cilindri[8];
			}
		}
	}	
	atrodas[a]=-1;
	return 0;
}
function nakamais_SCAN(a)
{
	if (rinda.length > sakums[a]+1)
	{
		var dos = -1;
		if(adata[a] == cilindri[8])
		{
			virziens[a]=-1;
		}
		else if(adata[a] == 0)
		{
			virziens[a]=1;
		}
		for(var att=0;att<11;att++)
		{
			for(var i=sakums[a]+1;i < rinda.length; i++)
			{
				if(izpildits[a][i] == 0 && rinda[i]-atrodas[a] == att*virziens[a])
				{
					dos = i;
					break;
				}
			}
			if (dos != -1)
			{
				break;
			}
		}
		if(dos != -1)
		{
			dodas[a]=dos;
			return cilindri[rinda[dodas[a]]];
		}
		else
		{
			if(virziens[a] == -1)
			{
				atrodas[a]=-1;
				return 0;
			}
			else if(adata[a] != 0)
			{
				atrodas[a]=8;
				return cilindri[8];
			}
		}
	}
	atrodas[a]=-1;
	return 0;
}
function nakamais_LOOK(a)
{
	if (rinda.length > sakums[a]+1)
	{
		var dos = -1;
		//alert(virziens[a]);
		for(var att=0;att<11;att++)
		{
			for(var i=sakums[a]+1;i < rinda.length; i++)
			{
				if(izpildits[a][i] == 0 && rinda[i]-atrodas[a] == att*virziens[a])
				{
					dos = i;
					break;
				}
			}
			if (dos != -1)
			{
				break;
			}
		}
		if(dos != -1)
		{
			dodas[a]=dos;
			return cilindri[rinda[dodas[a]]];
		}
		else
		{
			virziens[a] = -1 * virziens[a];
			return -1;
		}
	}
	atrodas[a]=-1;
	return 0;
}
function bida_adatas()
{
	clearInterval(adatu_bidisana);
	for(var i=0; i <adata.length; i++)
	{
		if (adata_gaida[i] > Date.now())
		{
			//vel jagaida
		}
		else if(adata[i] != adata_bidas[i])
		{
			adata[i] = adata[i]-(Math.sign(adata[i]-adata_bidas[i])*Math.min(Math.abs(adata[i]-adata_bidas[i]),solis));
			document.getElementById("adata_"+i).style.left = adata[i]+nobide+"px";
			//alert(adata[i]);
		}
		else if(adata[i] == adata_bidas[i])
		{
			while(rinda.length > sakums[i]+1 && izpildits[i][sakums[i]+1] == 1)
			{
				sakums[i]=sakums[i]+1;
			};
			if(dodas[i] != -1)
			{
				document.getElementById("m_"+i+"_"+dodas[i]).classList.add("darits");
				izpildits[i][dodas[i]]=1;
				atrodas[i]=rinda[dodas[i]];
				dodas[i]=-1;
			}
			var merkis
			if(i == 0)
			{
				merkis = nakamais_FCFS(i);
			}
			else if(i == 1)
			{
				merkis = nakamais_SSTF(i);
			}
			else if(i == 2)
			{
				merkis = nakamais_SCAN(i);
			}
			else if(i == 3)
			{
				merkis = nakamais_C_SCAN(i);
			}
			else if(i == 4)
			{
				merkis = nakamais_LOOK(i);
			}
			else
			{
				merkis = 0;//cilindri[Math.round(Math.random()*100)%cilindri.length];
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
		izpildits[i].push(0);
		element = document.getElementById("t_p_"+i);
		para = document.createElement("td");
		para.id = "m_"+i+"_"+(rinda.length-1);
		element.appendChild(para);
	}
	/*if(cilindrs==8)
	{
		alert(izpildits[1]);//1,0
		alert(sakums[1]);//-1
		alert(dodas[1]);//1
		alert(atrodas[1]);//0
		alert(adata[i]);//nezina
		alert(adata_bidas[i]);//nezina
	}*/
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
	else if(e.keyCode == 46)
	{
		notirit();
	}
});
$(function (){
	adatu_bidisana = setInterval(bida_adatas, cikls);
})