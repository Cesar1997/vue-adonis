/* 
    Se administran los nombres de esapcio para la aplicacion

    Es igual al hacer 

    export const SET_USER = 'NAME'

*/
function mapValues(obj,f) {
    const res = {};
    Object.keys(obj).forEach(key => {
        res[key] = f(obj[key],key)
    });
    return res;
}

export default (module,types) => {
    let newObj = {};
    mapValues(types, (names,type) => {
        newObj[type] = {};
        types[type].forEach(name => {
            newObj[type][name] = module + ':' +name;
        });
    });
    return newObj;
}