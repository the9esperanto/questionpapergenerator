export default function suffleQuestion(array) {
    // Durstenfeld shuffle algorithm reference from stackoverflow... must study very interesting...

    // var array = [1, 2, 3];

    for (var i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}