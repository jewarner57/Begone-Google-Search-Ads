// List of selectors that describe ad holding containers
const searchAdSelectors = [
  'div#taw',
  'div#tads'
]

const removedAds = []

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
        item.remove()
    })
  }
}

function createShowAdsButton() {
  const centerCol = document.querySelector("div#center_col")

  const textElem = document.createElement("h1")
  textElem.innerHTML = "Search Ads Hidden 😳"
  textElem.style.fontSize = "1.5em"

  const buttonElem = document.createElement("button")
  buttonElem.innerHTML = "Show"
  buttonElem.style.backgroundColor = "#1a73e8"
  buttonElem.style.padding = "8px 22px"
  buttonElem.style.border = "none"
  buttonElem.style.borderRadius = "4px"

  centerCol.prepend(buttonElem)
  centerCol.prepend(textElem)
}