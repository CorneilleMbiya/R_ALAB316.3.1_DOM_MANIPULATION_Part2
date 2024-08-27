const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');
const topMenuEl = document.getElementById('top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');
const menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

menuLinks.forEach(link => {
  const aEl = document.createElement('a');
  aEl.href = link.href;
  aEl.textContent = link.text;
  topMenuEl.appendChild(aEl);
});

const subMenuEl = document.getElementById('sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';
const topMenuLinks = topMenuEl.querySelectorAll('a');

function buildSubmenu(subLinks) {
  subMenuEl.innerHTML = '';
  subLinks.forEach(link => {
    const aEl = document.createElement('a');
    aEl.href = link.href;
    aEl.textContent = link.text;
    subMenuEl.appendChild(aEl);
  });
}

topMenuEl.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (evt.target.tagName !== 'A') return;
  console.log(evt.target.textContent);

  if (evt.target.classList.contains('active')) {
    evt.target.classList.remove('active');
    subMenuEl.style.top = '0';
  } else {
    topMenuLinks.forEach(a => a.classList.remove('active'));
    evt.target.classList.add('active');
    
    const linkObject = menuLinks.find(link => link.text === evt.target.textContent);
    if (linkObject && linkObject.subLinks) {
      subMenuEl.style.top = '100%';
      buildSubmenu(linkObject.subLinks);
    } else {
      subMenuEl.style.top = '0';
    }
  }

  if (evt.target.textContent === 'about') {
    mainEl.innerHTML = '<h1>About</h1>';
  }
});

subMenuEl.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (evt.target.tagName !== 'A') return;
  console.log(evt.target.textContent);

  subMenuEl.style.top = '0';
  topMenuLinks.forEach(a => a.classList.remove('active'));
  mainEl.innerHTML = `<h1>${evt.target.textContent}</h1>`;
});
