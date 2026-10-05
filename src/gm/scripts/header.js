/* Supplied GovMath design script, kept as delivered. Only the wrapper (an
   exported init function) and the points marked "GovMath:" are changed. */
export function initHeader(){
document.addEventListener('click',e=>{document.querySelectorAll('header details[open]').forEach(d=>{if(!d.contains(e.target))d.open=false})});document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('header details[open]').forEach(d=>d.open=false)});
}
