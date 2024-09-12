const observer = new MutationObserver(filterVideos);

function parseNumberWithSuffix(text) {
  // Supprimer tous les espaces, y compris les espaces insécables
  text = text.replace(/\s+/g, '');
  
  // Expression régulière pour capturer les chiffres avec ou sans décimales et le suffixe
  var match = text.match(/([\d.,]+)([KMB]?)/i);
  if (match) {
      // Remplacer les virgules par des points pour garantir une conversion correcte
      var number = parseFloat(match[1].replace(',', '.'));
      var suffix = match[2].toUpperCase();

      switch (suffix) {
          case 'K':
              return number * 1000;
          case 'M':
              return number * 1000000;
          case 'B':
              return number * 1000000000;
          default:
              return number;
      }
  }
  return 0; // Retourner 0 si aucune correspondance
}

function filterVideos() {
  const videos = document.querySelectorAll('ytd-rich-item-renderer, ytd-grid-video-renderer'); // Cibler différents types de rendus de vidéos
    
  videos.forEach(video => {
    // Sélectionner uniquement le premier élément <span> avec les classes spécifiées
    const viewsElement = video.querySelector('span.inline-metadata-item.style-scope.ytd-video-meta-block');
    
    if (viewsElement) {
      var textContent = viewsElement.textContent;
      console.log("textContent ", textContent);
      
      var numberOfViews = parseNumberWithSuffix(textContent);
      console.log("numberOfViews ", numberOfViews);
      
      if (numberOfViews < 300) { 
        video.style.display = "none"
      } else if (numberOfViews < 1000) {
        video.style.background = "grey";
      } else if(numberOfViews < 10000) {
          video.style.background = "lightgrey";
      }
    }
  });
}

// Observer les changements dans le DOM pour appliquer le filtre si de nouvelles vidéos sont chargées
observer.observe(document.querySelector('#page-manager'), { childList: true, subtree: true });

// Appliquer le filtre initialement au chargement de la page
filterVideos();
