var adata=[0,0,0,0,0,0];
var adata_bidas=[0,0,0,0,0,0];
var adata_gaida=[0,0,0,0,0,0];
var laiks_kopa=[0,0,0,0,0,0];
var cilindri=[10,20,30,40,50,60,70,80,90];
var rinda = [];
var lrinda = [];
var izpildits = [[],[],[],[],[],[]];
var sakums = [-1,-1,-1,-1,-1,-1];
var dodas = [-1,-1,-1,-1,-1,-1];
var atrodas = [-1,-1,-1,-1,-1,-1];
var virziens = [1,1,1,1,1,1];
var asolis=10;
var lsolis=1;
var solis = [lsolis,lsolis,lsolis,lsolis,lsolis,lsolis];
var lasa_datus = 2;
var cikls = 60;
var cikls_max = 200;
var pcikls;
var ccikls = 0;
var punkti=0;
var punkti_max = 800*adata.length;
var ir_pauze = false;
var cikls_min=0;
var adatu_bidisana;
var nobide = 15;
var grafiki = new Array(6);
function notirit()
{
	location.reload();
}
function pauze()
{
	if(!ir_pauze)
	{
		pcikls = cikls;
		cikls = cikls_max;
		for(var i=0; i <adata.length; i++)
		{
			document.getElementById("adata_"+i).classList.remove("lasa");
			document.getElementById("disks_"+i).classList.remove("griezas");
		}
		ir_pauze = true;	
	}
	else
	{
		ir_pauze = false;
		cikls = pcikls;
	}
}
function atrak()
{
	if(ir_pauze) pauze();
	if(cikls>cikls_min)
	{
		cikls = cikls - 5;
	}
}
function lenak()
{
	if(ir_pauze) pauze();
	if(cikls<cikls_max-5)
	{
		cikls = cikls + 5;
	}
}
function pabeiguso_skaits(r)
{
	var summa=0;
	for(var i=0; i < adata.length; i++)
	{
		if(izpildits[i][r] < ccikls && izpildits[i][r] != -1)
		{
			summa = summa + 1;
		}
	}
	return summa;
}
function kopa_laiks_formats()
{
	var summa;
	var nod;
	for(var i=0; i < adata.length; i++)
	{
		nod =document.getElementById("t_k_"+i)
		for(var j=0; j < adata.length; j++)
		{
			nod.classList.remove("darits"+j);
		}
		summa = 0;
		for(var j=0; j < adata.length; j++)
		{
			if(laiks_kopa[j] < laiks_kopa[i])
			{
				summa = summa + 1;
			}
		}
		nod.classList.add("darits"+summa);
		nod.innerHTML = laiks_kopa[i];
	}
}
function nakamais_FCFS(a)
{
	solis[a]=lsolis;
	if (rinda.length > sakums[a]+1)
	{
		document.getElementById("disks_"+a).classList.add("griezas");
		dodas[a]=sakums[a]+1;
		sakums[a]=sakums[a]+1;
		document.getElementById("m_"+a+"_"+dodas[a]).classList.add("dodas");
		return cilindri[rinda[dodas[a]]];
	}
	atrodas[a]=-1;
	document.getElementById("disks_"+a).classList.remove("griezas");
	solis[a]=asolis;
	return 0;
}
function nakamais_SSTF(a)
{
	solis[a]=lsolis;
	if (rinda.length > sakums[a]+1)
	{
		document.getElementById("disks_"+a).classList.add("griezas");
		var dos = -1;
		for(var att=0;att<11;att++)
		{
			for(var i=sakums[a]+1;i < rinda.length; i++)
			{
				if(izpildits[a][i] == -1 && Math.abs(rinda[i]-atrodas[a]) == att)
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
			document.getElementById("m_"+a+"_"+dodas[a]).classList.add("dodas");
			return cilindri[rinda[dodas[a]]];
		}
	}
	atrodas[a]=-1;
	document.getElementById("disks_"+a).classList.remove("griezas");
	solis[a]=asolis;
	return 0;
}
function nakamais_C_SCAN(a)
{
	solis[a]=lsolis;
	if (rinda.length > sakums[a]+1)
	{
		document.getElementById("disks_"+a).classList.add("griezas");
		var dos = -1;
		for(var att=0;att<11;att++)
		{
			for(var i=sakums[a]+1;i < rinda.length; i++)
			{
				if(izpildits[a][i] == -1 && rinda[i]-atrodas[a] == att)
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
			document.getElementById("m_"+a+"_"+dodas[a]).classList.add("dodas");
			return cilindri[rinda[dodas[a]]];
		}
		else
		{
			if(adata[a] == cilindri[8])
			{
				atrodas[a]=-1;
				solis[a]=asolis;
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
	document.getElementById("disks_"+a).classList.remove("griezas");
	solis[a]=asolis;
	return 0;
}
function nakamais_SCAN(a)
{
	solis[a]=lsolis;
	if (rinda.length > sakums[a]+1)
	{
		document.getElementById("disks_"+a).classList.add("griezas");
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
				if(izpildits[a][i] == -1 && rinda[i]-atrodas[a] == att*virziens[a])
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
			document.getElementById("m_"+a+"_"+dodas[a]).classList.add("dodas");
			return cilindri[rinda[dodas[a]]];
		}
		else
		{
			if(virziens[a] == -1)
			{
				atrodas[a]=-1;
				solis[a]=asolis;
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
	document.getElementById("disks_"+a).classList.remove("griezas");
	solis[a]=asolis;
	return 0;
}
function nakamais_LOOK(a)
{
	solis[a]=lsolis;
	if (rinda.length > sakums[a]+1)
	{
		document.getElementById("disks_"+a).classList.add("griezas");
		var dos = -1;
		//alert(virziens[a]);
		for(var att=0;att<11;att++)
		{
			for(var i=sakums[a]+1;i < rinda.length; i++)
			{
				if(izpildits[a][i] == -1 && rinda[i]-atrodas[a] == att*virziens[a])
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
			document.getElementById("m_"+a+"_"+dodas[a]).classList.add("dodas");
			return cilindri[rinda[dodas[a]]];
		}
		else
		{
			virziens[a] = -1 * virziens[a];
			return -1;
		}
	}
	atrodas[a]=-1;
	virziens[a]=1;
	document.getElementById("disks_"+a).classList.remove("griezas");
	solis[a]=asolis;
	return 0;
}
function nakamais_C_LOOK(a)
{
	solis[a]=lsolis;
	if (rinda.length > sakums[a]+1)
	{
		document.getElementById("disks_"+a).classList.add("griezas");
		var dos = -1;
		for(var att=0;att<11;att++)
		{
			for(var i=sakums[a]+1;i < rinda.length; i++)
			{
				if(izpildits[a][i] == -1 && rinda[i]-atrodas[a] == att)
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
			document.getElementById("m_"+a+"_"+dodas[a]).classList.add("dodas");
			return cilindri[rinda[dodas[a]]];
		}
		else
		{
			atrodas[a]=-1;
			solis[a]=asolis;
			return 0;
		}
	}
	atrodas[a]=-1;
	document.getElementById("disks_"+a).classList.remove("griezas");
	solis[a]=asolis;
	return 0;
}
function bida_adatas()
{
	document.getElementById("i_atr").value=cikls_max-cikls;
	if(cikls >= cikls_max)
	{
		return;
	}
	clearInterval(adatu_bidisana);
	ccikls = ccikls + 1;
	for(var i=0; i <adata.length; i++)
	{
		if(cikls+150 > cikls_max || (ccikls%10 == 0 && cikls > cikls_min + 20) || (ccikls%30 == 0))
		{
			punkti = punkti +1;
			if(punkti > punkti_max)
			{
				grafiki[i].addPoint([ccikls, adata[i]], false, true);
			}
			else
			{
				grafiki[i].addPoint([ccikls, adata[i]], false, false);
			}
		}
		if (adata_gaida[i] > 0)
		{
			adata_gaida[i] = adata_gaida[i] -1;
		}
		else if(adata[i] != adata_bidas[i])
		{
			document.getElementById("adata_"+i).classList.remove("lasa");
			adata[i] = adata[i]-(Math.sign(adata[i]-adata_bidas[i])*Math.min(Math.abs(adata[i]-adata_bidas[i]),solis[i]));
			document.getElementById("adata_"+i).style.left = adata[i]+nobide+"px";
		}
		else if(adata[i] == adata_bidas[i])
		{
			document.getElementById("adata_"+i).classList.remove("lasa");
			while(rinda.length > sakums[i]+1 && izpildits[i][sakums[i]+1] != -1)
			{
				sakums[i]=sakums[i]+1;
			};
			if(dodas[i] != -1)
			{
				document.getElementById("m_"+i+"_"+dodas[i]).classList.add("darits"+pabeiguso_skaits(dodas[i]));
				laiks_kopa[i] = laiks_kopa[i] + ccikls - lrinda[dodas[i]];
				document.getElementById("m_"+i+"_"+dodas[i]).innerHTML = ccikls - lrinda[dodas[i]];
				izpildits[i][dodas[i]]=ccikls;
				atrodas[i]=rinda[dodas[i]];
				//datu ielase
				adata_gaida[i] = lasa_datus;
				document.getElementById("adata_"+i).classList.add("lasa");
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
				if(merkis == -1)
				{
					merkis = nakamais_LOOK(i);
				}
			}
			else if(i == 5)
			{
				merkis = nakamais_C_LOOK(i);
			}
			else
			{
				merkis = 0;//cilindri[Math.round(Math.random()*100)%cilindri.length];
			}
			if(merkis != -1)
			{
				//izvēlas jauno gala mērķi
				adata_bidas[i] = merkis;
			}
			else
			{
				dodas[i]=-1;
			}
		}
	}
	$('#container').highcharts().redraw();
	kopa_laiks_formats();
	adatu_bidisana = setInterval(bida_adatas, cikls);
}
function pievieno(cilindrs)
{
	rinda.push(cilindrs);
	lrinda.push(ccikls);
	var element = document.getElementById("t_cil");
	var para = document.createElement("td");
	para.innerHTML = ""+(cilindrs+1);
	element.appendChild(para);
	for(var i=0; i < adata.length; i++)
	{
		izpildits[i].push(-1);
		element = document.getElementById("t_p_"+i);
		para = document.createElement("td");
		para.id = "m_"+i+"_"+(rinda.length-1);
		element.appendChild(para);
	}
}
$(document).keyup(function(e) {
	//alert(e.keyCode);
	//alert(e.shiftKey);
	if (e.keyCode > 48 && e.keyCode < 58 && !e.ctrlKey && !e.shiftKey)//1-9
	{
		pievieno(e.keyCode-49)
	}
	else if (e.keyCode > 96 && e.keyCode < 106 && !e.ctrlKey && !e.shiftKey)//1-9 NumLk
	{
		pievieno(e.keyCode-97)
	}
	else if((e.keyCode == 189 || e.keyCode == 109) && !e.ctrlKey && !e.shiftKey)//-
	{
		lenak();
	}
	else if(((e.keyCode == 187 && e.shiftKey)|| (e.keyCode == 107 && !e.shiftKey)) && !e.ctrlKey)//+
	{
		atrak();
	}
	else if(e.keyCode == 46 && !e.ctrlKey && !e.shiftKey)//delete
	{
		notirit();
	}
	else if(e.keyCode == 80 && !e.ctrlKey)//p
	{
		pauze();
	}
});
$(function (){
	document.getElementById("cik_len").innerHTML = lsolis;
	document.getElementById("cik_atr").innerHTML = asolis;
	document.getElementById("dat_iel").innerHTML = lasa_datus;
	document.getElementById("cil_att").innerHTML = cilindri[1]-cilindri[0];
	document.getElementById("sak_att").innerHTML = cilindri[0];
	adatu_bidisana = setInterval(bida_adatas, cikls);
})
$(function () {
    $(document).ready(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        $('#container').highcharts({
            chart: {
                type: 'spline',
                animation: false,//Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
						grafiki[0]=this.series[0];
						grafiki[1]=this.series[1];
						grafiki[2]=this.series[2];
						grafiki[3]=this.series[3];
						grafiki[4]=this.series[4];
						grafiki[5]=this.series[5];
                    }
                }
            },
            title: {
                text: 'Diska adatu pārvietošanās'
            },
            xAxis: {
                type: 'Laiks',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Pozīcija'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
				max:100,
				min:0
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.numberFormat(this.x, 0) + '<br/>' +
                        Highcharts.numberFormat(this.y, 0);
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'FCFS',
				data: [{y:0,x:ccikls}],
				marker: {enabled: false}
				
            },{
                name: 'SSTF',
				data: [{y:0,x:ccikls}],
				marker: {enabled: false}
            },{
                name: 'SCAN',
				data: [{y:0,x:ccikls}],
				marker: {enabled: false}
            },{
                name: 'C-SCAN',
				data: [{y:0,x:ccikls}],
				marker: {enabled: false}
            },{
                name: 'LOOK',
				data: [{y:0,x:ccikls}],
				marker: {enabled: false}
            },{
                name: 'C-LOOK',
				data: [{y:0,x:ccikls}],
				marker: {enabled: false}
            }]
        });
    });
});