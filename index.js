const http = require('http');

// CONSTANT for golden ratio 
const GOLDER_RATIO = (1 + Math.sqrt(5)) / 2;

// ES6
// const algo = num => { ... }
function algo(num) {
    // apskaicuojama pagal pateikta algoritma 
    // http://planet.jboss.org/post/fibonacci_sequence_with_and_without_recursion
    if(num <= 1){
        return num
    }
    
    let fibo = 1;
    let fiboPrev = 1;
    
    for(let i = 2; i < num; ++i){
        let temp = fibo;
        fibo += fiboPrev;
        fiboPrev = temp;
    }
    return fibo;
};

function formula(num) {
    // apskaicuojama pagal pateikta formule
    // https://nargaque.com/2011/10/05/10-mind-blowing-mathematical-equations/ 
    return (Math.pow(GOLDER_RATIO, num) - Math.pow((-(1/GOLDER_RATIO)), num)) / Math.sqrt(5);
}

// sukuriamas serveris
const server = http.createServer((req, res) => {
    
    // pasiimami GET parametrai.
    // KLAIDA: Su GET Parametrais ateina ir favicon.ico, todel nuejus i localhost'a gauname du parametrus (/232 -> 232) ir po to antra request'1 (/favicon.ico)
    const param = req.url.substring(1);
     
     // Validuojama ar param egzistuoja (nebuvo tiesiog sunciama /) ir ar parametras, kuris ateina yra sveikas skaicius
    if (param && Number.isInteger(parseInt(param))) {
        const algoNum = algo(param); // apskaiciuojam pagal algoritma
        const formulaNum = formula(param); // apskaiciuojam pagal formule
        const match = (Number(formulaNum) === Number(algoNum)); // Lyginama ar rezultatai sutampa
        
        let string = 'Formula number: ' + formulaNum + ' Algorith number: ' + algoNum + ' Numbers are matching? ';
        string += match ? 'Yes :)' : 'No :(';
        // ES6
        // `Formula number: ${formulaNum} Algorith number: ${algoNum} ....`;
        
        res.end(string);
    }
});

// paleidziamas serveris
server.listen(3003, '127.0.0.1');