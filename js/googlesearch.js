// List of selectors that describe ad holding containers
const searchAdSelectors = [
  'div#taw',
  'div#tads'
]

const removedAds = []
let adsAreHidden = true

hideAds()

// Hide search ads
function hideAds() {
  
  for(selector of searchAdSelectors) {
    removeElementsBySelector(selector)
  }

  console.log(removedAds)

  if (removedAds.length > 0) {
    createShowAdsButton()
  }
}

function removeElementsBySelector(selector) {
  const elems = document.querySelectorAll(selector)
  const elemArray = Array.from(elems)

  if (elemArray.length > 0) {
    elemArray.forEach((item) => {
      // If the item had visible content then add it to the ad array
      if (item.getBoundingClientRect().width > 0 &&
          item.getBoundingClientRect().height > 0 && 
          item.childNodes.length > 0
          ) {
          removedAds.push(item)
        }
        item.style.display = "none"
    })
  }
}

function createShowAdsButton() {
  const centerCol = document.querySelector("div#center_col")

  const promptContainer = document.createElement("div")
  promptContainer.style.padding = "0 12px"
  promptContainer.style.border = "2px solid #333"
  promptContainer.style.borderRadius = "4px"


  centerCol.prepend(promptContainer)

  
  const text = createSylizedText("Search Ads Hidden 😳")
  const button = createStylizedButton("Bring Them Back")

  button.onclick = function (e) {
    const newDisplayVal = adsAreHidden ? "block" : "none"

    for(ad of removedAds) {
        ad.style.display = newDisplayVal
    }

    adsAreHidden = !adsAreHidden
    button.innerHTML = adsAreHidden ? "Bring Them Back" : "Hide the Ads"
  }

  promptContainer.prepend(button)
  promptContainer.prepend(text)
}

function createSylizedText(content) {
  const textElem = document.createElement("h1")
  textElem.innerHTML = content
  textElem.style.fontSize = "1.5em"

  return textElem
}

function createStylizedButton(title) {
  const buttonElem = document.createElement("button")
  buttonElem.innerHTML = title
  buttonElem.style.backgroundColor = "#1a73e8"
  buttonElem.style.padding = "8px 22px"
  buttonElem.style.border = "none"
  buttonElem.style.borderRadius = "4px"

  return buttonElem
}