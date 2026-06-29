const beforePhrase = `Well... I'm old, so yeah, this is a love letter. Bear with me.

Before I met you, I had given up on love. I thought it was all bullshit—overrated and not meant for me. Deep down, I wanted to love and be loved, but I buried all those feelings and convinced myself that love just wasn't worth it.
Then, out of nowhere, I started texting random people... and there was this one message:

`;

const phrase = `"Do ik you?"`;

const afterPhrase = `

Funny how a few words can change your entire life.

From that moment, everything changed. Without even realizing it, you started healing parts of me that I thought would stay broken forever. You showed me what love actually feels like, and you made me fall in love with you.

Who would've thought, huh?

The way you make me feel is the most beautiful feeling I've ever experienced. Your smile, your cute little talks, your voice... everything about you made me realize that I could fall in love again.

The only girl who understood "mamatti" and every random reference I make.

Monica... I love you, di.
I love every inch of you.

You're the girl who knows me better than I know myself. The girl who predicts my words before I even say them. The girl who somehow understands my thoughts without me explaining them. Even your anger somehow makes you more beautiful.
Sometimes I ask myself, "How did I fall so deeply in love with this girl?"

And every single time, the answer is the same...

Because it's Monica.

I'd choose you again.
I'd fall for you again.
Again.
And again.
And again.

You're the girl who nods at all my stupid stories, the girl who tries to put some sense into my stubborn head. You're one of the very few people who truly understand me and the way I see the world, even when you don't always agree with me.

That's one of my favorite things about us.

Every time we fight, we always find our way back to each other. We talk, we understand, we compromise, and we become stronger. Sometimes we fight over the silliest things... but that's okay. Because at the end of the day, it's always you and me.

I love you when we laugh.
I love you when we cry.
I love you when you're angry.
I love you when you're excited.
I love you when you're sleepy.
I love you on your best days.
And I'll love you on your worst ones too.

Every version of you is my favorite version.
You'll always be my little girl.
And I promise I'll never stop loving my little girl.

So... just bear with me. Stay beside me, annoy me, laugh with me, fight with me, grow with me, and love me.
Stay with me forever.

I love you, Monica.
Always.`;

const paragraph = document.getElementById('paragraph');
const SPEED = 55;
let html = '';

function escapeText(str){
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function typePlain(str, onDone){
  let idx = 0;
  function step(){
    if(idx < str.length){
      html += escapeText(str.charAt(idx));
      paragraph.innerHTML = html;
      idx++;
      setTimeout(step, SPEED);
    } else {
      onDone();
    }
  }
  step();
}

function typeBold(str, onDone){
  let idx = 0;
  function step(){
    if(idx < str.length){
      const partial = escapeText(str.slice(0, idx+1));
      paragraph.innerHTML = html + `<a href="proof.html" class="hl">${partial}</a>`;
      idx++;
      setTimeout(step, SPEED);
    } else {
      html += `<a href="proof.html" class="hl">${escapeText(str)}</a>`;
      paragraph.innerHTML = html;
      onDone();
    }
  }
  step();
}

function spawnHearts(el){
  for(let k=0;k<6;k++){
    const heart = document.createElement('span');
    heart.className = 'floatHeart';
    heart.textContent = '❤';
    heart.style.left = (Math.random()*40-20)+'px';
    heart.style.animationDelay = (k*0.05)+'s';
    el.appendChild(heart);
    setTimeout(()=>heart.remove(), 1200);
  }
}

// Click/tap interactivity for the bold phrase (works on iPhone too, since click fires on tap)
paragraph.addEventListener('click', (e) => {
  const hl = e.target.closest('.hl');
  if(!hl) return;
  hl.classList.add('popped');
  spawnHearts(hl);
  setTimeout(()=>hl.classList.remove('popped'), 400);
});

const alreadySeen = sessionStorage.getItem('letterTyped') === '1' || new URLSearchParams(window.location.search).get('seen') === '1';

if(alreadySeen){
  // Already seen it — show the full letter instantly, no retyping
  paragraph.innerHTML = escapeText(beforePhrase) + `<a href="proof.html" class="hl">${escapeText(phrase)}</a>` + escapeText(afterPhrase);
  const link = document.getElementById('photosLink');
  if(link) link.classList.add('show');
  sessionStorage.setItem('letterTyped', '1');
} else {
  typePlain(beforePhrase, () => {
    typeBold(phrase, () => {
      typePlain(afterPhrase, () => {
        const link = document.getElementById('photosLink');
        if(link) link.classList.add('show');
        sessionStorage.setItem('letterTyped', '1');
      });
    });
  });
}
