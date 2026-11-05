'use strict';
const IMAGES=[{"id":"ZW-01","room":"zwischenraum","title":"Ankommen und Durchgang","description":"Ankunftsbereich mit vorhandener Treppe und Schiebetür. Die Wegweisung liegt an der gegenüberliegenden Wand.","src":"assets/ZW-01.png","before":"assets/before/ZW-01.jpg"},{"id":"ZW-02","room":"zwischenraum","title":"Willkommen und Garderobe","description":"Ein ruhiger Willkommensbereich mit geschlossenem Stauraum und Garderobe. Neue Holzflächen greifen den Braunton des Bestands auf.","src":"assets/ZW-02.png","before":"assets/before/ZW-02.jpg"},{"id":"FL-01","room":"flur","title":"Die offene Küche","description":"Die offene Küche bleibt an ihrem bisherigen Platz. Salbeifarbene Fronten, eine helle Arbeitsplatte und Holz im Ton der Türen verbinden sie mit den Gruppenräumen.","src":"assets/FL-01.png","before":"assets/before/FL-01.jpg"},{"id":"FL-02","room":"flur","title":"Gruppenzugänge und Orientierung","description":"Eigene Gruppenschilder mit Vogelsymbolen erleichtern die Zuordnung. Die Leuchten folgen längs dem Flur.","src":"assets/FL-02.png","before":"assets/before/FL-02.jpg"},{"id":"FL-03","room":"flur","title":"Adler neben Spatzen","description":"Diese zusätzliche Ansicht hält den Adler-Zugang neben dem weiteren Spatzen-Zugang fest. Gegenüber liegt der Zugang zu Schwalben.","src":"assets/FL-03.png","before":"assets/before/FL-03.jpg"},{"id":"FL-04","room":"flur","title":"Zwischentreppe zum Zwischenraum","description":"Die vorhandene Zwischentreppe und der seitliche Abzweig bleiben sichtbar. Dieser Blick ergänzt die übrigen Fluransichten.","src":"assets/FL-04.png","before":"assets/before/FL-04.jpg"},{"id":"AD-01","room":"adler","title":"Gesprächsraum","description":"Petrol, eine große Pinnfläche und zusammenstellbare Tische. Der Vers steht direkt auf der weißen Wand; die Leuchten verteilen sich über den Raum.","src":"assets/AD-01.png","before":"assets/before/AD-01.jpg"},{"id":"AD-02","room":"adler","title":"Pinnwand und Eingang","description":"Die Pinnwand ersetzt die mobile Tafel. Holz und Petrol schaffen einen jugendlichen Rahmen; der Zugang bleibt am bisherigen Ort.","src":"assets/AD-02.png","before":"assets/before/AD-02.jpg"},{"id":"SP-01","room":"spatzen","title":"Basteln und Entdecken","description":"Vogelmotive und farbige Landschaften, einmalig der Vers an der Rückwand und größere Stühle für begleitende Eltern. Das Whiteboard bleibt.","src":"assets/SP-01.png","before":"assets/before/SP-01.jpg"},{"id":"SP-02","room":"spatzen","title":"Abschließbarer Stauraum","description":"Abschließbarer Stauraum und eine Pinnwand beim Eingang für die Werke der Kinder. Der Vers bleibt an der gegenüberliegenden Rückwand.","src":"assets/SP-02.png","before":"assets/before/SP-02.jpg"},{"id":"SW-01","room":"schwalben","title":"Neue Sitzecke und Medien","description":"Neue Sitzmöbel auf der rechten Teppichzone, abwischbarer Boden vor der Leinwand und eigene Leuchten direkt unter der niedrigeren Decke.","src":"assets/SW-01.png","before":"assets/before/SW-01.jpg"},{"id":"SW-02","room":"schwalben","title":"Basteltische und Materialschränke","description":"Große geschlossene Materialschränke für alle Gruppen und flexible Basteltische. Die großzügige Raumwirkung bleibt die Grundlage.","src":"assets/SW-02.png","before":"assets/before/SW-02.jpg"}];
const ROOMS=[{"id":"zwischenraum","name":"Zwischenraum","number":"00","color":"#90856b","summary":"Ankommen, weitergehen und sich willkommen fühlen. Die vorhandenen Wege und Höhenunterschiede bleiben erhalten."},{"id":"flur","name":"Flur und Küche","filter":"Flur + Küche","number":"01","color":"#9a785b","summary":"Küche, Gruppenräume und Zwischentreppe im Zusammenhang. Vier Blickrichtungen halten die verschiedenen Zugänge sichtbar."},{"id":"adler","name":"Adler","number":"02","color":"#446f70","summary":"Ein ruhiger Raum für die Gruppe ab 15 Jahren, mit Petrol, warmem Holz und Platz für Gedanken."},{"id":"spatzen","name":"Spatzen","number":"03","color":"#8d9f6e","summary":"Lebhafter und kindgerecht für Drei- bis Sechsjährige: Vogelmotive, Farbe und Platz für die Werke der Kinder."},{"id":"schwalben","name":"Schwalben","number":"04","color":"#b56e50","summary":"Großzügig und flexibel: Basteln, Spielen und Gemeinschaft. Neue Sitzecke, eigene Leuchten und Stauraum für alle Gruppen."}];

