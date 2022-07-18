// List of selectors that describe ad holding containers
const searchAdSelectors = [
  'div#taw',
  'div#tads',
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
        item.style.opacity = "0"
    })
  }
}

function createShowAdsButton() {
  const centerCol = document.querySelector("div#rcnt")

  const promptContainer = document.createElement("div")
  promptContainer.style.padding = "10px 0"
  centerCol.prepend(promptContainer)
  
  const textAdsVisibleText = "Search Ads Visible 😳"
  const textAdsHiddenText = "Search Ads Hidden ✅"
  const buttonAdsVisibleText = "Take Them Away!"
  const buttonAdsHiddenText = "Bring Them Back!"

  const text = createSylizedText(textAdsHiddenText)
  const button = createStylizedButton("Bring Them Back")

  button.onclick = function (e) {
    const newDisplayVal = adsAreHidden ? "block" : "none"
    const newOpacityVal = adsAreHidden ? 1 : 0

    for(ad of removedAds) {
        ad.style.transition = "all 0.4s linear"
        ad.style.opacity = newOpacityVal
        ad.style.visibility = newDisplayVal
    }

    adsAreHidden = !adsAreHidden
    text.innerHTML = adsAreHidden ? textAdsHiddenText : textAdsVisibleText
    button.innerHTML = adsAreHidden ? buttonAdsHiddenText : buttonAdsVisibleText 
  }

  promptContainer.prepend(button)
  promptContainer.prepend(text)
}

function createSylizedText(content) {
  const textElem = document.createElement("h1")
  textElem.innerHTML = content
  textElem.style.fontSize = "1.3em"
  textElem.style.marginBottom = "10px"

  return textElem
}

function createStylizedButton(title) {
  const buttonElem = document.createElement("button")
  buttonElem.innerHTML = title
  buttonElem.style.backgroundColor = "#1a73e8"
  buttonElem.style.padding = "8px 22px"
  buttonElem.style.border = "none"
  buttonElem.style.borderRadius = "4px"
  buttonElem.style.marginBottom = "10px"

  return buttonElem
}