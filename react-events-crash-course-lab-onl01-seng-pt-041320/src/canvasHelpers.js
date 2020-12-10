// nothing needs to change here. These helpers abstracted here just to keep
// lesson focused on event handling and not hacky HTML5 canvas nonsense

let colors = []
let def = null
let cycling = false
let idx = 0
let [sizeX, sizeY] = [95, 121]

export function init() {
  
  def = document.createElement("img")
  const green = document.createElement("img")
  const red = document.createElement("img")
  const yellow = document.createElement("img")

  def.src = "chrome-boi.png"
  green.src = "chrome-boi-green.png"
  red.src = "chrome-boi-red.png"
  yellow.src = "chrome-boi-yellow.png"
  
  colors = [green, red, yellow]
}

export function drawChromeBoiAtCoords(x, y) {
  
  const canvas = document.querySelector("canvas") // sloppy but we haven't introduced lifecycle methods and canvas wouldn't be rendered
  const ctx = canvas.getContext("2d")
  const rect = canvas.getBoundingClientRect()
  const [cX, cY] = [rect.left, rect.top]
  
  let img
  if (cycling) {
    img = colors[idx]
    idx = (idx + 1) % 3
  } else {
    img = def
  }
  
  ctx.drawImage(img, x - cX - 50, y - cY - 80, sizeX, sizeY)
}

export function toggleCycling() {
  cycling = !cycling
}

export function resize(type) {
  const multiplier = (type === "+") ? 1.1 : 0.9
  sizeX *= multiplier
  sizeY *= multiplier
}
