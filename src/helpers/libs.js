const helpers = {}

helpers.randomNumber = () => {
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    let nombreIMG = 0;
    for (let i = 0; i < 10; i++) {
        nombreIMG += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return nombreIMG;
}

module.exports = helpers;