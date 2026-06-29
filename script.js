const env=document.getElementById('envelope');
const btn=document.getElementById('continueBtn');
let opened=false;
env.addEventListener('click',()=>{
 if(opened)return;
 opened=true;
 env.classList.add('open');
});
btn.addEventListener('click',(e)=>{
 e.stopPropagation();
 window.location.href='letter.html';
});
