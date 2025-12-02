Pasos a seguir para mandar actualización de App Gastos de Viajes Prodismo (apk file)
------------------------------------------------------------------------------------------------------

Reemplazar en la carpeta Descargas el archivo con la versión vieja por la versión NUEVA, sin modificar el nombre del archivo.

Ejemplo:  	AppGastos_v1_6_18_8_3_22.apk		(version vieja)
	AppGastos_v1_5_6_25_2_22_16_00(8).apk     	(version NUEVA)

Solo dejar el archivo "AppGastos_v1_6_18_8_3_22.apk" con la version actualizada; o sea eliminar el archivo con la fecha mas antigua.

MUY IMPORTATE!!!!   -----> Se debe mantener el nombre:  "AppGastos_v1_6_18_8_3_22.apk"; así cuando lo descargan del GitHub, se les reinstala a los usuarios, sin modificar nada.


Para pushear al Github desde VS

git status    (=> para ver si estas parado en la rama correcta, debería decir master o main en color verde)

git add .

git commit -m "Aca va el mensaje (actualizacionFechaxxxxx) por ejemplo"

git status (=> debe estar el arbol limpio)

git push origin master
