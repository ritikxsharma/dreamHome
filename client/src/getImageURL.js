const getImageURL = (imageName) => {
    try {
        return require(`./assets/${imageName}.png`)
    } catch (error) {
        return null
    }
}

export default getImageURL