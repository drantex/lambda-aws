'use strict';

const solutions = [];
const dividersNumber = [];
let sum = 0;

/**
 * Metodo handler encargado de obtener todos los posibles tamaños de x.
 * @param {Object} event evento de api gateway
 * @returns response
 */
module.exports.groups = async (event) => {


    const { dataGroups = [] } = JSON.parse(event.body);

    const valid = validGrups(dataGroups);

    if (!valid) {
        return {
            statusCode: 400,
            body: JSON.stringify({ msg: 'Existen grupos erroneos' }),
        }
    }

    getDividers(sum);


    dividersNumber.forEach(divider => {
        searchSolution(dataGroups, divider);
    });


    return {
        statusCode: 200,
        body: JSON.stringify({ solutions, dataGroups }),
    };
};

/**
 * Función encargada de identificar que los grupos sean un array de números positivos.
 * @param {Array<number>} dataGroups Array enviado en el body dE la petición.
 */
const validGrups = (dataGroups) => {

    let response = true;

    if (!Array.isArray(dataGroups)) {
        return false;
    }

    let numberGroup;
    
    for (let i = 0, len = dataGroups.length; i < len; i++) {
        numberGroup = dataGroups[i];
        if ( isNaN(numberGroup)  || numberGroup <= 0 ) {
            response = false;
            break
        }
        sum += numberGroup
    }


    return response;

}


/**
 * Función para identificar los divisores de la suma de todos los elementos contenidos en el array.
 * @param {number} maxNumber Suma de todos los elementos contenidos en el array
 */
const getDividers = (maxNumber) => {

    for (let i = 1; i <= maxNumber; i++) {
        if (maxNumber % i === 0) {
            dividersNumber.push(i);
        }
    }
};


/**
* Función encargada de identificar las soluciones de acuerdo a las condiciones indicadas.
* @param {Array<number>} event cantidad de grupos
* @param {*} number 
* @input 1, 2, 1, 1, 1, 2, 1, 3
* @test  1, 2, 3, 4, 6, 12
*/
const searchSolution = (event, validateNumber) => {

    let count = 0;

    for (let i = 0, len = event.length; i < len; i++) {

        if (count === 0) {

            if (event[i] > validateNumber) {
                return;
            } else if (validateNumber === event[i]) {
                count = 0;
            } else {
                count += event[i]
            }

        } else {

            count += event[i];

            if (count > validateNumber) {
                return;
            } else if (validateNumber === count) {
                count = 0;
            }
        }

    }

    if (count === 0) {
        solutions.push(validateNumber);
    }
};