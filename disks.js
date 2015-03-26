var adata=[0,0,0,0,0];
var adata_bidas=[0,0,0,0,0];
var adata_gaida=[0,0,0,0,0];
var cilindri=[10,20,30,40,50,60,70,80,90]
var solis = 1;
var lasa_datus = 500;
var cikls = 20;
var adatu_bidisana;
var nobide = 15;
function bida_adatas()
{
	for(var i=0; i < adata.length; i++)
	{
		if (adata_gaida[i] > Date.now())
		{
			//vel jagaida
		}
		else if(adata[i] != adata_bidas[i])
		{
			adata[i] = adata[i]-Math.sign(adata[i]-adata_bidas[i])*Math.min(Math.abs(adata[i]-adata_bidas[i]),solis);
			document.getElementById("adata_"+i).style.right = adata[i]+nobide+"px";
			//alert(adata[i]);
		}
		else if(adata[i] == adata_bidas[i])
		{
			//uzsktada gaidīšanu
			adata_gaida[i] = Date.now() + lasa_datus;
			//izvēlas jauno gala mērķi
			adata_bidas[i] = cilindri[Math.round(Math.random()*100)%cilindri.length];
		}
	}
	return;
}
$(function (){
	adatu_bidisana = setInterval(bida_adatas, cikls);
})

