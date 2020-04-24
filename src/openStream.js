function openStream(callback) {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
    .then(stream => {
        callback(stream);
    })
    .catch(err => console.log(err.name + ": " + err.message));
}

module.exports = openStream;