const $=id=>document.getElementById(id);
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let currentIndex=0;
let viewerBefore=false;
function switchMarkup(){return '<div class="comparison" role="group" aria-label="Original und Entwurf vergleichen"><button type="button" data-before="true" aria-pressed="false">Vorher · Original</button><button type="button" data-before="false" aria-pressed="true">Nachher · Entwurf</button></div>';}
function setComparison(group,before){for(const b of group.querySelectorAll("button"))b.setAttribute("aria-pressed",String((b.dataset.before==="true")===before));}
for(const room of ROOMS){
 const link=document.createElement('a');link.className='filter room-link';link.href='#'+room.id;link.innerHTML='<span class="room-dot" style="--room-color:'+room.color+'" aria-hidden="true"></span>'+escapeHtml(room.filter||room.name);$('roomLinks').append(link);
 const section=document.createElement('section');section.id=room.id;section.className='room-section';section.setAttribute('aria-labelledby','heading-'+room.id);
 section.innerHTML='<div class="room-heading"><span class="room-number" aria-hidden="true">'+room.number+'</span><div><h2 id="heading-'+room.id+'">'+escapeHtml(room.name)+'</h2><p>'+escapeHtml(room.summary)+'</p></div></div>';
 const grid=document.createElement('div');grid.className='image-grid';
 for(const image of IMAGES.filter(i=>i.room===room.id)){
  const card=document.createElement('figure');card.className='image-card';
  card.innerHTML='<button type="button" class="image-open" aria-label="'+image.id+' '+escapeHtml(image.title)+' groß ansehen"><img loading="lazy" src="'+image.src+'" alt="'+escapeHtml(image.title)+' – Konzeptansicht '+image.id+'"><span class="image-code">'+image.id+'</span><span class="expand-icon" aria-hidden="true">⤢</span></button><figcaption class="card-copy"><h3>'+image.id+' · '+escapeHtml(image.title)+'</h3><p>'+escapeHtml(image.description)+'</p></figcaption>';
  let before=false;
  const toggle=document.createElement('div');toggle.innerHTML=switchMarkup();card.querySelector('.card-copy').prepend(toggle.firstChild);
  card.querySelector('.image-open').onclick=()=>openImage(image.id,before);
  const group=card.querySelector('.comparison');
  for(const button of group.querySelectorAll('button'))button.onclick=()=>{before=button.dataset.before==='true';setComparison(group,before);const img=card.querySelector('img');img.src=before?image.before:image.src;img.alt=image.title+' – '+(before?'Originalfoto':'Entwurf')+' '+image.id;};
  grid.append(card);
 }section.append(grid);$('galleryContent').append(section);
}
function renderViewer(){
 const image=IMAGES[currentIndex];
 $('viewerCode').textContent=image.id;$('viewerTitle').textContent=image.title;
 $('viewerImage').src=viewerBefore?image.before:image.src;$('viewerImage').alt=image.title+' – '+(viewerBefore?'Originalfoto':'Entwurf')+' '+image.id;
 $('originalLink').href=$('viewerImage').getAttribute('src');$('originalLink').textContent=(viewerBefore?'Originalfoto':'Entwurf')+' öffnen ↗';
 $('imagePosition').textContent=(currentIndex+1)+' / '+IMAGES.length+' · '+(viewerBefore?'Originalfoto':'Entwurf');
 setComparison($('viewerComparison'),viewerBefore);
 $('previousImage').disabled=currentIndex===0;$('nextImage').disabled=currentIndex===IMAGES.length-1;
}
function openImage(id,before=false){
 const index=IMAGES.findIndex(i=>i.id===id);if(index<0)return;currentIndex=index;viewerBefore=before;renderViewer();
 if(!$('viewer').open)$('viewer').showModal();
}
$('viewerComparison').innerHTML=switchMarkup();
for(const button of $('viewerComparison').querySelectorAll('button'))button.onclick=()=>{viewerBefore=button.dataset.before==='true';renderViewer();};
function stepImage(direction){const image=IMAGES[currentIndex+direction];if(image)openImage(image.id);}
$('closeViewer').onclick=()=>$('viewer').close();$('previousImage').onclick=()=>stepImage(-1);$('nextImage').onclick=()=>stepImage(1);
$('openAbout').onclick=()=>$('about').showModal();$('closeAbout').onclick=()=>$('about').close();
for(const dialog of [$('viewer'),$('about')])dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.addEventListener('keydown',e=>{if(!$('viewer').open)return;if(e.key==='ArrowLeft'){e.preventDefault();stepImage(-1);}if(e.key==='ArrowRight'){e.preventDefault();stepImage(1);}});

