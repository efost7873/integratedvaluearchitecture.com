const ivaHeader = document.querySelector('.iva-header');
const ivaHeaderInner = document.querySelector('.iva-header-inner');
const ivaLogo = document.querySelector('.iva-header-logo');
const ivaTitle = document.querySelector('.iva-header-title');
const ivaToggle = document.getElementById('iva-menu-toggle');
const ivaNav = document.getElementById('iva-nav');
const ivaFooter = document.querySelector('.iva-footer');

function updateMenu() {
  if (window.innerWidth < 780) {
    ivaToggle.style.display = 'block';
    ivaNav.style.display = 'none';
  } else {
    ivaToggle.style.display = 'none';
    ivaNav.style.display = 'flex';
  }
}

ivaToggle.addEventListener('click', () => {
  ivaNav.style.display = ivaNav.style.display === 'none' ? 'flex' : 'none';
});

window.addEventListener('resize', updateMenu);
updateMenu();

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    ivaHeader.classList.add('scrolled');
    ivaHeaderInner.style.padding = '10px 32px';
    ivaLogo.style.height = '36px';
    ivaTitle.style.fontSize = '1.25rem';
  } else {
    ivaHeader.classList.remove('scrolled');
    ivaHeaderInner.style.padding = '18px 32px';
    ivaLogo.style.height = '44px';
    ivaTitle.style.fontSize = '1.45rem';
  }

  if (window.scrollY > 0) {
    ivaFooter.style.opacity = '0.96';
  } else {
    ivaFooter.style.opacity = '1';
  }
});
