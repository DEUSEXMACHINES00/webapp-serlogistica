function cadenaSql(tabla, metodo, objeto_Datos, id_actual) {
    if (objeto_Datos != null) {
        if (metodo = 'Insertar') {
            var cadena_Sql = "INSERT INTO " + tabla + " VALUES (";
            for (const property in objeto_Datos) {
                if(typeof objeto_Datos[property] === "number"){
                    cadena_Sql = cadena_Sql  + `${objeto_Datos[property]}` + ", ";
                }else{
                    cadena_Sql = cadena_Sql + "'" + `${objeto_Datos[property]}` + "', ";
                } 
            };
            cadena_Sql = cadena_Sql.substr(0, cadena_Sql.length - 2) + ")";
            //            cadena_Sql = cadena_Sql+ ")";
        } else {
            cadena_Sql = "UPDATE " + tabla + " SET ";
            for (const property in objeto_Datos) {
                cadena_Sql = cadena_Sql + `${property}` + " = '" + `${objeto_Datos[property]}` + "', ";
            };
            cadena_Sql = cadena_Sql.substr(0, cadena_Sql.length - 2) + " WHERE id= '" + id_actual + "'";
        }        
        return cadena_Sql;
    }
}
/* 
function digitodv(documento) {

    var nit = documento;
    var Arreglo_PA = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];
    var WDato = nit.padStart(15, '0'); // Completar string de 15 con 0 a la izquierda    
    var WSuma = 0;

    for (let i = 0; i < Arreglo_PA.length; i++) {

        WSuma = WSuma + (parseInt(WDato.substr(i, 1)) * Arreglo_PA[i]); //   WSuma=WSuma+(VAL(SUBS(WDato,i,1))*Arreglo_PA(i));

    };

    WSuma = WSuma % 11;
    if (WSuma == 0 || WSuma == 1) {
        return WSuma;
    } return 11 - WSuma;
} */
module.exports = cadenaSql;


