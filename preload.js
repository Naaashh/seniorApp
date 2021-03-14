// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.


const customTitlebar = require('./assets/static/custom-electron-titlebar');

window.addEventListener('DOMContentLoaded', () => {
  new customTitlebar.Titlebar({
    icon: 'assets/icon/favicon.svg'
  });

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})


