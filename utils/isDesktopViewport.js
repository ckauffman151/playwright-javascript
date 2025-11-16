export const isDekstopViewport = (page) => {
    // return true or false
    const size = page.viewportSize()
    return size.width >= 600
  }